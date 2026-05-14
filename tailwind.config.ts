import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0c1222",
          muted: "#3d4a63",
        },
        paper: "#f6f4ef",
        sand: "#e8e3d8",
        heritage: {
          DEFAULT: "#1f6b6b",
          dark: "#155050",
        },
        accent: {
          DEFAULT: "#c9a227",
          soft: "#e8d49a",
        },
        clinical: {
          DEFAULT: "#2a6fbb",
          soft: "#d9e8f7",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        measure: "42rem",
        content: "72rem",
      },
      boxShadow: {
        lift: "0 18px 40px -24px rgba(12, 18, 34, 0.35)",
        card: "0 1px 0 rgba(12, 18, 34, 0.06), 0 12px 32px -20px rgba(12, 18, 34, 0.18)",
      },
      backgroundImage: {
        "grain-soft":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
} satisfies Config;
