module.exports = runner => {
  const name = runner.path.posix.join(
    runner.options.assetsPath, 'fonts/[name].[hash:7].[ext]')

  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name
    }
  }
}
