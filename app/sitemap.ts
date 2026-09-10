import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://web.penaeducasi.com';

  // 1. RUTE STATIS (Beranda & Halaman Tetap)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/p/kontak`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/p/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];

  try {
    // Tarik Data Artikel dari Cloudflare Worker
    const postsResponse = await fetch('https://penaeducasi-studio-api.penaeducasi.workers.dev/api/articles?status=published', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } 
    });

    if (postsResponse.ok) {
      const responseJson = await postsResponse.json();
      const articles = responseJson.data || [];

      // 2. RUTE ARTIKEL DINAMIS (/post/)
      const postRoutes: MetadataRoute.Sitemap = articles.map((post: any) => ({
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: new Date(post.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
      routes.push(...postRoutes);

      // 3. RUTE KATEGORI OTOMATIS (/category/)
      // Mengambil daftar kategori unik secara otomatis dari database artikel Anda
      const uniqueCategories = Array.from(
        new Set(articles.map((post: any) => post.category).filter(Boolean))
      ) as string[];

      const categoryRoutes: MetadataRoute.Sitemap = uniqueCategories.map((cat) => {
        // Mengubah nama kategori menjadi format URL-friendly (slug)
        const categorySlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return {
          url: `${baseUrl}/category/${categorySlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8, // Prioritas lebih tinggi dari artikel biasa karena berupa halaman arsip/pilar
        };
      });
      routes.push(...categoryRoutes);
    }
  } catch (error) {
    console.error("Gagal mengambil data untuk sitemap:", error);
  }

  return routes;
}