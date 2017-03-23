'use strict';
const fs = require('fs');
const Path = require('path');

module.exports = {
  watch: true,
  entry: {
  	app: './client/app.js'
  },
  output: {
  	path: './public/js',
    filename: '[name].[hash].js'
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
      // new BundleAnalyzerPlugin()
      function () {
        this.plugin("done", function (statsData) {
          var stats = statsData.toJson();
          
          if (!stats.errors.length) {
            var htmlFileName = "footer.php";
            var lastFile = stats.chunks[0].files[0];
            fs.writeFileSync( Path.join(__dirname, 'lasthash.txt'), lastFile);

            if(fs.existsSync(Path.join(__dirname, 'public/js/' + lastHash ))) {
              fs.unlinkSync(Path.join(__dirname, 'public/js/' + lastHash ));
            } 
              
            var html = fs.readFileSync(Path.join(__dirname, htmlFileName), "utf8");
            var lastHash = fs.readFileSync(Path.join(__dirname, 'lasthash.txt'), "utf8");
            var lastFile = stats.chunks[0].files[0];
            fs.writeFileSync( Path.join(__dirname, 'lasthash.txt'), lastFile);

            var htmlOutput = html.replace(
              /<script\s+src=(["'])(.+?)app.*\.js\1/i,
              "<script src=$1$2" + stats.chunks[0].files[0] + "$1");

            fs.writeFileSync(
              Path.join(__dirname, htmlFileName),
              htmlOutput);
          }
        });
      }
    ]
};

