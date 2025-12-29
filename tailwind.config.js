/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Backgrounds
    'bg-gray-900', 'bg-green-950', 'bg-slate-900', 'bg-cyan-950',
    // Text
    'text-gray-100', 'text-green-50', 'text-orange-50', 'text-cyan-50',
    // Primary Colors (Button backgrounds, etc)
    'bg-indigo-500', 'bg-emerald-500', 'bg-orange-500', 'bg-cyan-500',
    'bg-indigo-600', 'bg-emerald-600', 'bg-orange-600', 'bg-cyan-600',
    // Hover states
    'hover:bg-indigo-500', 'hover:bg-emerald-500', 'hover:bg-orange-500', 'hover:bg-cyan-500',
    'hover:bg-indigo-400', 'hover:bg-emerald-400', 'hover:bg-orange-400', 'hover:bg-cyan-400',
    // Ring colors
    'hover:ring-indigo-500', 'hover:ring-emerald-500', 'hover:ring-orange-500', 'hover:ring-cyan-500',
    // Sidebar/Card Backgrounds
    'bg-gray-900/50', 'bg-green-950/50', 'bg-slate-900/50', 'bg-cyan-950/50',
    'bg-gray-800', 'bg-green-900', 'bg-slate-800', 'bg-cyan-900'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
