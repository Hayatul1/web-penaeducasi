import Link from "next/link"
import { notFound } from "next/navigation"

import { getPublishedArticles } from "@/lib/sample-data"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const runtime = "edge"

/* =========================================================
   TYPE
   ========================================================= */

interface Article {
  id: string | number
  title: string
  slug: string
  image?: string
  excerpt?: string
  date?: string
  author?: string
  category?: string
  tags?: string
}

/* =========================================================
   HELPER
   Mengubah nama tag menjadi slug yang konsisten
   ========================================================= */

function createTagSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/* =========================================================
   HELPER
   Mengubah slug menjadi nama tag yang lebih nyaman dibaca
   ========================================================= */

function formatTagName(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/* =========================================================
   METADATA SEO DINAMIS
   ========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const allArticles = ((await getPublishedArticles()) || []) as Article[]

  const matchingArticles = allArticles.filter((article) => {
    if (!article?.tags) return false

    return article.tags
      .split(",")
      .map((tag) => createTagSlug(tag))
      .includes(createTagSlug(slug))
  })

  const tagName = formatTagName(slug)

  if (matchingArticles.length === 0) {
    return {
      title: `Tag ${tagName} Tidak Ditemukan | Pena Edukasi`,
      description: `Tag ${tagName} belum memiliki artikel di Pena Edukasi.`,
    }
  }

  return {
    title: `${tagName} - Artikel Terbaru | Pena Edukasi`,
    description: `Kumpulan artikel terbaru dengan tag ${tagName} di Pena Edukasi.`,
    alternates: {
      canonical: `/tag/${createTagSlug(slug)}`,
    },
    openGraph: {
      title: `${tagName} - Artikel Terbaru | Pena Edukasi`,
      description: `Kumpulan artikel dengan tag ${tagName} di Pena Edukasi.`,
      type: "website",
    },
  }
}

/* =========================================================
   TAG PAGE
   ========================================================= */

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  /* =======================================================
     PARAMETER
     ======================================================= */

  const { slug } = await params

  const normalizedSlug = createTagSlug(slug)

  /* =======================================================
     AMBIL SEMUA ARTIKEL
     ======================================================= */

  const allArticles = ((await getPublishedArticles()) || []) as Article[]

  /* =======================================================
     FILTER ARTIKEL BERDASARKAN TAG
     
     Contoh:
     /tag/pendidikan
     
     akan mencari:
     article.tags = "Pendidikan, Kurikulum"
     
     dan menghasilkan artikel tersebut.
     ======================================================= */

  const filteredArticles = allArticles.filter((article) => {
    if (!article?.tags) return false

    const articleTags = article.tags
      .split(",")
      .map((tag) => createTagSlug(tag))
      .filter(Boolean)

    return articleTags.includes(normalizedSlug)
  })

  /* =======================================================
     TAG TIDAK DITEMUKAN
     ======================================================= */

  if (filteredArticles.length === 0) {
    notFound()
  }

  /* =======================================================
     NAMA TAG
     ======================================================= */

  const tagName = formatTagName(normalizedSlug)

  /* =======================================================
     JSON-LD SEO
     ======================================================= */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Artikel dengan tag ${tagName}`,
    description: `Kumpulan artikel dengan tag ${tagName} di Pena Edukasi.`,
    url: `/tag/${normalizedSlug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: filteredArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `/post/${article.slug}`,
        name: article.title,
      })),
    },
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-gray-50/50">

      {/* =====================================================
          SIDEBAR KIRI
          ===================================================== */}

      <SidebarLeft />

      {/* =====================================================
          AREA UTAMA
          ===================================================== */}

      <div
        className="
          flex
          min-h-screen
          min-w-0
          flex-1
          flex-col
          w-full
          lg:ml-[270px]
        "
      >

        {/* ===================================================
            TOP BAR
            =================================================== */}

        <TopBar />

        {/* ===================================================
            CONTENT
            =================================================== */}

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1400px]
            flex-1
            items-start
            gap-5
            px-0
            py-0
            md:px-4
            md:py-5
          "
        >

          {/* =================================================
              MAIN CONTENT
              ================================================= */}

          <main
            id="main-content"
            role="main"
            className="
              min-w-0
              w-full
              flex-1
            "
          >

            {/* =================================================
                BREADCRUMB
                ================================================= */}

            <nav
              aria-label="Breadcrumb"
              className="
                mb-5
                flex
                flex-wrap
                items-center
                gap-1.5
                px-4
                pt-4
                text-xs
                text-muted-foreground
                md:px-0
                md:pt-0
              "
            >
              <Link
                href="/"
                prefetch={false}
                className="font-medium text-primary hover:underline"
              >
                Home
              </Link>

              <span className="text-muted-foreground/50">
                »
              </span>

              <span className="font-medium text-foreground">
                Tag
              </span>

              <span className="text-muted-foreground/50">
                »
              </span>

              <span className="text-muted-foreground">
                {tagName}
              </span>
            </nav>

            {/* =================================================
                HEADER TAG
                ================================================= */}

            <header
              className="
                mb-7
                border-b
                border-border
                px-4
                pb-5
                md:px-0
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary
                    text-lg
                    font-bold
                    text-primary-foreground
                  "
                  aria-hidden="true"
                >
                  #
                </div>

                <div className="min-w-0">

                  <p
                    className="
                      mb-1
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-primary
                    "
                  >
                    TAG ARTIKEL
                  </p>

                  <h1
                    className="
                      text-2xl
                      font-extrabold
                      capitalize
                      tracking-tight
                      text-foreground
                      md:text-3xl
                      lg:text-4xl
                    "
                  >
                    {tagName}
                  </h1>

                </div>

              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-muted-foreground
                  md:text-base
                "
              >
                Menampilkan{" "}
                <strong className="font-semibold text-foreground">
                  {filteredArticles.length}
                </strong>{" "}
                artikel dengan tag{" "}
                <strong className="font-semibold text-foreground">
                  {tagName}
                </strong>
                .
              </p>
            </header>

            {/* =================================================
                ARTICLE GRID
                ================================================= */}

            <section
              aria-labelledby="tag-articles-title"
              className="px-4 md:px-0"
            >

              <h2
                id="tag-articles-title"
                className="sr-only"
              >
                Artikel dengan tag {tagName}
              </h2>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                  md:gap-6
                "
              >

                {filteredArticles.map((article) => (

                  <article
                    key={article.id}
                    className="
                      group
                      flex
                      min-w-0
                      flex-col
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-primary/20
                      hover:shadow-xl
                    "
                  >

                    {/* =========================================
                        IMAGE
                        ========================================= */}

                    <Link
                      href={`/post/${article.slug}`}
                      prefetch={false}
                      aria-label={`Baca ${article.title}`}
                      className="
                        relative
                        block
                        aspect-video
                        w-full
                        overflow-hidden
                        bg-gray-100
                      "
                    >

                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            ease-out
                            group-hover:scale-105
                          "
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            bg-gray-100
                            text-sm
                            font-semibold
                            text-gray-400
                          "
                        >
                          Pena Edukasi
                        </div>
                      )}

                      {/* TAG BADGE */}

                      <div
                        className="
                          absolute
                          left-3
                          top-3
                          rounded-full
                          bg-primary
                          px-3
                          py-1.5
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-primary-foreground
                          shadow-sm
                        "
                      >
                        {tagName}
                      </div>

                    </Link>

                    {/* =========================================
                        CARD CONTENT
                        ========================================= */}

                    <div
                      className="
                        flex
                        flex-1
                        flex-col
                        p-5
                        md:p-6
                      "
                    >

                      {/* CATEGORY */}

                      {article.category && (
                        <Link
                          href={`/category/${createTagSlug(
                            article.category
                          )}`}
                          prefetch={false}
                          className="
                            mb-2
                            w-fit
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-primary
                            hover:underline
                          "
                        >
                          {article.category}
                        </Link>
                      )}

                      {/* TITLE */}

                      <h3
                        className="
                          mb-3
                          line-clamp-2
                          text-lg
                          font-bold
                          leading-snug
                          text-gray-900
                          transition-colors
                          group-hover:text-primary
                          md:text-xl
                        "
                      >
                        <Link
                          href={`/post/${article.slug}`}
                          prefetch={false}
                        >
                          {article.title}
                        </Link>
                      </h3>

                      {/* EXCERPT */}

                      {article.excerpt && (
                        <p
                          className="
                            mb-5
                            line-clamp-3
                            flex-1
                            text-sm
                            leading-relaxed
                            text-gray-600
                          "
                        >
                          {article.excerpt}
                        </p>
                      )}

                      {/* META */}

                      <div
                        className="
                          mt-auto
                          flex
                          items-center
                          justify-between
                          gap-3
                          border-t
                          border-gray-100
                          pt-4
                        "
                      >

                        <time
                          className="
                            text-xs
                            font-medium
                            text-gray-500
                          "
                        >
                          {article.date}
                        </time>

                        <Link
                          href={`/post/${article.slug}`}
                          prefetch={false}
                          className="
                            flex
                            items-center
                            gap-1
                            text-sm
                            font-semibold
                            text-primary
                            transition-colors
                            hover:text-primary/80
                          "
                        >
                          Baca
                          <span
                            className="
                              transition-transform
                              duration-200
                              group-hover:translate-x-1
                            "
                          >
                            →
                          </span>
                        </Link>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            </section>

          </main>

          {/* =================================================
              SIDEBAR KANAN
              ================================================= */}

          <SidebarRight />

        </div>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <Footer />

      </div>

      {/* =====================================================
          SCROLL TO TOP
          ===================================================== */}

      <ScrollToTop />

      {/* =====================================================
          JSON-LD
          ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

    </div>
  )
}