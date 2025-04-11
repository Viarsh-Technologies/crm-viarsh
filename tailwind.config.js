/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          typing: {
            "0%": { width: "0%" },
            "100%": { width: "100%" }
          },
          blinkCaret: {
            "0%, 100%": { borderColor: "transparent" },
            "50%": { borderColor: "currentColor" }
          }
        },
        animation: {
          typing: 'typing 1s steps(40, end), blinkCaret .75s step-end infinite',
        }
      },
    },
    plugins: [],
  }