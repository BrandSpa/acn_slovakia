'use strict';

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
  }
};

