import type { Config } from "tailwindcss";

const config: Config = {
  safelist: [
    "bg-orange-400",
    {
      pattern: /(bg|text)-(gray-900|white|black)/,
      variants: ["hover"],
    },
    {
      pattern: /(bg|text)-(purple|green|indigo|pink|blue|red)-(500|600)/,
      variants: ["hover"],
    },
    {
      pattern: /(bg|text)-(gray|indigo|yellow)-(900|200)/,
      variants: ["hover"],
    },
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        "100": "100",
      },
      gridTemplateRows: {
        "8": "repeat(8, minmax(0, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  variants: {
    backgroundOpacity: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
    ],
    opacity: ["responsive", "hover", "focus", "active", "group-hover"],
  },
  plugins: [],
};
export default config;
