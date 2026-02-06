import Link from "next/link"
import type { Article } from "@/lib/sample-data"

/* ===============================================================
   1. BENTO BOX GRID - Pendidikan
   =============================================================== */
export function BentoBoxGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [a, b, c, d, e] = articles

  return (
    <section className="mb-12">
      <SectionHeader title="Pendidikan" category="pendidikan" />
      <div className="grid grid-cols-2 grid-rows-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        {/* Large item spanning 2x2 */}
        <Link
          href={`/post/${a.slug}`}
          className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl"
        >
          <img src={a.image || "/placeholder.svg"} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{a.category}</span>
            <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white">{a.title}</h3>
            <p className="mt-1 text-xs text-white/70">{a.date}</p>
          </div>
        </Link>

        {/* 4 small cards */}
        {[b, c, d, e].map((item) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group relative overflow-hidden rounded-2xl"
          >
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-white">{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   2. EDITORIAL / MAGAZINE GRID (Hero Layout) - Kurikulum
   =============================================================== */
export function EditorialGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [hero, ...rest] = articles

  return (
    <section className="mb-12">
      <SectionHeader title="Kurikulum" category="kurikulum" />
      <div className="grid gap-4 md:grid-cols-3">
        {/* Hero card */}
        <Link
          href={`/post/${hero.slug}`}
          className="group relative md:col-span-2 overflow-hidden rounded-2xl"
        >
          <img src={hero.image || "/placeholder.svg"} alt={hero.title} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{hero.category}</span>
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white md:text-2xl">{hero.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/70">{hero.excerpt}</p>
          </div>
        </Link>

        {/* Side list */}
        <div className="flex flex-col gap-3">
          {rest.map((item) => (
            <Link
              key={item.id}
              href={`/post/${item.slug}`}
              className="group flex gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-16 w-24 flex-shrink-0 rounded-lg object-cover" loading="lazy" />
              <div className="flex flex-col justify-center gap-1">
                <h4 className="line-clamp-2 text-xs font-semibold text-card-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                <span className="text-[10px] text-muted-foreground">{item.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===============================================================
   3. JUSTIFIED / TILED GRID (Flickr Style) - Materi
   =============================================================== */
export function JustifiedGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  // Varying aspect ratios for the Flickr-like effect
  const aspects = ["aspect-[4/3]", "aspect-[3/2]", "aspect-[16/9]", "aspect-[4/3]", "aspect-[3/2]"]

  return (
    <section className="mb-12">
      <SectionHeader title="Materi" category="materi" />
      <div className="flex flex-wrap gap-3">
        {articles.map((item, i) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group relative flex-1 min-w-[180px] max-w-[50%] overflow-hidden rounded-2xl md:min-w-[160px] md:max-w-[35%]"
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className={`${aspects[i]} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h4 className="line-clamp-2 text-xs font-semibold text-white">{item.title}</h4>
              <span className="mt-1 block text-[10px] text-white/70">{item.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   4. STANDARD SQUARE GRID (Instagram Style) - Tutorial
   =============================================================== */
export function SquareGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null

  return (
    <section className="mb-12">
      <SectionHeader title="Tutorial" category="tutorial" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="line-clamp-2 text-center text-xs font-semibold text-white">{item.title}</h4>
              <span className="mt-1 text-[10px] text-white/70">{item.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   5. OVERLAPPING / ASYMMETRIC GRID - Madrasah
   =============================================================== */
export function AsymmetricGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [a, b, c, d, e] = articles

  return (
    <section className="mb-12">
      <SectionHeader title="Madrasah" category="madrasah" />
      <div className="grid grid-cols-12 gap-3 auto-rows-[140px] md:auto-rows-[180px]">
        {/* Large spanning item */}
        <Link href={`/post/${a.slug}`} className="group relative col-span-12 row-span-2 overflow-hidden rounded-2xl md:col-span-7">
          <img src={a.image || "/placeholder.svg"} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{a.category}</span>
            <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white">{a.title}</h3>
          </div>
        </Link>

        {/* Top right */}
        <Link href={`/post/${b.slug}`} className="group relative col-span-6 row-span-1 overflow-hidden rounded-2xl md:col-span-5">
          <img src={b.image || "/placeholder.svg"} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="line-clamp-1 text-xs font-semibold text-white">{b.title}</h4>
          </div>
        </Link>

        {/* Bottom right */}
        <Link href={`/post/${c.slug}`} className="group relative col-span-6 row-span-1 overflow-hidden rounded-2xl md:col-span-5">
          <img src={c.image || "/placeholder.svg"} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="line-clamp-1 text-xs font-semibold text-white">{c.title}</h4>
          </div>
        </Link>

        {/* Bottom row */}
        <Link href={`/post/${d.slug}`} className="group relative col-span-6 row-span-1 overflow-hidden rounded-2xl md:col-span-4">
          <img src={d.image || "/placeholder.svg"} alt={d.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="line-clamp-1 text-xs font-semibold text-white">{d.title}</h4>
          </div>
        </Link>

        <Link href={`/post/${e.slug}`} className="group relative col-span-6 row-span-1 overflow-hidden rounded-2xl md:col-span-8">
          <img src={e.image || "/placeholder.svg"} alt={e.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="line-clamp-1 text-xs font-semibold text-white">{e.title}</h4>
          </div>
        </Link>
      </div>
    </section>
  )
}

/* ===============================================================
   SECTION HEADER
   =============================================================== */
function SectionHeader({ title, category }: { title: string; category: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="relative pl-4 text-lg font-bold text-foreground before:absolute before:left-0 before:top-1/2 before:h-full before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary">
        {title}
      </h2>
      <Link
        href={`/category/${category}`}
        className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
      >
        Lihat Semua
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </Link>
    </div>
  )
}
