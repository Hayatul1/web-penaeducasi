import { NextResponse } from "next/server"

export async function GET() {
  const xmlTemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
<meta charset='UTF-8'/>
<meta content='width=device-width, initial-scale=1.0' name='viewport'/>
<meta content='blogger' name='generator'/>
<title><data:blog.pageTitle/></title>
<b:skin><![CDATA[
/* ============================================
   PENA EDUKASI MODERN BLOGGER TEMPLATE
   Background: #F8F9FA | Primary: #1a8a9e
   Dark Mode + Light Mode Support
   5 Grid Styles + Sticky Sidebar + Related Posts
   ============================================ */

/* === CSS VARIABLES === */
:root {
  --bg-primary: #F8F9FA;
  --bg-card: #FFFFFF;
  --bg-dark: #1a1f2e;
  --bg-dark-card: #242938;
  --text-primary: #1e3a5f;
  --text-secondary: #5a6f8a;
  --text-dark-primary: #e2e8f0;
  --text-dark-secondary: #94a3b8;
  --accent: #1a8a9e;
  --accent-hover: #15707f;
  --accent-light: rgba(26,138,158,0.1);
  --border-color: #e2e8f0;
  --border-dark: #2d3548;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
  --radius: 12px;
  --radius-sm: 8px;
  --radius-lg: 16px;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --topbar-h: 64px;
  --sidebar-w: 270px;
  --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
}

/* === RESET & BASE === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--accent); text-decoration: none; transition: color var(--transition); }
a:hover { color: var(--accent-hover); }
img { max-width: 100%; height: auto; display: block; }

/* === DARK MODE === */
body.dark-mode {
  background: var(--bg-dark);
  color: var(--text-dark-primary);
}
body.dark-mode .topbar { background: var(--bg-dark-card); border-color: var(--border-dark); }
body.dark-mode .sidebar-left { background: var(--bg-dark-card); border-color: var(--border-dark); }
body.dark-mode .sidebar-right-inner { background: var(--bg-dark-card); border-color: var(--border-dark); }
body.dark-mode .article-card { background: var(--bg-dark-card); border-color: var(--border-dark); }
body.dark-mode .article-card .card-title { color: var(--text-dark-primary); }
body.dark-mode .article-card .card-meta { color: var(--text-dark-secondary); }
body.dark-mode .grid-section-title { color: var(--text-dark-primary); }
body.dark-mode .grid-overlay-title { color: #fff; }
body.dark-mode .post-body { color: var(--text-dark-primary); }
body.dark-mode .post-title-single { color: var(--text-dark-primary); }
body.dark-mode .related-card { background: var(--bg-dark-card); border-color: var(--border-dark); }
body.dark-mode .related-card h4 { color: var(--text-dark-primary); }
body.dark-mode .footer-wrapper { background: var(--bg-dark-card); border-color: var(--border-dark); }
body.dark-mode .footer-wrapper, body.dark-mode .footer-wrapper a { color: var(--text-dark-secondary); }
body.dark-mode .search-box input { background: #1a1f2e; color: var(--text-dark-primary); border-color: var(--border-dark); }
body.dark-mode .popular-item .pop-title { color: var(--text-dark-primary); }
body.dark-mode .category-tag { background: rgba(26,138,158,0.2); color: #5cc8db; }
body.dark-mode .breadcrumb a, body.dark-mode .breadcrumb span { color: var(--text-dark-secondary); }

/* === GOOGLE FONTS IMPORT === */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

/* === TOPBAR === */
.topbar {
  position: fixed; top: 0; left: var(--sidebar-w); right: 0;
  height: var(--topbar-h);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
  backdrop-filter: blur(10px);
}
.topbar-logo { font-family: var(--font-serif); font-size: 1.35rem; font-weight: 700; color: var(--accent); }
.topbar-nav { display: flex; gap: 24px; align-items: center; }
.topbar-nav a { font-size: 0.9rem; font-weight: 500; color: var(--text-secondary); transition: color var(--transition); }
.topbar-nav a:hover { color: var(--accent); }
.topbar-actions { display: flex; gap: 10px; align-items: center; }

/* Theme Toggle Button */
.theme-toggle {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all var(--transition);
  font-size: 1rem;
}
.theme-toggle:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
body.dark-mode .theme-toggle { border-color: var(--border-dark); background: var(--bg-dark-card); color: var(--text-dark-secondary); }
body.dark-mode .theme-toggle:hover { background: var(--accent); color: #fff; }

/* Search Box */
.search-box { position: relative; }
.search-box input {
  width: 220px; padding: 8px 36px 8px 14px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 0.85rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  outline: none;
  transition: all var(--transition);
}
.search-box input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
.search-box .search-icon {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  color: var(--text-secondary); font-size: 0.85rem;
}

/* === SIDEBAR LEFT (STICKY FOLLOW SCROLL) === */
.sidebar-left {
  position: fixed; top: 0; left: 0; bottom: 0;
  width: var(--sidebar-w);
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  z-index: 110;
  padding: 20px;
  display: flex; flex-direction: column;
}
.sidebar-brand { padding: 10px 0 20px; text-align: center; border-bottom: 1px solid var(--border-color); margin-bottom: 20px; }
.sidebar-brand h2 { font-family: var(--font-serif); font-size: 1.5rem; color: var(--accent); font-weight: 700; }
.sidebar-brand p { font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px; }

.sidebar-section { margin-bottom: 24px; }
.sidebar-section-title {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1.5px; color: var(--text-secondary);
  margin-bottom: 12px; padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
}
.sidebar-nav { list-style: none; }
.sidebar-nav li a {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: var(--radius-sm);
  font-size: 0.88rem; font-weight: 500;
  color: var(--text-primary);
  transition: all var(--transition);
}
.sidebar-nav li a:hover { background: var(--accent-light); color: var(--accent); }
.sidebar-nav li a .nav-icon { font-size: 1rem; width: 20px; text-align: center; }

/* Popular Posts in Sidebar */
.popular-item {
  display: flex; gap: 10px; padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
}
.popular-item:last-child { border-bottom: none; }
.popular-item .pop-thumb {
  width: 60px; height: 60px; border-radius: var(--radius-sm);
  object-fit: cover; flex-shrink: 0;
}
.popular-item .pop-title { font-size: 0.82rem; font-weight: 600; line-height: 1.4; color: var(--text-primary); }
.popular-item .pop-date { font-size: 0.72rem; color: var(--text-secondary); margin-top: 3px; }

/* === MAIN LAYOUT === */
.main-wrapper {
  margin-left: var(--sidebar-w);
  padding-top: var(--topbar-h);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content-area {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  gap: 24px;
  flex: 1;
}
.main-content { flex: 1; min-width: 0; }

/* === SIDEBAR RIGHT (STICKY ON SCROLL) === */
.sidebar-right {
  width: 300px; flex-shrink: 0;
}
.sidebar-right-inner {
  position: sticky;
  top: calc(var(--topbar-h) + 24px);
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}
.sidebar-right-inner .sidebar-section-title {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1.5px; color: var(--text-secondary);
  margin-bottom: 14px; padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
}
.tag-cloud { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-cloud a {
  display: inline-block; padding: 5px 12px;
  background: var(--accent-light); color: var(--accent);
  border-radius: 20px; font-size: 0.78rem; font-weight: 500;
  transition: all var(--transition);
}
.tag-cloud a:hover { background: var(--accent); color: #fff; }

/* === GRID SECTION COMMON === */
.grid-section { margin-bottom: 48px; }
.grid-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.grid-section-title {
  font-family: var(--font-serif);
  font-size: 1.5rem; font-weight: 700;
  color: var(--text-primary);
  position: relative;
  padding-left: 14px;
}
.grid-section-title::before {
  content: '';
  position: absolute; left: 0; top: 4px; bottom: 4px;
  width: 4px; border-radius: 2px;
  background: var(--accent);
}
.grid-section .view-all { font-size: 0.85rem; font-weight: 600; color: var(--accent); }

/* Grid Overlay Card */
.grid-overlay-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
}
.grid-overlay-card img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease;
}
.grid-overlay-card:hover img { transform: scale(1.05); }
.grid-overlay-card .grid-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0,0,0,0.75));
}
.grid-overlay-card .grid-cat {
  display: inline-block; padding: 3px 10px;
  background: var(--accent); color: #fff;
  border-radius: 4px; font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.grid-overlay-title { color: #fff; font-size: 1rem; font-weight: 600; line-height: 1.4; }
.grid-overlay-title.lg { font-size: 1.35rem; }

/* === 1. BENTO BOX GRID === */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 280px 200px;
  gap: 12px;
}
.bento-grid .bento-1 { grid-column: 1 / 3; grid-row: 1 / 3; }
.bento-grid .bento-2 { grid-column: 3; grid-row: 1; }
.bento-grid .bento-3 { grid-column: 4; grid-row: 1; }
.bento-grid .bento-4 { grid-column: 3; grid-row: 2; }
.bento-grid .bento-5 { grid-column: 4; grid-row: 2; }

/* === 2. EDITORIAL / MAGAZINE GRID (HERO LAYOUT) === */
.editorial-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  grid-template-rows: 200px 200px;
  gap: 12px;
}
.editorial-grid .ed-hero { grid-row: 1 / 3; }
.editorial-grid .ed-2 { grid-column: 2; grid-row: 1; }
.editorial-grid .ed-3 { grid-column: 2; grid-row: 2; }
.editorial-extra { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }

/* === 3. JUSTIFIED / TILED GRID (FLICKR STYLE) === */
.justified-grid {
  display: flex; flex-wrap: wrap; gap: 8px;
}
.justified-grid .j-item { flex: 1 1 auto; min-width: 150px; height: 220px; }
.justified-grid .j-item:nth-child(1) { flex-basis: 38%; }
.justified-grid .j-item:nth-child(2) { flex-basis: 28%; }
.justified-grid .j-item:nth-child(3) { flex-basis: 30%; }
.justified-grid .j-item:nth-child(4) { flex-basis: 50%; }
.justified-grid .j-item:nth-child(5) { flex-basis: 46%; }

/* === 4. STANDARD SQUARE GRID (INSTAGRAM STYLE) === */
.square-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.square-grid .sq-item {
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  overflow: hidden;
  position: relative;
}
.square-grid .sq-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.square-grid .sq-item:hover img { transform: scale(1.08); }
.square-grid .sq-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0);
  display: flex; align-items: flex-end;
  padding: 12px;
  transition: background var(--transition);
}
.square-grid .sq-item:hover .sq-overlay { background: rgba(0,0,0,0.45); }
.square-grid .sq-overlay span {
  color: #fff; font-size: 0.82rem; font-weight: 600;
  opacity: 0; transform: translateY(8px);
  transition: all var(--transition);
}
.square-grid .sq-item:hover .sq-overlay span { opacity: 1; transform: translateY(0); }

/* === 5. OVERLAPPING / ASYMMETRIC GRID === */
.asym-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 250px 220px;
  gap: 12px;
}
.asym-grid .asym-1 { grid-column: 1 / 3; grid-row: 1; }
.asym-grid .asym-2 { grid-column: 3; grid-row: 1; }
.asym-grid .asym-3 { grid-column: 1; grid-row: 2; }
.asym-grid .asym-4 { grid-column: 2 / 4; grid-row: 2; }
.asym-grid .asym-2 { margin-top: 30px; }
.asym-grid .asym-3 { margin-top: -30px; }

/* === UX ARTICLE CARDS (White bg with image + title) === */
.article-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;
}
.article-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
}
.article-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.article-card .card-thumb {
  width: 100%; height: 190px; object-fit: cover;
}
.article-card .card-body { padding: 16px; }
.category-tag {
  display: inline-block; padding: 3px 10px;
  background: var(--accent-light); color: var(--accent);
  border-radius: 4px; font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.article-card .card-title {
  font-family: var(--font-serif);
  font-size: 1.05rem; font-weight: 600;
  line-height: 1.45;
  color: var(--text-primary);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.article-card .card-excerpt {
  font-size: 0.84rem; color: var(--text-secondary);
  margin-top: 8px; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.article-card .card-meta {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-color);
  font-size: 0.75rem; color: var(--text-secondary);
}

/* === SINGLE POST PAGE === */
.post-wrapper { max-width: 780px; margin: 0 auto; }
.breadcrumb { font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 20px; }
.breadcrumb a { color: var(--accent); }
.post-title-single {
  font-family: var(--font-serif);
  font-size: 2.2rem; font-weight: 700;
  line-height: 1.3; color: var(--text-primary);
  margin-bottom: 16px;
  text-wrap: balance;
}
.post-meta-single {
  display: flex; gap: 16px; align-items: center;
  font-size: 0.84rem; color: var(--text-secondary);
  margin-bottom: 24px; padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}
.post-featured-img {
  width: 100%; height: auto; border-radius: var(--radius);
  margin-bottom: 28px;
}
.post-body {
  font-size: 1.05rem; line-height: 1.8;
  color: var(--text-primary);
}
.post-body h2, .post-body h3 { font-family: var(--font-serif); margin: 28px 0 12px; font-weight: 700; }
.post-body h2 { font-size: 1.5rem; }
.post-body h3 { font-size: 1.25rem; }
.post-body p { margin-bottom: 16px; }
.post-body img { border-radius: var(--radius); margin: 20px 0; }
.post-body blockquote {
  border-left: 4px solid var(--accent);
  padding: 16px 20px; margin: 20px 0;
  background: var(--accent-light);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-style: italic;
}
.post-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border-color); }
.post-tags a {
  display: inline-block; padding: 5px 14px;
  background: var(--accent-light); color: var(--accent);
  border-radius: 20px; font-size: 0.78rem; font-weight: 500;
  transition: all var(--transition);
}
.post-tags a:hover { background: var(--accent); color: #fff; }

/* === RELATED POSTS (3 items below article) === */
.related-section { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border-color); }
.related-section h3 {
  font-family: var(--font-serif);
  font-size: 1.3rem; font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.related-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all var(--transition);
}
.related-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.related-card img { width: 100%; height: 150px; object-fit: cover; }
.related-card h4 {
  padding: 12px 14px;
  font-size: 0.9rem; font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* === SCROLL TO TOP BUTTON === */
.scroll-top-btn {
  position: fixed; bottom: 28px; right: 28px;
  width: 46px; height: 46px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  border: none;
  cursor: pointer;
  display: none;
  align-items: center; justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 16px rgba(26,138,158,0.4);
  transition: all var(--transition);
  z-index: 999;
}
.scroll-top-btn.visible { display: flex; }
.scroll-top-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(26,138,158,0.5); }

