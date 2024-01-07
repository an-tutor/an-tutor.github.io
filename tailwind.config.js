/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
  daisyui: {
    themes: ["emerald", {
      'emeraldDark': {
        'primary' : '#348952',
        'primary-focus' : '#41be6d',
        'primary-content' : '#f9fafb',

        'secondary' : '#0c3e9d',
        'secondary-focus' : '#055bfa',
        'secondary-content' : '#f9fafb',

        'accent' : '#8e210b',
        'accent-focus' : '#d03516',
        'accent-content' : '#f9fafb',

        'neutral' : '#e0e0e0',
        'neutral-focus' : '#bababa',
        'neutral-content' : '#2b2b2b',

        'base-100' : '#000000',
        'base-200' : '#1a1a1a',
        'base-300' : '#292929',
        'base-content' : '#f5f5f5',

        'info' : '#1c92f2',
        'success' : '#009485',
        'warning' : '#ff9900',
        'error' : '#ff5724',

        '--rounded-box': '1rem',          
        '--rounded-btn': '.5rem',        
        '--rounded-badge': '1.9rem',      

        '--animation-btn': '0',       
        '--animation-input': '0',       

        '--btn-text-case': 'uppercase',   
        '--navbar-padding': '.5rem',      
        '--border-btn': '1px',            
      },
    },],
    darkTheme: 'emeraldDark'
  },
}

