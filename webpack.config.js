const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/public/index.html',
		}),
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	devServer: {
		host: 'localhost',
		static: path.join(__dirname, 'public'),
		compress: true,
		hot: true,
		port: 3000,
		open: false,
		historyApiFallback: {
			index: '/index.html',
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			}
		],
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src')
		}
	}
}