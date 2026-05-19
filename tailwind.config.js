/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080810',
        surface: '#0e0e1c',
        card: '#12121f',
        border: '#1c1c2e',
        accent: '#FF5C28',
        green: '#00D97E',
        blue: '#3B82F6',
        yellow: '#FBBF24',
        text: '#E8E8F5',
        muted: '#6B6B8A',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
