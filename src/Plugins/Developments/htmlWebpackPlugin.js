const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = runner => {
  // https://github.com/ampedandwired/html-webpack-plugin
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    template: runner.path.join(
      runner.options.moduleDirectory,
      runner.options.indexFileName
    ),
    inject: true
  })
}
