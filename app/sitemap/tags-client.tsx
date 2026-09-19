"use client"

import { useState } from "react"
import Link from "next/link"

type Tag = {
  title: string
  slug: string
}

export default function TagsClient({ tags }: { tags: Tag[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const totalPages = Math.ceil(tags.length / itemsPerPage)
  
  const currentTags = tags.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    // CLASS 'col-span' DIHAPUS AGAR PROPORSIONAL DI GRID 2 KOLOM
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          Topik & Tag
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-6 min-h-[120px]">
          {currentTags.map((tag, index) => (
            <Link 
              key={index} 
              href={`/tag/${tag.slug}`}
              className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:underline before:content-['#'] before:mr-0.5 before:text-primary/70"
            >
              {tag.title}
            </Link>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
          <span className="text-xs text-muted-foreground">
            Hal {currentPage} dari {totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-transparent px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              Prev
            </button>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-transparent px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}