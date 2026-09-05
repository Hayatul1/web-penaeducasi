function base64UrlEncode(str: string): string {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64UrlEncode(binary);
}

async function getCryptoPrivateKey(pem: string) {
  if (!pem) throw new Error("GOOGLE_PRIVATE_KEY tidak ditemukan di .env.local");

  // 1. Buang string literal "\n" dan baris baru asli terlebih dahulu
  // 2. Baru bersihkan sisa karakter non-Base64
  const cleanPem = pem
    .replace(/\\n/g, "")
    .replace(/["']/g, "")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/[^A-Za-z0-9+/=]/g, "");

  try {
    const binaryDerString = atob(cleanPem);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
      binaryDer[i] = binaryDerString.charCodeAt(i);
    }

    return await crypto.subtle.importKey(
      "pkcs8",
      binaryDer.buffer,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" },
      },
      false,
      ["sign"]
    );
  } catch (err: any) {
    console.error("Detail Error atob:", err.message);
    throw err;
  }
}

let cachedToken: { token: string; expiry: number } | null = null;
let tokenPromise: Promise<string | null> | null = null; // <-- Mekanisme Antrean Pintar untuk Mencegah Fetch Failed

async function getAccessToken(): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiry > now + 60) {
    return cachedToken.token;
  }

  // Jika sedang ada proses fetch token yang berjalan, tunggu hasilnya (jangan buat request baru)
  if (tokenPromise) {
    return tokenPromise;
  }

  tokenPromise = (async () => {
    try {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY;

      if (!clientEmail || !privateKey) return null;

      const header = { alg: "RS256", typ: "JWT" };
      const payload = {
        iss: clientEmail,
        scope: "https://www.googleapis.com/auth/analytics.readonly",
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      };

      const encodedHeader = base64UrlEncode(JSON.stringify(header));
      const encodedPayload = base64UrlEncode(JSON.stringify(payload));
      const signingInput = `${encodedHeader}.${encodedPayload}`;

      const key = await getCryptoPrivateKey(privateKey);
      const signatureBuffer = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        new TextEncoder().encode(signingInput)
      );

      const jwt = `${signingInput}.${arrayBufferToBase64Url(signatureBuffer)}`;

      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: jwt,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        cachedToken = { token: data.access_token, expiry: Math.floor(Date.now() / 1000) + 3600 };
        return data.access_token;
      }
      return null;
    } catch (error: any) {
      console.error("Gagal mendapatkan Google Access Token:", error.message || error);
      return null;
    } finally {
      tokenPromise = null; // Reset antrean setelah selesai
    }
  })();

  return tokenPromise;
}

const viewCache = new Map<string, { views: number; time: number }>();

export async function getPageViews(slug: string): Promise<number> {
  try {
    const now = Date.now();
    if (viewCache.has(slug) && now - viewCache.get(slug)!.time < 10 * 60 * 1000) {
      return viewCache.get(slug)!.views;
    }

    const propertyId = process.env.GA_PROPERTY_ID;
    if (!propertyId) return 0;

    const accessToken = await getAccessToken();
    if (!accessToken) return 0;

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: '2026-01-01', endDate: 'today' }],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }],
          dimensionFilter: {
            filter: {
              fieldName: 'pagePath',
              stringFilter: {
                matchType: 'EXACT',
                value: `/post/${slug}`,
              },
            },
          },
        }),
      }
    );

    const report = await res.json();
    const views = report.rows?.[0]?.metricValues?.[0]?.value;
    const count = views ? parseInt(views, 10) : 0;

    viewCache.set(slug, { views: count, time: now });
    return count;
  } catch (error) {
    console.error("Gagal menarik data GA4 untuk slug:", slug, error);
    return 0;
  }
}