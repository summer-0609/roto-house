
const webpack = require('webpack')

module.exports = runner => {
  return new webpack.optimize.SplitChunksPlugin({
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20
      },
      vendors: {
        test: /node_modules\/(.*)\.js/,
        name: 'vendors',
        chunks: 'initial',
        priority: -10,
        reuseExistingChunk: false
      }
    }
  })
}
