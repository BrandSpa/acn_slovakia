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

     module: {
        loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }
    ]
     },
    
 }