/* === FOOTER === */
.footer-wrapper {
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  margin-top: 60px;
  padding: 40px 24px 20px;
}
.footer-inner {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px;
}
.footer-about h3 { font-family: var(--font-serif); font-size: 1.2rem; color: var(--accent); margin-bottom: 10px; }
.footer-about p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }
.footer-links h4 { font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
.footer-links ul { list-style: none; }
.footer-links li { margin-bottom: 6px; }
.footer-links a { font-size: 0.84rem; color: var(--text-secondary); }
.footer-links a:hover { color: var(--accent); }
.footer-bottom {
  text-align: center; margin-top: 30px; padding-top: 20px;
  border-top: 1px solid var(--border-color);
  font-size: 0.8rem; color: var(--text-secondary);
}

/* === MOBILE RESPONSIVE === */
.mobile-menu-btn {
  display: none; width: 36px; height: 36px; border: none;
  background: transparent; font-size: 1.3rem;
  color: var(--text-primary); cursor: pointer;
}
.sidebar-close-btn {
  display: none; position: absolute; top: 14px; right: 14px;
  width: 30px; height: 30px; border-radius: 50%;
  border: 1px solid var(--border-color); background: var(--bg-card);
  cursor: pointer; font-size: 1rem;
}
.mobile-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.5); z-index: 105;
}

