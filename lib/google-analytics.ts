import { SignJWT, importPKCS8 } from 'jose';

export async function getPageViews(slug: string): Promise<number> {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
    const propertyId = process.env.GA_PROPERTY_ID?.trim();
    let rawKey = process.env.GOOGLE_PRIVATE_KEY || '';

    if (!clientEmail || !rawKey || !propertyId) {
      return 0;
    }

    // Bersihkan tanda kutip dan normalisasi baris baru
    rawKey = rawKey.trim().replace(/^["']|["']$/g, '');
    if (rawKey.includes('\\n')) {
      rawKey = rawKey.replace(/\\n/g, '\n');
    }

    // Validasi pencegah InvalidCharacterError sebelum diproses jose
    if (!rawKey.includes('BEGIN PRIVATE KEY')) {
      return 0;
    }

    // 1. Buat Token JWT yang didukung Cloudflare Edge
    const algorithm = 'RS256';
    const privateKeyObj = await importPKCS8(rawKey, algorithm);
    
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

    // 2. Tukar JWT dengan Access Token Google
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
      return 0;
    }

    // 3. Tarik data dari Google Analytics 4 via REST API
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
        next: { revalidate: 60 } 
      }
    );

    const gaData = await gaRes.json();
    const views = gaData.rows?.[0]?.metricValues?.[0]?.value || '0';

    return parseInt(views, 10);

  } catch {
    // Mengembalikan 0 secara aman tanpa memicu error merah di layar lokal
    return 0; 
  }
}