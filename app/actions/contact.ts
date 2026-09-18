"use server"

export async function sendContactEmail(formData: FormData) {
  const nama = formData.get("Nama") as string;
  const email = formData.get("Email") as string;
  const whatsapp = formData.get("WhatsApp") as string;
  const pesan = formData.get("Pesan") as string;

  // Format payload sesuai standar API MailChannels
  const payload = {
    personalizations: [
      {
        // Email tujuan (Email Anda sendiri)
        to: [{ email: "penaeducasi@gmail.com", name: "Admin Pena Edukasi" }],
      },
    ],
    from: {
      // PENTING: Pengirim harus menggunakan domain yang terdaftar di Cloudflare
      email: "no-reply@penaeducasi.com",
      name: `Web Kontak: ${nama}`,
    },
    reply_to: {
      // Fitur 'reply-to' agar Anda bisa langsung membalas ke email pengunjung dari Gmail
      email: email,
      name: nama,
    },
    subject: `Pesan Baru dari Website: ${nama}`,
    content: [
      {
        type: "text/plain",
        value: `Nama Lengkap: ${nama}\nEmail: ${email}\nNo. WhatsApp: ${whatsapp || '-'}\n\nPesan:\n${pesan}`,
      },
    ],
  };

  try {
    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { success: true, message: "Pesan berhasil dikirim!" };
    } else {
      // Menangkap error dari MailChannels (misal 401 saat di localhost)
      const errorText = await res.text();
      console.error("Mailchannels Error:", errorText);
      return { success: false, message: "Gagal mengirim pesan." };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Terjadi kesalahan koneksi." };
  }
}