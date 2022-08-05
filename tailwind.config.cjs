/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  options: {
    whitelist: ['lg\:w-6\/12']
  },
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
      },
      boxShadow: {
        chat: 'inset 0 -5px 5px -5px rgb(0 0 0 / 0.05);'
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
    }
  },
  plugins: []
};
