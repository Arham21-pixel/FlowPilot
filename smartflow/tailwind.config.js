/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          brand: '#F5C518',
        },
        surface: {
          50: '#FAFAFA',
          100: '#F5F5F5',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 6px 10px -5px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 10px 20px -10px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
