export const runtime = 'edge';
import Link from "next/link"
import { SidebarLeft } from "@/components/sidebar-left"
import { TopBar } from "@/components/top-bar"
import { SidebarRight } from "@/components/sidebar-right"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { getArticleBySlug, getRelatedArticles } from "@/lib/sample-data" // [UBAH 1] Menggunakan fungsi async

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // [UBAH 2] Menggunakan await untuk memanggil data API secara dinamis
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    return <div className="flex min-h-screen w-full items-center justify-center font-bold">Artikel tidak ditemukan.</div>
  }

  // [UBAH 3] Tambahkan await agar fungsi .map() di bawah tidak error
  const related = await getRelatedArticles(article.id, 3)

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <SidebarLeft />

      <div className="flex min-h-screen flex-1 flex-col lg:ml-[270px] w-full min-w-0">
        <TopBar />

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-5 px-0 md:px-4 py-0 md:py-5">
          <main className="min-w-0 flex-1 w-full" id="main-content" role="main">
            <article itemScope itemType="https://schema.org/BlogPosting">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground px-4 md:px-0 pt-3 md:pt-0">
                <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
                <span className="text-muted-foreground/50">{'\u00BB'}</span>
                <Link href={`/category/${article.category.toLowerCase()}`} className="font-medium text-primary hover:underline">
                  {article.category}
                </Link>
              </nav>

              {/* Title */}
              <h1
                className="mb-5 font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl lg:text-4xl text-balance px-4 md:px-0"
                itemProp="headline"
              >
                {article.title}
              </h1>

              {/* Meta */}
              <div className="mb-6 flex items-center gap-4 border-b border-border pb-5 px-4 md:px-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  PE
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground" itemProp="author">
                    {article.author}
                  </span>
                  <time className="text-xs text-muted-foreground" dateTime="2026-02-06" itemProp="datePublished">
                    {article.date}
                  </time>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-8 overflow-hidden rounded-none md:rounded-2xl">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="aspect-video w-full object-cover"
                  fetchPriority="high"
                />
              </div>

              {/* Post Body - [UBAH 4] Menampilkan format HTML langsung dari CMS Studio Pena Edukasi */}
              <div 
                className="prose prose-lg max-w-none px-4 md:px-0 text-base leading-relaxed text-foreground" 
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />

              {/* Tags */}
              <div className="mt-8 border-t border-border pt-5 px-4 md:px-0">
                <span className="text-xs font-semibold text-muted-foreground">Tags:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Pendidikan", "Strategi Belajar", "Guru", "Kurikulum"].map((tag) => (
                    <Link
                      key={tag}
                      href={`/category/${tag.toLowerCase()}`}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* Related Articles */}
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="relative mb-6 pl-4 text-lg font-bold text-foreground before:absolute before:left-0 before:top-1/2 before:h-full before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary px-4 md:px-0 ml-0">
                Artikel Terkait
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 px-4 md:px-0">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/post/${rel.slug}`}
                    className="group overflow-hidden rounded-none md:rounded-xl border-b md:border border-border bg-card shadow-none md:shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 pb-4 md:pb-0"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.image || "/placeholder.svg"}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 md:p-4">
                      <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {rel.title}
                      </h3>
                      <span className="mt-2 block text-xs text-muted-foreground">{rel.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <SidebarRight />
        </div>

        <Footer />
      </div>

      <ScrollToTop />
    </div>
  )
}