import { NextResponse } from 'next/server';
export const runtime = 'edge';
export async function GET() {
  const baseUrl = 'https://web.penaeducasi.com';
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/p/kontak</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/p/tentang-kami</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}