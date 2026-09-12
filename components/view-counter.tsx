'use client';

import useSWR from 'swr';
import { Eye } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Mempertahankan fungsi pengaman angka asli Anda
function formatViews(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

export default function ViewCounter({ slug, size = "normal" }: { slug: string, size?: "normal" | "small" }) {
  // Melakukan fetch ke API views yang sudah Anda buat
  const { data, error } = useSWR(`/api/views?slug=${slug}`, fetcher);

  const isLoading = !data && !error;
  const views = data?.views || 0;

  // Tampilan untuk ArticleCardSmall
  if (size === "small") {
    return (
      <div className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded text-card-foreground shrink-0">
        <Eye className="w-3 h-3 text-muted-foreground" />
        <span className={isLoading ? "animate-pulse" : ""}>
          {isLoading ? "..." : formatViews(views)}
        </span>
      </div>
    );
  }

  // Tampilan untuk ArticleCard normal
  return (
    <div className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded text-card-foreground shrink-0">
      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
      <span className={isLoading ? "animate-pulse" : ""}>
        {isLoading ? "..." : formatViews(views)}
      </span>
    </div>
  );
}