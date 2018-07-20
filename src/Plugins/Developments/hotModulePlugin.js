const webpack = require('webpack')

module.exports = runner => {
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  return new webpack.HotModuleReplacementPlugin()
}
