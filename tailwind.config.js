/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#434d5be0", // # 85b1c2
        secondary: "#ffffff",
        tertiary: "#f5f5f5",
        quaternary: "#c0cfd0",
        quinary: "#a0bfb9",
      },
      backgroundImage: {
        homepage: "url('https://blog.logrocket.com/wp-content/themes/logrocket/assets/blog-header.png')", //   practice-listening.jpg
        mainGradient: "linear-gradient(to right , #f1f5f9, #bcd5f7)",
      },
    },
  },
  plugins: [],
};
