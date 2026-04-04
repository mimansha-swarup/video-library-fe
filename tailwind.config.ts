import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0C0A08",
          2: "#141210",
          3: "#1C1916",
          4: "#24201B",
          5: "#2E2820",
        },
        gold: {
          DEFAULT: "#D4A84B",
          dim:     "#96762E",
          bright:  "#E8C06A",
          muted:   "#6B5224",
        },
        cream: {
          DEFAULT: "#F0EAD6",
          dim:     "#BDB49E",
        },
        muted: {
          DEFAULT: "#7A6E62",
          2:       "#4A4238",
          3:       "#302B24",
        },
      },
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        sans:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["0.65rem", "1"],
      },
      borderColor: {
        gold: "rgba(212,168,75,0.18)",
        "gold-md": "rgba(212,168,75,0.30)",
        "gold-hi": "rgba(212,168,75,0.55)",
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(212,168,75,0.12), 0 0 60px rgba(212,168,75,0.06)",
        "gold-sm":   "0 0 12px rgba(212,168,75,0.18)",
        "card":      "0 4px 32px rgba(0,0,0,0.5)",
        "card-hover":"0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,168,75,0.25)",
        "inset-top": "inset 0 1px 0 rgba(212,168,75,0.08)",
      },
      backgroundImage: {
        "radial-gold":
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,168,75,0.08) 0%, transparent 70%)",
        "card-gradient":
          "linear-gradient(180deg, transparent 35%, rgba(12,10,8,0.92) 100%)",
        "hero-lines":
          "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(212,168,75,0.04) 79px, rgba(212,168,75,0.04) 80px)",
      },
    },
  },
  plugins: [],
};

export default config;
