"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  User as UserIcon,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { signIn, signOut, useSession } from "next-auth/react"

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
  const { data: session, status } = useSession()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  /* Scroll kategori ke kiri/kanan */
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
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between pr-4">
        
        {/* ================= AREA KATEGORI ================= */}
        <div className="flex min-w-0 flex-1 items-center">
          <button
            onClick={() => scroll(-1)}
            className="ml-[70px] mr-2 hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex lg:ml-4"
            aria-label="Scroll ke kiri"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-hide flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-3 pl-[70px] md:pl-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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

          <button
            onClick={() => scroll(1)}
            className="ml-2 hidden shrink-0 items-center justify-center rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground md:flex lg:mr-2"
            aria-label="Scroll ke kanan"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* ================= AREA KANAN ================= */}
        <div className="flex shrink-0 items-center gap-2.5 pl-2">
          
          {/* AUTHENTICATION GOOGLE (HANYA DESKTOP) */}
          <div className="hidden md:flex items-center">
            {status === "loading" ? (
              /* Skeleton Loading saat memuat sesi */
              <div className="h-9 w-28 animate-pulse rounded-xl bg-muted" />
            ) : session?.user ? (
              /* TAMPILAN SAAT SUDAH LOGIN */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-3 transition-colors hover:bg-muted"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <UserIcon className="h-4 w-4" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </button>

                {/* Dropdown Menu User */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-lg">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="text-sm font-semibold text-foreground truncate">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* TAMPILAN SAAT BELUM LOGIN */
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Masuk Akun</span>
              </button>
            )}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}