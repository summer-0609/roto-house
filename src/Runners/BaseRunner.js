const path = require('path')
const WebpackBuilder = require('../Builders/WebpackBuilder')
const baseOptions = require('./Options/baseOptions')

/**
 * @callback BaseRunner~extendCallback
 * @param  {Object} runner runner self
 */

/**
 * @class
 * Base Runner Class
 */
class BaseRunner {
  /**
   * @constructor
   * @param {Object} options some options
   */
  constructor(options) {
    this.path = path
    this.options = baseOptions
    this.appEnvs = {}
    this.proxyMaps = {}
    this.webpackBuilder = new WebpackBuilder()
    this.initialized = false // If excute initialization, the value is true
  }

  /**
   * Set new options
   * @param {Object} options
   * @return {this}
   */
  setOptions(options) {
    this.options = Object.assign({}, this.options, options)
    return this
  }

  /**
   * Set new app environments
   * The object will be assign to process.env.xxx
   * @example
   *   this.setAppEnvs({
   *     NODE_ENV: 'development', // Just use 'development', not '"development"'
   *     APP_DEBUG: true
   *   })
   * @param {Object} appEnvs
   * @return {this}
   */
  setAppEnvs(appEnvs) {
    this.appEnvs = Object.assign({}, this.appEnvs, appEnvs)
    return this
  }

  /**
   * Set http proxy maps
   * @param {Object} proxyMaps
   * @return {this}
   */
  setProxy(proxyMaps) {
    this.proxyMaps = Object.assign({}, this.proxyMaps, proxyMaps)
    return this
  }

  /**
   * Extend Runner after initialization
   * @example
   *   this.extend(runner => {
   *     console.log(runner.webpackBuilder.create())
   *   })
   * @param  {BaseRunner~extendCallback} callback Some runner extended
   * @return {this}
   */
  extend(callback) {
    if (!this.initialized) this.initialization()
    callback.call(this, this)
    return this
  }

  /**
   * Call some function,
   * and send this to them for using context and methods
   * @param  {Function} callback
   * @return {*} Callback call return
   */
  use(callback) {
    return callback.call(this, this)
  }

  /**
   * Initialization method
   * @protected
   * @return {this}
   */
  initialization() {
    this.initialized = true // 完成初始化

    this.webpackBuilder.merge({
      entry: {
        app: this.path.join(
          this.options.moduleDirectory,
          this.options.appPath,
          'main.js'
        )
      }
    })

    this.webpackBuilder.merge({
      output: {
        path: this.path.join(
          this.options.moduleDirectory,
          this.options.builtPath,
          this.options.publicPath
        ),
        filename: '[name].js',
        publicPath: this.path.posix.join(this.options.publicPath)
      }
    })

    this.webpackBuilder.addExtensions(['.js', '.vue', '.json'])

    this.webpackBuilder.addRules([
      this.use(require('../Rules/eslintRule')),
      this.use(require('../Rules/vueRule')),
      this.use(require('../Rules/babelRule')),
      this.use(require('../Rules/imageRule')),
      this.use(require('../Rules/fontRule')),
      ...this.use(require('../Rules/cssRule'))
    ])

    // if (this.options.enableHumanRule) {
    //   this.webpackBuilder.addRule(this.use(require('../Rules/humanRule')))
    // }

    // this.webpackBuilder.addPlugin(
    //   this.use(require('../Plugins/defineHashPlugin'))
    // )

    this.webpackBuilder.addPlugin(this.use(require('../Plugins/definePlugin')))

    return this
  }

  /**
   * Important method for extended class
   * @return {this}
   */
  run() {
    if (!this.initialized) this.initialization()
    return this
  }
}

module.exports = BaseRunner
