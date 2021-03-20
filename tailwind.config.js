// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: '#333333',
      },
      boxShadow: {
        custom: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      },
      keyframes: {
        'bounce-right': {
          '0%, 100%': {
            transform: 'translateX(25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'bounce-right': 'bounce-right 1s infinite',
      },
      fontFamily: {
        sans: ['"M PLUS Rounded 1c"', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        ['14']: 'repeat(14, minmax(0, 1fr))',
        ['16']: 'repeat(16, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        ['8']: 'repeat(8, minmax(0, 1fr))',
        ['10']: 'repeat(10, minmax(0, 1fr))',
        ['12']: 'repeat(12, minmax(0, 1fr))',
        ['14']: 'repeat(14, minmax(0, 1fr))',
        ['16']: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
