const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = runner => {
  return new FriendlyErrorsPlugin()
}
