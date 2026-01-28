/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        slate: {
          850: '#151f32', // Custom dark for better contrast
          900: '#0F172A', // Near black
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6', // Brand Blue
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
