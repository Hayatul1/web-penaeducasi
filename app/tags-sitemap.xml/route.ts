import { NextResponse } from 'next/server';

export const runtime = 'edge';

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

    // Logika Pintar untuk Memisahkan Tag yang Digabung dengan Koma
    const allTags = new Set<string>();
    articles.forEach((post: any) => {
      if (post.tags) {
        // Memecah "Guru, Pendidikan" menjadi array dan menghapus spasi berlebih
        const tagArray = post.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
        tagArray.forEach((t: string) => allTags.add(t));
      }
    });
    
    const uniqueTags = Array.from(allTags);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    uniqueTags.forEach((tag) => {
      const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      xml += `  <url>\n    <loc>${baseUrl}/tag/${tagSlug}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
  } catch (error) {
    return new NextResponse('Error generating tags sitemap', { status: 500 });
  }
}