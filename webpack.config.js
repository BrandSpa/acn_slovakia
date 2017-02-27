'use strict';
const DashboardPlugin = require('webpack-dashboard/plugin');
const PrettierPlugin = require('prettier-webpack-plugin');

module.exports = {
  watch: true,
  entry: {
  	app: './client/app.js'
  },
  output: {
  	path: './public/js',
    filename: '[name].js'
  },
  module: {
  	loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader' 
			} 
		]
  },
  plugins: [
		new PrettierPlugin({
			singleQuote: true,
			bracketSpacing: false
		})
	]
};

