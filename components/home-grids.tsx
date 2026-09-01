import Link from "next/link"
import type { Article } from "@/lib/sample-data"

/* ===============================================================
   1. BENTO BOX GRID - Pendidikan
   =============================================================== */
export function BentoBoxGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [a, b, c, d, e] = articles

  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Pendidikan" category="pendidikan" />
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-2">
        <Link
          href={`/post/${a.slug}`}
          className="group relative col-span-1 row-span-1 aspect-[16/10] w-full overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:h-full"
        >
          <img src={a.image || "/placeholder.svg"} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="mb-1.5 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{a.category}</span>
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-white sm:text-lg">{a.title}</h3>
            <p className="mt-1 text-xs text-white/70">{a.date}</p>
          </div>
        </Link>
        {[b, c, d, e].map((item) => (
          <Link key={item.id} href={`/post/${item.slug}`} className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:aspect-auto sm:h-full">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-white sm:text-sm">{item.title}</h4>
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
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Kurikulum" category="kurikulum" />
      <div className="grid gap-4 md:grid-cols-3">
        <Link href={`/post/${hero.slug}`} className="group relative w-full overflow-hidden rounded-2xl md:col-span-2">
          <img src={hero.image || "/placeholder.svg"} alt={hero.title} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="mb-1.5 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{hero.category}</span>
            <h3 className="line-clamp-2 text-base font-bold leading-tight text-white sm:text-xl">{hero.title}</h3>
          </div>
        </Link>
        <div className="flex w-full flex-col gap-3">
          {rest.map((item) => (
            <Link key={item.id} href={`/post/${item.slug}`} className="group flex w-full gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/30">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-16 w-24 flex-shrink-0 rounded-lg object-cover" loading="lazy" />
              <div className="flex flex-col justify-center gap-1">
                <h4 className="line-clamp-2 text-xs font-semibold text-card-foreground transition-colors group-hover:text-primary sm:text-sm">{item.title}</h4>
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
   3. JUSTIFIED GRID - Materi
   =============================================================== */
export function JustifiedGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const aspects = ["aspect-[16/9]", "aspect-square", "aspect-[4/3]", "aspect-square", "aspect-[16/9]"]

  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Materi" category="materi" />
      <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:w-full">
        {articles.map((item, i) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className={`group relative overflow-hidden rounded-2xl md:min-w-[160px] md:max-w-[35%] md:flex-1 ${i === 0 ? "col-span-2" : "col-span-1"}`}
          >
            <img src={item.image || "/placeholder.svg"} alt={item.title} className={`${aspects[i]} w-full object-cover transition-transform duration-500 group-hover:scale-105 md:aspect-[4/3]`} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h4 className="line-clamp-2 text-xs font-semibold text-white sm:text-sm">{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   4. STANDARD SQUARE GRID - Tutorial
   =============================================================== */
export function SquareGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null

  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Tutorial" category="tutorial" />
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {articles.map((item) => (
          <Link key={item.id} href={`/post/${item.slug}`} className="group relative w-full overflow-hidden rounded-2xl">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
              <h4 className="line-clamp-2 text-xs font-semibold text-white sm:text-sm">{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   5. ASYMMETRIC GRID - Madrasah
   =============================================================== */
export function AsymmetricGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [a, b, c, d, e] = articles

  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Madrasah" category="madrasah" />
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-12 sm:auto-rows-[140px] md:auto-rows-[180px]">
        <Link href={`/post/${a.slug}`} className="group relative w-full overflow-hidden rounded-2xl sm:col-span-12 sm:row-span-2 md:col-span-7">
          <img src={a.image || "/placeholder.svg"} alt={a.title} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full sm:aspect-auto" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="mb-1.5 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{a.category}</span>
            <h3 className="line-clamp-2 text-base font-bold leading-tight text-white sm:text-lg">{a.title}</h3>
          </div>
        </Link>
        {[b, c, d, e].map((item, i) => (
          <Link key={item.id} href={`/post/${item.slug}`} className={`group relative w-full aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-auto ${i === 0 || i === 1 ? 'sm:col-span-6 md:col-span-5' : i === 2 ? 'sm:col-span-6 md:col-span-4' : 'sm:col-span-6 md:col-span-8'}`}>
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h4 className="line-clamp-2 text-xs font-semibold text-white sm:text-sm">{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   6. NEWSPAPER GRID - Parenting
   =============================================================== */
export function NewspaperGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [lead, ...rest] = articles
  
  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Parenting" category="parenting" />
      <div className="border-y border-border py-3">
        <Link href={`/post/${lead.slug}`} className="group grid w-full gap-3 sm:grid-cols-[1.15fr_1fr] sm:items-center">
          <img src={lead.image || "/placeholder.svg"} alt={lead.title} className="aspect-[16/10] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
          <div className="flex flex-col gap-2 px-1 sm:px-3">
            <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">{lead.title}</h3>
            <p className="line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm">{lead.excerpt}</p>
          </div>
        </Link>
        <div className="mt-4 grid w-full gap-3 border-t border-border pt-3 sm:grid-cols-4">
          {rest.map((item) => <Link key={item.id} href={`/post/${item.slug}`} className="group flex w-full gap-3 border-b border-border pb-3 last:border-0 sm:block sm:border-b-0 sm:border-r sm:pr-3 sm:last:border-0"><img src={item.image || "/placeholder.svg"} alt={item.title} className="h-16 w-24 shrink-0 rounded-lg object-cover sm:mb-2 sm:h-24 sm:w-full" loading="lazy" /><div><h4 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h4></div></Link>)}
        </div>
      </div>
    </section>
  )
}

/* ===============================================================
   7. TIMELINE GRID - Tips
   =============================================================== */
export function TimelineGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Tips" category="tips" />
      <div className="relative grid w-full gap-4 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-border sm:grid-cols-2 sm:before:left-1/2">
        {articles.map((item, i) => <Link key={item.id} href={`/post/${item.slug}`} className={`group relative flex w-full gap-4 pl-6 sm:pl-0 ${i % 2 ? "sm:flex-row-reverse sm:text-right" : ""}`}><span className="absolute left-0 top-5 size-4 rounded-full border-4 border-background bg-primary sm:left-1/2 sm:-translate-x-1/2" /><img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-square h-20 w-20 shrink-0 rounded-xl object-cover sm:h-28 sm:w-full" loading="lazy" /><div className="flex flex-col justify-center gap-1 sm:absolute sm:inset-x-3 sm:bottom-3 sm:rounded-lg sm:bg-background/90 sm:p-3"><h4 className="line-clamp-3 text-xs font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-sm">{item.title}</h4></div></Link>)}
      </div>
    </section>
  )
}

/* ===============================================================
   8. POLAROID GRID - Berita
   =============================================================== */
export function PolaroidGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Berita" category="berita" />
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {articles.map((item, i) => <Link key={item.id} href={`/post/${item.slug}`} className={`group w-full rounded-lg bg-card p-2 shadow-sm ring-1 ring-border transition-transform hover:-translate-y-1 hover:shadow-md ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}><img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-square w-full rounded object-cover" loading="lazy" /><div className="flex min-h-14 flex-col justify-between px-1 pb-1 pt-2"><h4 className="line-clamp-2 text-xs font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary sm:text-sm">{item.title}</h4></div></Link>)}
      </div>
    </section>
  )
}

/* ===============================================================
   9. FEATURE LIST GRID - Inspirasi
   =============================================================== */
export function FeatureListGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [feature, ...rest] = articles
  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Inspirasi" category="parenting" />
      <div className="grid w-full gap-4 md:grid-cols-[1fr_1.15fr]">
        <Link href={`/post/${feature.slug}`} className="group relative w-full overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground sm:p-7"><h3 className="text-xl font-bold leading-tight sm:text-3xl">{feature.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 opacity-90 sm:text-sm">{feature.excerpt}</p></Link>
        <div className="w-full divide-y divide-border rounded-2xl border border-border bg-card px-4">{rest.map((item, i) => <Link key={item.id} href={`/post/${item.slug}`} className="group flex w-full items-center gap-3 py-3"><span className="font-mono text-xs font-bold text-muted-foreground/50">0{i + 1}</span><img src={item.image || "/placeholder.svg"} alt={item.title} className="size-14 shrink-0 rounded-lg object-cover" loading="lazy" /><h4 className="line-clamp-2 text-xs font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary sm:text-sm">{item.title}</h4></Link>)}</div>
      </div>
    </section>
  )
}

/* ===============================================================
   10. REEL GRID - portrait article cards
   =============================================================== */
export function ReelGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null

  return (
    <section className="mb-12 w-full max-w-full overflow-hidden px-4 sm:px-0">
      <SectionHeader title="Pilihan Hari Ini" category="pendidikan" />
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-5 [&::-webkit-scrollbar]:hidden">
        {articles.map((item, index) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group relative min-w-[160px] max-w-[200px] snap-center overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-transform hover:-translate-y-1 sm:min-w-0 sm:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
              <span className="absolute left-2.5 top-2.5 flex size-6 items-center justify-center rounded-full bg-background/90 font-mono text-[10px] font-bold text-foreground">{String(index + 1).padStart(2, "0")}</span>
              <div className="absolute inset-x-2.5 bottom-2.5">
                <span className="mb-1 block truncate text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/75">{item.category}</span>
                <h3 className="line-clamp-3 text-xs font-bold leading-snug text-primary-foreground sm:text-sm">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   SECTION HEADER
   =============================================================== */
function SectionHeader({ title, category }: { title: string; category: string }) {
  return (
    <div className="mb-3 flex w-full items-center justify-between">
      <h2 className="relative pl-3 text-base font-bold text-foreground before:absolute before:left-0 before:top-1/2 before:h-full before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary sm:text-lg">
        {title}
      </h2>
      <Link href={`/category/${category}`} className="text-xs font-semibold text-primary hover:underline">
        Lihat Semua
      </Link>
    </div>
  )
}