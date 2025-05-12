import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['"Roboto Condensed"', "sans-serif"],
                ibm: ['"IBM Plex Sans"', "sans-serif"],
            },
            fontWeight: {
                regular: 400,
                medium: 500,
                bold: 700,
                black: 900,
            },
        },
    },
    plugins: [],
};

export default config;
