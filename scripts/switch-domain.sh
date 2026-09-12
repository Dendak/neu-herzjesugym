#!/usr/bin/env bash
# Wartet, bis neu.herzjesugym.com per CNAME auf dendak.github.io zeigt, und schaltet dann
# GitHub Pages auf die eigene Domain um (Custom Domain, Build mit BASE_PATH=/, HTTPS erzwingen).
set -uo pipefail
cd "$(dirname "$0")/.."
DOMAIN=neu.herzjesugym.com
MAX=${1:-720}   # Versuche à 60 s (Standard: 12 Stunden)
for i in $(seq 1 "$MAX"); do
  if nslookup -type=CNAME "$DOMAIN" 8.8.8.8 2>/dev/null | grep -qi "dendak.github.io"; then
    echo "$(date -u +%FT%TZ) CNAME gefunden (Versuch $i) – schalte um"
    gh api -X PUT repos/Dendak/neu-herzjesugym/pages -f cname="$DOMAIN" && echo "custom domain gesetzt"
    bash scripts/deploy.sh "$DOMAIN"
    for j in $(seq 1 60); do
      st=$(gh api repos/Dendak/neu-herzjesugym/pages --jq '.https_certificate.state // "none"' 2>/dev/null)
      echo "$(date -u +%FT%TZ) zertifikat: $st"
      [ "$st" = "approved" ] && break
      sleep 30
    done
    gh api -X PUT repos/Dendak/neu-herzjesugym/pages -F https_enforced=true && echo "https erzwungen"
    curl -sI "https://$DOMAIN/" | head -1
    echo DONE; exit 0
  fi
  [ $((i % 10)) -eq 1 ] && echo "$(date -u +%FT%TZ) warte auf CNAME ($i/$MAX): $(nslookup "$DOMAIN" 8.8.8.8 2>/dev/null | tail -2 | tr '\n' ' ')"
  sleep 60
done
echo "$(date -u +%FT%TZ) abgebrochen – kein CNAME"; exit 1
