import { NextResponse } from 'next/server';
import { SignJWT, importPKCS8 } from 'jose';

// WAJIB: Agar berjalan mulus di Cloudflare Pages (Edge)
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ views: 0 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!clientEmail || !privateKey || !propertyId) {
      return NextResponse.json({ views: 0 });
    }

    // 1. Buat Token JWT dengan 'jose' (Cloudflare Friendly)
    const algorithm = 'RS256';
    const privateKeyObj = await importPKCS8(privateKey, algorithm);
    
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;

    const token = await new SignJWT({
      iss: clientEmail,
      sub: clientEmail,
      aud: 'https://oauth2.googleapis.com/token',
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
    })
      .setProtectedHeader({ alg: algorithm, typ: 'JWT' })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .sign(privateKeyObj);

    // 2. Minta Access Token ke Google
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
      cache: 'no-store',
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json({ views: 0 });
    }

    // 3. Ambil data report dari GA4 Data API
    const gaRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }],
          dimensionFilter: {
            filter: {
              fieldName: 'pagePath',
              stringFilter: {
                value: slug,
                matchType: 'EXACT',
              },
            },
          },
        }),
        next: { revalidate: 60 }, // Cache selama 60 detik di Cloudflare
      }
    );

    const gaData = await gaRes.json();
    const views = gaData.rows?.[0]?.metricValues?.[0]?.value || '0';

    return NextResponse.json({ views: parseInt(views) });

  } catch (error) {
    console.error('Error fetching GA Views on Edge:', error);
    return NextResponse.json({ views: 0 });
  }
}