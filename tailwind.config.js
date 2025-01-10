/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      colors: {
        js: {
          DEFAULT: '#f7df1e',
          hover: 'rgb(247, 223, 30, 0.9)',
          light: 'rgb(247, 223, 30, 0.1)',
          medium: 'rgb(247, 223, 30, 0.2)',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          light: 'rgb(26, 26, 26, 0.3)',
          medium: 'rgb(26, 26, 26, 0.5)',
        }
      }
    },
  },
  plugins: [],
}

