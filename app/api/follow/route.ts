import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

// WAJIB: Cloudflare D1 mengharuskan API berjalan di Edge Runtime
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// [GET] FUNGSI UNTUK MENGAMBIL DATA FOLLOWER DARI DATABASE
export async function GET() {
  try {
    // PERBAIKAN: Tambahkan "as any" untuk menghilangkan error TypeScript
    const db = (getRequestContext().env as any).DB;
    
    // Ambil data dan urutkan dari yang paling baru follow (DESC)
    const { results } = await db.prepare(
      "SELECT * FROM followers ORDER BY created_at DESC"
    ).all();

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// [POST] FUNGSI UNTUK MENYIMPAN FOLLOWER BARU KE DATABASE
export async function POST(request: Request) {
  try {
    const { email, name, avatar } = await request.json();
    
    // PERBAIKAN: Tambahkan "as any" untuk menghilangkan error TypeScript
    const db = (getRequestContext().env as any).DB;

    if (!email || !name) {
      return NextResponse.json({ error: "Email dan nama wajib diisi" }, { status: 400 });
    }

    // Insert ke tabel. "ON CONFLICT DO NOTHING" mencegah error jika orang yang sama klik 2x
    await db.prepare(
      "INSERT INTO followers (email, name, avatar) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING"
    ).bind(email, name, avatar).run();

    return NextResponse.json({ success: true, message: "Berhasil follow" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}