# Notizen – neu.herzjesugym.com

## Offen / nächste Schritte
- Woran als Nächstes gearbeitet wird, ist noch offen (mit dem Nutzer klären).
- `README.md` an den aktuellen Stand anpassen (eigene Domain, Deploy per GitHub Actions, `npm ci`).
- Die 2 Lint-Fehler (`react-hooks/set-state-in-effect`) beheben.
- Später: `noindex` in `index.html` entfernen, wenn die neue Seite die alte ersetzt.

## Verlauf

### 2026-10-14 – Automatischer Deploy
- Neue Regel: jede Änderung sofort auf `main` und live. Dafür `.github/workflows/deploy.yml`:
  baut bei Push auf `main` mit `BASE_PATH=/` und force-pusht `dist/` inkl. `CNAME` nach `gh-pages`
  (`GITHUB_TOKEN`, keine Pages-Einstellung geändert, keine Secrets). `deploy.sh` nur noch Notlösung.
- `CLAUDE.md` angepasst („nur auf ausdrücklichen Wunsch" / „main deployt nicht" entfernt).
- `npm run lint` hat 2 bestehende Fehler (`react-hooks/set-state-in-effect`), Build ist sauber.

### 2026-10-13 – Gerätewechsel, Stand unverändert
- Neues Windows-Gerät eingerichtet: Repo geklont, `git pull` aktuell, am Code nichts geändert, nichts deployt.
- Geprüft: Für Build oder Deploy fehlen **keine** lokalen, gitignorierten Dateien. Es gibt keine `.env`,
  keine Config-JSON und keine Schlüsseldatei; die einzige Variable `BASE_PATH` setzt `deploy.sh` selbst.
  Für den Deploy reicht `gh auth token`; `gh` war dort als Dendak angemeldet.
- Auf jenem Gerät fehlte Node.js (weder in Git Bash noch in PowerShell, kein `C:\Program Files\nodejs`).
  Auf einem neuen Gerät also zuerst Node 24 installieren, dann `npm ci`.

### 2026-10-07
- Repo nach `C:\Users\holub\code\neu-herzjesugym` geklont (vorher in OneDrive unter „Radtour 2026";
  die Kopie dort ist sauber und vollständig auf GitHub, wird nicht mehr benutzt).
- `CLAUDE.md` und `docs/POZNAMKY.md` angelegt.
- Stand bei Übernahme: `main` = `4af8c81` (2026-09-12, „WP-REST: no-store und 5-Minuten-Versionsparameter …").
  Live-Deploy auf `gh-pages` = `2b026a0` vom 2026-09-12 17:40 UTC mit eigener Domain; enthält diesen Stand.
- Geprüft: Pages baut aus `gh-pages`, kein eigener Workflow – ein Push auf `main` deployt nicht.
