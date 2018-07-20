const webpack = require('webpack')
const path = require('path')

const express = require('express')
const merge = require('webpack-merge')
const chalk = require('chalk')

const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const baseConfig = require('./webpack.base')
const config = require('./configs/options')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')
const proxyTable = require('./configs/proxy')
const useExpressProxy = require('./plugins/useExpressProxy')

const appEnvs = require('./configs/appEnvs')
const app = express()

const compiler = webpack(merge(baseConfig({ mode: 'development' }), {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.EnvironmentPlugin(appEnvs),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html'
    })
  ],
  optimization: {
    noEmitOnErrors: true
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}))

function resolve (name) {
  return path.resolve(__dirname, '..', name)
}

const devMiddleware = webpackMiddleware(compiler, {
  publicPath: '/',
  logLevel: 'silent',
  hot: true
})

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {}
})

compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
  hotMiddleware.publish({
    action: 'reload'
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

useExpressProxy(app, proxyTable)

devMiddleware.waitUntilValid(() => {
  console.log(chalk.yellow(`I am ready. open http://localhost:${config.port || 3000} to see me.`))
})

app.listen(config.port || 3000)
