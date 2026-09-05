"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        aria-label="Toggle theme"
      >
        <div className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      aria-label={resolvedTheme === "dark" ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
    >
      {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}