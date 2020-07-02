module.exports = {
  purge: ['./*.html'],
  theme: {
    extend: {
      inset: {
        '-12': '-1.5rem',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
}
