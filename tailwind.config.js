/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {
			colors: {
				danger: "#D92D20",
				accent: "#2558E5",
				neutralGray: "#404555",
				primary4: "#F1C12B",
				primary6: "#A9871E",
				charcoal: "#606880"
			},
		},
	},
	plugins: [],
};
