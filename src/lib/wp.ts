// Zugriff auf die WordPress-REST-API der bestehenden Website (herzjesugym.com).
export const WP_ORIGIN = 'https://www.herzjesugym.com';
const API = `${WP_ORIGIN}/wp-json/wp/v2`;

export interface Rendered { rendered: string }
export interface WpPost {
  id: number; slug: string; date: string; modified: string; link: string;
  title: Rendered; excerpt: Rendered; content: Rendered; categories: number[];
}
export interface WpPage {
  id: number; slug: string; date: string; modified: string; link: string;
  title: Rendered; content: Rendered; parent: number; menu_order: number;
}
export interface WpCategory { id: number; slug: string; name: string; count: number; parent: number; description: string }

const POST_FIELDS = 'id,slug,date,modified,link,title,excerpt,content,categories';
const PAGE_FIELDS = 'id,slug,date,modified,link,title,content,parent,menu_order';
const PAGE_LIST_FIELDS = 'id,slug,title,parent,menu_order,link,modified';

const TTL = 5 * 60 * 1000; // 5 Minuten – danach wird neu geladen
type Result<T> = { data: T; total: number };
const mem = new Map<string, Promise<Result<unknown>>>();

async function getJson<T>(path: string, params: Record<string, string | number | undefined>): Promise<Result<T>> {
  const url = new URL(`${API}/${path}`);
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
  const key = url.toString();
  const hit = mem.get(key);
  if (hit) return hit as Promise<Result<T>>;
  const p = (async (): Promise<Result<T>> => {
    try {
      const raw = sessionStorage.getItem('wp:' + key);
      if (raw) {
        const c = JSON.parse(raw) as { t: number; data: T; total: number };
        if (Date.now() - c.t < TTL) return { data: c.data, total: c.total };
      }
    } catch { /* kein Storage verfügbar */ }
    const res = await fetch(key, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`WordPress antwortet mit Status ${res.status}`);
    const data = (await res.json()) as T;
    const total = Number(res.headers.get('X-WP-Total') ?? (Array.isArray(data) ? data.length : 1));
    try { sessionStorage.setItem('wp:' + key, JSON.stringify({ t: Date.now(), data, total })); } catch { /* Speicher voll */ }
    return { data, total };
  })();
  p.catch(() => mem.delete(key));
  mem.set(key, p as Promise<Result<unknown>>);
  return p;
}

export interface PostQuery { page?: number; perPage?: number; categories?: number[]; search?: string; exclude?: number[] }
export async function fetchPosts(q: PostQuery = {}) {
  const perPage = q.perPage ?? 12;
  const { data, total } = await getJson<WpPost[]>('posts', {
    page: q.page ?? 1, per_page: perPage, categories: q.categories?.join(','), search: q.search,
    exclude: q.exclude?.join(','), _fields: POST_FIELDS,
  });
  return { items: data, total, totalPages: Math.max(1, Math.ceil(total / perPage)) };
}
export async function fetchPostBySlug(slug: string) {
  const { data } = await getJson<WpPost[]>('posts', { slug, _fields: POST_FIELDS });
  return data[0] ?? null;
}
export async function fetchPages() {
  const { data } = await getJson<WpPage[]>('pages', { per_page: 100, _fields: PAGE_LIST_FIELDS });
  return data;
}
export async function fetchPageBySlug(slug: string) {
  const { data } = await getJson<WpPage[]>('pages', { slug, _fields: PAGE_FIELDS });
  return data[0] ?? null;
}
export async function fetchPagesByParent(parent: number) {
  const { data } = await getJson<WpPage[]>('pages', { parent, per_page: 100, orderby: 'title', order: 'asc', _fields: PAGE_FIELDS });
  return data;
}
export async function fetchCategories() {
  const { data } = await getJson<WpCategory[]>('categories', { per_page: 100, orderby: 'count', order: 'desc', hide_empty: 'true' });
  return data;
}
export async function searchAll(search: string) {
  const [posts, pages] = await Promise.all([
    fetchPosts({ search, perPage: 20 }),
    getJson<WpPage[]>('pages', { search, per_page: 20, _fields: PAGE_LIST_FIELDS }),
  ]);
  return { posts: posts.items, pages: pages.data };
}

// ---- Hilfsfunktionen für gerendertes HTML ----
function inert(html: string) {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content;
}
export function decodeHtml(s: string) {
  const t = document.createElement('textarea');
  t.innerHTML = s;
  return t.value;
}
export function stripHtml(html: string) {
  return (inert(html).textContent ?? '').replace(/\s+/g, ' ').trim();
}
export function textExcerpt(html: string, max = 160) {
  const t = stripHtml(html);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 40)).trim() + ' …';
}
/** Erstes Bild eines Beitrags (die Beiträge haben keine Beitragsbilder, nur Bilder im Text). */
export function firstImage(html: string, targetW = 800): string | null {
  const root = inert(html);
  const img = root.querySelector('img');
  if (img) {
    const srcset = img.getAttribute('srcset');
    if (srcset) {
      const cands = srcset
        .split(',')
        .map((s) => s.trim().split(/\s+/))
        .map(([u, w]) => ({ u, w: parseInt(w ?? '0', 10) || 0 }))
        .filter((c) => c.u);
      cands.sort((a, b) => a.w - b.w);
      const ok = cands.find((c) => c.w >= targetW) ?? cands[cands.length - 1];
      if (ok) return ok.u;
    }
    return img.getAttribute('src');
  }
  const video = root.querySelector('video[poster]');
  return video?.getAttribute('poster') ?? null;
}
/** Erstes Video eines Beitrags (für Vorschaubilder, wenn kein Bild vorhanden ist). */
export function firstVideo(html: string): string | null {
  const root = inert(html);
  const v = root.querySelector('video');
  return v?.getAttribute('src') ?? v?.querySelector('source')?.getAttribute('src') ?? null;
}
export function hasVideo(html: string) {
  return /<video|youtube\.com\/embed|youtu\.be/.test(html);
}
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Date(iso).toLocaleDateString('de-AT', opts);
}
export function categoryNames(post: WpPost, cats: WpCategory[] | undefined) {
  if (!cats) return [];
  return post.categories.map((id) => cats.find((c) => c.id === id)).filter((c): c is WpCategory => !!c);
}
