export const runtime = "edge"

import Link from "next/link"
import { SidebarLeft } from "@/components/sidebar-left"
import { TopBar } from "@/components/top-bar"
import { SidebarRight } from "@/components/sidebar-right"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/sample-data"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // =============================================================
  // ARTICLE
  // =============================================================
  const { slug } = await params

  const article = await getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center font-bold">
        Artikel tidak ditemukan.
      </div>
    )
  }

  // =============================================================
  // RELATED ARTICLES
  // =============================================================
  const related = await getRelatedArticles(article.id, 3)

  return (
    <div
      className="
        flex
        min-h-screen
        w-full
        overflow-x-clip
      "
    >
      {/* =========================================================
          SIDEBAR LEFT
          ========================================================= */}
      <SidebarLeft />

      {/* =========================================================
          AREA UTAMA
          ========================================================= */}
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
        {/* =======================================================
            TOP BAR STICKY
            ======================================================= */}
        <TopBar />

        {/* =======================================================
            CONTENT + RIGHT SIDEBAR
            ======================================================= */}
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1400px]
            flex-1
            items-stretch
            gap-5
            px-0
            py-0
            md:px-4
            md:py-5
          "
        >
          {/* =====================================================
              MAIN ARTICLE
              ===================================================== */}
          <main
            className="
              min-w-0
              w-full
              flex-1
            "
            id="main-content"
            role="main"
          >
            <article
              itemScope
              itemType="https://schema.org/BlogPosting"
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
                  pt-3
                  text-xs
                  text-muted-foreground
                  md:px-0
                  md:pt-0
                "
              >
                <Link
                  href="/"
                  className="font-medium text-primary hover:underline"
                >
                  Home
                </Link>

                <span className="text-muted-foreground/50">
                  {"»"}
                </span>

                <Link
                  href={`/category/${article.category.toLowerCase()}`}
                  className="font-medium text-primary hover:underline"
                >
                  {article.category}
                </Link>
              </nav>

              {/* =================================================
                  TITLE
                  ================================================= */}
              <h1
                className="
                  mb-5
                  px-4
                  font-serif
                  text-2xl
                  font-bold
                  leading-tight
                  text-foreground
                  text-balance
                  md:px-0
                  md:text-3xl
                  lg:text-4xl
                "
                itemProp="headline"
              >
                {article.title}
              </h1>

              {/* =================================================
                  META
                  ================================================= */}
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-4
                  border-b
                  border-border
                  px-4
                  pb-5
                  md:px-0
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-sm
                    font-bold
                    text-primary-foreground
                  "
                >
                  PE
                </div>

                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-sm font-semibold text-foreground"
                    itemProp="author"
                  >
                    {article.author}
                  </span>

                  <time
                    className="text-xs text-muted-foreground"
                    dateTime="2026-02-06"
                    itemProp="datePublished"
                  >
                    {article.date}
                  </time>
                </div>
              </div>

              {/* =================================================
                  FEATURED IMAGE
                  ================================================= */}
              <div className="mb-8 overflow-hidden rounded-none md:rounded-2xl">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="aspect-video w-full object-cover"
                  fetchPriority="high"
                />
              </div>

              {/* =================================================
                  ARTICLE BODY
                  ================================================= */}
              <div
                className="
                  prose
                  prose-lg
                  max-w-none
                  px-4
                  text-base
                  leading-relaxed
                  text-foreground
                  md:px-0
                "
                itemProp="articleBody"
                dangerouslySetInnerHTML={{
                  __html: article.content || "",
                }}
              />

              {/* =================================================
                  TAGS
                  ================================================= */}
              <div
                className="
                  mt-8
                  border-t
                  border-border
                  px-4
                  pt-5
                  md:px-0
                "
              >
                <span className="text-xs font-semibold text-muted-foreground">
                  Tags:
                </span>

                <div className="mt-2 flex flex-wrap gap-2">
                  {article.tags ? (
                    article.tags
                      .split(",")
                      .map(
                        (
                          tag: string,
                          index: number
                        ) => {
                          const cleanTag = tag.trim()

                          const slugTag = cleanTag
                            .toLowerCase()
                            .replace(/\s+/g, "-")

                          return (
                            <Link
                              key={index}
                              href={`/tag/${slugTag}`}
                              className="
                                rounded-full
                                bg-secondary
                                px-3 py-1.5
                                text-xs
                                font-medium
                                text-secondary-foreground
                              "
                            >
                              {cleanTag}
                            </Link>
                          )
                        }
                      )
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Tidak ada tag
                    </span>
                  )}
                </div>
              </div>
            </article>

            {/* ===================================================
                RELATED ARTICLES
                =================================================== */}
            <section
              className="
                mt-12
                border-t
                border-border
                pt-8
              "
            >
              <h2
                className="
                  relative
                  mb-6
                  ml-0
                  pl-4
                  px-4
                  text-lg
                  font-bold
                  text-foreground
                  before:absolute
                  before:left-0
                  before:top-1/2
                  before:h-full
                  before:w-1
                  before:-translate-y-1/2
                  before:rounded-full
                  before:bg-primary
                  md:px-0
                "
              >
                Artikel Terkait
              </h2>

              <div
                className="
                  grid
                  gap-4
                  px-4
                  sm:grid-cols-2
                  md:grid-cols-3
                  md:px-0
                "
              >
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/post/${rel.slug}`}
                    className="
                      group
                      overflow-hidden
                      rounded-none
                      border-b
                      border-border
                      bg-card
                      pb-4
                      shadow-none
                      transition-all
                      hover:-translate-y-1
                      hover:border-primary/30
                      hover:shadow-lg
                      md:rounded-xl
                      md:border
                      md:pb-0
                      md:shadow-sm
                    "
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.image || "/placeholder.svg"}
                        alt={rel.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4">
                      <h3
                        className="
                          line-clamp-2
                          text-sm
                          font-semibold
                          text-card-foreground
                          transition-colors
                          group-hover:text-primary
                        "
                      >
                        {rel.title}
                      </h3>

                      <span className="mt-2 block text-xs text-muted-foreground">
                        {rel.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          {/* =====================================================
              RIGHT SIDEBAR STICKY
              ===================================================== */}
          <SidebarRight />
        </div>

        {/* =======================================================
            FOOTER
            ======================================================= */}
        <Footer />
      </div>

      {/* =========================================================
          SCROLL TO TOP
          ========================================================= */}
      <ScrollToTop />
    </div>
  )
}