import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Barlow Condensed"', '"Inter"', 'sans-serif'],
      },
      colors: {
        // Farben aus dem Schulfolder: Marineblau, Weinrot, Sonnengelb
        navy: { DEFAULT: '#1e4a7a', 50: '#eef4fa', 100: '#d9e6f4', 200: '#b3cde8', 600: '#255a92', 700: '#1a3f68', 800: '#16345a', 900: '#0f2540', 950: '#091829' },
        wine: { DEFAULT: '#a3234b', 100: '#f8e3ea', 600: '#8d1d40', 700: '#74173a' },
        sun: { DEFAULT: '#f2cf3f', 100: '#fdf6d8', 300: '#f7df7a', 500: '#e5bd1d' },
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        brand: 'rgb(var(--brand) / <alpha-value>)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,0.04), 0 6px 16px -8px rgba(15,23,42,0.10)',
        card: '0 1px 3px rgba(15,23,42,0.05), 0 12px 28px -14px rgba(15,23,42,0.18)',
        lift: '0 8px 20px -6px rgba(15,23,42,0.14), 0 24px 48px -18px rgba(15,23,42,0.22)',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
      },
      animation: { 'fade-up': 'fadeUp .55s ease-out both', shimmer: 'shimmer 1.6s linear infinite' },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--ink))',
            '--tw-prose-headings': 'rgb(var(--ink))',
            '--tw-prose-links': 'rgb(var(--brand))',
            '--tw-prose-bold': 'rgb(var(--ink))',
            '--tw-prose-counters': 'rgb(var(--muted))',
            '--tw-prose-bullets': 'rgb(var(--muted))',
            '--tw-prose-hr': 'rgb(var(--line))',
            '--tw-prose-quotes': 'rgb(var(--ink))',
            '--tw-prose-quote-borders': '#f2cf3f',
            '--tw-prose-captions': 'rgb(var(--muted))',
            '--tw-prose-th-borders': 'rgb(var(--line))',
            '--tw-prose-td-borders': 'rgb(var(--line))',
            maxWidth: 'none',
            a: { textDecorationThickness: '1px', textUnderlineOffset: '3px', fontWeight: '500' },
            img: { borderRadius: '0.75rem' },
            'figure figcaption': { fontSize: '0.85rem' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
