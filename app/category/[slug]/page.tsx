import Link from "next/link";
import { getPublishedArticles } from "@/lib/sample-data";
import { SidebarLeft } from "@/components/sidebar-left";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";

export const runtime = 'edge';

// Perbaikan 1: params dijadikan tipe Promise
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Perbaikan 2: wajib await params sebelum mengambil slug
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Mencegah error jika getPublishedArticles gagal memuat
  const allArticles = (await getPublishedArticles()) || [];
  
  // Perbaikan 3: Menggunakan optional chaining (?.) untuk mencegah crash jika ada artikel tanpa kategori
  const filteredArticles = allArticles.filter(
    (a: any) => a?.category?.toLowerCase() === slug?.toLowerCase()
  );

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-50/50">
      <SidebarLeft />
      
      <div className="flex min-h-screen flex-1 flex-col lg:ml-[270px] w-full min-w-0">
        <TopBar />
        
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:py-12 flex-1">
          <div className="mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold capitalize text-gray-900 tracking-tight">
              Kategori: {slug?.replace(/-/g, ' ')}
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Menampilkan {filteredArticles.length} artikel terbaru.
            </p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <span className="text-4xl mb-4">📭</span>
              <p className="text-gray-500 text-lg">Belum ada artikel dalam kategori ini.</p>
              <Link href="/" className="mt-4 text-blue-600 hover:underline font-medium">
                &larr; Kembali ke Beranda
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredArticles.map((article: any) => (
                <div key={article.id} className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        Pena Edukasi
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-5 line-clamp-3 flex-1 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        {article.date}
                      </span>
                      <Link 
                        href={`/post/${article.slug}`} 
                        className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center gap-1 group/link"
                      >
                        Baca <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
}