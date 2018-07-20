const BaseRunner = require('./BaseRunner')
const productionOptions = require('./Options/productionOptions')
const productionAppEnvs = require('./Options/productionAppEnvs')

class ProductionRunner extends BaseRunner {
  constructor (...args) {
    super(...args)
    this.options = Object.assign({}, this.options, productionOptions)
    this.appEnvs = Object.assign({}, this.appEnvs, productionAppEnvs)
  }

  initialization() {
    super.initialization()

    this.webpackBuilder.merge({
      devtool: false
    })

    this.webpackBuilder.deepMerge({
      mode: this.options.mode,
      performance: {
        hints: false
      },
      output: {
        path: this.path.join(
          this.options.moduleDirectory,
          this.options.builtPath,
          this.options.publicPath
        ),
        filename: this.parseAssetsFilename('js/[name].[chunkhash].js'),
        chunkFilename: this.parseAssetsFilename('js/[id].[chunkhash].js')
      }
    })

    this.webpackBuilder.addPlugins([
      this.use(require('../Plugins/Productions/miniCssExtractPlugin')),
      this.use(require('../Plugins/Productions/optimizeCSSPlugin')),
      this.use(require('../Plugins/Productions/htmlWebpackPlugin')),
      this.use(require('../Plugins/Productions/vueLoaderPlugin')),
      this.use(require('../Plugins/Productions/hashedModuleIdsPlugin')),
      this.use(require('../Plugins/Productions/runtimeChunkPlugin')),
      this.use(require('../Plugins/Productions/splitChunksPlugin'))
    ])

    if (this.options.productionGzip) {
      this.webpackBuilder.addPlugin(
        this.use(require('../Plugins/Productions/compressionWebpackPlugin'))
      )
    }

    if (this.options.bundleAnalyzerReport) {
      this.webpackBuilder.addPlugin(
        this.use(require('../Plugins/Productions/bundleAnalyzerPlugin'))
      )
    }
    return this
  }

  parseAssetsFilename(relativePath) {
    return this.path.posix.join(this.options.assetsPath, relativePath)
  }

  /**
   * @returns
   * @memberof ProductionRunner
   */
  run() {
    super.run()
    return require('../Utils/buildProd').call(this, {
      webpack: this.webpackBuilder.create(),
      builtDirectory: this.path.join(
        this.options.moduleDirectory,
        this.options.builtPath
      )
    })
  }
}

module.exports = ProductionRunner
