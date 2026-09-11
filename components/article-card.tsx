"use client"

import Link from "next/link"
import { Eye } from "lucide-react"
import { useState, useEffect } from "react"
import type { Article } from "@/lib/sample-data"

// FUNGSI PENGAMAN ANGKA
function formatViews(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toString()
}

// SISTEM ANTREAN & CACHE ANTI-BLOKIR CLOUDFLARE
const globalViewCache = new Map<string, Promise<number>>();
const fetchQueue: (() => void)[] = [];
let isProcessingQueue = false;

async function processQueue() {
  if (isProcessingQueue) return;
  isProcessingQueue = true;
  
  while (fetchQueue.length > 0) {
    const task = fetchQueue.shift();
    if (task) {
      task();
      // Jeda 80ms antar request agar tidak terdeteksi spam/bot oleh Cloudflare
      await new Promise(resolve => setTimeout(resolve, 80));
    }
  }
  isProcessingQueue = false;
}

function fetchArticleViews(slug: string): Promise<number> {
  let cleanSlug = slug.trim();
  if (!cleanSlug.startsWith('/')) {
    cleanSlug = `/${cleanSlug}`;
  }
  const fullSlugPath = cleanSlug.startsWith('/post/') ? cleanSlug : `/post${cleanSlug}`;
  
  if (globalViewCache.has(fullSlugPath)) {
    return globalViewCache.get(fullSlugPath)!;
  }

  const promise = new Promise<number>((resolve) => {
    fetchQueue.push(async () => {
      try {
        const res = await fetch(`/api/views?slug=${encodeURIComponent(fullSlugPath)}`, { cache: 'no-store' });
        if (!res.ok) {
          resolve(0);
          return;
        }
        const data = await res.json();
        resolve(typeof data.views === 'number' ? data.views : 0);
      } catch {
        resolve(0);
      }
    });
    processQueue();
  });

  globalViewCache.set(fullSlugPath, promise);
  return promise;
}

interface ArticleCardProps {
  article: Article;
  hideViews?: boolean;
}

export function ArticleCard({ article, hideViews }: ArticleCardProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (hideViews) return;
    let isMounted = true;

    fetchArticleViews(article.slug).then(val => {
      if (isMounted) setViews(val);
    });

    return () => {
      isMounted = false;
    };
  }, [article.slug, hideViews]);

  return (
    <Link
      href={`/post/${article.slug}`}
      prefetch={false}
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
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{article.date}</span>
          
          {!hideViews && (
            <div className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded text-card-foreground shrink-0">
              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{views !== null ? formatViews(views) : "..."}</span>
            </div>
          )}
          
        </div>
      </div>
    </Link>
  )
}

export function ArticleCardSmall({ article, hideViews }: ArticleCardProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (hideViews) return;
    let isMounted = true;

    fetchArticleViews(article.slug).then(val => {
      if (isMounted) setViews(val);
    });

    return () => {
      isMounted = false;
    };
  }, [article.slug, hideViews]);

  return (
    <Link
      href={`/post/${article.slug}`}
      prefetch={false}
      className="group flex gap-3 border-b border-border bg-card p-4 transition-all md:rounded-xl md:border md:p-3 md:shadow-sm md:hover:shadow-md md:hover:border-primary/30"
    >
      <img
        src={article.image || "/placeholder.svg"}
        alt={article.title}
        className="h-16 w-24 flex-shrink-0 rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex flex-col justify-between flex-1 gap-1">
        <h4 className="line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors md:text-xs">
          {article.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-muted-foreground md:text-[10px]">
          <span>{article.date}</span>
          
          {!hideViews && (
            <div className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded text-card-foreground shrink-0">
              <Eye className="w-3 h-3 text-muted-foreground" />
              <span>{views !== null ? formatViews(views) : "..."}</span>
            </div>
          )}
          
        </div>
      </div>
    </Link>
  )
}