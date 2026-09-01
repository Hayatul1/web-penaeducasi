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
      {/* Mobile Hamburger - Perbaikan posisi top-4 agar sejajar */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-card-foreground shadow-md lg:hidden"
        aria-label="Buka menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Perbaikan bg-white dark:bg-slate-900 agar tidak transparan */}
      <aside
        className={`fixed top-0 left-0 z-[70] h-screen w-[270px] border-r border-sidebar-border bg-white dark:bg-slate-900 text-card-foreground flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close on Mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand */}
        <div className="flex flex-col items-center gap-1 border-b border-sidebar-border px-5 py-7">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-primary">
            PENA EDUKASI
          </Link>
          <p className="text-xs text-muted-foreground">
            Membangun Generasi Cerdas
          </p>
        </div>

        {/* Search */}
        <div className="border-b border-sidebar-border px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Cari artikel..."
              className="w-full rounded-lg border border-input bg-transparent py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              aria-label="Cari artikel"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Navigasi utama">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-5 py-4">
          <p className="text-center text-[11px] text-muted-foreground">
            &copy; 2026 Pena Edukasi
          </p>
        </div>
      </aside>
    </>
  )
}