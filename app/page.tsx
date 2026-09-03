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
import { getPublishedArticles } from "@/lib/sample-data";
// (Catatan: Jika ada import komponen <LatestArticles /> di file asli, letakkan di bawah ini)

export const runtime = 'edge';

// HANYA ADA SATU EXPORT DEFAULT (Telah digabungkan menjadi fungsi Async)
export default async function Home() {
  // Mengambil data dinamis dari Studio CMS dan menyimpannya ke variabel allArticles
  const allArticles = await getPublishedArticles(); 

  const pendidikan = allArticles.filter((a: any) => a.category === "Pendidikan")
  const kurikulum = allArticles.filter((a: any) => a.category === "Kurikulum")
  const materi = allArticles.filter((a: any) => a.category === "Materi")
  const tutorial = allArticles.filter((a: any) => a.category === "Tutorial")
  const madrasah = allArticles.filter((a: any) => a.category === "Madrasah")

  const pad = (arr: any[], needed: number) => {
    if (arr.length >= needed) return arr.slice(0, needed)
    const extra = allArticles.filter((a: any) => !arr.find((e: any) => e.id === a.id))
    return [...arr, ...extra].slice(0, needed)
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <SidebarLeft />

      <div className="flex min-h-screen flex-1 flex-col lg:ml-[270px] w-full min-w-0">
        <TopBar />

        {/* px-0 di mobile membuat konten mentok ke tepi, md:px-4 mengembalikan jarak di desktop */}
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-5 px-0 md:px-4 py-0 md:py-5">
          <main className="min-w-0 flex-1 w-full" id="main-content" role="main">
            <BentoBoxGrid articles={pad(pendidikan, 5)} />
            <EditorialGrid articles={pad(kurikulum, 5)} />
            <JustifiedGrid articles={pad(materi, 5)} />
            <SquareGrid articles={pad(tutorial, 5)} />
            <AsymmetricGrid articles={pad(madrasah, 5)} />

            <NewspaperGrid articles={pad(allArticles.filter((a: any) => a.category === "Parenting"), 5)} />
            <TimelineGrid articles={pad(allArticles.filter((a: any) => a.category === "Tips"), 5)} />
            <PolaroidGrid articles={pad(allArticles.filter((a: any) => a.category === "Berita"), 5)} />
            <FeatureListGrid articles={pad(allArticles.filter((a: any) => a.category === "Parenting"), 5)} />
            <ReelGrid articles={pad(allArticles.filter((a: any) => a.category === "Pendidikan"), 5)} />

            {/* Pastikan komponen LatestArticles sudah di-import di bagian atas jika menggunakan ini */}
            {/* <LatestArticles /> */}
          </main>

          <SidebarRight />
        </div>

        <Footer />
      </div>

      <ScrollToTop />
    </div>
  )
}