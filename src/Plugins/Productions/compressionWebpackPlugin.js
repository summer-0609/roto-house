const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = runner => {
  return new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
      '\\.(' +
      runner.options.productionGzipExtensions.join('|') +
      ')$'
    ),
    threshold: 10240,
    minRatio: 0.8
  })
}
