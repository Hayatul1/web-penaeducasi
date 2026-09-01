import Link from "next/link"
import type { Article } from "@/lib/sample-data"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/post/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-none border-b border-border bg-card pb-4 shadow-none transition-all duration-200 md:rounded-xl md:border md:bg-card md:p-0 md:shadow-sm md:hover:-translate-y-1 md:hover:shadow-lg md:hover:border-primary/30"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-4">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors md:text-sm md:font-semibold">
          {article.title}
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <span>{article.date}</span>
        </div>
      </div>
    </Link>
  )
}

export function ArticleCardSmall({ article }: { article: Article }) {
  return (
    <Link
      href={`/post/${article.slug}`}
      className="group flex gap-3 border-b border-border bg-card p-4 transition-all md:rounded-xl md:border md:p-3 md:shadow-sm md:hover:shadow-md md:hover:border-primary/30"
    >
      <img
        src={article.image || "/placeholder.svg"}
        alt={article.title}
        className="h-16 w-24 flex-shrink-0 rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex flex-col justify-center gap-1">
        <h4 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors md:text-xs">
          {article.title}
        </h4>
        <span className="text-xs text-muted-foreground md:text-[10px]">{article.date}</span>
      </div>
    </Link>
  )
}