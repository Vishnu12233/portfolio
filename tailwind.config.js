/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        ink: '#111827',
        // Avoid clobbering Tailwind's default `slate` scale
        muted: '#64748B',
        line: '#E5E7EB',
        brand: {
          purple: '#7C3AED',
          blue: '#2563EB',
          cyan: '#06B6D4',
        },
        purple: {
          DEFAULT: '#7C3AED',
          soft: '#A78BFA',
          mist: 'rgba(124, 58, 237, 0.12)',
        },
        blue: {
          DEFAULT: '#2563EB',
          soft: '#60A5FA',
          mist: 'rgba(37, 99, 235, 0.12)',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          soft: '#67E8F9',
          mist: 'rgba(6, 182, 212, 0.12)',
        },
      },
      fontFamily: {
        display: ['"Syne Variable"', 'Syne', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans Variable"', 'Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': [
          'clamp(2.45rem, 4.9vw, 4.6rem)',
          { lineHeight: '0.96', letterSpacing: '-0.05em' },
        ],
        'display-lg': [
          'clamp(2.15rem, 4.75vw, 4.1rem)',
          { lineHeight: '1', letterSpacing: '-0.04em' },
        ],
        'display-md': [
          'clamp(1.75rem, 3.2vw, 2.85rem)',
          { lineHeight: '1.08', letterSpacing: '-0.03em' },
        ],
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 23, 42, 0.06)',
        lift: '0 20px 50px rgba(15, 23, 42, 0.1)',
        glow: '0 12px 40px rgba(124, 58, 237, 0.22)',
        'glow-blue': '0 12px 40px rgba(37, 99, 235, 0.18)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
