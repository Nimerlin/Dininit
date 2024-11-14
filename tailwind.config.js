/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        'blue-dark': '#1E2A47', // Dark blue for background
        'teal': '#0B9E94', // Teal for accents
        'neon-pink': '#FF33A1', // Neon Pink for highlights
        'purple': '#6A0DAD', // Purple
        'blue-800': '#1e3a8a',
        'teal-600': '#00796b',
      },
      backgroundImage: {
        'tech-bg': "url('/tech-background.webp')", // Custom tech background
      },
      spacing: {
        '128': '32rem', // For large sections
      },
    },
  },
  plugins: [],
};
