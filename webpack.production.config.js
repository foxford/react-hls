const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack.common.config')

config.module.rules.push({
  test: /\.js?/,
  loaders: ['babel-loader'],
  include: [
    path.join(__dirname, 'example'),
    /node_modules\/hls\.js/
  ]
})

config.module.rules.push({
  test: /\.s?css$/,
  loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
})

config.plugins.push(
  new ExtractTextPlugin('style.min.css')
)

module.exports = config
