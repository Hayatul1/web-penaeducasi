export const runtime = "edge"

import type { Metadata } from "next"
import Link from "next/link"
import { SidebarLeft } from "@/components/sidebar-left"
import { TopBar } from "@/components/top-bar"
import { SidebarRight } from "@/components/sidebar-right"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

// =============================================================
// SEO METADATA
// =============================================================
export const metadata: Metadata = {
  title: "Tentang Kami | Pena Edukasi",
  description: "Pelajari lebih lanjut tentang Pena Edukasi, visi, misi, dan komitmen kami dalam membangun generasi cerdas melalui literasi pendidikan, teknologi, dan bisnis digital.",
  alternates: {
    canonical: "https://web.penaeducasi.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tentang Kami | Pena Edukasi",
    description: "Membangun Generasi Cerdas melalui literasi digital terpercaya.",
    url: "https://web.penaeducasi.com/about",
    siteName: "Pena Edukasi",
    locale: "id_ID",
    type: "website",
  },
}

// =============================================================
// HALAMAN ABOUT US
// =============================================================
export default function AboutPage() {
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
              MAIN CONTENT
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
            <article>
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
                  prefetch={false}
                  className="font-medium text-primary hover:underline"
                >
                  Home
                </Link>

                <span className="text-muted-foreground/50">
                  {"»"}
                </span>

                <span className="font-medium text-foreground">
                  Tentang Kami
                </span>
              </nav>

              {/* =================================================
                  TITLE
                  ================================================= */}
              <h1
                className="
                  mb-8
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
              >
                Tentang Kami
              </h1>

              {/* =================================================
                  ARTICLE BODY (KONTEN ABOUT US)
                  ================================================= */}
              <div
                className="
                  article-container
                  prose
                  prose-lg
                  dark:prose-invert
                  max-w-none
                  px-4
                  pb-10
                  text-base
                  leading-relaxed
                  text-foreground
                  md:px-0
                "
              >
                <p className="lead text-xl font-medium text-muted-foreground mb-8">
                  Selamat datang di <strong>Pena Edukasi</strong> — sebuah platform literasi digital yang didedikasikan untuk <em>Membangun Generasi Cerdas</em>. 
                </p>

                <p>
                  Di era digital yang bergerak dengan sangat cepat, akses terhadap informasi yang akurat, edukatif, dan mudah dipahami adalah sebuah kebutuhan mutlak. <strong>Pena Edukasi</strong> hadir untuk menjembatani kebutuhan tersebut dengan menyediakan wadah informasi yang tidak hanya informatif, tetapi juga solutif bagi berbagai lapisan masyarakat, mulai dari pelajar, pendidik, orang tua, hingga praktisi digital.
                </p>

                <h2>Visi & Misi Kami</h2>
                <p>
                  <strong>Visi:</strong> Menjadi pusat rujukan edukasi dan literasi digital terkemuka di Indonesia yang memberdayakan masyarakat untuk terus belajar, beradaptasi, dan berinovasi.
                </p>
                <p><strong>Misi:</strong></p>
                <ul>
                  <li>Menyajikan konten pendidikan, tutorial, dan kurikulum yang relevan dengan perkembangan zaman.</li>
                  <li>Membagikan wawasan seputar teknologi, komputer, dan strategi bisnis digital secara komprehensif.</li>
                  <li>Menciptakan ekosistem pembaca yang kritis, analitis, dan memiliki kemauan untuk meningkatkan kualitas diri (<em>self-improvement</em>).</li>
                </ul>

                <h2>Apa yang Kami Sajikan?</h2>
                <p>
                  Melalui <code>web.penaeducasi.com</code>, kami mengkurasi dan menerbitkan artikel berkualitas tinggi yang berfokus pada beberapa pilar utama:
                </p>
                <ul>
                  <li><strong>Dunia Pendidikan & Madrasah:</strong> Menyediakan wawasan terkait perkembangan kurikulum, materi pembelajaran yang aplikatif, dan tips edukasi.</li>
                  <li><strong>Teknologi & Ilmu Komputer:</strong> Panduan teknis (tutorial), pemecahan masalah perangkat keras/lunak, hingga eksplorasi tren teknologi terbaru.</li>
                  <li><strong>Bisnis Digital & Pemasaran:</strong> Mengupas tuntas strategi pemasaran digital, periklanan media sosial, pemanfaatan program afiliasi, dan tips membangun kemandirian finansial di ruang digital.</li>
                  <li><strong>Parenting & Gaya Hidup:</strong> Panduan praktis bagi orang tua dalam mendidik anak di tengah gempuran era teknologi informasi.</li>
                </ul>

                <h2>Komitmen Kami (Integritas & Keamanan)</h2>
                <p>
                  Sebagai media yang menjunjung tinggi profesionalisme, <strong>Pena Edukasi</strong> berkomitmen untuk memberikan informasi yang berbasis pada riset dan praktik terbaik (<em>best practices</em>). Kami sangat menghargai privasi dan keamanan setiap pengunjung kami. Semua data navigasi Anda di situs kami dikelola dengan standar keamanan yang ketat, sebagaimana yang telah kami jabarkan di halaman <Link href="/privacy-policy" className="text-primary hover:underline">Kebijakan Privasi</Link> dan <Link href="/disclaimer" className="text-primary hover:underline">Disclaimer</Link> kami.
                </p>

                <h2>Mari Berkembang Bersama Kami</h2>
                <p>
                  Pengetahuan adalah senjata paling ampuh untuk mengubah dunia, dan membagikannya adalah cara terbaik untuk melipatgandakan manfaatnya. Kami mengundang Anda untuk terus mengeksplorasi artikel-artikel kami, berdiskusi melalui kolom komentar, dan menjadikan Pena Edukasi sebagai rekan belajar harian Anda.
                </p>
                <p>
                  Jika Anda memiliki pertanyaan, saran, tawaran kerja sama, atau sekadar ingin menyapa tim redaksi kami, jangan ragu untuk menghubungi kami.
                </p>

                <div className="mt-8 rounded-xl bg-secondary/30 p-6 border border-border">
                  <h3 className="mt-0 text-lg font-bold">Hubungi Tim Kami</h3>
                  <p className="mb-0 text-sm">
                    <strong>Email:</strong> <a href="mailto:admin@penaeducasi.com" className="text-primary hover:underline">admin@penaeducasi.com</a><br />
                    <strong>Formulir Daring:</strong> <Link href="/kontak" className="text-primary hover:underline">Kunjungi Halaman Kontak</Link>
                  </p>
                </div>

              </div>
            </article>
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
          ======================================================== */}
      <ScrollToTop />
    </div>
  )
}