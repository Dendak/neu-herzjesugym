import { WP_ORIGIN } from './wp';

const HOSTS = new Set(['www.herzjesugym.com', 'herzjesugym.com', 'herzjesugym.at', 'www.herzjesugym.at']);

/** Wandelt Links auf die alte Website in Routen dieser Website um. */
export function internalRoute(href: string): string | null {
  let u: URL;
  try { u = new URL(href, WP_ORIGIN); } catch { return null; }
  if (!HOSTS.has(u.hostname)) return null;
  const path = u.pathname;
  if (/^\/(wp-content|wp-admin|wp-login|wp-json|feed|index\.php)/.test(path)) return null;
  if (/\.(pdf|jpe?g|png|gif|webp|docx?|xlsx?|pptx?|mp4|zip)$/i.test(path)) return null;
  const seg = path.split('/').filter(Boolean);
  if (seg.length === 0) return '/';
  if (seg[0] === 'category') return '/kategorie/' + seg[seg.length - 1];
  if (seg[0] === 'calendar' || seg[0] === 'terminkalender') return '/termine';
  if (seg[0] === 'fachbereiche') return seg.length === 1 ? '/fachbereiche' : '/seite/' + seg[seg.length - 1];
  if (seg.length === 1) return '/seite/' + seg[0] + (u.hash || '');
  if (/^\d{4}$/.test(seg[0])) return '/aktuelles/' + seg[seg.length - 1];
  if (seg.length === 2) return '/aktuelles/' + seg[1];
  return null;
}

/** Bereitet WordPress-HTML für die Anzeige auf: Lazy-Loading, keine Autoplay-Videos, interne Links. */
export function prepareHtml(html: string, base: string): string {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  const root = tpl.content;
  root.querySelectorAll('script, style, link, noscript').forEach((n) => n.remove());
  root.querySelectorAll('img').forEach((img, i) => {
    // die ersten Bilder sofort laden (LCP), den Rest erst beim Scrollen
    img.setAttribute('loading', i < 2 ? 'eager' : 'lazy');
    img.setAttribute('decoding', 'async');
    if (i === 0) img.setAttribute('fetchpriority', 'high');
  });
  root.querySelectorAll('video').forEach((v) => {
    v.removeAttribute('autoplay');
    v.setAttribute('controls', '');
    v.setAttribute('preload', 'metadata');
    v.setAttribute('playsinline', '');
  });
  root.querySelectorAll('iframe').forEach((f) => {
    f.setAttribute('loading', 'lazy');
    f.removeAttribute('width');
    f.removeAttribute('height');
  });
  root.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    const r = internalRoute(href);
    if (r) {
      a.setAttribute('href', base + r);
      a.setAttribute('data-route', r);
    } else if (/^https?:/i.test(href)) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    }
  });
  // Serialisieren im inerten Dokument (keine Bild-Downloads beim Aufbereiten)
  const holder = root.ownerDocument.createElement('div');
  holder.append(...Array.from(root.childNodes));
  return holder.innerHTML;
}
