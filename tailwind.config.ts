import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      colors: {
        ink: {
          50: '#f4f6f8',
          100: '#e6eaee',
          200: '#c7d0da',
          300: '#9fadbd',
          400: '#6f8299',
          500: '#4f637c',
          600: '#3d5064',
          700: '#2f3f4f',
          800: '#232f3b',
          900: '#161e26'
        },
        signal: {
          pending: '#8b8f99',
          progress: '#3b6ea5',
          done: '#2f9e6f'
        },
        accent: '#e8a33d'
      },
      boxShadow: {
        card: '0 1px 2px rgba(22, 30, 38, 0.06), 0 1px 6px rgba(22, 30, 38, 0.05)'
      }
    }
  },
  plugins: []
}
