"use client";

import { useState } from "react";

export default function ArticleActions() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Membatalkan share", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Tautan artikel berhasil disalin!");
    }
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "32px", 
        marginTop: "48px", 
        marginBottom: "16px" 
      }}
    >
      
      {/* Tombol Suka */}
      <button 
        onClick={() => setIsLiked(!isLiked)} 
        style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: isLiked ? "#ef4444" : "currentColor", opacity: isLiked ? 1 : 0.6, padding: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.2s ease" }}
      >
        <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span style={{ fontSize: "14px", fontWeight: 500 }}>{isLiked ? "Disukai" : "Suka"}</span>
      </button>

      {/* Tombol Simpan */}
      <button 
        onClick={() => setIsSaved(!isSaved)} 
        style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: isSaved ? "#3b82f6" : "currentColor", opacity: isSaved ? 1 : 0.6, padding: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.2s ease" }}
      >
        <svg viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
        </svg>
        <span style={{ fontSize: "14px", fontWeight: 500 }}>{isSaved ? "Tersimpan" : "Simpan"}</span>
      </button>

      {/* Tombol Bagikan */}
      <button 
        onClick={handleShare} 
        style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "currentColor", opacity: 0.6, padding: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.2s ease" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        <span style={{ fontSize: "14px", fontWeight: 500 }}>Bagikan</span>
      </button>

    </div>
  );
}