@media (max-width: 1024px) {
  .sidebar-right { display: none; }
  .article-cards-grid { grid-template-columns: repeat(2, 1fr); }
  .related-grid { grid-template-columns: repeat(2, 1fr); }
  .square-grid { grid-template-columns: repeat(3, 1fr); }
  .bento-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
  .bento-grid .bento-1 { grid-column: 1 / 3; }
  .bento-grid .bento-2, .bento-grid .bento-3, .bento-grid .bento-4, .bento-grid .bento-5 { grid-column: auto; }
  .editorial-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
  .editorial-grid .ed-hero { grid-column: 1; grid-row: auto; }
  .asym-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .asym-grid .asym-1 { grid-column: 1 / 3; }
  .asym-grid .asym-2 { margin-top: 0; }
  .asym-grid .asym-3 { margin-top: 0; }
  .asym-grid .asym-4 { grid-column: auto; }
  .footer-inner { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  :root { --sidebar-w: 0px; }
  .sidebar-left { transform: translateX(-100%); width: 270px; }
  .sidebar-left.open { transform: translateX(0); }
  .sidebar-close-btn { display: flex; align-items: center; justify-content: center; }
  .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
  .mobile-overlay.active { display: block; }
  .topbar { left: 0; }
  .main-wrapper { margin-left: 0; }
  .content-area { padding: 16px; }
  .article-cards-grid { grid-template-columns: 1fr; }
  .related-grid { grid-template-columns: 1fr; }
  .square-grid { grid-template-columns: repeat(2, 1fr); }
  .justified-grid .j-item { min-width: 100%; height: 180px; }
  .bento-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
  .bento-grid .bento-1 { grid-column: 1; }
  .post-title-single { font-size: 1.6rem; }
  .search-box input { width: 140px; }
}

]]></b:skin>

