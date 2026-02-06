import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-[1400px] px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-xl font-bold text-primary">
              PENA EDUKASI
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Membangun Generasi Cerdas dan Berakhlak Mulia. Platform edukasi terpercaya untuk pendidik, orang tua, dan pelajar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Kategori
            </h3>
            <ul className="flex flex-col gap-2">
              {["Pendidikan", "Kurikulum", "Materi", "Tutorial"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/category/${item.toLowerCase()}`}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Lainnya
            </h3>
            <ul className="flex flex-col gap-2">
              {["Madrasah", "Parenting", "Tips", "Berita"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/category/${item.toLowerCase()}`}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Halaman
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Tentang", href: "/p/tentang" },
                { label: "Kontak", href: "/p/kontak" },
                { label: "Privasi", href: "/p/privasi" },
                { label: "Disclaimer", href: "/p/disclaimer" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Pena Edukasi. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
