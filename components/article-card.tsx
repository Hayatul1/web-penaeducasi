import Link from "next/link"
import { Eye } from "lucide-react"
import type { Article } from "@/lib/sample-data"
import { SignJWT, importPKCS8 } from 'jose';

// FUNGSI PENGAMAN ANGKA
function formatViews(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toString()
}

// CACHE TOKEN DI MEMORI SERVER
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

// FUNGSI FETCH VIEW LANGSUNG DI SERVER
async function fetchArticleViewsServer(slug: string): Promise<number> {
  try {
    let cleanSlug = slug.trim();
    if (!cleanSlug.startsWith('/')) {
      cleanSlug = `/${cleanSlug}`;
    }
    const fullSlugPath = cleanSlug.startsWith('/post/') ? cleanSlug : `/post${cleanSlug}`;

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!clientEmail || !privateKey || !propertyId) return 0;

    const accessToken = await getAccessToken(clientEmail, privateKey);
    if (!accessToken) return 0;

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
                value: fullSlugPath,
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
    return parseInt(views, 10);
  } catch {
    return 0;
  }
}

interface ArticleCardProps {
  article: Article;
  hideViews?: boolean;
}

export async function ArticleCard({ article, hideViews }: ArticleCardProps) {
  const views = hideViews ? 0 : await fetchArticleViewsServer(article.slug);

  return (
    <Link
      href={`/post/${article.slug}`}
      prefetch={false}
      className="group flex flex-col overflow-hidden rounded-none border-b border-border bg-card pb-4 shadow-none transition-all duration-200 md:rounded-xl md:border md:bg-card md:p-0 md:shadow-sm md:hover:-translate-y-1 md:hover:shadow-lg md:hover:border-primary/30"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-4">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors md:text-sm md:font-semibold">
          {article.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{article.date}</span>
          
          {!hideViews && (
            <div className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded text-card-foreground shrink-0">
              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{formatViews(views)}</span>
            </div>
          )}
          
        </div>
      </div>
    </Link>
  )
}

export async function ArticleCardSmall({ article, hideViews }: ArticleCardProps) {
  const views = hideViews ? 0 : await fetchArticleViewsServer(article.slug);

  return (
    <Link
      href={`/post/${article.slug}`}
      prefetch={false}
      className="group flex gap-3 border-b border-border bg-card p-4 transition-all md:rounded-xl md:border md:p-3 md:shadow-sm md:hover:shadow-md md:hover:border-primary/30"
    >
      <img
        src={article.image || "/placeholder.svg"}
        alt={article.title}
        className="h-16 w-24 flex-shrink-0 rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex flex-col justify-between flex-1 gap-1">
        <h4 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors md:text-xs">
          {article.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-muted-foreground md:text-[10px]">
          <span>{article.date}</span>
          
          {!hideViews && (
            <div className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded text-card-foreground shrink-0">
              <Eye className="w-3 h-3 text-muted-foreground" />
              <span>{formatViews(views)}</span>
            </div>
          )}
          
        </div>
      </div>
    </Link>
  )
}