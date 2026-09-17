"use client";

import { useState, useEffect } from "react";

type CommentType = {
  id: number;
  initial: string;
  bgColor: string;
  name: string;
  time: string;
  text: string;
  likes: number;
  dislikes: number;
};

export default function CommentSection() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeTab, setActiveTab] = useState("Terbaru");
  
  // ==========================================
  // SIMULASI STATE LOGIN (Untuk Testing di Localhost)
  // ==========================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; initial: string } | null>(null);

  const maxChars = 1000;
  const tabs = ["Terbaru", "Terpilih", "Terpopuler", "Teramai", "Komentar yang disematkan"];

  // ==========================================
  // EFEK SETELAH LOGIN SUKSES
  // Mengecek apakah ada "draf komentar" yang tertunda
  // ==========================================
  useEffect(() => {
    if (isLoggedIn && user) {
      const pendingComment = localStorage.getItem("pending_comment");
      
      if (pendingComment) {
        // Otomatis kirim komentar yang tertunda
        const newComment: CommentType = {
          id: Date.now(),
          initial: user.initial,
          bgColor: "#1e3a8a", // Warna biru untuk user login
          name: user.name,
          time: "Baru saja",
          text: pendingComment,
          likes: 0,
          dislikes: 0,
        };

        setComments((prev) => [newComment, ...prev]);
        
        // Bersihkan kotak teks dan hapus draf dari local storage
        setCommentText("");
        localStorage.removeItem("pending_comment");
      }
    }
  }, [isLoggedIn, user]);

  // ==========================================
  // FUNGSI TOMBOL KIRIM
  // ==========================================
  const handleKirim = () => {
    if (commentText.trim() === "") return;

    // SKENARIO 1: JIKA BELUM LOGIN
    if (!isLoggedIn) {
      // 1. Simpan teks ke local storage
      localStorage.setItem("pending_comment", commentText);
      
      // 2. Arahkan ke Login (Simulasi redirect login google)
      const confirmLogin = window.confirm("Anda harus login untuk berkomentar. Arahkan ke Login Google?");
      
      if (confirmLogin) {
        // Simulasi proses login berhasil setelah beberapa detik
        setTimeout(() => {
          setIsLoggedIn(true);
          setUser({ name: "Hayatul Makki", initial: "HM" }); // Data didapat dari Google
          alert("Login Google Sukses! Komentar Anda otomatis diterbitkan.");
        }, 800);
      } else {
        // Batal login, hapus draf
        localStorage.removeItem("pending_comment");
      }
      return;
    }

    // SKENARIO 2: JIKA SUDAH LOGIN (Jalan Normal)
    const newComment: CommentType = {
      id: Date.now(),
      initial: user?.initial || "U",
      bgColor: "#1e3a8a",
      name: user?.name || "User",
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
      
      {/* HEADER & TOMBOL LOGOUT (Hanya untuk testing) */}
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-xl font-bold text-foreground">
          Komentar <span className="font-normal">({comments.length})</span>
        </h3>
        
        {isLoggedIn && (
          <button 
            onClick={() => { setIsLoggedIn(false); setUser(null); }}
            className="text-xs text-red-500 hover:underline"
          >
            Logout Simulasi
          </button>
        )}
      </div>

      {/* Box Input Komentar */}
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl mb-6">
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={maxChars}
            placeholder={isLoggedIn ? `Berkomentar sebagai ${user?.name}...` : "Tulis Komentar..."}
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
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ backgroundColor: comment.bgColor }}
              >
                {comment.initial}
              </div>
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