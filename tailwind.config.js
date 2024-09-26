/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        ease: 'cubic-bezier(.25, .1, .25, 1)'
      }
    },
  },
  plugins: [],
}

