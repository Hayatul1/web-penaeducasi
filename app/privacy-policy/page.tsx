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
  title: "Privacy Policy | Pena Edukasi",
  description: "Kebijakan privasi (Privacy Policy) web.penaeducasi.com yang menjelaskan jenis informasi pribadi yang dikumpulkan dan bagaimana informasi tersebut digunakan.",
  alternates: {
    canonical: "https://web.penaeducasi.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Pena Edukasi",
    description: "Kebijakan privasi (Privacy Policy) web.penaeducasi.com",
    url: "https://web.penaeducasi.com/privacy-policy",
    siteName: "Pena Edukasi",
    locale: "id_ID",
    type: "website",
  },
}

// =============================================================
// HALAMAN PRIVACY POLICY
// =============================================================
export default function PrivacyPolicyPage() {
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
                  Privacy Policy
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
                Privacy Policy
              </h1>

              {/* =================================================
                  ARTICLE BODY (KONTEN PRIVACY POLICY)
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
                {/* ---------- BAGIAN BAHASA INDONESIA ---------- */}
                <p>
                  Di web.penaeducasi.com, privasi pengunjung adalah hal yang sangat penting. Kebijakan privasi ini menjelaskan jenis informasi pribadi yang dikumpulkan dan bagaimana informasi tersebut digunakan.
                </p>

                <p>Konsultasi Hukum Bisnis</p>

                <h2>1. Informasi yang Dikumpulkan</h2>
                <p>Kami dapat mengumpulkan informasi dari Anda ketika:</p>
                <ul>
                  <li>Anda mengunjungi situs kami.</li>
                  <li>Mengisi formulir atau memberikan komentar.</li>
                  <li>Berinteraksi dengan konten, seperti berlangganan newsletter (jika tersedia).</li>
                </ul>
                <p>Informasi yang mungkin dikumpulkan dapat mencakup:</p>
                <ul>
                  <li>Nama dan alamat email (jika Anda mengirimkannya melalui formulir kontak atau komentar).</li>
                  <li>Data teknis seperti alamat IP, jenis browser, perangkat, sistem operasi, serta halaman yang dikunjungi melalui layanan analitik (misalnya Google Analytics).</li>
                </ul>

                <h2>2. Penggunaan Informasi</h2>
                <p>Informasi yang dikumpulkan dapat digunakan untuk:</p>
                <p>Langganan Jurnal Kebijakan</p>
                <ul>
                  <li>Mengelola dan meningkatkan pengalaman pengguna di web.penaeducasi.com.</li>
                  <li>Menanggapi pertanyaan atau permintaan yang dikirimkan melalui formulir kontak.</li>
                  <li>Menganalisis statistik kunjungan untuk pengembangan konten.</li>
                  <li>Menyediakan layanan, konten, atau informasi sesuai minat pengunjung.</li>
                </ul>

                <h2>3. Cookies</h2>
                <p>
                  Web.penaeducasi.com menggunakan cookies untuk menyimpan preferensi pengunjung dan merekam informasi tertentu tentang interaksi dengan situs.
                </p>
                <ul>
                  <li>Cookies membantu kami meningkatkan kualitas konten dan pengalaman pengguna.</li>
                  <li>Pengunjung dapat menonaktifkan cookies melalui pengaturan browser masing-masing.</li>
                </ul>

                <h2>4. Pihak Ketiga</h2>
                <ul>
                  <li>web.penaeducasi.com dapat menggunakan layanan pihak ketiga seperti Google Analytics atau jaringan iklan (misalnya Google AdSense) yang mungkin mengumpulkan data anonim terkait perilaku pengunjung.</li>
                  <li>Pihak ketiga ini dapat menggunakan cookies untuk menayangkan iklan yang relevan berdasarkan kunjungan Anda ke situs ini maupun situs lain.</li>
                </ul>

                <h2>5. Perlindungan Data</h2>
                <p>
                  Kami berupaya menjaga keamanan informasi pribadi Anda, namun perlu dipahami bahwa tidak ada metode transmisi data melalui internet yang sepenuhnya aman.
                </p>

                <h2>6. Tautan ke Situs Lain</h2>
                <p>
                  web.penaeducasi.com dapat berisi tautan ke situs eksternal. Kami tidak bertanggung jawab atas kebijakan privasi atau konten dari situs eksternal tersebut.
                </p>

                <h2>7. Persetujuan</h2>
                <p>
                  Dengan menggunakan situs ini, Anda menyetujui kebijakan privasi web.penaeducasi.com.
                </p>

                <h2>8. Perubahan Kebijakan</h2>
                <p>
                  Kebijakan privasi ini dapat diperbarui sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Perubahan akan langsung dipublikasikan di halaman ini.
                </p>

                <h2>9. Kontak</h2>
                <p>
                  Jika ada pertanyaan terkait kebijakan privasi ini, Anda dapat menghubungi kami melalui halaman Kontak di situs.
                </p>

                <hr className="my-10" />

                {/* ---------- BAGIAN BAHASA INGGRIS ---------- */}
                <h2>Privacy Policy – web.penaeducasi.com</h2>
                <p>
                  At web.penaeducasi.com, the privacy of our visitors is extremely important. This Privacy Policy document outlines the types of personal information that are collected and how they are used.
                </p>

                <h2>1. Information We Collect</h2>
                <p>We may collect information from you when you:</p>
                <ul>
                  <li>Visit our website.</li>
                  <li>Submit a form or leave a comment.</li>
                  <li>Interact with content, such as subscribing to a newsletter (if available).</li>
                </ul>
                <p>The information collected may include:</p>
                <p>Belajar Ilmu Komputer</p>
                <ul>
                  <li>Name and email address (if you provide them via contact form or comments).</li>
                  <li>Technical data such as IP address, browser type, device, operating system, and visited pages (via analytics tools such as Google Analytics).</li>
                </ul>

                <h2>2. How We Use Information</h2>
                <p>The information we collect may be used to:</p>
                <ul>
                  <li>Improve user experience and website functionality.</li>
                  <li>Respond to inquiries or requests submitted via the contact form.</li>
                  <li>Analyze visitor statistics to develop better content.</li>
                  <li>Deliver services, content, or information relevant to visitors’ interests.</li>
                </ul>

                <h2>3. Cookies</h2>
                <p>
                  web.penaeducasi.com uses cookies to store visitor preferences and record certain information about interactions with the site.
                </p>
                <p>Pasang Alat Analitik</p>
                <ul>
                  <li>Cookies help us improve the quality of our content and user experience.</li>
                  <li>Visitors can disable cookies through their individual browser settings.</li>
                </ul>

                <h2>4. Third-Party Services</h2>
                <ul>
                  <li>web.penaeducasi.com may use third-party services such as Google Analytics or advertising networks (e.g., Google AdSense) that may collect anonymous data about visitor behavior.</li>
                  <li>These third parties may use cookies to serve ads based on a visitor’s prior interactions with this or other websites.</li>
                </ul>

                <h2>5. Data Protection</h2>
                <p>
                  We make reasonable efforts to protect your personal information, but please understand that no method of data transmission over the Internet is 100% secure.
                </p>

                <h2>6. External Links</h2>
                <p>
                  web.penaeducasi.com may contain links to external websites. We are not responsible for the privacy practices or content of those websites.
                </p>

                <h2>7. Consent</h2>
                <p>
                  By using this site, you consent to the Privacy Policy of web.penaeducasi.com.
                </p>

                <h2>8. Changes to This Policy</h2>
                <p>
                  This Privacy Policy may be updated from time to time without prior notice. Any changes will be posted on this page.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                  If you have any questions regarding this Privacy Policy, please contact us via the Contact page.
                </p>

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