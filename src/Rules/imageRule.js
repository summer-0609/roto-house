module.exports = runner => {
  const name = runner.path.posix.join(
    runner.options.assetsPath, 'img/[name].[hash:7].[ext]')

  return {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name
    }
  }
}
