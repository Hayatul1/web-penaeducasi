"use client"

import Link from "next/link"
import { allArticles } from "@/lib/sample-data"

const popularPosts = allArticles.slice(0, 5)

const labels = [
  "Pendidikan",
  "Kurikulum",
  "Materi",
  "Tutorial",
  "Madrasah",
  "Parenting",
  "Tips",
  "Berita",
]

export function SidebarRight() {
  return (
    <aside
      className="
        hidden
        w-[340px]
        flex-shrink-0
        self-stretch
        xl:block
      "
    >
      {/* =========================================================
          STICKY SIDEBAR KANAN

          TETAP STICKY
          TIDAK ADA INTERNAL SCROLLBAR

          Sebelumnya terdapat:
          max-h-[calc(100vh-88px)]
          overflow-y-auto

          Keduanya sengaja DIHAPUS agar tidak muncul scrollbar
          kedua di dalam sidebar.
          ========================================================= */}
      <div
        className="
          sticky
          top-[76px]
          z-30
          flex
          flex-col
          gap-5
          pb-5
        "
      >
        {/* =======================================================
            ARTIKEL POPULER
            ======================================================= */}
        <div
          className="
            w-full
            rounded-xl
            border
            border-border
            bg-card
            p-5
            shadow-sm
          "
        >
          <h2
            className="
              mb-4
              border-b-2
              border-primary
              pb-2
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-primary
            "
          >
            Artikel Populer
          </h2>

          <ul className="flex flex-col gap-3">
            {popularPosts.map((post, i) => (
              <li key={post.id}>
                <Link
                  href={`/post/${post.slug}`}
                  className="
                    group
                    flex
                    items-start
                    gap-3
                  "
                >
                  {/* Nomor */}
                  <span
                    className="
                      flex
                      h-7
                      w-7
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      text-xs
                      font-bold
                      text-primary-foreground
                    "
                  >
                    {i + 1}
                  </span>

                  {/* Judul + tanggal */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className="
                        line-clamp-2
                        text-xs
                        font-semibold
                        leading-snug
                        text-card-foreground
                        transition-colors
                        group-hover:text-primary
                      "
                    >
                      {post.title}
                    </h4>

                    <span
                      className="
                        mt-1
                        block
                        text-[10px]
                        text-muted-foreground
                      "
                    >
                      {post.date}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =======================================================
            KATEGORI
            ======================================================= */}
        <div
          className="
            w-full
            rounded-xl
            border
            border-border
            bg-card
            p-5
            shadow-sm
          "
        >
          <h2
            className="
              mb-4
              border-b-2
              border-primary
              pb-2
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-primary
            "
          >
            Kategori
          </h2>

          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <Link
                key={label}
                href={`/category/${label.toLowerCase()}`}
                className="
                  rounded-full
                  bg-secondary
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-secondary-foreground
                  transition-colors
                  hover:bg-primary
                  hover:text-primary-foreground
                "
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* =======================================================
            TENTANG KAMI
            ======================================================= */}
        <div
          className="
            w-full
            rounded-xl
            border
            border-border
            bg-card
            p-5
            shadow-sm
          "
        >
          <h2
            className="
              mb-4
              border-b-2
              border-primary
              pb-2
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-primary
            "
          >
            Tentang Kami
          </h2>

          <p
            className="
              text-xs
              leading-relaxed
              text-muted-foreground
            "
          >
            Portal edukasi untuk membangun generasi cerdas dan
            berakhlak mulia melalui konten pendidikan berkualitas.
            Kami menyediakan materi, tutorial, dan tips pendidikan
            terbaik.
          </p>
        </div>
      </div>
    </aside>
  )
}