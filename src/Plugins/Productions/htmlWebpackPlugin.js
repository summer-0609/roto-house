const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = runner => {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    template: runner.path.join(
      runner.options.moduleDirectory,
      runner.options.indexFileName
    ),
    // chunks: ['app', 'vendors', 'mainifest']
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  })
}
