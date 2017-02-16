var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './example/index.js'
  ],
  output: {
    path: path.join(__dirname, 'example/build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    })
  ]
};