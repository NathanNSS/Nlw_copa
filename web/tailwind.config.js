/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
        fontFamily:{
            sans:"Roboto, sans-serif"
        },
        backgroundImage:{
            bgImgApp:"url(/bg_app.png)"
        }
    },
  },
  plugins: [],
}
