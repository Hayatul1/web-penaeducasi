import { allArticles } from "@/lib/sample-data"
import { ArticleCard } from "./article-card"

export function LatestArticles() {
  const latest = allArticles.slice(0, 6)

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="relative pl-4 text-lg font-bold text-foreground before:absolute before:left-0 before:top-1/2 before:h-full before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary">
          Artikel Terbaru
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
