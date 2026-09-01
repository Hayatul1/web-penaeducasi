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
    <header className="sticky top-0 z-40 w-full overflow-hidden border-b border-border bg-background/80 backdrop-blur-lg">
      {/* w-full dan max-w-full mencegah layar bergeser ke samping, min-w-0 mengaktifkan scroll */}
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-2 pl-[70px] pr-4 lg:px-4">
        <button
          onClick={() => scroll(-1)}
          className="hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex"
          aria-label="Scroll ke kiri"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Bagian ini menjaga agar kategori tetap bisa di-scroll ke samping kanan/kiri di HP */}
        <div
          ref={scrollRef}
          className="flex flex-1 min-w-0 items-center gap-2 overflow-x-auto py-3 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex-shrink-0 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-card-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex"
          aria-label="Scroll ke kanan"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <ThemeToggle />
      </div>
    </header>
  )
}