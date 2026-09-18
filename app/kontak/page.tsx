export const runtime = "edge"

import type { Metadata } from "next"
import Link from "next/link"
import { SidebarLeft } from "@/components/sidebar-left"
import { TopBar } from "@/components/top-bar"
import { SidebarRight } from "@/components/sidebar-right"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import ContactForm from "./contact-form" // <-- Import Form Interaktifnya

export const metadata: Metadata = {
  title: "Kontak Kami | Pena Edukasi",
  description: "Hubungi Pena Edukasi. Ada pertanyaan, ide seru, atau sekadar mau menyapa? Jangan sungkan untuk menghubungi kami melalui form kontak ini.",
  alternates: { canonical: "https://web.penaeducasi.com/kontak" },
  robots: { index: true, follow: true },
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full overflow-x-clip">
      <SidebarLeft />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col w-full lg:ml-[270px]">
        <TopBar />
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-stretch gap-5 px-0 py-0 md:px-4 md:py-5">
          <main className="min-w-0 w-full flex-1" id="main-content" role="main">
            <article>
              <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 px-4 pt-3 text-xs text-muted-foreground md:px-0 md:pt-0">
                <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
                <span className="text-muted-foreground/50">{"»"}</span>
                <span className="font-medium text-foreground">Kontak</span>
              </nav>

              <div className="mb-10 px-4 md:px-0">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="bg-secondary/30 px-6 py-10 md:px-10 lg:py-12 border-b border-border">
                    <h1 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                      Feel Free to Contact Us
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                      Ada pertanyaan, ide seru, atau sekadar mau menyapa? Jangan sungkan untuk menghubungi kami. Kami akan usahakan balas secepatnya!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-10 p-6 md:p-10 lg:grid-cols-3">
                    {/* INFO KONTAK KIRI */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                      <div className="rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Email Kami</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Kirimkan email kapan saja.</p>
                        <a href="mailto:penaeducasi@gmail.com" className="mt-3 block font-medium text-primary hover:underline">
                          penaeducasi@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* FORMULIR KANAN (CLIENT COMPONENT) */}
                    <div className="lg:col-span-2">
                      <h2 className="mb-6 text-2xl font-bold text-foreground">Yuk, Ngobrol!</h2>
                      {/* Panggil komponen form di sini */}
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </main>
          <SidebarRight />
        </div>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}