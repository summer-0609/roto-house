const analyzer = require('webpack-bundle-analyzer')

module.exports = runner => {
  return new analyzer.BundleAnalyzerPlugin()
}
