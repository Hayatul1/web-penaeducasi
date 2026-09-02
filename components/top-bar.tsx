"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

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

  /*
   Fungsi untuk Login Google otomatis
  */
  const handleGoogleLogin = () => {
    // Tambahkan logika autentikasi login Anda di sini (misal NextAuth / Firebase)
    console.log("Proses auto-login Google...")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
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
            GOOGLE LOGIN + THEME TOGGLE
        ========================================== */}
        <div className="flex shrink-0 items-center gap-2.5 pl-2">
          
          {/* ==========================================
              TOMBOL GOOGLE LOGIN (Tampil hanya di Desktop)
          ========================================== */}
          <button
            onClick={handleGoogleLogin}
            className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            {/* Ikon Google Premium Berwarna */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Masuk Akun</span>
          </button>

          {/* ==========================================
              THEME TOGGLE
          ========================================== */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}