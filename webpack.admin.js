'use strict';

module.exports = {
  watch: true,
  entry: {
  	admin: './client/admin.js',
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
	devtool: 'cheap-source-map',
};

