const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './example/index.js'
  ],
  output: {
    path: path.join(__dirname, 'example/build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|svg|woff|woff2)$/i,
        loaders: [
          'file-loader?name=[name].[ext]?[hash]&hash=sha512&digest=hex'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    })
  ]
};