import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
        display: ["var(--font-caprasimo)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Warm off-white card surface (cream palette)
        white: "#fdf8ee",
        // Warm neutral scale (replaces cool slate site-wide)
        slate: {
          50: "#f6efe1",
          100: "#eee7db",
          200: "#e3d8c3",
          300: "#cabfa9",
          400: "#a89e8c",
          500: "#857b6b",
          600: "#63594c",
          700: "#4a4339",
          800: "#322d26",
          900: "#201e1d",
          950: "#16130f",
        },
        // Warm dark surfaces (leftover ink references)
        ink: {
          950: "#201e1d",
          900: "#2e2b25",
          850: "#3a352d",
          800: "#474238",
          700: "#5a5346",
        },
        // Light-green accent
        brand: {
          50: "#f1f8e5",
          100: "#e0f0c6",
          200: "#c6e29d",
          300: "#a7d16f",
          400: "#8bbd4b",
          500: "#6f9e37",
          600: "#517a29",
          700: "#3f5f23",
          800: "#344e21",
          900: "#2b3f1e",
        },
        glow: "#8bbd4b",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.12)",
        "card-dark": "0 1px 2px rgba(0,0,0,0.4), 0 12px 40px -16px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(111,158,55,0.18), 0 10px 34px -10px rgba(81,122,41,0.30)",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
