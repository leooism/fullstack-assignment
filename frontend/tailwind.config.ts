/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,tsx, ts}"],
	theme: {
		extend: {
			backgroundImage: {
				"hero-pattern":
					"url('https://img.freepik.com/free-vector/blue-polygon-dark-background_53876-118498.jpg?size=626&ext=jpg&ga=GA1.1.582384217.1688552824&semt=ais')",
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
