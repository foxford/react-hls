var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.common.config');

config.module.rules.push({
  test: /\.js?/,
  loaders: ['react-hot-loader','babel-loader'],
  include: [
    path.join(__dirname, 'example'),
    /node_modules\/hls\.js/
  ]
});
config.devtool = 'source-map';
config.devServer = {
  historyApiFallback: {
    index: 'example/index.html'
  }
};
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;