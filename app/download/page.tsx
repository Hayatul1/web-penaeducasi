"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Download,
  CheckCircle2,
  FileCode2,
  Moon,
  Sun,
  ArrowUp,
  Layout,
  Layers,
  Grid3X3,
  Columns3,
  GalleryHorizontalEnd,
  StickyNote,
  ArrowLeft,
} from "lucide-react"

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    const a = document.createElement("a")
    a.href = "/PenaEdukasi-Modern-Blogger-Template.xml"
    a.download = "PenaEdukasi-Modern-Blogger-Template.xml"
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => {
      setIsDownloading(false)
      setDownloaded(true)
    }, 800)
  }

  const features = [
    {
      icon: <Layout className="h-5 w-5" />,
      title: "Bento Box Grid",
      desc: "Layout grid modern asimetris untuk kategori Pendidikan",
    },
    {
      icon: <Columns3 className="h-5 w-5" />,
      title: "Editorial/Magazine Grid",
      desc: "Hero layout besar dengan sidebar artikel untuk Kurikulum",
    },
    {
      icon: <GalleryHorizontalEnd className="h-5 w-5" />,
      title: "Justified/Tiled Grid",
      desc: "Gaya Flickr dengan ukuran bervariasi untuk kategori Materi",
    },
    {
      icon: <Grid3X3 className="h-5 w-5" />,
      title: "Standard Square Grid",
      desc: "Gaya Instagram dengan hover efek untuk Tutorial",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Overlapping/Asymmetric Grid",
      desc: "Layout tumpang tindih artistik untuk Madrasah",
    },
    {
      icon: <StickyNote className="h-5 w-5" />,
      title: "UX Article Cards",
      desc: "Card putih elegan dengan gambar, judul, dan meta artikel",
    },
    {
      icon: <Moon className="h-5 w-5" />,
      title: "Dark Mode & Light Mode",
      desc: "Dua mode tampilan yang tersimpan di localStorage",
    },
    {
      icon: <ArrowUp className="h-5 w-5" />,
      title: "Scroll to Top Elegan",
      desc: "Tombol bulat di pojok kanan bawah dengan animasi halus",
    },
  ]

  const steps = [
    "Login ke akun Blogger Anda di blogger.com",
    "Pilih blog yang ingin diubah template-nya",
    'Pergi ke menu "Tema" (Theme) di sidebar kiri',
    'Klik tombol panah dropdown di sebelah "Sesuaikan"',
    'Pilih "Edit HTML" atau "Pulihkan" (Restore)',
    'Untuk restore: Klik "Pulihkan" lalu upload file XML yang diunduh',
    'Untuk edit manual: Pilih "Edit HTML", hapus semua kode, lalu paste isi file XML',
    'Klik "Simpan" dan template Anda sudah aktif',
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Preview
          </Link>
          <div className="flex items-center gap-2">
            <FileCode2 className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg font-bold text-primary">Pena Edukasi</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <FileCode2 className="h-4 w-4" />
            Blogger XML Template
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl text-balance">
            Pena Edukasi Modern Template
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Template Blogger modern dengan 5 style grid, dark mode, sticky sidebar, artikel terkait, dan scroll-to-top button. Siap pakai langsung di Blogger.
          </p>

          {/* Download Button */}
          <div className="mt-10">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Mengunduh...
                </>
              ) : downloaded ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Berhasil Diunduh
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                  Download Template XML
                </>
              )}
            </button>
            {downloaded && (
              <p className="mt-3 text-sm text-muted-foreground">
                File <strong>PenaEdukasi-Modern-Blogger-Template.xml</strong> telah diunduh.
              </p>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
            Fitur Template
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {f.icon}
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-16">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
            Cara Install di Blogger
          </h2>
          <div className="mx-auto max-w-2xl">
            <ol className="relative border-l-2 border-primary/20 pl-8">
              {steps.map((step, i) => (
                <li key={i} className="mb-6 last:mb-0">
                  <div className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <p className="pt-0.5 text-sm leading-relaxed text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Template Specs */}
        <section className="mb-16 rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Spesifikasi Template</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Background", "#F8F9FA (Light) / #1a1f2e (Dark)"],
              ["Primary Color", "#1a8a9e (Teal)"],
              ["Fonts", "Inter (Sans) + Playfair Display (Serif)"],
              ["Layout", "Sidebar Kiri Fixed + Content + Sidebar Kanan Sticky"],
              ["Grid Styles", "5 macam (Bento, Editorial, Justified, Square, Asymmetric)"],
              ["Responsive", "Desktop, Tablet, dan Mobile"],
              ["Artikel Terkait", "3 artikel di bawah halaman post"],
              ["Dark Mode", "Toggle di topbar, tersimpan di localStorage"],
              ["Scroll to Top", "Tombol bulat elegan di pojok kanan bawah"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-secondary/50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </div>
        </section>

        {/* Second Download CTA */}
        <div className="text-center">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {downloaded ? "Download Lagi" : "Download Template XML"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Pena Edukasi Modern Blogger Template &mdash; Dibuat dengan sepenuh hati.
        </p>
      </footer>
    </div>
  )
}
