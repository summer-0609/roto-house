const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const chalk = require('chalk')
const useExpressProxy = require('./useExpressProxy')

module.exports = runner => {
  runner.expressBuilder.listeningMessage = chalk.yellow(
    'Hello, I\'am Fresh house. The development server is starting......wait me.'
  )

  runner.expressBuilder.addBeforeListenQueue(app => {
    const compiler = webpack(runner.webpackBuilder.create())

    const devMiddleware = webpackDevMiddleware(compiler, {
      publicPath: '/',
      hot: true,
      logLevel: 'silent'
    })

    const hotMiddleware = webpackHotMiddleware(compiler, {
      log: () => {}
    })

    // compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', (data, callback) => {
    //   hotMiddleware.publish({ action: 'reload' })
    //   data, callback
    // })

    useExpressProxy(app, runner.proxyMaps)

    // handle fallback for HTML5 history API
    app.use(connectHistoryApiFallback())

    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)

    // serve pure static assets
    app.use(path.posix.join(
      '/',
      runner.options.assetsPath
    ), express.static(path.join(
      runner.options.moduleDirectory,
      runner.options.assetsPath
    )))
    devMiddleware.waitUntilValid(() => {
      console.log(chalk.yellow(`I are ready. open http://localhost:${runner.options.port} to see me.`))
    })
  })
}
