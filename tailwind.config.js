/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a1f3a',
          950: '#0f1226',
          900: '#141831',
          800: '#1a1f3a',
          700: '#263154',
          600: '#34446d',
          500: '#526182',
          400: '#76829f',
          300: '#9da7c0',
          200: '#c8cfdf',
        },
        gold: {
          DEFAULT: '#c9a961',
          100: '#f4ead1',
          300: '#dcc285',
          400: '#c9a961',
          500: '#b89549',
          700: '#7d642d',
        },
        'gold-light': '#dcc285',
        ivory: {
          DEFAULT: '#f5f0e1',
          2: '#ece5d2',
          3: '#e2d9c1',
        },
        vermillion: {
          DEFAULT: '#c8322c',
          700: '#a82820',
        },
        ink: {
          DEFAULT: '#2a2418',
          soft: '#5a5142',
          mute: '#8a7f68',
        },
        rule: '#d4c7a3',
        lotus: '#f4e4e4',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
