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
} from "@/components/home-grids"
import { LatestArticles } from "@/components/latest-articles"
import { allArticles } from "@/lib/sample-data"

export default function Home() {
  // Prepare articles for each grid section
  const pendidikan = allArticles.filter((a) => a.category === "Pendidikan")
  const kurikulum = allArticles.filter((a) => a.category === "Kurikulum")
  const materi = allArticles.filter((a) => a.category === "Materi")
  const tutorial = allArticles.filter((a) => a.category === "Tutorial")
  const madrasah = allArticles.filter((a) => a.category === "Madrasah")

  // Pad arrays with other articles to ensure 5 items
  const pad = (arr: typeof allArticles, needed: number) => {
    if (arr.length >= needed) return arr.slice(0, needed)
    const extra = allArticles.filter((a) => !arr.find((e) => e.id === a.id))
    return [...arr, ...extra].slice(0, needed)
  }

  return (
    <div className="flex min-h-screen">
      <SidebarLeft />

      <div className="flex min-h-screen flex-1 flex-col lg:ml-[270px]">
        <TopBar />

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-5 px-4 py-5">
          <main className="min-w-0 flex-1" id="main-content" role="main">
            {/* 1. Bento Box Grid */}
            <BentoBoxGrid articles={pad(pendidikan, 5)} />

            {/* 2. Editorial / Magazine Grid (Hero Layout) */}
            <EditorialGrid articles={pad(kurikulum, 5)} />

            {/* 3. Justified / Tiled Grid (Flickr Style) */}
            <JustifiedGrid articles={pad(materi, 5)} />

            {/* 4. Standard Square Grid (Instagram Style) */}
            <SquareGrid articles={pad(tutorial, 5)} />

            {/* 5. Overlapping / Asymmetric Grid */}
            <AsymmetricGrid articles={pad(madrasah, 5)} />

            {/* Latest Articles with UX Cards */}
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
