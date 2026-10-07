# CLAUDE.md – neu.herzjesugym.com

## Zweck
Neue Website des Privatgymnasiums der Herz-Jesu-Missionare Salzburg. Headless: alle Inhalte
(Beiträge, Seiten, Kategorien, Suche) kommen zur Laufzeit aus dem bestehenden WordPress
(https://www.herzjesugym.com, REST-API `/wp-json/wp/v2`). Kein zweites Redaktionssystem –
was im WordPress veröffentlicht wird, erscheint auch hier. Live unter https://neu.herzjesugym.com/
(noch `noindex`, die alte Website bleibt vorerst die offizielle).

## Stack
Vite 8 + React 19 + TypeScript + Tailwind CSS 3 (+ typography), React Router 7 (Browser-Routing),
lucide-react. Reines Frontend, kein Server, keine Tests. Alias `@` → `src/`.

## Struktur
- `src/App.tsx` – Routen: `/`, `/aktuelles`, `/aktuelles/:slug`, `/kategorie/:category`,
  `/fachbereiche`, `/seite/:slug`, `/termine`, `/suche`, `/links`, sonst NotFound.
- `src/lib/wp.ts` – WordPress-Zugriff (`fetchPosts`, `fetchPageBySlug`, `searchAll` …), Cache 5 Min.
  im Speicher + `sessionStorage`, `fetch` mit `no-store` und `_v`-Parameter (alle 5 Min. neu) gegen
  veraltete Antworten aus dem Server-Cache vor WordPress.
- `src/lib/nav.ts` – Navigation (`NAV`) und Schuldaten (`SCHOOL`: Adresse, Telefon, Links).
  Von Hand gepflegt, weil die WordPress-Menü-API nicht öffentlich ist.
- `src/lib/links.ts` – Linklisten „Intern"/„Nützliche Links" und Schwerpunkt-Kacheln (aus der alten Seitenleiste).
- `src/lib/partners.ts` – Partner-Logos (direkt aus `wp-content/uploads` verlinkt).
- `src/lib/html.ts` – schreibt Links auf die alte Website in Routen dieser Website um (`internalRoute`).
- `src/components/` – Layout, Header, Footer, PostCard, WpContent (rendert WordPress-HTML), ui.
- `src/pages/` – eine Datei pro Route.
- `public/` – Favicon, Touch-Icon, `hero-luftbild.jpg`, `logo-msc.png`.
- `scripts/` – `postbuild.mjs`, `deploy.sh`, `switch-domain.sh` (siehe Deployment).

## Befehle
- `npm ci` – Abhängigkeiten installieren (Node 24 lokal).
- `npm run dev` – Entwicklungsserver (Basis `/`), lädt echte Inhalte aus dem Live-WordPress.
- `npm run build` – `tsc -b` + `vite build` + `postbuild.mjs` (kopiert `index.html` → `404.html`
  als SPA-Fallback, legt `.nojekyll` und `.build-stamp` an). Ohne `BASE_PATH` ist die Basis
  `/neu-herzjesugym/` (alter Pfad unter dendak.github.io) – für die Live-Domain falsch.
- `npm run lint`, `npm run preview`.

## Deployment
GitHub Pages (legacy) aus dem Branch **`gh-pages`**, Root, Custom Domain `neu.herzjesugym.com`,
HTTPS erzwungen. Repo `Dendak/neu-herzjesugym` (öffentlich). Kein eigener GitHub-Actions-Workflow;
nur GitHubs automatisches `pages-build-deployment` reagiert auf Pushes nach `gh-pages`.
**Ein Push auf `main` deployt nicht.**

Live stellen (nur auf ausdrücklichen Wunsch):
```bash
bash scripts/deploy.sh neu.herzjesugym.com
```
Baut mit `BASE_PATH=/`, schreibt `dist/CNAME` und force-pusht `dist/` als einzelnen Commit nach
`gh-pages` (Token über `gh auth token`). `switch-domain.sh` war die einmalige Umstellung auf die
eigene Domain (erledigt 2026-09-12) und wird nicht mehr gebraucht.

## Vorsicht
- `deploy.sh` **immer mit** `neu.herzjesugym.com` aufrufen. Ohne Argument entsteht ein Build mit
  Basis `/neu-herzjesugym/` und ohne `CNAME` → Assets laden nicht, Pages verliert die Custom Domain.
- `deploy.sh` baut den aktuellen Arbeitsstand, auch Uncommittetes. Vorher committen und pushen,
  damit Live und `main` übereinstimmen. `gh-pages` wird jedes Mal überschrieben (keine Historie).
- Inhalte kommen live aus dem WordPress: Änderungen dort wirken sofort (bis 5 Min. Cache),
  ohne Deploy. Die WordPress-API ist öffentlich; es gibt keinen Schreibzugriff von hier.
- `index.html` enthält `<meta name="robots" content="noindex">` – erst entfernen, wenn die neue
  Seite die alte ersetzen soll.
- Repo ist öffentlich und alles im Frontend landet im Browser: keine Schlüssel, Passwörter oder
  internen Daten committen. Geheimnisse nur in GitHub Secrets oder einer lokalen `.env` (gitignored).
- `README.md` ist knapper und nennt noch den alten Basis-Pfad als Standard – im Zweifel gilt diese Datei.

## Arbeit über mehrere Geräte
- GitHub ist die Quelle der Wahrheit. Repo lokal unter `C:\Users\holub\code\neu-herzjesugym`, nie in OneDrive.
  (Eine alte Kopie liegt noch in OneDrive unter „Radtour 2026" – dort nicht mehr arbeiten.)
- Session-Start: `git pull`, dann diese Datei und [docs/POZNAMKY.md](docs/POZNAMKY.md) lesen.
- Session-Ende: `docs/POZNAMKY.md` aktualisieren (Offen + Verlauf, neueste oben), committen, pushen.
- `main` deployt nicht; live geht es nur über `deploy.sh`. Größere Umbauten trotzdem gern im Branch + PR.
