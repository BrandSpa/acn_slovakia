const webpack = require('webpack');

 module.exports = {
     entry: {
       app: '../client/app.js',
      //  admin: './client/admin/app.js'
     },
     output: {
         path: '../public/js',
         filename: '[name].js'
     },

     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         },
           {
        	test: /isotope\-|fizzy\-ui\-utils|desandro\-|masonry|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
          loader: 'imports-loader?define=>false&this=>window'
        } 
        ]
     },

     plugins:[
         new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
        new webpack.optimize.UglifyJsPlugin()

     ]
    
 }
