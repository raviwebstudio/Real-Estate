import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f7f3ee",
        "sand-dark": "#ece5db",
        ink: "#201a17",
        taupe: "#6e6258",
        gold: "#b99663",
        slate: "#4c5d65",
      },
      fontFamily: {
        serif: [
          "\"Iowan Old Style\"",
          "\"Palatino Linotype\"",
          "\"Book Antiqua\"",
          "Georgia",
          "serif",
        ],
        sans: [
          "\"Avenir Next\"",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(185, 150, 99, 0.16)",
      },
      backgroundImage: {
        "hero-blur":
          "radial-gradient(circle at top left, rgba(185, 150, 99, 0.26), transparent 40%), radial-gradient(circle at bottom right, rgba(132, 163, 175, 0.18), transparent 38%)",
      },
      maxWidth: {
        container: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
