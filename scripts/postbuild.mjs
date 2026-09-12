// GitHub Pages: SPA-Fallback (404.html = index.html) und kein Jekyll
import { copyFileSync, writeFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
writeFileSync('dist/.nojekyll', '');
writeFileSync('dist/.build-stamp', new Date().toISOString());
console.log('postbuild ok');
