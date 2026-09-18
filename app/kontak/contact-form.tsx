"use client"

import { useState } from "react"
import { sendContactEmail } from "@/app/actions/contact"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    const formData = new FormData(event.currentTarget)
    const result = await sendContactEmail(formData)

    if (result.success) {
      setStatus("success")
    } else {
      setStatus("error")
    }
    setIsSubmitting(false)
  }

  // Jika sukses, tampilkan ucapan terima kasih
  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-green-800">Pesan Terkirim!</h3>
        <p className="text-green-700">Terima kasih telah menghubungi kami. Kami akan segera merespons email Anda.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 font-semibold text-primary hover:underline">
          Kirim pesan lainnya
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="nama" className="text-sm font-medium text-foreground">Nama Lengkap <span className="text-red-500">*</span></label>
          <input type="text" id="nama" name="Nama" required placeholder="Masukkan nama Anda" disabled={isSubmitting} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Alamat Email <span className="text-red-500">*</span></label>
          <input type="email" id="email" name="Email" required placeholder="contoh@email.com" disabled={isSubmitting} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">No. Telp / WhatsApp</label>
        <input type="text" id="whatsapp" name="WhatsApp" placeholder="Mulai dengan 08..." disabled={isSubmitting} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="pesan" className="text-sm font-medium text-foreground">Pesan <span className="text-red-500">*</span></label>
        <textarea id="pesan" name="Pesan" required rows={5} placeholder="Tulis pesan Anda di sini..." disabled={isSubmitting} className="w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"></textarea>
      </div>
      
      {status === "error" && (
        <p className="text-sm font-semibold text-red-500">Gagal mengirim pesan. Silakan coba lagi atau kirim manual ke email kami.</p>
      )}

      <button type="submit" disabled={isSubmitting} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 md:w-auto self-start">
        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  )
}