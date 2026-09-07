import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

// Mematikan cache agar view selalu up-to-date
export const dynamic = 'force-dynamic';

// Inisialisasi koneksi ke Google Analytics menggunakan data dari .env.local
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    // Penting: Replace \n agar format key terbaca dengan benar di Next.js
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
  },
});

export async function GET(request: Request) {
  try {
    // Mengambil URL artikel yang sedang dibuka (contoh: /pendidikan/kurikulum-berbasis-kompetensi)
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ views: 0 });
    }

    // Meminta data ke Google Analytics
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '2020-01-01', // Mulai dari awal web dibuat
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            value: slug,
            matchType: 'EXACT',
          },
        },
      },
    });

    // Mengambil nilai angka dari response Google
    const views = response.rows?.length ? response.rows[0].metricValues[0].value : 0;

    return NextResponse.json({ views: parseInt(views || '0') });
    
  } catch (error) {
    console.error('Error fetching GA Views:', error);
    return NextResponse.json({ views: 0 });
  }
}