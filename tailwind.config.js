/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      borderWidth: {
        '0.5': '0.5px',
        '1': '1px',
      },

      backgroundColor: ['active'],

      width: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },
      height: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },
      fontSize: {
        'xxs': '.5rem',
        'xxxs': '.4rem',
      },
      colors: {
        'noir': '#1E0F1C',
        'rouge': '#A7001E',
        'main': '#E2E9C0',
        'vert': '#7AA95C',
        'marron': '#955149',
        'text': '#050315',
        'bgMain': '#FBFBFE',
        "secondary-light": "#eeedff",
        "secondary-light-2": "#ebeaff",
        "secondary-dark": "#c7c6e5",
        "bg-lightgray": "#EAEEEF",
        "bg-gray": "#9EABB3",
        "bg-1": '#7A8990',
        "bg-2": '#E6F0F7',
        "bg-3": '#F2F7FA',
        "green": "#008000",
      },

      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#2F27CE",

          "secondary": "#DEDCFF",

          "accent": "#433BFF",
          
          "neutral": "#008000", // Green

          "base-100": "#DEDCFF",

          "info": "#0000ff",

          "success": "#00ff00",

          "warning": "#00ff00",

          "error": "#ff0000",
          "custom-color": "#008000"
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}
