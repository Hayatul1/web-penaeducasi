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
  title: "Disclaimer | Pena Edukasi",
  description: "Disclaimer (Penafian) web.penaeducasi.com mengenai penggunaan informasi, tautan afiliasi, dan batasan tanggung jawab.",
  alternates: {
    canonical: "https://web.penaeducasi.com/disclaimer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Disclaimer | Pena Edukasi",
    description: "Disclaimer (Penafian) web.penaeducasi.com mengenai penggunaan informasi dan batasan tanggung jawab.",
    url: "https://web.penaeducasi.com/disclaimer",
    siteName: "Pena Edukasi",
    locale: "id_ID",
    type: "website",
  },
}

// =============================================================
// HALAMAN DISCLAIMER
// =============================================================
export default function DisclaimerPage() {
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
                  Disclaimer
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
                Disclaimer (Penafian)
              </h1>

              {/* =================================================
                  ARTICLE BODY (KONTEN DISCLAIMER)
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
                <p>
                  <strong>Berlaku untuk:</strong> web.penaeducasi.com<br />
                  <strong>Terakhir Diperbarui:</strong> September 2026
                </p>

                <p>
                  Segala informasi yang disediakan di web.penaeducasi.com diterbitkan dengan iktikad baik dan semata-mata untuk tujuan informasi umum dan edukasi. Kami senantiasa berupaya menjaga agar informasi tetap akurat dan mutakhir, namun kami tidak membuat pernyataan atau jaminan dalam bentuk apa pun, baik tersurat maupun tersirat, mengenai kelengkapan, keakuratan, keandalan, kesesuaian, atau ketersediaan situs web ini maupun informasi, produk, layanan, atau grafik terkait yang terdapat di dalamnya.
                </p>

                <h2>1. Penafian Afiliasi (Affiliate Disclaimer)</h2>
                <p>
                  Situs web ini mungkin memuat tautan afiliasi ke produk atau layanan pihak ketiga. Ini berarti bahwa web.penaeducasi.com dapat menerima komisi (tanpa biaya tambahan apa pun bagi Anda) apabila Anda mengklik tautan tersebut dan melakukan pembelian. Kami berpartisipasi dalam berbagai program pemasaran afiliasi komersial sebagai bentuk dukungan operasional situs. Namun, setiap ulasan, promosi, dan rekomendasi yang kami sajikan didasarkan pada riset, evaluasi independen, serta niat untuk memberikan nilai dan manfaat nyata bagi pembaca kami.
                </p>

                <h2>2. Tautan Pihak Ketiga (External Links)</h2>
                <p>
                  Melalui situs web ini, Anda dapat dialihkan ke situs web lain melalui tautan eksternal. Meskipun kami berupaya hanya menyediakan tautan yang berkualitas, aman, dan relevan, kami tidak memiliki kendali atas konten, kebijakan privasi, maupun praktik situs pihak ketiga tersebut. Ketersediaan tautan ini tidak serta-merta menyiratkan dukungan atau rekomendasi menyeluruh terhadap semua materi yang ada di dalamnya. Pemilik situs pihak ketiga dapat mengubah konten tanpa pemberitahuan, dan hal ini dapat terjadi sebelum kami sempat menghapus tautan yang sudah tidak relevan.
                </p>

                <h2>3. Batasan Tanggung Jawab</h2>
                <p>
                  Ketergantungan apa pun yang Anda tempatkan pada informasi di situs ini sepenuhnya merupakan risiko Anda sendiri. Dalam keadaan apa pun, pengelola, tim penulis, maupun pihak yang berafiliasi dengan web.penaeducasi.com tidak bertanggung jawab atas kerugian atau kerusakan apa pun, termasuk (namun tidak terbatas pada) kerugian langsung, tidak langsung, konsekuensial, atau hilangnya data dan keuntungan, yang timbul dari atau sehubungan dengan penggunaan situs web ini.
                </p>

                <h2>4. Sifat Konten & Nasihat Profesional</h2>
                <p>
                  Materi yang dipublikasikan di situs ini, termasuk namun tidak terbatas pada strategi pemasaran, panduan edukasi, maupun ulasan produk, disajikan semata-mata sebagai referensi umum. Informasi tersebut tidak dapat ditafsirkan sebagai jaminan kesuksesan mutlak atau pengganti dari konsultasi profesional di bidang keuangan, hukum, atau bisnis.
                </p>

                <h2>5. Persetujuan Pengguna</h2>
                <p>
                  Dengan mengakses dan menggunakan situs web web.penaeducasi.com, Anda dengan ini menyatakan setuju terhadap seluruh syarat dalam Penafian (Disclaimer) ini secara mutlak dan mengikat.
                </p>

                <h2>6. Pembaruan Dokumen</h2>
                <p>
                  Dokumen ini dapat ditinjau dan direvisi secara berkala untuk menyesuaikan dengan perubahan kebijakan, operasional situs, maupun regulasi hukum yang berlaku. Setiap perubahan akan segera dipublikasikan secara transparan pada halaman ini.
                </p>

                <h2>Informasi Kontak</h2>
                <p>
                  Apabila Anda memerlukan klarifikasi lebih lanjut atau memiliki pertanyaan spesifik mengenai ketentuan Penafian ini, silakan hubungi kami melalui:
                </p>
                <ul>
                  <li>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:admin@penaeducasi.com"
                      className="text-primary hover:underline font-medium"
                    >
                      admin@penaeducasi.com
                    </a>
                  </li>
                  <li>
                    <strong>Halaman Kontak:</strong>{" "}
                    <Link
                      href="/kontak"
                      className="text-primary hover:underline font-medium"
                    >
                      https://web.penaeducasi.com/kontak
                    </Link>
                  </li>
                </ul>
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