/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                sku: "#096EA4",
            },
            backgroundColor: {
                sku: "#096EA4",
            },
            fontFamily: {
                ExtraBold: "ExtraBold",
                yekanBold: "yekanBold",
            },
        },
    },
    plugins: [],
};
