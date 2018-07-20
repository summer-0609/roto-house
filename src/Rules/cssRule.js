const cssLoaders = require('../Utils/cssLoaders')

module.exports = runner => {
  const output = []
  const loaders = cssLoaders(runner.options)

  for (var extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
