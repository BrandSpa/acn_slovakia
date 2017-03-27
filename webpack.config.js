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
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash].js', minChunks: Infinity}),
      function () {
        this.plugin("done", function (statsData) {
          const stats = statsData.toJson();
          
          if (!stats.errors.length) {
            const footerFile = Path.join(__dirname, "footer.php");
            const headerFile = Path.join(__dirname, "header.php");;
            const appName = stats.chunks[0].files[0];
            const appCss = stats.chunks[0].files[1];
            const vendorName = stats.chunks[1].files[0];

            const headerHtml = fs.readFileSync(headerFile, "utf8");
            const footerHtml = fs.readFileSync(footerFile, "utf8");

            let footerHtmlOutput = footerHtml.replace( /app.*\.js/, appName);
            footerHtmlOutput = footerHtmlOutput.replace( /vendor.*\.js/, vendorName);
            fs.writeFileSync(footerFile, footerHtmlOutput);

            let headerHtmlOutput = headerHtml.replace( /app.*\.css/, appCss);
            fs.writeFileSync(headerFile, headerHtmlOutput);
          }
        });
      },
      new WebpackCleanupPlugin({
        exclude: ["admin.js"],
      }),

      extractSass
    ]
};

