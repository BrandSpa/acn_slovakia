'use strict';
const webpack = require('webpack');
const fs = require('fs');
const Path = require('path');
const WebpackCleanupPlugin =  require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: false
});

const changeFilesNames = function() {
  this.plugin("done", function(statsData) {
    const stats = statsData.toJson();

    if (!stats.errors.length) {
      const footerFile = Path.join(__dirname, "footer.php");
      const footerDonateFile = Path.join(__dirname, "footer-donate.php");
      const headerFile = Path.join(__dirname, "header.php");
      const headerDonateFile = Path.join(__dirname, "header-donate.php");
      const appName = stats.chunks[0].files[0];
      const appCss = stats.chunks[0].files[1];
      const vendorName = stats.chunks[1].files[0];

      const files = [footerFile, footerDonateFile, headerFile, headerDonateFile];

      files.forEach(file => {
        let fileHtml = fs.readFileSync(file, "utf8");
        let fileHtmlOutput = fileHtml.replace(/app.*\.js/, appName);
        fileHtmlOutput = fileHtmlOutput.replace(/vendor.*\.js/, vendorName);
        fileHtmlOutput = fileHtmlOutput.replace(/app.*\.css/, appCss);
        fs.writeFileSync(file, fileHtmlOutput);
        
      });

    }
  });
};

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom', 'axios'],
  	app: './client/app.js'
  },
  output: {
  	path: Path.join(__dirname, '/public/js'),
    filename: '[name].[chunkhash].js'
  },
  module: {
  	loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader?cacheDirectory=true' 
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
	plugins: [
      new webpack.optimize.CommonsChunkPlugin({ 
        name: 'vendor',
        filename: 'vendor.[chunkhash].js', 
        minChunks: 2
      }),
      changeFilesNames,
      new WebpackCleanupPlugin({
        exclude: ["admin.js"],
      }),
      extractSass
    ]
};