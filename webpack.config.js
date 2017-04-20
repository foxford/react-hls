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
}, {
  test: /\.(ttf|otf|eot|svg|woff|woff2)$/i,
  loaders: [
    'file-loader?name=[path][name].[ext]'
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