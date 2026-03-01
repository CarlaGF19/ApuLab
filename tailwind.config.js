/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#92487A",
          dark: "#540863",
          soft: "#B76AA3",
          glow: "rgba(146, 72, 122, 0.08)",
          badge: "#F6EFF8",
        },
        background: {
          base: "#F5F6F8",
          card: "#FFFFFF",
          cardAlt: "#FAF9FB",
        },
        text: {
          primary: "#2A1E2E",
          secondary: "#6B6B75",
        },
        border: {
          soft: "#E8E6EC",
        },
        success: {
          accent: "#4CAF8F",
        }
      },
    },
  },
  plugins: [],
}
