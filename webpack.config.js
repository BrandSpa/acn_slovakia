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
            var lastHash = fs.readFileSync(Path.join(__dirname, 'lasthash.txt'), "utf8");
            fs.writeFileSync( Path.join(__dirname, 'lasthash.txt'), lastFile);
            console.log(lastFile !=  lastHash);
            if(fs.existsSync(Path.join(__dirname, 'public/js/' + lastHash )) && lastFile !=  lastHash) {
              fs.unlinkSync(Path.join(__dirname, 'public/js/' + lastHash ));
            } 
            //get footer content
            var html = fs.readFileSync(Path.join(__dirname, htmlFileName), "utf8");
           //replace script name
            var htmlOutput = html.replace( /<script\s+src=(["'])(.+?)app.*\.js\1/i, "<script src=$1$2" + lastFile + "$1");
            //write footer and replace script app name
            fs.writeFileSync( Path.join(__dirname, htmlFileName), htmlOutput); }
        });
      }
    ]
};

