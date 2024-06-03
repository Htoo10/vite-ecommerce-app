/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js", 
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      sans: ["Ubuntu", "sans-serif"],
    },

    // container: {
    //   padding: {
    //     DEFAULT: '1rem',
    //     sm: '2rem',
    //     lg: '4rem',
    //     xl: '5rem',
    //     '2xl': '6rem',
    //   },
    // },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}