"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
Check,
ChevronDown,
ChevronLeft,
ChevronRight,
Globe,
} from "lucide-react"
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

/*

Inisialisasi Google Translate
dan membaca bahasa aktif dari cookie.
*/
useEffect(() => {
// ==========================================
// CEK COOKIE GOOGLE TRANSLATE
// ==========================================

const cookies = document.cookie.split("; ")

const googtransCookie = cookies.find((row) =>
row.startsWith("googtrans=")
)

if (googtransCookie?.includes("/en")) {
setLang("EN")
} else {
setLang("ID")
}

// ==========================================
// SEMBUNYIKAN SEMUA BANNER GOOGLE TRANSLATE
// ==========================================

const hideGoogleTranslateBar = () => {
// Kembalikan posisi halaman
document.documentElement.style.top = "0px"
document.documentElement.style.marginTop = "0px"

document.body.style.top = "0px"
document.body.style.marginTop = "0px"

// Sembunyikan banner Google Translate
const banners = document.querySelectorAll(
  ".goog-te-banner-frame, iframe.goog-te-banner-frame"
)

banners.forEach((banner) => {
  const element = banner as HTMLElement

  element.style.setProperty(
    "display",
    "none",
    "important"
  )

  element.style.setProperty(
    "visibility",
    "hidden",
    "important"
  )

  element.style.setProperty(
    "height",
    "0px",
    "important"
  )
})

}

// Jalankan langsung
hideGoogleTranslateBar()

// ==========================================
// MUTATION OBSERVER
// Memantau elemen baru dari Google Translate
// ==========================================

const observer = new MutationObserver(() => {
hideGoogleTranslateBar()
})

observer.observe(document.documentElement, {
childList: true,
subtree: true,
attributes: true,
attributeFilter: ["style", "class"],
})

// ==========================================
// LOAD GOOGLE TRANSLATE
// ==========================================

if (!document.getElementById("google-translate-script")) {
window.googleTranslateElementInit = () => {
new window.google.translate.TranslateElement(
{
pageLanguage: "id",
includedLanguages: "id,en",
autoDisplay: false,
},
"google_translate_element"
)

  // Pastikan banner langsung disembunyikan
  hideGoogleTranslateBar()
}

const script = document.createElement("script")

script.id = "google-translate-script"

script.src =
  "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"

script.async = true

document.body.appendChild(script)

}

// ==========================================
// CLEANUP
// ==========================================

return () => {
observer.disconnect()
}
}

// ==========================================
// SEMBUNYIKAN BAR GOOGLE TRANSLATE
// ==========================================

const hideGoogleTranslateBar = () => {
  // Mencegah body digeser ke bawah
  document.body.style.top = "0px"

  // Cari banner Google Translate
  const banner = document.querySelector(
    ".goog-te-banner-frame"
  ) as HTMLElement | null

  // Sembunyikan banner jika ditemukan
  if (banner) {
    banner.style.display = "none"
  }
}

// Jalankan langsung
hideGoogleTranslateBar()

// Google Translate kadang membuat banner
// setelah halaman selesai dimuat
const interval = window.setInterval(
  hideGoogleTranslateBar,
  500
)

// ==========================================
// LOAD GOOGLE TRANSLATE SCRIPT
// ==========================================

if (!document.getElementById("google-translate-script")) {
  // Callback harus dibuat sebelum script dimuat
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "id",
        includedLanguages: "id,en",
        autoDisplay: false,
      },
      "google_translate_element"
    )

    // Pastikan banner tetap tersembunyi
    hideGoogleTranslateBar()
  }

  const script = document.createElement("script")

  script.id = "google-translate-script"

  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"

  script.async = true

  document.body.appendChild(script)
}

// Bersihkan interval ketika komponen dilepas
return () => {
  window.clearInterval(interval)
}

}, [])

/*

Mengganti bahasa Google Translate.
*/
const changeLanguage = (selectedLang: "ID" | "EN") => {
setLang(selectedLang)
setIsLangOpen(false)
const langCode =
  selectedLang === "EN"
    ? "/id/en"
    : "/id/id"

const domain = window.location.hostname

// Simpan bahasa ke cookie
document.cookie =
  `googtrans=${langCode}; path=/;`

document.cookie =
  `googtrans=${langCode}; path=/; domain=${domain}`

// Reload halaman untuk menerapkan bahasa
window.location.reload()

}

/*

Scroll kategori ke kiri atau kanan.
*/
const scroll = (dir: number) => {
if (scrollRef.current) {
scrollRef.current.scrollBy({
left: dir * 200,
behavior: "smooth",
})
}
}

return (
<header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
{/* ==========================================
GOOGLE TRANSLATE
========================================== */}

  <div
    id="google_translate_element"
    className="hidden"
  />

  {/* ==========================================
      MAIN CONTAINER
  ========================================== */}

  <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between pr-4">
    {/* ==========================================
        AREA KATEGORI
    ========================================== */}

    <div className="flex min-w-0 flex-1 items-center">
      {/* Tombol Scroll Kiri */}

      <button
        onClick={() => scroll(-1)}
        className="ml-[70px] mr-2 hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex lg:ml-4"
        aria-label="Scroll ke kiri"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Daftar Kategori */}

      <div
        ref={scrollRef}
        className="scrollbar-hide flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-3 pl-[70px] md:pl-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="flex-shrink-0 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Tombol Scroll Kanan */}

      <button
        onClick={() => scroll(1)}
        className="ml-2 hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex lg:mr-2"
        aria-label="Scroll ke kanan"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>

    {/* ==========================================
        AREA KANAN
        LANGUAGE SWITCHER + THEME TOGGLE
    ========================================== */}

    <div className="flex shrink-0 items-center gap-2.5 pl-2">
      {/* ==========================================
          LANGUAGE SWITCHER
      ========================================== */}

      <div className="relative">
        <button
          onClick={() =>
            setIsLangOpen(!isLangOpen)
          }
          className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 py-1.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Globe className="h-4 w-4 text-muted-foreground" />

          <span>{lang}</span>

          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>

        {/* Dropdown Bahasa */}

        {isLangOpen && (
          <div className="absolute right-0 z-50 mt-2 w-36 rounded-xl border border-border bg-card p-1.5 shadow-lg">
            {/* Bahasa Indonesia */}

            <button
              onClick={() =>
                changeLanguage("ID")
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                lang === "ID"
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span>Indonesia</span>

              {lang === "ID" && (
                <Check className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Bahasa Inggris */}

            <button
              onClick={() =>
                changeLanguage("EN")
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                lang === "EN"
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span>English</span>

              {lang === "EN" && (
                <Check className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* ==========================================
          THEME TOGGLE
      ========================================== */}

      <ThemeToggle />
    </div>
  </div>
</header>

)
}