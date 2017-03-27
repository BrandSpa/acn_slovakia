'use strict';
const webpack = require('webpack');
const fs = require('fs');
const Path = require('path');

module.exports = {
  watch: true,
  entry: {
    vendor: ['react', 'react-dom', 'axios'],
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
			} 
		]
  },
	plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor'),
      function () {
        this.plugin("done", function (statsData) {
          var stats = statsData.toJson();
          
          if (!stats.errors.length) {
            var htmlFileName = "footer.php";
            console.log(stats.chunks);
            var appName = stats.chunks[0].files[0];
            var vendorName = stats.chunks[1] ? stats.chunks[1].files[0] : '';
            var html = fs.readFileSync(Path.join(__dirname, htmlFileName), "utf8");

            var htmlOutput = html.replace( /app.*\.js/, appName);
            htmlOutput = htmlOutput.replace( /vendor.*\.js/, vendorName);

            fs.writeFileSync( Path.join(__dirname, htmlFileName), htmlOutput); 
          }
        });
      },
      
    ]
};

