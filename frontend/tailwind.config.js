/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        pixel: '6px 6px 0 0 #000'
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive']
      }
    }
  },
  plugins: []
};
