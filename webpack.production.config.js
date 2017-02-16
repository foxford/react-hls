var path = require('path');
var config = require('./webpack.common.config');

config.module.rules.push({
  test: /\.js?/,
  loaders: ['babel-loader'],
  include: [
    path.join(__dirname, 'example'),
    /node_modules\/hls\.js/
  ]
});

module.exports = config;