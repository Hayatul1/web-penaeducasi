import { SidebarLeft } from "@/components/sidebar-left"
import { TopBar } from "@/components/top-bar"
import { SidebarRight } from "@/components/sidebar-right"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

import {
  BentoBoxGrid,
  EditorialGrid,
  JustifiedGrid,
  SquareGrid,
  AsymmetricGrid,
  NewspaperGrid,
  TimelineGrid,
  PolaroidGrid,
  FeatureListGrid,
  ReelGrid,
} from "@/components/home-grids"

import { LatestArticles } from "@/components/latest-articles"
import { getPublishedArticles } from "@/lib/sample-data"
import { getPageViews } from "@/lib/google-analytics"

export const runtime = "edge" // Tetap aman digunakan di Cloudflare!

export default async function Home() {
  // =============================================================
  // 1. AMBIL DATA ARTIKEL MENTAH
  // =============================================================
  const allArticlesRaw = (await getPublishedArticles()) || []

  const baseArticles = allArticlesRaw.map((article: any) => ({
    ...article,
    views: article.views ?? 0,
  }))

  // =============================================================
  // 2. FILTER KATEGORI (Fungsi asli dipertahankan 100%)
  // =============================================================
  const getByCategory = (cat: string) =>
    baseArticles.filter(
      (a: any) =>
        a?.category?.toLowerCase() === cat.toLowerCase()
    )

  const pendidikan = getByCategory("Pendidikan")
  const kurikulum = getByCategory("Kurikulum")
  const materi = getByCategory("Materi")
  const tutorial = getByCategory("Tutorial")
  const madrasah = getByCategory("Madrasah")
  const parenting = getByCategory("Parenting")
  const tips = getByCategory("Tips")
  const berita = getByCategory("Berita")

  // =============================================================
  // 3. PAD / FALLBACK (Fungsi asli dipertahankan 100%)
  // =============================================================
  const pad = (arr: any[], needed: number) => {
    if (arr.length >= needed) {
      return arr.slice(0, needed)
    }

    const extra = baseArticles.filter(
      (a: any) =>
        !arr.find((e: any) => e.id === a.id)
    )

    return [...arr, ...extra].slice(0, needed)
  }

  // =============================================================
  // 4. OPTIMASI GA4: HANYA TARIK VIEW UNTUK ARTIKEL YANG TAMPIL SAJA
  // =============================================================
  const activeArticlesList = [
    ...pad(pendidikan, 5),
    ...pad(kurikulum, 5),
    ...pad(materi, 5),
    ...pad(tutorial, 5),
    ...pad(madrasah, 5),
    ...pad(parenting, 5),
    ...pad(tips, 5),
    ...pad(berita, 5),
  ]

  // Ambil slug unik agar tidak ada request ganda ke GA4 untuk artikel yang sama
  const uniqueSlugs = Array.from(new Set(activeArticlesList.map((a: any) => a.slug)))

  // Tarik data view secara paralel HANYA untuk artikel di beranda
  const viewsMap: Record<string, number> = {}
  await Promise.all(
    uniqueSlugs.map(async (slug) => {
      viewsMap[slug] = await getPageViews(`/post/${slug}`)
    })
  )

  // Fungsi penyuntik view ke grid
  const attachViews = (articles: any[]) =>
    articles.map((article) => ({
      ...article,
      views: viewsMap[article.slug] ?? 0,
    }))

  return (
    <div
      className="
        flex
        min-h-screen
        w-full
        overflow-x-clip
      "
    >
      <SidebarLeft />

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
        <TopBar />

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
          <main
            className="
              min-w-0
              w-full
              flex-1
            "
            id="main-content"
            role="main"
          >
            <BentoBoxGrid articles={attachViews(pad(pendidikan, 5))} />
            <EditorialGrid articles={attachViews(pad(kurikulum, 5))} />
            <JustifiedGrid articles={attachViews(pad(materi, 5))} />
            <SquareGrid articles={attachViews(pad(tutorial, 5))} />
            <AsymmetricGrid articles={attachViews(pad(madrasah, 5))} />
            <NewspaperGrid articles={attachViews(pad(parenting, 5))} />
            <TimelineGrid articles={attachViews(pad(tips, 5))} />
            <PolaroidGrid articles={attachViews(pad(berita, 5))} />
            <FeatureListGrid articles={attachViews(pad(parenting, 5))} />
            <ReelGrid articles={attachViews(pad(pendidikan, 5))} />

            <LatestArticles />
          </main>

          <SidebarRight />
        </div>

        <Footer />
      </div>

      <ScrollToTop />
    </div>
  )
}