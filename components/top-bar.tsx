"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Globe, ChevronDown, Check } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: any
  }
}

const categories = [
  { label: "Semua", href: "/" },
  { label: "Pendidikan", href: "/category/pendidikan" },
  { label: "Kurikulum", href: "/category/kurikulum" },
  { label: "Materi", href: "/category/materi" },
  { label: "Tutorial", href: "/category/tutorial" },
  { label: "Madrasah", href: "/category/madrasah" },
  { label: "Parenting", href: "/category/parenting" },
  { label: "Tips", href: "/category/tips" },
  { label: "Berita", href: "/category/berita" },
  { label: "Teknologi", href: "/category/teknologi" },
  { label: "Bisnis&Ekonomi", href: "/category/bisnis&ekonomi" },
]

export function TopBar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [lang, setLang] = useState<"ID" | "EN">("ID")
  const [isLangOpen, setIsLangOpen] = useState(false)

  // Inisialisasi Google Translate & Cek Cookie Bahasa saat komponen dimuat
  useEffect(() => {
    const cookies = document.cookie.split("; ")
    const googtransCookie = cookies.find((row) => row.startsWith("googtrans="))
    
    if (googtransCookie && googtransCookie.includes("/en")) {
      setLang("EN")
    } else {
      setLang("ID")
    }

    // Muat skrip Google Translate jika belum ada di DOM
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script")
      script.id = "google-translate-script"
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "id",
            includedLanguages: "id,en",
            autoDisplay: false,
          },
          "google_translate_element"
        )
      }
    }
  }, [])

  // Eksekusi Pergantian Bahasa
  const changeLanguage = (selectedLang: "ID" | "EN") => {
    setLang(selectedLang)
    setIsLangOpen(false)

    const langCode = selectedLang === "EN" ? "/id/en" : "/id/id"
    const domain = window.location.hostname

    // Simpan status bahasa ke cookie agar tersimpan di seluruh halaman
    document.cookie = `googtrans=${langCode}; path=/;`
    document.cookie = `googtrans=${langCode}; path=/; domain=${domain}`

    // Reload halaman untuk menerapkan terjemahan Google Translate
    window.location.reload()
  }

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Kontainer tersembunyi Google Translate */}
      <div id="google_translate_element" className="hidden" />

      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between pr-4">
        
        {/* Kontainer Wrapper Kategori & Tombol Arah */}
        <div className="flex flex-1 min-w-0 items-center">
          
          {/* Tombol Kiri */}
          <button
            onClick={() => scroll(-1)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex ml-[70px] lg:ml-4 mr-2"
            aria-label="Scroll ke kiri"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Kontainer kategori */}
          <div
            ref={scrollRef}
            className="flex flex-1 min-w-0 items-center gap-2 overflow-x-auto py-3 pl-[70px] md:pl-0 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="whitespace-nowrap flex-shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Tombol Kanan */}
          <button
            onClick={() => scroll(1)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex ml-2 lg:mr-2"
            aria-label="Scroll ke kanan"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Area Kanan: Language Switcher & Tombol Tema */}
        <div className="flex shrink-0 items-center gap-2.5 pl-2">
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 py-1.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{lang}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {/* Dropdown Menu Language */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-card p-1.5 shadow-lg z-50">
                <button
                  onClick={() => changeLanguage("ID")}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    lang === "ID" ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span>Indonesia</span>
                  {lang === "ID" && <Check className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => changeLanguage("EN")}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    lang === "EN" ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span>English</span>
                  {lang === "EN" && <Check className="h-3.5 w-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Tombol Tema */}
          <ThemeToggle />
        </div>

      </div>
    </header>
  )
}