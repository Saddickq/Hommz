/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
        },
        animation: {
            fadeIn: 'fadeIn 0.6s ease-in-out forwards',
        },
        colors: {
            primary: "#ff385c",
            faded: "#00000090"
        }
      },
    },
    plugins: [],
  }

