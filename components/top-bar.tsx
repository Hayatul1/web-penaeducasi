"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
]

export function TopBar() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between pr-4">
        
        {/* Kontainer kategori yang bisa di-scroll. pl-[70px] memberi ruang untuk hamburger di mobile */}
        <div
          ref={scrollRef}
          className="flex flex-1 min-w-0 items-center gap-2 overflow-x-auto py-3 pl-[70px] lg:px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            onClick={() => scroll(-1)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex"
            aria-label="Scroll ke kiri"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="whitespace-nowrap flex-shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {cat.label}
            </Link>
          ))}

          <button
            onClick={() => scroll(1)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex"
            aria-label="Scroll ke kanan"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Tombol Tema diamankan di sebelah kanan agar tidak terikut scroll */}
        <div className="flex shrink-0 items-center pl-2">
          <ThemeToggle />
        </div>

      </div>
    </header>
  )
}