#!/usr/bin/env bash
# Baut die Website und veröffentlicht dist/ im Branch gh-pages.
#   scripts/deploy.sh                 -> Basis-Pfad /neu-herzjesugym/ (dendak.github.io/neu-herzjesugym/)
#   scripts/deploy.sh neu.herzjesugym.com -> Basis-Pfad / und CNAME-Datei für die eigene Domain
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN="${1:-}"
# Git-Bash wandelt "/" sonst in einen Windows-Pfad um (C:/Program Files/Git/)
export MSYS_NO_PATHCONV=1 MSYS2_ENV_CONV_EXCL=BASE_PATH
if [ -n "$DOMAIN" ]; then export BASE_PATH=/; fi
npm run build
[ -n "$DOMAIN" ] && echo "$DOMAIN" > dist/CNAME
TOKEN=$(gh auth token)
REPO="https://x-access-token:${TOKEN}@github.com/Dendak/neu-herzjesugym.git"
cd dist
rm -rf .git
git init -b gh-pages -q
git add -A
git -c user.name="Denis Holub" -c user.email="holubdenis@gmail.com" commit -q -m "deploy $(date -u +%Y-%m-%dT%H:%MZ) ${DOMAIN}"
git push -q --force "$REPO" gh-pages
rm -rf .git
echo "deployed: $(grep -o 'index-[A-Za-z0-9_-]*\.js' index.html)"
