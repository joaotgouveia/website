/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
           colors: {
               "bg-primary": "var(--bg-primary)",
               "bg-secondary": "var(--bg-secondary)",
               "bg-accent": "var(--bg-accent)",
               "fg-primary": "var(--fg-primary)",
               "fg-secondary": "var(--fg-secondary)",
               "fg-accent": "var(--fg-accent)",
           },
        },
    },
	plugins: [],
}
