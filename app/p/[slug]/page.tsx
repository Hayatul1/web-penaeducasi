import Link from "next/link";
import { SidebarLeft } from "@/components/sidebar-left";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";

export const runtime = 'edge';

export default async function StaticPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // PRO TIP: Jika Studio CMS Anda memiliki API khusus untuk "Pages", panggil di sini.
  // Contoh: const pageData = await getStaticPage(slug);
  
  // Format slug menjadi judul (misal: "tentang-kami" -> "tentang kami")
  const pageTitle = slug.replace(/-/g, ' ');

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-50/50">
      <SidebarLeft />
      
      <div className="flex min-h-screen flex-1 flex-col lg:ml-[270px] w-full min-w-0">
        <TopBar />
        
        <div className="mx-auto w-full max-w-[850px] px-4 py-8 md:py-12 flex-1">
          {/* 1. Breadcrumb Navigasi */}
          <nav className="mb-6 text-sm text-gray-500 font-medium flex items-center">
            <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="capitalize text-gray-900">{pageTitle}</span>
          </nav>

          {/* 2. Kontainer Modern (Paper Effect) */}
          <article className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* 3. Header Gradien */}
            <header className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-12 md:py-16 text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white capitalize tracking-tight drop-shadow-md">
                {pageTitle}
              </h1>
            </header>

            {/* 4. Area Konten (Siap menerima HTML/Rich Text dari CMS) */}
            <div className="p-8 md:p-12">
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                {/* 
                  Jika mengambil data dari Studio CMS, gunakan: 
                  <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                  
                  Untuk sementara, ini adalah teks default responsif:
                */}
                <p className="text-xl text-gray-800 font-medium">
                  Selamat datang di halaman resmi <span className="capitalize font-bold text-blue-700">{pageTitle}</span> Pena Edukasi.
                </p>
                <p>
                  Halaman ini didedikasikan untuk memberikan informasi yang transparan, akurat, dan relevan bagi seluruh pengunjung, pendidik, dan mitra Pena Edukasi. Kami berkomitmen untuk terus mendukung ekosistem pendidikan melalui layanan dan konten terbaik.
                </p>
                <p>
                  Jika Anda memiliki pertanyaan lebih lanjut, ingin menjalin kerja sama, atau membutuhkan bantuan teknis terkait platform edukasi kami, jangan ragu untuk menghubungi tim dukungan.
                </p>
              </div>
              
              {/* 5. Tombol Aksi Kembali */}
              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-sm"
                >
                  &larr; Kembali ke Beranda
                </Link>
              </div>
            </div>
          </article>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}