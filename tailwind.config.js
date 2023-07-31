/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        headerLogin: "0 2px 4px #0006",
        button: "0 1px 2px 0 rgba(0, 0, 0, .05)",
        hoverBtn: "0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a",
        secondary: "0 0 1px #00000015, 0 1px 1px #0000002b",
        navbar: "0 2px 4px #00000014",
        btnCreate: "0 4px #6c4298",
        sortHig: "0px 0px 8px rgba(0, 0, 0, .02), 0px 12px 16px rgba(0, 0, 0, .03), 0px 0px 2px 1px rgba(0, 0, 0, .05)",
        sortLow: "0px 0px 2px rgba(0, 0, 0, .04), 0px 4px 8px rgba(0, 0, 0, .06)",
        contentCard: "0 4px #b6b6b6",
        contentCardHover: "0 4px #8854c0"
        
      },
      colors: {
        "dark": "rgb(9 9 9/1)",
        "dark-10%": "rgb(9 9 9/.1)",
        "dark-3": "rgb(66 66 66/1)",
        "dark-5": "rgb(182 182 182/1)",
        "dark-4": "rgb(109 109 109 /1)",
        "bd": "rgb(242 242 242/1)",
        "bd-ft": "rgb(249 249 249/1)",
        "dark-6": "rgb(34 34 34/1)",
        "purple-1": "rgb(70 26 66 / 1)",
        "purple-2": "rgb(237 230 246 / 1)",
        "purple-3": "rgb(136 84 192 / 1)",
        "purple-3a": "rgb(136 84 192 / 78%)",
        "purple-4": "rgb(56 21 53 / 1)",
        "purple-dk": "rgb(93 32 87 / 1)",
        "navHomePage": "rgba(255 255 255 0)",
        "acc": "rgb(66 66 66 /1)",
        "yellow-1": "rgb(206 132 0/1)",
        "yellow-2": "rgb(255 182 53 / 1)",
        "yellow-3": "rgb(239 169 41 / 1)",
        "light": "rgb(160 118 204/1)",
        "light-2": "rgb(229 229 229/1)",
        "lilac": "rgb(136 84 192/1)",
        "lilac-faded": "rgb(237 230 246/1)",
        "brand-b0": "rgb(45 157 166/0.2)",
        "super": "rgb(255 164 2/1)",
        "super-faded": "rgb(255 250 242/1)",
        "brand-a": "rgb(45 112 174 /1)",
        "brand-b": "rgb(45 157 166/1)",
        "brand-c": "rgb(239 169 41 /1)",
        "brand-d": "rgb(213 84 109 /1)",
        "brand-e": "rgb(154 66 146 /1)",
        "brand-f": "rgb(0 160 106  /1)",
        "light-1": "rgb(255, 255, 255, 0.5)",



      },
      fontFamily: {
        serif: '[Poppins, sans-serif]',
        quick: ['Quicksand', 'OpenSans', 'Arial', 'Helvetica', 'sans-serif']
      },
      backgroundImage: {
        "wrapper-right": "linear-gradient(270deg,#f2f2f2 0%,rgba(242,242,242,0) 100%)",
        "wrapper-left": "linear-gradient(270deg,rgba(242,242,242,0) 0%,#f2f2f2 100%)"
      },
      transitionProperty: {
        "allLinear": "0.3s linear",
      },
      animation: {
        "opacity": "opacity ease-in-out 0.3s",
        "top": "top 0.3s ease-in-out",
        "left": "left ease-in-out  0.5s",

      },
      keyframes: {
        opacity: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        top: {
          "0%": { top: "45rem" },
          "100%": { top: "0" },
        },
        left: {
          "0%": { left: "0" },
          "100%": { left: "100%" },
        },

      }


    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
} 