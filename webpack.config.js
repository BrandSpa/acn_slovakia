'use strict';
const webpack = require('webpack');
const fs = require('fs');
const Path = require('path');
const WebpackCleanupPlugin =  require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom', 'axios'],
  	app: './client/app.js'
  },
  output: {
  	path: './public/js',
    filename: '[name].[chunkhash].js'
  },
  module: {
  	loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader' 
			},
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
           // use style-loader in development
          fallback: "style-loader"
        })
      }
		]
  },
  devtool: 'cheap-source-map',
	plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor'),
      function () {
        this.plugin("done", function (statsData) {
          const stats = statsData.toJson();
          
          if (!stats.errors.length) {
            const htmlFileName = "footer.php";
            const appName = stats.chunks[0].files[0];
            const vendorName = stats.chunks[1].files[0];
            const html = fs.readFileSync(Path.join(__dirname, htmlFileName), "utf8");
            let htmlOutput = html.replace( /app.*\.js/, appName);
            htmlOutput = htmlOutput.replace( /vendor.*\.js/, vendorName);
            
            fs.writeFileSync( Path.join(__dirname, htmlFileName), htmlOutput); 
          }
        });
      },
      new WebpackCleanupPlugin({
        exclude: ["admin.js"],
      }),

      extractSass
    ]
};

