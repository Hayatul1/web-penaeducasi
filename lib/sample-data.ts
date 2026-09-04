export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  image: string
  slug: string
  content?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_STUDIO_API_URL || "https://studio.penaeducasi.com/api/articles";

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "1 Feb 2026";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch (e) {
    return "1 Feb 2026";
  }
}

// ---------------------------------------------------------------------------
// DATA ASLI BAWAAN TEMPLATE (DIPERTAHANKAN 100%)
// ---------------------------------------------------------------------------
const images = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1471970394675-613138e45da3?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=600&h=400&fit=crop",
]

const categories = ["Pendidikan", "Kurikulum", "Materi", "Tutorial", "Madrasah", "Parenting", "Tips", "Berita"]

const titles = [
  "Strategi Pembelajaran Efektif untuk Generasi Digital",
  "Panduan Lengkap Kurikulum Merdeka Belajar 2026",
  "10 Metode Mengajar yang Terbukti Meningkatkan Pemahaman Siswa",
  "Teknologi AI dalam Dunia Pendidikan Modern",
  "Tips Mendampingi Anak Belajar di Era Digital",
  "Materi Matematika Kelas 6: Pecahan dan Desimal",
  "Tutorial Membuat Media Pembelajaran Interaktif",
  "Peran Orang Tua dalam Pendidikan Karakter Anak",
  "Inovasi Pendidikan Madrasah di Indonesia",
  "Kurikulum Berbasis Kompetensi: Apa yang Perlu Diketahui",
  "Cara Efektif Mengatasi Kesulitan Belajar Anak",
  "Membangun Kebiasaan Membaca Sejak Dini",
  "5 Aplikasi Edukasi Terbaik untuk Anak Sekolah Dasar",
  "Pendidikan Inklusif: Membuka Akses untuk Semua",
  "Evaluasi Pembelajaran: Teknik Asesmen yang Efektif",
  "Mengenal Gaya Belajar Anak: Visual, Auditori, dan Kinestetik",
  "Tutorial Lengkap Google Classroom untuk Guru",
  "Dampak Positif Bermain untuk Perkembangan Anak",
  "Strategi Pengelolaan Kelas yang Efektif",
  "Pendidikan STEM: Mempersiapkan Generasi Masa Depan",
]

export function generateArticles(count: number): Article[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `article-${i + 1}`,
    title: titles[i % titles.length],
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: categories[i % categories.length],
    author: "Pena Edukasi",
    date: `${(i % 28) + 1} Feb 2026`,
    image: images[i % images.length],
    slug: `article-${i + 1}`,
    // ISI KONTEN LENGKAP UNTUK ARTIKEL BAWAAN:
    content: `
      <p class="text-base leading-relaxed text-foreground">
        Pendidikan merupakan fondasi utama dalam membangun peradaban yang maju. Dalam konteks Indonesia, pendidikan menjadi kunci untuk mewujudkan cita-cita bangsa yang tertuang dalam Pembukaan UUD 1945, yaitu mencerdaskan kehidupan bangsa. Oleh karena itu, setiap upaya untuk meningkatkan kualitas pendidikan perlu mendapat dukungan penuh dari seluruh elemen masyarakat.
      </p>
      <h2 class="mb-4 mt-8 text-xl font-bold text-foreground md:text-2xl">
        Pentingnya Pendidikan Berkualitas
      </h2>
      <p class="text-base leading-relaxed text-foreground">
        Pendidikan berkualitas tidak hanya tentang transfer pengetahuan, tetapi juga tentang pembentukan karakter, pengembangan keterampilan berpikir kritis, dan penanaman nilai-nilai moral. Guru sebagai ujung tombak pendidikan memiliki peran strategis dalam mewujudkan hal ini.
      </p>
      <h3 class="mb-3 mt-6 text-lg font-bold text-foreground">
        Strategi Implementasi
      </h3>
      <p class="text-base leading-relaxed text-foreground">
        Beberapa strategi yang dapat diterapkan untuk meningkatkan kualitas pendidikan antara lain:
      </p>
      <ul class="my-4 list-disc space-y-2 pl-6 text-base text-foreground">
        <li>Penerapan metode pembelajaran aktif dan kolaboratif</li>
        <li>Integrasi teknologi dalam proses belajar mengajar</li>
        <li>Pengembangan kurikulum yang relevan dengan kebutuhan zaman</li>
        <li>Peningkatan kompetensi guru melalui pelatihan berkelanjutan</li>
        <li>Pelibatan orang tua dan masyarakat dalam proses pendidikan</li>
      </ul>
      <blockquote class="my-6 rounded-r-xl border-l-4 border-primary bg-secondary/50 p-5 text-base italic text-foreground">
        "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia." - Nelson Mandela
      </blockquote>
      <p class="text-base leading-relaxed text-foreground">
        Dengan menerapkan strategi-strategi di atas secara konsisten, kita dapat membangun generasi yang tidak hanya cerdas secara intelektual, tetapi juga memiliki karakter yang kuat dan berakhlak mulia. Ini adalah investasi terbaik untuk masa depan bangsa dan negara kita.
      </p>
    `
  }))
}

export const allArticles = generateArticles(20)

// ---------------------------------------------------------------------------
// FUNGSI PENGAMBILAN DATA DARI STUDIO (API)
// ---------------------------------------------------------------------------

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}?status=published`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error("API Gagal");
    
    const responseData = await res.json();
    const studioData = responseData.data || [];

    const apiArticles: Article[] = studioData.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      excerpt: item.excerpt || "Baca selengkapnya mengenai artikel ini di Pena Edukasi.",
      category: item.category || "Pendidikan",
      author: item.author || "Pena Edukasi",
      date: formatDate(item.created_at),
      image: item.image_url && item.image_url.trim() !== "" ? item.image_url : images[0],
      slug: item.slug,
      tags: item.tags || "" // <-- TAMBAHKAN BARIS INI
    }));

    // Gabungkan artikel Studio dengan artikel statis bawaan
    const apiSlugs = new Set(apiArticles.map(a => a.slug));
    return [...apiArticles, ...allArticles.filter(a => !apiSlugs.has(a.slug))];
  } catch (error) {
    return allArticles;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/${slug}`, { next: { revalidate: 30 } });
    if (res.ok) {
      const responseData = await res.json();
      const item = responseData.data;
      if (item) {
        return {
          id: String(item.id),
          title: item.title,
          excerpt: item.excerpt || "",
          category: item.category || "Pendidikan",
          author: item.author || "Pena Edukasi",
          date: formatDate(item.created_at),
          image: item.image_url && item.image_url.trim() !== "" ? item.image_url : images[0],
          slug: item.slug,
          content: item.content
        };
      }
    }
  } catch (error) {}
  
  return allArticles.find((a) => a.slug === slug) || null;
}

export async function getArticlesByCategory(category: string, limit = 5): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.category.toLowerCase() === category.toLowerCase()).slice(0, limit);
}

// PARAMETER DIKEMBALIKAN KE currentId AGAR COCOK DENGAN TEMPLATE
export async function getRelatedArticles(currentId: string, limit = 3): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.id !== currentId).slice(0, limit);
}