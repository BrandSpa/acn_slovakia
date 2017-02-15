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
         }]
     },

     plugins:[
         new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
        new webpack.optimize.UglifyJsPlugin()

     ]
    
 }
