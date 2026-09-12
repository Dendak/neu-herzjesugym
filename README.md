# neu.herzjesugym.com – neue Website des Privatgymnasiums der Herz-Jesu-Missionare

Moderner, responsiver Auftritt, der seine Inhalte **live aus dem bestehenden WordPress**
(www.herzjesugym.com, REST-API `/wp-json/wp/v2`) bezieht. Es gibt kein zweites Redaktionssystem:
Was im WordPress veröffentlicht wird, erscheint automatisch auch hier.

- Stack: Vite + React 19 + TypeScript + Tailwind CSS 3, React Router (Browser-Routing, `404.html`-Fallback für GitHub Pages)
- Inhalte: Beiträge, Seiten, Kategorien, Suche – alles zur Laufzeit aus der WordPress-API (Cache 5 Minuten im Browser)
- Navigation: `src/lib/nav.ts` (die WordPress-Menü-API ist nicht öffentlich)
- Links aus WordPress-Inhalten auf die alte Website werden clientseitig auf die neuen Routen umgeschrieben (`src/lib/html.ts`)

## Entwicklung

```bash
npm install
npm run dev
```

## Build & Deploy (GitHub Pages, Branch `gh-pages`)

```bash
npm run build            # baut nach dist/ (Basis-Pfad /neu-herzjesugym/)
BASE_PATH=/ npm run build # für die eigene Domain neu.herzjesugym.com
```

Danach den Inhalt von `dist/` in den Branch `gh-pages` pushen.
