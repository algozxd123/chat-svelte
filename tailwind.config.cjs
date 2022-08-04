/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#282A3B',
        primary: '#0FD9ED',
        secondary: '#F84F60',
        tertiary: '#757484'
      },
      spacing: {
        112: '28rem',
        128: '32rem',
        144: '36rem'
      }
    }
  },
  plugins: []
};
