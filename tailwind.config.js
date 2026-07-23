/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: '#2B3A4A',
        bgDeep: '#2B3A4A',
        purpleCustom: {
          DEFAULT: '#E8D5A8',
          deep: '#33455A',
          glow: 'transparent'
        },
        pinkCustom: {
          DEFAULT: '#E8B4B8',
          soft: '#E8B4B8',
          glow: 'transparent'
        },
        textLight: '#F0ECE2',
        textMuted: '#B8B5C8',
        bg: '#2B3A4A',
        surface: '#33455A',
        'text-primary': '#F0ECE2',
        'text-muted': '#B8B5C8',
        accent: {
          DEFAULT: '#E8B4B8',
          warm: '#E8D5A8',
        },
        border: 'rgba(240, 236, 226, 0.12)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      },
      backdropBlur: {
        xs: '4px',
        glass: '18px',
      }
    },
  },
  plugins: [],
}