<!-- Additional Head -->
<b:template-skin>
<![CDATA[
body#layout .sidebar-left, body#layout .sidebar-right { width: 300px; }
]]>
</b:template-skin>
</head>

<body>
<b:class cond='data:blog.pageType == &quot;item&quot;' name='item-page'/>
<b:class cond='data:blog.pageType == &quot;index&quot;' name='index-page'/>

<!-- Mobile Overlay -->
<div class='mobile-overlay' id='mobileOverlay' onclick='closeSidebar()'/>

<!-- ============ SIDEBAR LEFT ============ -->
<aside class='sidebar-left' id='sidebarLeft'>
  <button class='sidebar-close-btn' onclick='closeSidebar()'>&#x2715;</button>
  <div class='sidebar-brand'>
    <h2><data:blog.title/></h2>
    <p>Membangun Generasi Cerdas</p>
  </div>

  <div class='sidebar-section'>
    <span class='sidebar-section-title'>Navigasi</span>
    <ul class='sidebar-nav'>
      <li><a href='/'><span class='nav-icon'>&#127968;</span> Beranda</a></li>
      <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Pendidikan&quot;'><span class='nav-icon'>&#128218;</span> Pendidikan</a></li>
      <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Kurikulum&quot;'><span class='nav-icon'>&#128203;</span> Kurikulum</a></li>
      <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Materi&quot;'><span class='nav-icon'>&#128221;</span> Materi</a></li>
      <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Tutorial&quot;'><span class='nav-icon'>&#127891;</span> Tutorial</a></li>
      <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Madrasah&quot;'><span class='nav-icon'>&#127963;</span> Madrasah</a></li>
    </ul>
  </div>

  <div class='sidebar-section'>
    <span class='sidebar-section-title'>Populer</span>
    <div id='popularPosts'>
      <b:section class='popular' id='popular-section' maxwidgets='1'>
        <b:widget id='PopularPosts1' locked='false' title='Populer' type='PopularPosts' version='2'>
          <b:widget-settings>
            <b:widget-setting name='numItemsToShow'>5</b:widget-setting>
            <b:widget-setting name='showThumbnails'>true</b:widget-setting>
            <b:widget-setting name='showSnippets'>false</b:widget-setting>
            <b:widget-setting name='timeRange'>LAST_MONTH</b:widget-setting>
          </b:widget-settings>
          <b:includable id='main' var='this'>
            <b:loop values='data:posts' var='post'>
              <div class='popular-item'>
                <b:if cond='data:post.featuredImage'>
                  <img class='pop-thumb' expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 120, &quot;1:1&quot;)'/>
                </b:if>
                <div>
                  <a class='pop-title' expr:href='data:post.url'><data:post.title/></a>
                  <div class='pop-date'><data:post.date/></div>
                </div>
              </div>
            </b:loop>
          </b:includable>
        </b:widget>
      </b:section>
    </div>
  </div>
