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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#17153B", // Dark Blue - RGB(23, 21, 59)
        secondary: "#2E236C", // Deep Purple - RGB(46, 35, 108)
        accent: "#433D8B", // Medium Blue - RGB(67, 61, 139)
        highlight: "#C8ACD6", // Light Lavender - RGB(200, 172, 214)
      },
    },
  },
  plugins: [],
};
export default config;
