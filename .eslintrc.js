// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ['expo', 'prettier', 'plugin:tailwindcss/recommended'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'warn'
	},
	ignorePatterns: ['/dist/*']
};
