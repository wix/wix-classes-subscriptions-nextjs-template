/** @type {import('tailwindcss').Config} */
const widthExtension = {
  'full-content': '980px',
};
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    letterSpacing: {
      widest: '.2em',
    },
    extend: {
      animation: {
        'pulse-once': 'fade-in .4s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 0.5,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      fontFamily: {
        'open-sans-condensed': [
          'Open Sans Condensed',
          ...defaultTheme.fontFamily.sans,
        ],
        'din-neu': [
          'DINNeuzeitGroteskLTW01-_812426',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      rotate: {
        270: '270deg',
      },
      maxWidth: {
        ...widthExtension,
      },
      width: {
        ...widthExtension,
      },
      colors: {
        'gray-c1': 'rgb(37,33,40)',
        'gray-c2': 'rgb(47,43,50)',
        highlight: 'rgb(257, 97, 72)',
      },
      gridTemplateColumns: {
        'auto-sm': 'repeat(auto-fill,minmax(120px,1fr))',
      },
      backgroundImage: {},
    },
  },
  plugins: [require('flowbite/plugin')],
};
