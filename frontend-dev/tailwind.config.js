/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
       
        fadeInRotate: 'fadeInRotate 2s ease-out forwards',
       
      },
      keyframes: {
      
        fadeInRotate: {
          '0%': { opacity: '0', transform: 'rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'rotate(0deg)' },
        },
      
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
