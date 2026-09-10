import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://web.penaeducasi.com';

  // 1. HALAMAN STATIS
  // Halaman yang jarang berubah atau memiliki URL tetap
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 2. HALAMAN DINAMIS (Contoh: Artikel/Blog)
  // Ganti blok ini dengan logika fetch ke API atau database Anda
  // const response = await fetch('https://api.penaeducasi.com/articles');
  // const articles = await response.json();
  
  // Simulasi data yang didapat dari database:
  const articles = [
    { slug: 'belajar-seo-dasar', updatedAt: '2026-09-01T10:00:00Z' },
    { slug: 'tutorial-nextjs-cloudflare', updatedAt: '2026-09-10T14:30:00Z' }
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    // Menggunakan tanggal aktual dari database agar Google merayapi ulang dengan tepat
    lastModified: new Date(article.updatedAt), 
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. GABUNGKAN KEDUANYA
  return [...staticRoutes, ...dynamicRoutes];
}