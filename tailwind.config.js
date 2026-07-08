/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C41A1A',
          light: '#E85050',
          dark: '#8B1A1A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F0D060',
          dark: '#B8961F',
        },
        emerald: {
          DEFAULT: '#2E8B57',
          light: '#4CAF7A',
          dark: '#1F5E3B',
        },
        cream: {
          DEFAULT: '#FAF0E6',
          dark: '#F5E6D0',
        },
        wuxing: {
          metal: '#FFD700',
          wood: '#228B22',
          water: '#4169E1',
          fire: '#DC143C',
          earth: '#DAA520',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'SimSun', 'serif'],
        sans: ['"Noto Sans SC"', '"Source Han Sans SC"', 'Microsoft YaHei', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'chinese': '0 4px 20px rgba(196, 26, 26, 0.2)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'card': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 30px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-gentle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
