const BaseRunner = require('./BaseRunner')
const ExpressBuilder = require('../Builders/ExpressBuilder')

class DevelopmentRunner extends BaseRunner {
  /**
   * Add express to expressBuilder
   * @param  {*} args
   * @return {this}
   */
  constructor (...args) {
    super(...args)
    this.expressBuilder = new ExpressBuilder()
  }

  /**
   * Add initialization
   * @protected
   * @return {this}
   */
  initialization () {
    super.initialization()

    this.webpackBuilder.deepMerge({
      mode: 'development',
      output: {
        publicPath: '/'
      },
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
    })

    // Extend webpack.entry.app, add webpack-hot-middleware file
    this.webpackBuilder.extend(webpack => {
      Object.keys(webpack.entry).forEach(name => {
        const file = this.path.join(__dirname, '../Utils/devClient.js')
        webpack.entry[name] = [file].concat(webpack.entry[name])
      })
      return webpack
    })

    this.webpackBuilder.merge({
      devtool: '#cheap-module-eval-source-map'
    })

    this.webpackBuilder.addPlugins([
      this.use(require('../Plugins/Developments/vueLoaderPlugin')),
      this.use(require('../Plugins/Developments/hotModulePlugin')),
      // this.use(require('../Plugins/Developments/noEmitOnErrorsPlugin')),
      this.use(require('../Plugins/Developments/htmlWebpackPlugin')),
      this.use(require('../Plugins/Developments/friendlyErrorsPlugin'))
    ])

    this.use(require('./Helpers/expressHotServer'))

    return this
  }

  /**
   * Run runner
   * @return {void}
   */
  run () {
    super.run()
    this.expressBuilder.listen(this.options.port)
  }
}

module.exports = DevelopmentRunner
