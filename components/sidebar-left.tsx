"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
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
} from "lucide-react"

import SidebarFooter from "./sidebar-footer"

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
  const { data: session, status } = useSession()

  return (
    <>
      {/* =========================================================
          MOBILE HAMBURGER
          ========================================================= */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-0 z-[80] flex h-16 w-16 items-center justify-center border-b border-r border-border bg-background text-card-foreground shadow-sm lg:hidden"
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
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =========================================================
          SIDEBAR KIRI
          ========================================================= */}
      <aside
        className={`fixed left-0 top-0 z-[100] flex h-screen w-[290px] flex-col border-r border-sidebar-border bg-white text-card-foreground shadow-2xl transition-transform duration-300 ease-in-out dark:bg-slate-900 lg:w-[270px] lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        {/* =======================================================
            BRAND & HEADER (Mobile & Desktop)
            ======================================================= */}
        {/* Perubahan: Menghapus lg:flex-col agar susunan desktop tetap menyamping */}
        <div className="flex w-full items-center justify-between border-b border-sidebar-border px-3 py-4 lg:justify-center lg:py-6">
          
          {/* KIRI: Logo & Teks Brand (Selalu menyamping) */}
          <Link href="/" prefetch={false} className="flex items-center gap-2.5 lg:gap-3">
            
            {/* LOGO BUKU BIRU (Optimasi LCP) */}
            <div className="flex-shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://image.penaeducasi.com/Logo/web-penaeducasi.png" 
                alt="Logo Pena Edukasi"
                width={50}
                height={50}
                fetchPriority="high"
                className="object-contain"
              />
            </div>
            
            {/* TEKS BRAND (Rata kiri sejajar dengan Logo) */}
            <div className="flex flex-col items-start justify-center">
              <span className="font-serif text-[15px] font-bold tracking-tight text-[#0a477a] dark:text-blue-400 sm:text-base lg:text-[17px]">
                PENA EDUKASI
              </span>
              <span className="text-[9px] font-medium text-gray-500 sm:text-[10px] lg:text-[11px]">
                Membangun Generasi Cerdas
              </span>
            </div>

          </Link>

          {/* KANAN: Tombol Login Khusus Mobile (Sembunyi di Desktop) */}
          <div className="lg:hidden">
            {status === "loading" ? (
              <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
            ) : session?.user ? (
              <button 
                onClick={() => {
                  if(window.confirm("Apakah Anda yakin ingin keluar?")) {
                    signOut()
                  }
                }} 
                title="Ketuk untuk keluar"
                className="overflow-hidden rounded-full border-2 border-primary/20 shadow-sm transition-transform active:scale-95"
              >
                {session.user.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "Profil"} 
                    className="h-9 w-9 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center bg-primary text-white">
                    <span className="text-xs font-bold">{session.user.name?.charAt(0)}</span>
                  </div>
                )}
              </button>
            ) : (
              <button 
                onClick={() => signIn("google")} 
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Login
              </button>
            )}
          </div>
        </div>

        {/* =======================================================
            SEARCH
            ======================================================= */}
        <div className="border-b border-sidebar-border px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Cari artikel..."
              className="w-full rounded-lg border border-input bg-transparent py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              aria-label="Cari artikel"
            />
          </div>
        </div>

        {/* =======================================================
            NAVIGATION
            ======================================================= */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 scrollbar-hide" aria-label="Navigasi utama">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
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

        {/* =======================================================
            FOOTER SIDEBAR PREMIUM 
            ======================================================= */}
        <SidebarFooter />
        
      </aside>
    </>
  )
}