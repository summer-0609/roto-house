const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = runner => {
  return new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true,
      discardComments: {
        removeAll: true
      },
      autoprefixer: true
    }
  })
}