</aside>

<!-- ============ TOPBAR ============ -->
<header class='topbar'>
  <button class='mobile-menu-btn' onclick='openSidebar()'>&#9776;</button>
  <a class='topbar-logo' expr:href='data:blog.homepageUrl'><data:blog.title/></a>
  <nav class='topbar-nav'>
    <a href='/'>Beranda</a>
    <a expr:href='data:blog.homepageUrl + &quot;search/label/Pendidikan&quot;'>Pendidikan</a>
    <a expr:href='data:blog.homepageUrl + &quot;search/label/Kurikulum&quot;'>Kurikulum</a>
    <a expr:href='data:blog.homepageUrl + &quot;search/label/Tutorial&quot;'>Tutorial</a>
  </nav>
  <div class='topbar-actions'>
    <div class='search-box'>
      <form expr:action='data:blog.searchUrl' method='get'>
        <input name='q' placeholder='Cari artikel...' type='text'/>
        <span class='search-icon'>&#128269;</span>
      </form>
    </div>
    <button class='theme-toggle' id='themeToggle' onclick='toggleDarkMode()' title='Dark Mode'>&#127769;</button>
  </div>
</header>

<!-- ============ MAIN WRAPPER ============ -->
<div class='main-wrapper'>
  <div class='content-area'>
    <div class='main-content'>

      <!-- === HOMEPAGE: 5 GRID STYLES === -->
      <b:if cond='data:blog.pageType == &quot;index&quot;'>

        <!-- GRID 1: BENTO BOX -->
        <div class='grid-section' id='bentoSection'>
          <div class='grid-section-header'>
            <h2 class='grid-section-title'>Pendidikan</h2>
            <a class='view-all' expr:href='data:blog.homepageUrl + &quot;search/label/Pendidikan&quot;'>Lihat Semua &#8594;</a>
          </div>
          <div class='bento-grid' id='bentoGrid'>
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- GRID 2: EDITORIAL / MAGAZINE (HERO) -->
        <div class='grid-section' id='editorialSection'>
          <div class='grid-section-header'>
            <h2 class='grid-section-title'>Kurikulum</h2>
            <a class='view-all' expr:href='data:blog.homepageUrl + &quot;search/label/Kurikulum&quot;'>Lihat Semua &#8594;</a>
          </div>
          <div class='editorial-grid' id='editorialGrid'>
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- GRID 3: JUSTIFIED / TILED (FLICKR) -->
        <div class='grid-section' id='justifiedSection'>
          <div class='grid-section-header'>
            <h2 class='grid-section-title'>Materi</h2>
            <a class='view-all' expr:href='data:blog.homepageUrl + &quot;search/label/Materi&quot;'>Lihat Semua &#8594;</a>
          </div>
          <div class='justified-grid' id='justifiedGrid'>
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- GRID 4: SQUARE (INSTAGRAM) -->
        <div class='grid-section' id='squareSection'>
          <div class='grid-section-header'>
            <h2 class='grid-section-title'>Tutorial</h2>
            <a class='view-all' expr:href='data:blog.homepageUrl + &quot;search/label/Tutorial&quot;'>Lihat Semua &#8594;</a>
          </div>
          <div class='square-grid' id='squareGrid'>
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- GRID 5: OVERLAPPING / ASYMMETRIC -->
        <div class='grid-section' id='asymSection'>
          <div class='grid-section-header'>
            <h2 class='grid-section-title'>Madrasah</h2>
            <a class='view-all' expr:href='data:blog.homepageUrl + &quot;search/label/Madrasah&quot;'>Lihat Semua &#8594;</a>
          </div>
          <div class='asym-grid' id='asymGrid'>
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- LATEST ARTICLE CARDS (UX white cards) -->
        <div class='grid-section'>
          <div class='grid-section-header'>
            <h2 class='grid-section-title'>Artikel Terbaru</h2>
          </div>
        </div>

      </b:if>

      <!-- === BLOG POSTS === -->
      <b:section class='main' id='main-section' maxwidgets='1' showaddelement='no'>
        <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' version='2'>
          <b:widget-settings>
            <b:widget-setting name='showDateHeader'>false</b:widget-setting>
            <b:widget-setting name='style.textcolor'>#1e3a5f</b:widget-setting>
          </b:widget-settings>
          <b:includable id='main' var='this'>

            <!-- INDEX PAGE: Article Cards -->
            <b:if cond='data:blog.pageType == &quot;index&quot;'>
              <div class='article-cards-grid'>
                <b:loop values='data:posts' var='post'>
                  <article class='article-card'>
                    <a expr:href='data:post.url'>
                      <b:if cond='data:post.featuredImage'>
                        <img class='card-thumb' expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 600, &quot;16:9&quot;)'/>
                      <b:else/>
                        <img alt='No Image' class='card-thumb' src='https://via.placeholder.com/600x340/1a8a9e/ffffff?text=Pena+Edukasi'/>
                      </b:if>
                    </a>
                    <div class='card-body'>
                      <b:if cond='data:post.labels'>
                        <b:loop index='i' values='data:post.labels' var='label'>
                          <b:if cond='data:i == 0'>
                            <span class='category-tag'><data:label.name/></span>
                          </b:if>
                        </b:loop>
                      </b:if>
                      <a expr:href='data:post.url'>
                        <h3 class='card-title'><data:post.title/></h3>
                      </a>
                      <p class='card-excerpt'><data:post.snippets.short/></p>
                      <div class='card-meta'>
                        <span><data:post.author/></span>
                        <span><data:post.date/></span>
                      </div>
                    </div>
                  </article>
                </b:loop>
              </div>
            </b:if>

            <!-- SINGLE POST PAGE -->
            <b:if cond='data:blog.pageType == &quot;item&quot;'>
              <b:loop values='data:posts' var='post'>
                <article class='post-wrapper'>
                  <nav class='breadcrumb'>
                    <a expr:href='data:blog.homepageUrl'>Beranda</a> &#8250;
                    <b:if cond='data:post.labels'>
                      <b:loop index='i' values='data:post.labels' var='label'>
                        <b:if cond='data:i == 0'>
                          <a expr:href='data:label.url'><data:label.name/></a> &#8250;
                        </b:if>
                      </b:loop>
                    </b:if>
                    <span><data:post.title/></span>
                  </nav>

                  <h1 class='post-title-single'><data:post.title/></h1>
                  <div class='post-meta-single'>
                    <span>&#9998; <data:post.author/></span>
                    <span>&#128197; <data:post.date/></span>
                    <b:if cond='data:post.labels'>
                      <b:loop index='i' values='data:post.labels' var='label'>
                        <b:if cond='data:i == 0'>
                          <span class='category-tag'><data:label.name/></span>
                        </b:if>
                      </b:loop>
                    </b:if>
                  </div>

                  <b:if cond='data:post.featuredImage'>
                    <img class='post-featured-img' expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 1200, &quot;16:9&quot;)'/>
                  </b:if>

                  <div class='post-body'>
                    <data:post.body/>
                  </div>

                  <b:if cond='data:post.labels'>
                    <div class='post-tags'>
                      <b:loop values='data:post.labels' var='label'>
                        <a expr:href='data:label.url'>#<data:label.name/></a>
                      </b:loop>
                    </div>
                  </b:if>

                  <!-- RELATED POSTS (3 items) -->
                  <div class='related-section'>
                    <h3>Artikel Terkait</h3>
                    <div class='related-grid' id='relatedPosts'>
                      <!-- Populated by JS using label -->
                    </div>
                  </div>

                  <!-- Comments -->
                  <div style='margin-top:40px;'>
                    <b:include name='comments' data='post'/>
                  </div>

                </article>
              </b:loop>
            </b:if>

          </b:includable>
          <b:includable id='comments' var='post'>
            <div class='comments-section'>
              <b:if cond='data:post.allowComments'>
                <h3 style='font-family:var(--font-serif);font-size:1.3rem;margin-bottom:16px;'>Komentar</h3>
                <div id='comments'><data:post.commentHtml/></div>
                <div id='comment-form'><data:post.commentFormHtml/></div>
              </b:if>
            </div>
          </b:includable>
        </b:widget>
      </b:section>

    </div>

    <!-- ============ SIDEBAR RIGHT (STICKY) ============ -->
    <aside class='sidebar-right'>
      <div class='sidebar-right-inner'>
        <div class='sidebar-section'>
          <span class='sidebar-section-title'>Tentang Blog</span>
          <p style='font-size:0.85rem;color:var(--text-secondary);line-height:1.6;'>
            Portal edukasi untuk membangun generasi cerdas dan berakhlak mulia melalui konten berkualitas.
          </p>
        </div>
        <div class='sidebar-section'>
          <span class='sidebar-section-title'>Label / Kategori</span>
          <b:section class='labels' id='label-section' maxwidgets='1'>
            <b:widget id='Label1' locked='false' title='Label' type='Label' version='2'>
              <b:widget-settings>
                <b:widget-setting name='sorting'>ALPHA</b:widget-setting>
                <b:widget-setting name='display'>CLOUD</b:widget-setting>
                <b:widget-setting name='showType'>CLOUD</b:widget-setting>
              </b:widget-settings>
              <b:includable id='main' var='this'>
                <div class='tag-cloud'>
                  <b:loop values='data:labels' var='label'>
                    <a expr:href='data:label.url'><data:label.name/></a>
                  </b:loop>
                </div>
              </b:includable>
            </b:widget>
          </b:section>
        </div>
        <div class='sidebar-section'>
          <span class='sidebar-section-title'>Arsip</span>
          <b:section class='archive' id='archive-section' maxwidgets='1'>
            <b:widget id='BlogArchive1' locked='false' title='Arsip' type='BlogArchive' version='2'>
              <b:widget-settings>
                <b:widget-setting name='showStyle'>FLAT</b:widget-setting>
                <b:widget-setting name='frequency'>MONTHLY</b:widget-setting>
              </b:widget-settings>
              <b:includable id='main' var='this'>
                <ul style='list-style:none;font-size:0.84rem;'>
                  <b:loop values='data:data' var='i'>
                    <li style='padding:6px 0;border-bottom:1px solid var(--border-color);'>
                      <a expr:href='data:i.url' style='color:var(--text-secondary);'><data:i.name/> (<data:i.postCount/>)</a>
                    </li>
                  </b:loop>
                </ul>
              </b:includable>
            </b:widget>
          </b:section>
        </div>
      </div>
    </aside>

  </div>

  <!-- ============ FOOTER ============ -->
  <footer class='footer-wrapper'>
    <div class='footer-inner'>
      <div class='footer-about'>
        <h3><data:blog.title/></h3>
        <p>Portal edukasi untuk membangun generasi cerdas dan berakhlak mulia. Menyajikan konten pendidikan berkualitas untuk semua.</p>
      </div>
      <div class='footer-links'>
        <h4>Kategori</h4>
        <ul>
          <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Pendidikan&quot;'>Pendidikan</a></li>
          <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Kurikulum&quot;'>Kurikulum</a></li>
          <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Materi&quot;'>Materi</a></li>
          <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Tutorial&quot;'>Tutorial</a></li>
          <li><a expr:href='data:blog.homepageUrl + &quot;search/label/Madrasah&quot;'>Madrasah</a></li>
        </ul>
      </div>
      <div class='footer-links'>
        <h4>Halaman</h4>
        <ul>
          <li><a href='/'>Beranda</a></li>
          <li><a href='/p/tentang.html'>Tentang</a></li>
          <li><a href='/p/kontak.html'>Kontak</a></li>
          <li><a href='/p/privacy-policy.html'>Kebijakan Privasi</a></li>
        </ul>
      </div>
    </div>
    <div class='footer-bottom'>
      &#169; <script>document.write(new Date().getFullYear())</script> <data:blog.title/>. All Rights Reserved.
    </div>
  </footer>

