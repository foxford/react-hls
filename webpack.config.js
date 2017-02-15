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
        test: /\.js?/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'example'),
          /node_modules\/hls\.js/
        ]
      },
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
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: {
      index: 'example/index.html'
    }
  }
};