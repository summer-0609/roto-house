const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = runner => {
  return new MiniCssExtractPlugin({
    // filename: 'static/css/[name].[contenthash].css'
    filename: runner.parseAssetsFilename('css/[name].[contenthash].css')
  })
}
