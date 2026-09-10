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
    // 2. RUTE DINAMIS (Menarik Artikel dari Cloudflare Worker)
    // URL ditambahkan parameter ?status=published agar draf tidak masuk ke Google
    const postsResponse = await fetch('https://penaeducasi-studio-api.penaeducasi.workers.dev/api/articles?status=published', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      // Cache selama 1 jam agar tidak menghabiskan kuota Worker Anda
      next: { revalidate: 3600 } 
    });

    if (postsResponse.ok) {
      const responseJson = await postsResponse.json();
      
      // Berdasarkan kode Worker Anda, array artikel berada di dalam properti "data"
      const articles = responseJson.data || [];

      const postRoutes: MetadataRoute.Sitemap = articles.map((post: any) => ({
        url: `${baseUrl}/post/${post.slug}`,
        // Menggunakan created_at dari database Worker sebagai acuan tanggal
        lastModified: new Date(post.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

      // Gabungkan rute artikel ke sitemap utama
      routes.push(...postRoutes);
    }
  } catch (error) {
    console.error("Gagal mengambil data artikel untuk sitemap:", error);
    // Jika API sedang down, sitemap tidak akan error 500, melainkan tetap menampilkan rute statis
  }

  return routes;
}