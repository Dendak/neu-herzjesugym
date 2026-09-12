import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Vorläufig unter dendak.github.io/neu-herzjesugym/, später unter neu.herzjesugym.com (BASE_PATH=/)
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: process.env.BASE_PATH ?? (mode === 'production' ? '/neu-herzjesugym/' : '/'),
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
}));
