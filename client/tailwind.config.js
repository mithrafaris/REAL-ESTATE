module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust based on your file structure
    './node_modules/@mui/material/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
