const webpack = require('webpack')

module.exports = runner => {
  // const defines = {}

  // Object.keys(runner.appEnvs).forEach(name => {
  //   defines[`process.env.${name}`] = process.env.hasOwnProperty(name)
  //     ? JSON.stringify(process.env[name])
  //     : JSON.stringify(runner.appEnvs[name])
  // })
  return new webpack.EnvironmentPlugin(runner.appEnvs)
}
