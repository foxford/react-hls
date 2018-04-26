const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.common.config')

config.output.publicPath = '/build/'
config.module.rules.push({
  test: /\.js?/,
  loaders: ['react-hot-loader', 'babel-loader'],
  include: [
    path.join(__dirname, 'example'),
    /node_modules\/hls\.js/
  ]
})
config.module.rules.push({
  test: /\.s?css$/,
  loader: 'style-loader!css-loader!sass-loader'
})
config.devtool = 'source-map'
config.devServer = {
  historyApiFallback: {
    index: 'example/index.html'
  }
}
config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
