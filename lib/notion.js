import { Client } from '@notionhq/client';
import { cache } from 'react';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// React cache menghindari pemanggilan API berulang yang tidak perlu
export const getPublishedPosts = cache(async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      // 1. FILTER & SORTING (Pastikan nama kolom di Notion sama persis)
      filter: {
        property: 'Status',
        status: {
          equals: 'Published', // Hanya ambil data berstatus Published
        },
      },
      sorts: [
        {
          timestamp: 'created_time', // Mengurutkan dari artikel terbaru
          direction: 'descending',
        },
      ],
    });

    // 2. DATA MAPPING: Menyederhanakan struktur JSON Notion yang rumit
    const posts = response.results.map((post) => {
      return {
        id: post.id,
        // Sesuaikan 'Task name' dengan nama kolom judul utama di tabel Notion Anda
        title: post.properties['Task name']?.title[0]?.plain_text || 'Tanpa Judul', 
        createdAt: post.created_time,
      };
    });

    return posts;
  } catch (error) {
    console.error('Gagal mengambil data dari Notion:', error);
    return [];
  }
});