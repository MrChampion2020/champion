/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60A5FA',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
        },
      },
    },
  },
  plugins: [],
};

