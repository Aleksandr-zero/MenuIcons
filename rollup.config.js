import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';


export default {
	input: './src/js/app.js',
	output: {
		file: './app/js/app.js',
		format: 'umd'
	},
	plugins: [
		babel({
			presets: ['@babel/preset-env'],
			babelHelpers: 'bundled',
			exclude: 'node_modules/**'
		}),
		terser({
			compress: {
				booleans_as_integers: true,
				arguments: true,
				drop_console: true,
				toplevel: true
			},
			keep_fnames: true
		}),
	]
};