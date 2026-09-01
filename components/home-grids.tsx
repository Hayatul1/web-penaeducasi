import Link from "next/link"
import type { Article } from "@/lib/sample-data"

/* ===============================================================
   1. BENTO BOX GRID - Pendidikan
   =============================================================== */
export function BentoBoxGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [a, b, c, d, e] = articles

  return (
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Pendidikan" category="pendidikan" />
      <div className="grid w-full grid-cols-1 gap-y-1 md:gap-3 md:grid-cols-4 md:grid-rows-2">
        <Link
          href={`/post/${a.slug}`}
          className="group relative col-span-1 row-span-1 aspect-[4/3] w-full overflow-hidden rounded-none md:col-span-2 md:row-span-2 md:rounded-2xl"
        >
          <img src={a.image || "/placeholder.svg"} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">{a.category}</span>
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white md:text-2xl">{a.title}</h3>
            <p className="mt-1 hidden text-sm text-white/70 md:block">{a.date}</p>
          </div>
        </Link>
        {[b, c, d, e].map((item) => (
          <Link key={item.id} href={`/post/${item.slug}`} className="group relative aspect-video w-full overflow-hidden rounded-none md:rounded-2xl">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h4 className="line-clamp-2 text-base font-semibold leading-snug text-white md:text-sm">{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   2. EDITORIAL / MAGAZINE GRID - Kurikulum
   =============================================================== */
export function EditorialGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null
  const [hero, ...rest] = articles

  return (
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Kurikulum" category="kurikulum" />
      <div className="grid w-full gap-y-1 md:gap-4 md:grid-cols-3">
        <Link href={`/post/${hero.slug}`} className="group relative w-full overflow-hidden rounded-none md:col-span-2 md:rounded-2xl">
          <img src={hero.image || "/placeholder.svg"} alt={hero.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:aspect-video" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">{hero.category}</span>
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white md:text-3xl">{hero.title}</h3>
          </div>
        </Link>
        <div className="flex w-full flex-col gap-0 md:gap-3">
          {rest.map((item) => (
            <Link key={item.id} href={`/post/${item.slug}`} className="group flex w-full items-center gap-3 border-b border-border bg-card p-4 transition-all hover:bg-muted md:rounded-xl md:border md:shadow-sm md:hover:border-primary/30">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-20 w-24 flex-shrink-0 rounded-lg object-cover" loading="lazy" />
              <div className="flex flex-col justify-center gap-1">
                <h4 className="line-clamp-2 text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary md:text-base">{item.title}</h4>
                <span className="text-xs text-muted-foreground">{item.date}</span>
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

  return (
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Materi" category="materi" />
      <div className="grid w-full grid-cols-1 gap-y-1 md:flex md:flex-wrap md:gap-3">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group relative w-full overflow-hidden rounded-none md:min-w-[200px] md:flex-1 md:rounded-2xl"
          >
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-3">
              <h4 className="line-clamp-2 text-base font-semibold text-white md:text-sm">{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   4. SQUARE GRID - Tutorial
   =============================================================== */
export function SquareGrid({ articles }: { articles: Article[] }) {
  if (articles.length < 5) return null

  return (
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Tutorial" category="tutorial" />
      <div className="grid w-full grid-cols-2 gap-0.5 md:gap-3 md:grid-cols-5">
        {articles.map((item) => (
          <Link key={item.id} href={`/post/${item.slug}`} className="group relative w-full overflow-hidden rounded-none md:rounded-2xl">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center opacity-100 md:opacity-0 md:group-hover:opacity-100">
              <h4 className="line-clamp-3 text-sm font-semibold text-white">{item.title}</h4>
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
  const [a, ...rest] = articles

  return (
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Madrasah" category="madrasah" />
      <div className="grid w-full grid-cols-1 gap-y-1 md:gap-3 md:grid-cols-12 md:auto-rows-[180px]">
        <Link href={`/post/${a.slug}`} className="group relative w-full overflow-hidden rounded-none md:col-span-7 md:row-span-2 md:rounded-2xl">
          <img src={a.image || "/placeholder.svg"} alt={a.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full md:aspect-auto" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">{a.category}</span>
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white md:text-2xl">{a.title}</h3>
          </div>
        </Link>
        {rest.map((item, i) => (
          <Link key={item.id} href={`/post/${item.slug}`} className={`group relative w-full aspect-video overflow-hidden rounded-none md:rounded-2xl md:aspect-auto ${i === 0 || i === 1 ? 'md:col-span-5' : i === 2 ? 'md:col-span-4' : 'md:col-span-8'}`}>
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h4 className="line-clamp-2 text-sm font-semibold text-white">{item.title}</h4>
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
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Parenting" category="parenting" />
      <div className="border-y border-border py-4 md:py-0 md:border-y-0">
        <Link href={`/post/${lead.slug}`} className="group grid w-full gap-4 md:grid-cols-[1.15fr_1fr] md:items-center">
          <img src={lead.image || "/placeholder.svg"} alt={lead.title} className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] md:rounded-xl" loading="lazy" />
          <div className="flex flex-col gap-2 px-4 md:px-0">
            <h3 className="text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">{lead.title}</h3>
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{lead.excerpt}</p>
          </div>
        </Link>
        <div className="mt-4 grid w-full gap-0 border-t border-border md:mt-6 md:gap-3 md:pt-4 md:grid-cols-4">
          {rest.map((item) => <Link key={item.id} href={`/post/${item.slug}`} className="group flex w-full gap-4 border-b border-border p-4 last:border-0 md:block md:border-b-0 md:border-r md:p-0 md:pr-3 md:last:border-0"><img src={item.image || "/placeholder.svg"} alt={item.title} className="h-20 w-24 shrink-0 rounded-lg object-cover md:mb-2 md:h-24 md:w-full" loading="lazy" /><div><h4 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h4></div></Link>)}
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
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Tips" category="tips" />
      <div className="relative grid w-full gap-4 px-4 before:absolute before:bottom-3 before:left-[23px] before:top-3 before:w-px before:bg-border md:px-0 md:grid-cols-2 md:before:left-1/2">
        {articles.map((item, i) => <Link key={item.id} href={`/post/${item.slug}`} className={`group relative flex w-full gap-5 pl-8 md:pl-0 ${i % 2 ? "md:flex-row-reverse md:text-right" : ""}`}><span className="absolute left-0 top-5 size-4 rounded-full border-4 border-background bg-primary md:left-1/2 md:-translate-x-1/2" /><img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-square h-20 w-20 shrink-0 rounded-xl object-cover md:h-28 md:w-full" loading="lazy" /><div className="flex flex-col justify-center gap-1 md:absolute md:inset-x-3 md:bottom-3 md:rounded-lg md:bg-background/90 md:p-3"><h4 className="line-clamp-3 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary md:text-base">{item.title}</h4></div></Link>)}
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
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Berita" category="berita" />
      <div className="grid w-full grid-cols-2 gap-2 px-2 md:grid-cols-5 md:gap-4 md:px-0">
        {articles.map((item, i) => <Link key={item.id} href={`/post/${item.slug}`} className={`group w-full rounded-xl bg-card p-2 shadow-sm ring-1 ring-border transition-transform hover:-translate-y-1 hover:shadow-md ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}><img src={item.image || "/placeholder.svg"} alt={item.title} className="aspect-square w-full rounded-lg object-cover" loading="lazy" /><div className="flex min-h-16 flex-col justify-between px-1 pb-1 pt-3"><h4 className="line-clamp-3 text-sm font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary">{item.title}</h4></div></Link>)}
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
    <section className="mb-10 w-full md:mb-12">
      <SectionHeader title="Inspirasi" category="parenting" />
      <div className="grid w-full gap-1 md:gap-4 md:grid-cols-[1fr_1.15fr]">
        <Link href={`/post/${feature.slug}`} className="group relative w-full overflow-hidden rounded-none bg-primary p-6 text-primary-foreground md:rounded-2xl md:p-8"><h3 className="text-2xl font-bold leading-tight md:text-3xl">{feature.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 opacity-90">{feature.excerpt}</p></Link>
        <div className="w-full divide-y divide-border rounded-none border-y border-border bg-card px-4 md:rounded-2xl md:border-x">{rest.map((item, i) => <Link key={item.id} href={`/post/${item.slug}`} className="group flex w-full items-center gap-4 py-4"><span className="font-mono text-sm font-bold text-muted-foreground/50">0{i + 1}</span><img src={item.image || "/placeholder.svg"} alt={item.title} className="size-16 shrink-0 rounded-lg object-cover" loading="lazy" /><h4 className="line-clamp-2 text-sm font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary md:text-base">{item.title}</h4></Link>)}</div>
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
    <section className="mb-10 w-full overflow-hidden md:mb-12">
      <SectionHeader title="Pilihan Hari Ini" category="pendidikan" />
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-2 pb-4 [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {articles.map((item, index) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group relative min-w-[150px] snap-center overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border transition-transform hover:-translate-y-1 md:min-w-0 md:rounded-2xl"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
              <span className="absolute left-2.5 top-2.5 flex size-6 items-center justify-center rounded-full bg-background/90 font-mono text-[10px] font-bold text-foreground">{String(index + 1).padStart(2, "0")}</span>
              <div className="absolute inset-x-2.5 bottom-2.5">
                <span className="mb-1 block truncate text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/75">{item.category}</span>
                <h3 className="line-clamp-3 text-sm font-bold leading-snug text-primary-foreground">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===============================================================
   SECTION HEADER (Dilengkapi padding aman untuk Mobile)
   =============================================================== */
function SectionHeader({ title, category }: { title: string; category: string }) {
  return (
    <div className="mb-3 flex w-full items-center justify-between px-4 md:px-0">
      <h2 className="relative pl-3 text-lg font-bold text-foreground before:absolute before:left-0 before:top-1/2 before:h-full before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary md:text-xl">
        {title}
      </h2>
      <Link href={`/category/${category}`} className="text-sm font-semibold text-primary hover:underline">
        Lihat Semua
      </Link>
    </div>
  )
}