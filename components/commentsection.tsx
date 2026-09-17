"use client";

import { useState, useEffect } from "react";
// Impor hooks dari next-auth untuk membaca status login Google secara nyata
import { useSession, signIn } from "next-auth/react";

type CommentType = {
  id: number;
  initial: string;
  avatarUrl?: string; // Ditambahkan untuk menyimpan URL foto profil Google
  bgColor: string;
  name: string;
  time: string;
  text: string;
  likes: number;
  dislikes: number;
};

export default function CommentSection() {
  // Ambil data sesi aktif dari TopBar (NextAuth) Anda
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeTab, setActiveTab] = useState("Terbaru");

  const maxChars = 1000;
  const tabs = ["Terbaru", "Terpilih", "Terpopuler", "Teramai", "Komentar yang disematkan"];

  // ==========================================
  // EFEK SETELAH LOGIN SUKSES
  // Mengecek "Draf Komentar" di localStorage
  // ==========================================
  useEffect(() => {
    // Hanya jalan jika status sudah benar-benar authenticated dan ada data user
    if (isLoggedIn && session?.user) {
      const pendingComment = localStorage.getItem("pending_comment");
      
      if (pendingComment) {
        // Tarik nama dari akun Google, jika kosong gunakan default
        const googleName = session.user.name || "Akun Pengunjung";
        
        // Buat inisial berdasarkan nama Google
        const words = googleName.trim().split(" ");
        const init = words.length === 1 
            ? words[0].substring(0, 2).toUpperCase()
            : (words[0][0] + words[1][0]).toUpperCase();

        const autoComment: CommentType = {
          id: Date.now(),
          initial: init,
          avatarUrl: session.user.image || undefined, // Tarik foto Google jika ada
          bgColor: "#1e3a8a",
          name: googleName,
          time: "Baru saja",
          text: pendingComment,
          likes: 0,
          dislikes: 0,
        };

        // Tambahkan komentar ke layar
        setComments((prev) => [autoComment, ...prev]);
        
        // Bersihkan kotak teks & hapus draf dari browser agar tidak terkirim ulang
        setCommentText("");
        localStorage.removeItem("pending_comment");
      }
    }
  }, [isLoggedIn, session]);

  // ==========================================
  // FUNGSI TOMBOL KIRIM
  // ==========================================
  const handleKirim = () => {
    if (commentText.trim() === "") return;

    // SKENARIO 1: PENGUNJUNG BELUM LOGIN
    if (!isLoggedIn) {
      // 1. Simpan diam-diam teksnya ke local storage
      localStorage.setItem("pending_comment", commentText);
      
      // 2. Panggil fungsi signIn dari next-auth persis seperti di TopBar Anda
      // Ini akan me-redirect pengunjung ke halaman persetujuan akun Google
      signIn("google");
      return;
    }

    // SKENARIO 2: PENGUNJUNG SUDAH LOGIN (Jalan Normal)
    const googleName = session?.user?.name || "Akun Pengunjung";
    const words = googleName.trim().split(" ");
    const init = words.length === 1 
        ? words[0].substring(0, 2).toUpperCase()
        : (words[0][0] + words[1][0]).toUpperCase();

    const newComment: CommentType = {
      id: Date.now(),
      initial: init,
      avatarUrl: session?.user?.image || undefined,
      bgColor: "#1e3a8a",
      name: googleName,
      time: "Baru saja",
      text: commentText,
      likes: 0,
      dislikes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div className="w-full mt-10 font-sans">
      
      <h3 className="text-xl font-bold text-foreground mb-4">
        Komentar <span className="font-normal">({comments.length})</span>
      </h3>

      {/* Box Input Komentar */}
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl mb-6">
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={maxChars}
            // Dinamis Placeholder: Sebut nama mereka jika sudah login
            placeholder={isLoggedIn ? `Berkomentar sebagai ${session?.user?.name}...` : "Tulis Komentar..."}
            className="w-full resize-none outline-none bg-transparent text-sm text-foreground placeholder:text-slate-400 min-h-[60px]"
          />
          
          <div className="flex justify-between items-center mt-2 border-t border-slate-100 dark:border-slate-800 pt-3">
            <span className="text-xs text-slate-500 font-medium">
              <strong className="text-foreground font-semibold">{maxChars - commentText.length}</strong> Karakter tersisa
            </span>
            <button 
              onClick={handleKirim}
              disabled={commentText.trim() === ""}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                commentText.trim() === "" 
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                  : "bg-[#1e3a8a] hover:bg-[#152c6e] text-white"
              }`}
            >
              Kirim
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22 11 13 2 9 22 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Filter */}
      <div className="flex overflow-x-auto gap-2.5 mb-6 pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeTab === tab
                ? "bg-[#1e3a8a] border-[#1e3a8a] text-white"
                : "bg-transparent border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Daftar Komentar */}
      <div className="flex flex-col">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            Belum ada komentar. Jadilah yang pertama memberikan tanggapan!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 py-5 border-b border-slate-100 dark:border-slate-800">
              
              {/* AVATAR: Prioritaskan Foto Google, Fallback ke Inisial */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: comment.bgColor }}
              >
                {comment.avatarUrl ? (
                  <img src={comment.avatarUrl} alt={comment.name} className="w-full h-full object-cover" />
                ) : (
                  comment.initial
                )}
              </div>

              {/* Konten Komentar */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold text-foreground text-sm inline-block mr-2">{comment.name}</h4>
                    <span className="text-xs text-slate-500">{comment.time}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground mt-1.5 leading-relaxed whitespace-pre-wrap">
                  {comment.text}
                </p>
                <div className="flex items-center gap-5 mt-3 text-slate-500">
                  <button className="flex items-center gap-1.5 hover:text-[#1e3a8a] transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    <span className="text-xs font-medium">{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-red-600 transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                    </svg>
                    <span className="text-xs font-medium">{comment.dislikes}</span>
                  </button>
                  <button className="text-xs font-medium hover:text-foreground transition-colors ml-2">
                    Balas
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}