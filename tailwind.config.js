import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Rot aus dem MSC-Logo; sonst Schwarz, Weiß und neutrale Grautöne
        msc: { DEFAULT: '#cb1726', 50: '#fdf0f2', 100: '#fbe0e5', 300: '#ef8a9a', 400: '#e0364f', 600: '#a80d26', 700: '#8c0b20' },
        surface: 'rgb(var(--surface) / <alpha-value>)',
        alt: 'rgb(var(--alt) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        brand: 'rgb(var(--brand) / <alpha-value>)',
      },
      maxWidth: { text: '43.75rem', page: '61.25rem', wide: '75rem' },
      letterSpacing: { tighter2: '-0.028em', tight2: '-0.018em' },
      boxShadow: {
        img: '0 2px 12px rgba(0,0,0,0.06), 0 24px 48px -24px rgba(0,0,0,0.18)',
        panel: '0 30px 60px -20px rgba(0,0,0,0.35)',
      },
      transitionTimingFunction: { apple: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
      keyframes: {
        rise: { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fade: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      },
      animation: { rise: 'rise .8s cubic-bezier(0.25,0.1,0.25,1) both', fade: 'fade .6s ease-out both' },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--ink))',
            '--tw-prose-headings': 'rgb(var(--ink))',
            '--tw-prose-links': 'rgb(var(--brand))',
            '--tw-prose-bold': 'rgb(var(--ink))',
            '--tw-prose-counters': 'rgb(var(--muted))',
            '--tw-prose-bullets': 'rgb(var(--line))',
            '--tw-prose-hr': 'rgb(var(--line))',
            '--tw-prose-quotes': 'rgb(var(--ink))',
            '--tw-prose-quote-borders': 'rgb(var(--line))',
            '--tw-prose-captions': 'rgb(var(--muted))',
            '--tw-prose-th-borders': 'rgb(var(--line))',
            '--tw-prose-td-borders': 'rgb(var(--line))',
            maxWidth: 'none',
            fontSize: '1.0625rem',
            lineHeight: '1.55',
            a: { textDecoration: 'none', fontWeight: '400', '&:hover': { textDecoration: 'underline' } },
            'h1, h2, h3, h4': { letterSpacing: '-0.018em', fontFamily: '"Inter Tight", "Inter", system-ui, sans-serif' },
            h2: { fontSize: '1.75em', marginTop: '1.8em', marginBottom: '0.6em', lineHeight: '1.15' },
            h3: { fontSize: '1.3em', marginTop: '1.6em', marginBottom: '0.5em' },
            img: { borderRadius: '1.125rem' },
            figure: { marginTop: '2em', marginBottom: '2em' },
            'figure figcaption': { fontSize: '0.8rem', marginTop: '0.75em' },
            blockquote: { fontStyle: 'normal', fontWeight: '400' },
            strong: { fontWeight: '600' },
          },
        },
        lg: {
          css: { fontSize: '1.1875rem', lineHeight: '1.5' },
        },
      }),
    },
  },
  plugins: [typography],
};
