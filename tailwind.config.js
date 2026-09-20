/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          subtle: '#F7F7F5',
          card: '#FFFFFF',
          panel: '#FAFAFA'
        },
        txt: {
          primary: '#171717',
          secondary: '#6B6B6B',
          muted: '#9CA3AF'
        },
        border: {
          subtle: '#E5E5E5',
          strong: '#D4D4D4'
        },
        brand: {
          DEFAULT: '#4F46E5', // Indigo
          hover: '#4338CA',
          light: '#EEF2FF',
          dark: '#3730A3'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
