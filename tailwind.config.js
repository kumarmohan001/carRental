/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"]
      },
      colors: {
        obsidian: "#050505",
        carbon: "#0d0d0f",
        champagne: "#f3d27a",
        gold: "#d6a73c",
        platinum: "#f7f7f2"
      },
      boxShadow: {
        glow: "0 0 60px rgba(214, 167, 60, 0.18)",
        card: "0 24px 80px rgba(0, 0, 0, 0.42)"
      }
    }
  },
  plugins: []
};
