"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  BookOpen,
  FileText,
  GraduationCap,
  Code,
  School,
  Heart,
  Search,
  Menu,
  X,
} from "lucide-react"

const navItems = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Pendidikan", href: "/category/pendidikan", icon: GraduationCap },
  { label: "Kurikulum", href: "/category/kurikulum", icon: FileText },
  { label: "Materi", href: "/category/materi", icon: BookOpen },
  { label: "Tutorial", href: "/category/tutorial", icon: Code },
  { label: "Madrasah", href: "/category/madrasah", icon: School },
  { label: "Parenting", href: "/category/parenting", icon: Heart },
]

export function SidebarLeft() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* =========================================================
          MOBILE HAMBURGER

          Tetap melekat dengan TopBar.
          Jangan diubah karena posisi ini sudah berhasil.
          ========================================================= */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed
          left-0
          top-0
          z-[80]
          flex
          h-16
          w-16
          items-center
          justify-center
          border-b
          border-r
          border-border
          bg-background
          text-card-foreground
          shadow-sm
          lg:hidden
        "
        aria-label="Buka menu"
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* =========================================================
          OVERLAY MOBILE
          ========================================================= */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[90]
            bg-black/60
            lg:hidden
          "
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =========================================================
          SIDEBAR KIRI
          ========================================================= */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-[100]
          flex
          h-screen
          w-[270px]
          flex-col
          border-r
          border-sidebar-border
          bg-white
          text-card-foreground
          shadow-xl
          transition-transform
          duration-300
          ease-in-out
          dark:bg-slate-900

          lg:translate-x-0
          lg:shadow-none

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =======================================================
            CLOSE MOBILE
            ======================================================= */}
        <button
          onClick={() => setIsOpen(false)}
          className="
            absolute
            right-4
            top-4
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-muted-foreground
            transition-colors
            hover:bg-muted
            hover:text-foreground
            lg:hidden
          "
          aria-label="Tutup menu"
          type="button"
        >
          <X className="h-5 w-5" />
        </button>

        {/* =======================================================
            BRAND
            ======================================================= */}
        <div
          className="
            flex
            flex-col
            items-center
            gap-1
            border-b
            border-sidebar-border
            px-5
            py-7
          "
        >
          <Link
            href="/"
            className="
              font-serif
              text-xl
              font-bold
              tracking-tight
              text-primary
            "
          >
            PENA EDUKASI
          </Link>

          <p className="text-xs text-muted-foreground">
            Membangun Generasi Cerdas
          </p>
        </div>

        {/* =======================================================
            SEARCH
            ======================================================= */}
        <div
          className="
            border-b
            border-sidebar-border
            px-4
            py-3
          "
        >
          <div className="relative">
            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <input
              type="search"
              placeholder="Cari artikel..."
              className="
                w-full
                rounded-lg
                border
                border-input
                bg-transparent
                py-2.5
                pl-10
                pr-4
                text-sm
                text-foreground
                placeholder:text-muted-foreground
                focus:border-primary
                focus:outline-none
                focus:ring-2
                focus:ring-ring/20
              "
              aria-label="Cari artikel"
            />
          </div>
        </div>

        {/* =======================================================
            NAVIGATION

            Tetap dipertahankan.
            ======================================================= */}
        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-3
          "
          aria-label="Navigasi utama"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      text-foreground
                      transition-colors
                      hover:bg-muted
                    "
                  >
                    <Icon
                      className="
                        h-[18px]
                        w-[18px]
                        flex-shrink-0
                      "
                    />

                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* =======================================================
            FOOTER SIDEBAR DIHAPUS

            Sebelumnya ada:
            
            © 2026 Pena Edukasi

            Sekarang sengaja tidak ada karena copyright sudah
            tersedia pada Footer utama website.
            ======================================================= */}
      </aside>
    </>
  )
}