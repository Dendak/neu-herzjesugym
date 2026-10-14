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
- `scripts/` – `postbuild.mjs`, `deploy.sh` (Notlösung), `switch-domain.sh` (siehe Deployment).
- `.github/workflows/deploy.yml` – automatischer Deploy bei Push auf `main`.

## Befehle
- `npm ci` – Abhängigkeiten installieren (Node 24 lokal).
- `npm run dev` – Entwicklungsserver (Basis `/`), lädt echte Inhalte aus dem Live-WordPress.
- `npm run build` – `tsc -b` + `vite build` + `postbuild.mjs` (kopiert `index.html` → `404.html`
  als SPA-Fallback, legt `.nojekyll` und `.build-stamp` an). Ohne `BASE_PATH` ist die Basis
  `/neu-herzjesugym/` (alter Pfad unter dendak.github.io) – für die Live-Domain falsch.
- `npm run lint`, `npm run preview`.

## Deployment
GitHub Pages (legacy) aus dem Branch **`gh-pages`**, Root, Custom Domain `neu.herzjesugym.com`,
HTTPS erzwungen. Repo `Dendak/neu-herzjesugym` (öffentlich).

**Jeder Push auf `main` geht automatisch live.** Der Workflow `.github/workflows/deploy.yml` baut
mit `BASE_PATH=/` (`npm ci` + `npm run build`), schreibt `dist/CNAME` und force-pusht `dist/` als
einzelnen Commit nach `gh-pages` (mit `GITHUB_TOKEN`, keine eigenen Secrets nötig). Danach baut
GitHubs `pages-build-deployment` die Seite. Pushes, die nur `docs/**`, `CLAUDE.md` oder `README.md`
ändern, lösen keinen Deploy aus; von Hand geht es über „Run workflow" (`workflow_dispatch`).

Regel: Jede abgeschlossene Änderung sofort committen und auf `main` pushen (vorher
`git pull --rebase`, lokal `npm run build`) – sie geht damit live, ohne Rückfrage. Nach dem Deploy
prüfen, ob https://neu.herzjesugym.com/ lädt. Nur anhalten bei Kollision (Konflikt, abgelehnter
Push, fremde uncommittete Änderungen, fehlgeschlagener Build/Deploy).

Notlösung, falls Actions nicht laufen:
```bash
bash scripts/deploy.sh neu.herzjesugym.com
```
Macht dasselbe lokal (Token über `gh auth token`). `switch-domain.sh` war die einmalige Umstellung
auf die eigene Domain (erledigt 2026-09-12) und wird nicht mehr gebraucht.

## Vorsicht
- `deploy.sh` **immer mit** `neu.herzjesugym.com` aufrufen. Ohne Argument entsteht ein Build mit
  Basis `/neu-herzjesugym/` und ohne `CNAME` → Assets laden nicht, Pages verliert die Custom Domain.
- `deploy.sh` baut den aktuellen Arbeitsstand, auch Uncommittetes – der nächste Push auf `main`
  überschreibt es wieder. `gh-pages` wird jedes Mal überschrieben (keine Historie).
- `npm run lint` hat derzeit 2 Fehler (`react-hooks/set-state-in-effect`); der Deploy prüft nur den Build.
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
- Push auf `main` = live (GitHub Actions). Keine Branches/PRs nur wegen des Deploys.
