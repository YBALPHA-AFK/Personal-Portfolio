/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          glow: '#00daff',
          deep: '#0099b8',
          soft: '#7aebff',
        },
        ink: {
          950: '#020306',
          900: '#05080d',
          800: '#0a0e15',
          700: '#11161f',
          600: '#1a212c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'spin-slow': 'spin 18s linear infinite',
        'tilt': 'tilt 10s infinite linear',
        'marquee': 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blink': 'blink 1s step-end infinite',
        'cert-fade': 'cert-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 218, 255, 0.4), 0 0 40px rgba(0, 218, 255, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 218, 255, 0.7), 0 0 80px rgba(0, 218, 255, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(0.5deg)' },
          '75%': { transform: 'rotate(-0.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'cert-fade': {
          '0%': { opacity: '0', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'grid-cyan': "linear-gradient(rgba(0, 218, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 218, 255, 0.07) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-cyan': 'linear-gradient(110deg, transparent 30%, rgba(0, 218, 255, 0.4) 50%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(0, 218, 255, 0.4)',
        'glow': '0 0 24px rgba(0, 218, 255, 0.45), 0 0 60px rgba(0, 218, 255, 0.18)',
        'glow-lg': '0 0 48px rgba(0, 218, 255, 0.55), 0 0 120px rgba(0, 218, 255, 0.25)',
        'inner-glow': 'inset 0 0 24px rgba(0, 218, 255, 0.18)',
      },
    },
  },
  plugins: [],
}
