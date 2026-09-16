"use client";

import Link from "next/link";
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  BookOpen, 
  Newspaper,
  ArrowRight
} from "lucide-react";

export default function SidebarFooter() {
  return (
    // mt-auto mendorong ke bawah. bg-gray-50/50 memberikan efek pemisah yang halus dari menu atas
    <div className="mt-auto flex flex-col gap-5 p-4 border-t border-gray-100 bg-gray-50/30">
      
      {/* 2. TOMBOL FOLLOW & MEDIA SOSIAL */}
      <div className="flex flex-col gap-3">
        
        {/* Tombol Google News - Efek Shine pada Hover */}
        <Link 
          href="https://news.google.com/..." 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg"
        >
          <Newspaper size={16} className="transition-transform group-hover:-rotate-6" />
          <span>Ikuti di Google News</span>
          {/* Efek kilatan cahaya (shine) saat di-hover */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Link>

        {/* Ikon Media Sosial - Desain Minimalis & Interaktif */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {[
            { icon: Instagram, href: "https://instagram.com", name: "Instagram", color: "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200" },
            { icon: Youtube, href: "https://youtube.com", name: "YouTube", color: "hover:bg-red-50 hover:text-red-600 hover:border-red-200" },
            { icon: Facebook, href: "https://facebook.com", name: "Facebook", color: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" },
          ].map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              aria-label={social.name}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm border border-gray-100 transition-all duration-300 ${social.color}`}
            >
              <social.icon size={18} strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}