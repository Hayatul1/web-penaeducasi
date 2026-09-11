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

export const runtime = "edge" // Tetap aman digunakan di Cloudflare!

export default async function Home() {
  // 1. TARIK DATA LOKAL (Instan seketika!)
  const allArticlesRaw = (await getPublishedArticles()) || []

  // 2. FILTER KATEGORI (Fungsi utuh 100%)
  const getByCategory = (cat: string) =>
    allArticlesRaw.filter(
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

  // 3. FUNGSI PAD / FALLBACK (Fungsi utuh 100%)
  const pad = (arr: any[], needed: number) => {
    if (arr.length >= needed) {
      return arr.slice(0, needed)
    }
    const extra = allArticlesRaw.filter(
      (a: any) => !arr.find((e: any) => e.id === a.id)
    )
    return [...arr, ...extra].slice(0, needed)
  }

  // 4. RENDER UI UTAMA (Tanpa menunggu API Google sama sekali)
  return (
    <div className="flex min-h-screen w-full overflow-x-clip">
      <SidebarLeft />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col w-full lg:ml-[270px]">
        <TopBar />
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-stretch gap-5 px-0 py-0 md:px-4 md:py-5">
          <main className="min-w-0 w-full flex-1" id="main-content" role="main">
            <BentoBoxGrid articles={pad(pendidikan, 5)} />
            <EditorialGrid articles={pad(kurikulum, 5)} />
            <JustifiedGrid articles={pad(materi, 5)} />
            <SquareGrid articles={pad(tutorial, 5)} />
            <AsymmetricGrid articles={pad(madrasah, 5)} />
            <NewspaperGrid articles={pad(parenting, 5)} />
            <TimelineGrid articles={pad(tips, 5)} />
            <PolaroidGrid articles={pad(berita, 5)} />
            <FeatureListGrid articles={pad(parenting, 5)} />
            <ReelGrid articles={pad(pendidikan, 5)} />
            
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