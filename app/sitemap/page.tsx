export const runtime = "edge"

import type { Metadata } from "next"
import Link from "next/link"
import { SidebarLeft } from "@/components/sidebar-left"
import { TopBar } from "@/components/top-bar"
import { SidebarRight } from "@/components/sidebar-right"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import TagsClient from "./tags-client" 

export const metadata: Metadata = {
  title: "Peta Situs (Sitemap) | Pena Edukasi",
  description: "Jelajahi seluruh struktur halaman, kategori, tag, dan artikel terbaru di Pena Edukasi berdasarkan kategorinya masing-masing.",
  alternates: {
    canonical: "https://web.penaeducasi.com/sitemap",
  },
}

export default async function HTMLSitemapPage() {
  // =========================================================================
  // 1. FETCH DATA DARI API CLOUDFLARE WORKERS
  // =========================================================================
  let allPosts: any[] = []
  
  try {
    const response = await fetch('https://penaeducasi-studio-api.penaeducasi.workers.dev/api/articles?status=published', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    })
    
    if (response.ok) {
      const json = await response.json()
      allPosts = json.data || []
    }
  } catch (error) {
    console.error("Gagal mengambil data untuk sitemap HTML:", error)
  }

  // =========================================================================
  // 2. MENGOLAH DATA KATEGORI & ARTIKEL (Sudah Real 100%)
  // =========================================================================
  const uniqueCategoryNames = Array.from(
    new Set(allPosts.map((post: any) => post.category).filter(Boolean))
  ) as string[]

  const categoriesWithPosts = uniqueCategoryNames.map(cat => {
    const categorySlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const categoryPosts = allPosts
      .filter((post: any) => post.category === cat)
      .map((post: any) => {
        const dateObj = new Date(post.created_at || Date.now())
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
          day: '2-digit', month: 'short', year: 'numeric'
        })
        return { title: post.title, slug: post.slug, date: formattedDate }
      })

    return { title: cat, slug: categorySlug, posts: categoryPosts }
  })

  // =========================================================================
  // 3. LOGIKA PINTAR TAGS (Dari referensi tags-sitemap.xml Anda)
  // =========================================================================
  const allTags = new Set<string>()
  allPosts.forEach((post: any) => {
    if (post.tags) {
      // Memecah "Guru, Pendidikan" menjadi array dan menghapus spasi berlebih
      const tagArray = post.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      tagArray.forEach((t: string) => allTags.add(t))
    }
  })
  
  const uniqueTags = Array.from(allTags)
  
  // Format menjadi array of objects agar bisa dibaca oleh TagsClient
  const tags = uniqueTags.map(tag => ({
    title: tag,
    slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }))

  // =========================================================================
  // 4. DATA HALAMAN STATIS MANUAL
  // =========================================================================
  const staticPages = [
    { title: "Beranda", url: "/" },
    { title: "Tentang Kami", url: "/about" },
    { title: "Kontak", url: "/kontak" },
    { title: "Disclaimer", url: "/disclaimer" },
    { title: "Kebijakan Privasi", url: "/privacy-policy" },
  ]

  return (
    <div className="flex min-h-screen w-full overflow-x-clip">
      <SidebarLeft />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col w-full lg:ml-[270px]">
        <TopBar />

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-stretch gap-5 px-0 py-0 md:px-4 md:py-5">
          <main className="min-w-0 w-full flex-1" id="main-content">
            <article>
              <nav className="mb-5 flex flex-wrap items-center gap-1.5 px-4 pt-3 text-xs text-muted-foreground md:px-0 md:pt-0">
                <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
                <span className="text-muted-foreground/50">»</span>
                <span className="font-medium text-foreground">Sitemap</span>
              </nav>

              <div className="mb-8 px-4 md:px-0">
                <h1 className="font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl lg:text-4xl">
                  Peta Situs (Sitemap)
                </h1>
                <p className="mt-3 text-base text-muted-foreground">
                  Daftar lengkap seluruh halaman, kategori, tag, dan artikel yang tersedia di Pena Edukasi.
                </p>
              </div>

              <div className="px-4 pb-10 md:px-0 flex flex-col gap-8">
                
                {/* BAGIAN ATAS: HALAMAN STATIS & TAGS CLIENT COMPONENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      Halaman Utama
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {staticPages.map((page, index) => (
                        <li key={index}>
                          <Link href={page.url} className="text-muted-foreground hover:text-primary hover:underline transition-colors">
                            {page.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Komponen Tags dipanggil di sini dan dikirimkan data tags yang 100% Real */}
                  <TagsClient tags={tags} />
                </div>

                {/* BAGIAN BAWAH: ARTIKEL BERDASARKAN KATEGORI */}
                <div className="mt-2">
                  <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    Daftar Artikel per Kategori
                  </h2>
                  
                  <div className="flex flex-col gap-6">
                    {categoriesWithPosts.map((category: any, catIndex: number) => (
                      <div key={catIndex} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        
                        <div className="mb-4 border-b border-border pb-3 flex items-center justify-between">
                          <h3 className="text-lg font-bold text-foreground">
                            {category.title}
                          </h3>
                          <Link href={`/category/${category.slug}`} className="text-xs font-medium text-primary hover:underline">
                            Lihat Semua ({category.posts.length}) &rarr;
                          </Link>
                        </div>

                        <ul className="flex flex-col divide-y divide-border/50">
                          {category.posts.length > 0 ? (
                            category.posts.map((post: any, postIndex: number) => (
                              <li key={postIndex} className="py-3 first:pt-0 last:pb-0">
                                <Link href={`/post/${post.slug}`} className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {post.title}
                                  </span>
                                  {post.date && (
                                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                                      {post.date}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="py-3 text-sm text-muted-foreground italic">
                              Belum ada artikel di kategori ini.
                            </li>
                          )}
                        </ul>
                        
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </article>
          </main>

          <SidebarRight />
        </div>

        <Footer />
      </div>

      <ScrollToTop />
    </div>
  )
}