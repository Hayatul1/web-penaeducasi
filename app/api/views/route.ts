import { NextResponse } from 'next/server';
import { SignJWT, importPKCS8 } from 'jose';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Cache token di memori untuk mencegah rate-limit / blocking Google saat request bersamaan
let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string | null> {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  try {
    const algorithm = 'RS256';
    const privateKeyObj = await importPKCS8(privateKey, algorithm);
    
    const iat = Math.floor(now / 1000);
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
    if (tokenData.access_token) {
      cachedAccessToken = tokenData.access_token;
      tokenExpiresAt = now + (tokenData.expires_in ? tokenData.expires_in * 1000 : 3600000);
      return cachedAccessToken;
    }
  } catch {
    return null;
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) return NextResponse.json({ views: 0 });

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!clientEmail || !privateKey || !propertyId) {
      return NextResponse.json({ views: 0 });
    }

    const accessToken = await getAccessToken(clientEmail, privateKey);
    if (!accessToken) return NextResponse.json({ views: 0 });

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
        next: { revalidate: 60 },
      }
    );

    const gaData = await gaRes.json();
    const views = gaData.rows?.[0]?.metricValues?.[0]?.value || '0';

    return NextResponse.json({ views: parseInt(views) });

  } catch {
    return NextResponse.json({ views: 0 });
  }
}