import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://web.penaeducasi.com';

  try {
    const response = await fetch('https://penaeducasi-studio-api.penaeducasi.workers.dev/api/articles?status=published', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    const json = await response.json();
    const articles = json.data || [];

    const uniqueCategories = Array.from(
      new Set(articles.map((post: any) => post.category).filter(Boolean))
    ) as string[];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    uniqueCategories.forEach((cat) => {
      const categorySlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      xml += `  <url>\n    <loc>${baseUrl}/category/${categorySlug}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
  } catch (error) {
    return new NextResponse('Error generating categories sitemap', { status: 500 });
  }
}