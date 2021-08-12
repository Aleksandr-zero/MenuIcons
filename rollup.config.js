import babel from '@rollup/plugin-babel';


export default {
	input: './src/js/app.js',
	output: {
		file: './app/js/app.js',
		format: 'umd'
	},
	plugins: [
		babel({
			presets: ['@babel/preset-env'],
			babelHelpers: 'bundled'
		})
	]
};