import forms from "@tailwindcss/forms";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Specify your React files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms, // Add the forms plugin
  ],
};
