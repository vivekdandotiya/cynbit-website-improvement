/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cynbit: {
          bg: '#090D16',
          card: '#0F172A',
          cardHover: '#1E293B',
          primary: '#6366F1',      // Electric Indigo
          primaryHover: '#4F46E5',
          secondary: '#06B6D4',    // Cyan / Teal
          secondaryHover: '#0891B2',
          tertiary: '#F59E0B',     // Amber
          tertiaryHover: '#D97706',
          surface: '#111827',
          surfaceLight: '#1F2937',
          border: 'rgba(255, 255, 255, 0.08)',
          borderFocus: 'rgba(99, 102, 241, 0.5)',
          muted: '#94A3B8',
          text: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-primary': '0 0 35px -5px rgba(99, 102, 241, 0.3)',
        'glow-secondary': '0 0 35px -5px rgba(6, 182, 212, 0.3)',
        'glow-tertiary': '0 0 35px -5px rgba(245, 158, 11, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
