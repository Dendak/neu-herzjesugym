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
        // Farben des MSC-Logos (Herz-Jesu-Missionare): Rot, Weiß, Schwarz
        msc: { DEFAULT: '#cb1726', 50: '#fdf0f2', 100: '#fbe0e5', 200: '#f6bcc6', 300: '#ef8a9a', 400: '#e0364f', 600: '#a80d26', 700: '#8c0b20', 800: '#6d0819', 900: '#4a0511' },
        coal: { DEFAULT: '#171717', 50: '#f6f6f6', 100: '#ececec', 200: '#d6d6d6', 300: '#b3b3b3', 400: '#8a8a8a', 600: '#4b4b4b', 700: '#353535', 800: '#262626', 900: '#171717', 950: '#0c0c0c' },
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
            '--tw-prose-quote-borders': '#cb1726',
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
