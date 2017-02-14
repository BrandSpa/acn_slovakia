 const WebpackShellPlugin = require('webpack-shell-plugin');

 module.exports = {
    watch: true,
     entry: {
       app: './client/app.js',
      //  admin: './client/admin/app.js'
     },
     output: {
         path: './public/js',
         filename: '[name].js'
     },
      plugins: [
        new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['yarn jest']})
    ],
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     },
    
 }
