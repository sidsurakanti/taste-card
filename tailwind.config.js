/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': "#000",
        'tracklist': "#e7e7e7",
        'button': "#7963FF",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      }
    },
  },
  plugins: [],
}