</div>

<!-- SCROLL TO TOP BUTTON -->
<button class='scroll-top-btn' id='scrollTopBtn' onclick='window.scrollTo({top:0,behavior:&quot;smooth&quot;})' title='Kembali ke Atas'>&#8593;</button>

<!-- ============ JAVASCRIPT ============ -->
<script>
//<![CDATA[

// === DARK MODE TOGGLE ===
function toggleDarkMode() {
  var body = document.body;
  var btn = document.getElementById('themeToggle');
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    btn.innerHTML = '&#9728;';
    localStorage.setItem('pe-theme', 'dark');
  } else {
    btn.innerHTML = '&#127769;';
    localStorage.setItem('pe-theme', 'light');
  }
}
// Load saved theme
(function() {
  var saved = localStorage.getItem('pe-theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    var btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = '&#9728;';
  }
})();

// === SCROLL TO TOP BUTTON ===
window.addEventListener('scroll', function() {
  var btn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// === MOBILE SIDEBAR ===
function openSidebar() {
  document.getElementById('sidebarLeft').classList.add('open');
  document.getElementById('mobileOverlay').classList.add('active');
}
function closeSidebar() {
  document.getElementById('sidebarLeft').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('active');
}

// === POPULATE GRIDS WITH BLOGGER FEEDS ===
function fetchFeed(label, count, callback) {
  var url = '/feeds/posts/summary/-/' + label + '?alt=json&max-results=' + count;
  var script = document.createElement('script');
  window['__feedCallback_' + label.replace(/\\s/g,'')] = function(data) {
    callback(data.feed.entry || []);
    delete window['__feedCallback_' + label.replace(/\\s/g,'')];
  };
  script.src = url + '&callback=__feedCallback_' + label.replace(/\\s/g,'');
  document.body.appendChild(script);
}

function getThumb(entry) {
  if (entry.media$thumbnail) return entry.media$thumbnail.url.replace(/\\/s72-c/,'/s600');
  var c = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');
  var m = c.match(/<img[^>]+src=["']([^"']+)/);
  return m ? m[1] : 'https://via.placeholder.com/600x400/1a8a9e/ffffff?text=Pena+Edukasi';
}
function getLink(entry) {
  for (var i = 0; i < entry.link.length; i++) {
    if (entry.link[i].rel === 'alternate') return entry.link[i].href;
  }
  return '#';
}
function getTitle(entry) { return entry.title.$t; }
function getCat(entry) {
  return entry.category ? entry.category[0].term : '';
}

function makeOverlayCard(entry, cls, large) {
  var titleCls = large ? 'grid-overlay-title lg' : 'grid-overlay-title';
  return '<a href="' + getLink(entry) + '" class="grid-overlay-card ' + cls + '">' +
    '<img src="' + getThumb(entry) + '" alt="' + getTitle(entry) + '"/>' +
    '<div class="grid-overlay"><span class="grid-cat">' + getCat(entry) + '</span>' +
    '<div class="' + titleCls + '">' + getTitle(entry) + '</div></div></a>';
}

// Bento Grid
fetchFeed('Pendidikan', 5, function(entries) {
  var g = document.getElementById('bentoGrid');
  if (!g || entries.length < 1) return;
  var html = '';
  for (var i = 0; i < Math.min(entries.length, 5); i++) {
    html += makeOverlayCard(entries[i], 'bento-' + (i+1), i === 0);
  }
  g.innerHTML = html;
});

// Editorial Grid
fetchFeed('Kurikulum', 5, function(entries) {
  var g = document.getElementById('editorialGrid');
  if (!g || entries.length < 1) return;
  var html = makeOverlayCard(entries[0], 'ed-hero', true);
  if (entries[1]) html += makeOverlayCard(entries[1], 'ed-2', false);
  if (entries[2]) html += makeOverlayCard(entries[2], 'ed-3', false);
  g.innerHTML = html;
  // extra row
  if (entries.length > 3) {
    var extra = document.createElement('div');
    extra.className = 'editorial-extra';
    var eh = '';
    for (var i = 3; i < Math.min(entries.length, 5); i++) {
      eh += makeOverlayCard(entries[i], '', false);
    }
    extra.innerHTML = eh;
    g.parentNode.appendChild(extra);
  }
});

// Justified Grid
fetchFeed('Materi', 5, function(entries) {
  var g = document.getElementById('justifiedGrid');
  if (!g || entries.length < 1) return;
  var html = '';
  for (var i = 0; i < Math.min(entries.length, 5); i++) {
    html += makeOverlayCard(entries[i], 'j-item', false);
  }
  g.innerHTML = html;
});

// Square Grid
fetchFeed('Tutorial', 5, function(entries) {
  var g = document.getElementById('squareGrid');
  if (!g || entries.length < 1) return;
  var html = '';
  for (var i = 0; i < Math.min(entries.length, 5); i++) {
    html += '<a href="' + getLink(entries[i]) + '" class="sq-item">' +
      '<img src="' + getThumb(entries[i]) + '" alt="' + getTitle(entries[i]) + '"/>' +
      '<div class="sq-overlay"><span>' + getTitle(entries[i]) + '</span></div></a>';
  }
  g.innerHTML = html;
});

// Asymmetric Grid
fetchFeed('Madrasah', 5, function(entries) {
  var g = document.getElementById('asymGrid');
  if (!g || entries.length < 1) return;
  var html = '';
  var cls = ['asym-1','asym-2','asym-3','asym-4','asym-5'];
  for (var i = 0; i < Math.min(entries.length, 5); i++) {
    html += makeOverlayCard(entries[i], cls[i] || '', i === 0);
  }
  g.innerHTML = html;
});

// === RELATED POSTS (3 items) ===
(function() {
  var container = document.getElementById('relatedPosts');
  if (!container) return;
  // Get current post label
  var cats = document.querySelectorAll('.post-tags a');
  var label = '';
  if (cats.length > 0) {
    label = cats[0].textContent.replace('#','').trim();
  }
  if (!label) return;

  var url = '/feeds/posts/summary/-/' + encodeURIComponent(label) + '?alt=json&max-results=4';
  var currentUrl = window.location.href;

  var script = document.createElement('script');
  window.__relatedCallback = function(data) {
    var entries = data.feed.entry || [];
    var html = '';
    var count = 0;
    for (var i = 0; i < entries.length && count < 3; i++) {
      var link = getLink(entries[i]);
      if (link === currentUrl) continue;
      html += '<a href="' + link + '" class="related-card">' +
        '<img src="' + getThumb(entries[i]) + '" alt="' + getTitle(entries[i]) + '"/>' +
        '<h4>' + getTitle(entries[i]) + '</h4></a>';
      count++;
    }
    container.innerHTML = html;
    delete window.__relatedCallback;
  };
  script.src = url + '&callback=__relatedCallback';
  document.body.appendChild(script);
})();

//]]>
</script>

</body>
</html>`

  return new NextResponse(xmlTemplate, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Disposition": 'attachment; filename="PenaEdukasi-Modern-Blogger-Template.xml"',
    },
  })
}
