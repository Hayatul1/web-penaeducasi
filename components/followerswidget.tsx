'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

// Mendefinisikan tipe data agar TypeScript (TS) tidak memunculkan garis merah
type FollowerType = {
  id?: number | string;
  email: string;
  name: string;
  avatar: string;
  created_at?: string;
};

// 15 item per halaman (3 baris x 5 kolom)
const ITEMS_PER_PAGE = 15; 

export default function FollowersWidget() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  
  // State dikosongkan karena data akan diambil dari database
  const [followers, setFollowers] = useState<FollowerType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mencegah totalPages menjadi 0 agar tombol prev/next tidak error
  const totalPages = Math.max(1, Math.ceil(followers.length / ITEMS_PER_PAGE));
  const currentFollowers = followers.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // 1. AMBIL DATA DARI DATABASE SAAT HALAMAN DIBUKA
  useEffect(() => {
    async function fetchFollowers() {
      try {
        const res = await fetch('/api/follow');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setFollowers(data);
          
          // Cek apakah pengunjung yang sedang login sudah pernah follow sebelumnya
          if (session?.user?.email) {
            const hasFollowed = data.some((f: FollowerType) => f.email === session.user?.email);
            if (hasFollowed) {
              setIsFollowing(true);
            }
          }
        }
      } catch (error) {
        console.error("Gagal memuat pengikut:", error);
      }
    }
    fetchFollowers();
  }, [session]);

  // 2. CEK AUTO-FOLLOW SETELAH LOGIN GOOGLE
  useEffect(() => {
    if (isLoggedIn && session?.user) {
      const pendingFollow = localStorage.getItem("pending_follow");
      if (pendingFollow === "true" && !isFollowing) {
        eksekusiFollow(session.user);
        localStorage.removeItem("pending_follow");
      }
    }
  }, [isLoggedIn, session, isFollowing]);

  // 3. SIMPAN KE DATABASE KETIKA TOMBOL FOLLOW DITEKAN
  const eksekusiFollow = async (user: any) => {
    if (!user?.email) return;

    setIsFollowing(true);

    const newFollower: FollowerType = {
      id: Date.now(),
      email: user.email,
      name: user.name || "Pengguna",
      avatar: user.image || `https://ui-avatars.com/api/?name=${user.name || 'P'}&background=0D8ABC&color=fff`,
    };

    // Optimistic UI: Tampilkan langsung di layar pengunjung tanpa menunggu loading database
    setFollowers((prev) => [newFollower, ...prev]);

    // Kirim data ke API (Database) secara diam-diam di background
    try {
      await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFollower)
      });
    } catch (error) {
      console.error("Gagal menyimpan ke database:", error);
    }
  };

  const handleFollowClick = () => {
    if (!isLoggedIn) {
      const confirmLogin = window.confirm(
        "Anda belum bisa follow sebelum login.\n\nKlik OK untuk melanjutkan login dengan Google."
      );
      if (confirmLogin) {
        localStorage.setItem("pending_follow", "true");
        signIn('google');
      }
      return;
    }
    if (!isFollowing) {
      eksekusiFollow(session?.user);
    }
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card p-5 shadow-sm font-sans">
      {/* Header Widget */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-primary pb-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
          Pengikut ({followers.length})
        </h2>
        
        {/* Pagination Prev / Next */}
        <div className="flex gap-2 text-xs font-medium">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`transition-colors ${currentPage === 0 ? 'text-muted-foreground opacity-50 cursor-not-allowed' : 'text-primary hover:opacity-80'}`}
          >
            Prev
          </button>
          <span className="text-muted-foreground opacity-50">|</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className={`transition-colors ${currentPage === totalPages - 1 ? 'text-muted-foreground opacity-50 cursor-not-allowed' : 'text-primary hover:opacity-80'}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Area Grid Avatar (Kosong atau Terisi) */}
      {followers.length === 0 ? (
        <div className="text-center py-6 text-xs text-muted-foreground">
          Belum ada pengikut. Jadilah yang pertama!
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2 mb-5">
          {currentFollowers.map((follower) => (
            <div key={follower.id || follower.email} className="relative group aspect-square">
              <img 
                src={follower.avatar} 
                alt={follower.name} 
                className="w-full h-full object-cover rounded-md shadow-sm border border-border group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                {follower.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tombol Follow */}
      <button 
        onClick={handleFollowClick}
        disabled={isFollowing}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          isFollowing 
            ? 'bg-secondary text-secondary-foreground cursor-default' 
            : 'bg-[#1a388b] text-white hover:bg-[#122866] hover:shadow-md active:scale-[0.98]'
        }`}
      >
        {isFollowing ? (
          <>
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Mengikuti
          </>
        ) : (
          'Ikuti Pena Edukasi'
        )}
      </button>
    </div>
  );
}