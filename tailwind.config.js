/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        black: 'var(--black)',
        'light-grey': 'var(--light-grey)',
        'dark-grey': 'var(--dark-grey)',
        'aqua-green': 'var(--aqua-green)',
        yellow: 'var(--yellow)',
      },
      borderRadius: {},
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'wiggle-left': {
          '0%, 100%': { transform: 'translateX(-100px)' },
          '50%': { transform: 'translateX(0px)' },
        },
        'wiggle-right': {
          '0%, 100%': { transform: 'translateX(100px)' },
          '50%': { transform: 'translateX(0px)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'wiggle-left': 'wiggle-left 10s ease-in-out infinite',
        'wiggle-right': 'wiggle-right 10s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
