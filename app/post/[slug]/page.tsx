export const runtime = 'edge';
import Link from "next/link"
import { SidebarLeft } from "@/components/sidebar-left"
import { TopBar } from "@/components/top-bar"
import { SidebarRight } from "@/components/sidebar-right"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { allArticles, getRelatedArticles } from "@/lib/sample-data"

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = allArticles.find((a) => a.slug === slug) ?? allArticles[0]
  const related = getRelatedArticles(article.id, 3)

  return (
    <div className="flex min-h-screen">
      <SidebarLeft />

      <div className="flex min-h-screen flex-1 flex-col lg:ml-[270px]">
        <TopBar />

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-5 px-4 py-5">
          <main className="min-w-0 flex-1" id="main-content" role="main">
            <article itemScope itemType="https://schema.org/BlogPosting">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
                <span className="text-muted-foreground/50">{'\u00BB'}</span>
                <Link href={`/category/${article.category.toLowerCase()}`} className="font-medium text-primary hover:underline">
                  {article.category}
                </Link>
              </nav>

              {/* Title */}
              <h1
                className="mb-5 font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl lg:text-4xl text-balance"
                itemProp="headline"
              >
                {article.title}
              </h1>

              {/* Meta */}
              <div className="mb-6 flex items-center gap-4 border-b border-border pb-5">
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
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="aspect-video w-full object-cover"
                  fetchPriority="high"
                />
              </div>

              {/* Post Body */}
              <div className="prose prose-lg max-w-none" itemProp="articleBody">
                <p className="text-base leading-relaxed text-foreground">
                  Pendidikan merupakan fondasi utama dalam membangun peradaban yang maju. Dalam konteks Indonesia, pendidikan menjadi kunci untuk mewujudkan cita-cita bangsa yang tertuang dalam Pembukaan UUD 1945, yaitu mencerdaskan kehidupan bangsa. Oleh karena itu, setiap upaya untuk meningkatkan kualitas pendidikan perlu mendapat dukungan penuh dari seluruh elemen masyarakat.
                </p>

                <h2 className="mb-4 mt-8 text-xl font-bold text-foreground md:text-2xl">
                  Pentingnya Pendidikan Berkualitas
                </h2>
                <p className="text-base leading-relaxed text-foreground">
                  Pendidikan berkualitas tidak hanya tentang transfer pengetahuan, tetapi juga tentang pembentukan karakter, pengembangan keterampilan berpikir kritis, dan penanaman nilai-nilai moral. Guru sebagai ujung tombak pendidikan memiliki peran strategis dalam mewujudkan hal ini.
                </p>

                <h3 className="mb-3 mt-6 text-lg font-bold text-foreground">
                  Strategi Implementasi
                </h3>
                <p className="text-base leading-relaxed text-foreground">
                  Beberapa strategi yang dapat diterapkan untuk meningkatkan kualitas pendidikan antara lain:
                </p>

                <ul className="my-4 list-disc space-y-2 pl-6 text-base text-foreground">
                  <li>Penerapan metode pembelajaran aktif dan kolaboratif</li>
                  <li>Integrasi teknologi dalam proses belajar mengajar</li>
                  <li>Pengembangan kurikulum yang relevan dengan kebutuhan zaman</li>
                  <li>Peningkatan kompetensi guru melalui pelatihan berkelanjutan</li>
                  <li>Pelibatan orang tua dan masyarakat dalam proses pendidikan</li>
                </ul>

                <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-secondary/50 p-5 text-base italic text-foreground">
                  {'"Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia." - Nelson Mandela'}
                </blockquote>

                <p className="text-base leading-relaxed text-foreground">
                  Dengan menerapkan strategi-strategi di atas secara konsisten, kita dapat membangun generasi yang tidak hanya cerdas secara intelektual, tetapi juga memiliki karakter yang kuat dan berakhlak mulia. Ini adalah investasi terbaik untuk masa depan bangsa dan negara kita.
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 border-t border-border pt-5">
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
              <h2 className="relative mb-6 pl-4 text-lg font-bold text-foreground before:absolute before:left-0 before:top-1/2 before:h-full before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary">
                Artikel Terkait
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/post/${rel.slug}`}
                    className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.image || "/placeholder.svg"}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
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
