import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const env = getRequestContext().env as any;
    
    // Pengecekan apakah binding DB benar-benar ada
    if (!env || !env.DB) {
      return NextResponse.json({ error: "Database binding 'DB' tidak ditemukan di Cloudflare!" }, { status: 500 });
    }

    const { results } = await env.DB.prepare(
      "SELECT * FROM followers ORDER BY created_at DESC"
    ).all();

    return NextResponse.json(results || [], { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "DB Error (GET): " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, avatar } = body;
    
    const env = getRequestContext().env as any;

    if (!env || !env.DB) {
      return NextResponse.json({ error: "Database binding 'DB' tidak ditemukan di Cloudflare!" }, { status: 500 });
    }

    if (!email || !name) {
      return NextResponse.json({ error: "Email dan nama wajib diisi" }, { status: 400 });
    }

    await env.DB.prepare(
      "INSERT INTO followers (email, name, avatar) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING"
    ).bind(email, name, avatar).run();

    return NextResponse.json({ success: true, message: "Berhasil follow" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "DB Error (POST): " + error.message }, { status: 500 });
  }
}