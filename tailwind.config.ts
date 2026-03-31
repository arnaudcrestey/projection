import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12202F",
        slateSoft: "#5A6D82",
        cloud: "#F4F7FB",
        mist: "#E8EEF5",
        panel: "#FFFFFF"
      },
      boxShadow: {
        panel: "0 8px 30px rgba(13, 30, 52, 0.06)",
        subtle: "0 2px 8px rgba(13, 30, 52, 0.06)"
      },
      backgroundImage: {
        "premium-gradient": "linear-gradient(145deg, #ffffff 0%, #f2f7fd 45%, #edf3fb 100%)"
      }
    }
  },
  plugins: []
};

export default config;
