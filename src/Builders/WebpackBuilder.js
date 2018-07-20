const deepMerge = require('webpack-merge')

class WebpackBuilder {
  /**
   *Creates an instance of WebpackBuilder.
   * @memberof WebpackBuilder
   */
  constructor () {
    this.webpack = {
      mode: '',
      entry: {},
      output: {},
      resolve: {
        extensions: []
      },
      module: {
        rules: []
      },
      plugins: [],
      externals: {}
    }
  }

  /**
   * @returns
   * @memberof WebpackBuilder
   */
  create () {
    return this.webpack
  }

  /**
   * @param {*} options
   * @returns
   * @memberof WebpackBuilder
   */
  merge (options) {
    this.webpack = Object.assign({}, this.webpack, options)
    return this
  }

  /**
   * @param {*} options
   * @returns
   * @memberof WebpackBuilder
   */
  deepMerge (options) {
    this.webpack = deepMerge(this.webpack, options)
    return this
  }

  /**
   * @param {*} callback
   * @returns
   * @memberof WebpackBuilder
   */
  extend (callback) {
    const extendedWebpack = callback.call(this, this.webpack)
    if (typeof extendedWebpack === 'undefined') {
      throw new Error('You need return a webpack config.')
    } else if (typeof extendedWebpack !== 'object') {
      throw new Error('You need return a object webpack config')
    }
    return this
  }

  /**
   * Push extension to config.resolve.extensions
   * @param {*} extension
   */
  addExtension (extension) {
    this.webpack.resolve.extensions.push(extension)
    return this
  }

  /**
   * Concat extensions to config.resolve.extensions
   * @param {Array} extensions
   */
  addExtensions (extensions) {
    this.webpack.resolve.extensions = this.webpack.resolve.extensions.concat(
      extensions
    )
    return this
  }


  /**
   * Push rule to webpack.module.rules
   * @param  {*} rule
   * @return {this}
   */
  addRule (rule) {
    this.webpack.module.rules.push(rule)
    return this
  }

  /**
   * Concat rules to webpack.module.rules
   * @param  {Array} rules
   * @return {this}
   */
  addRules (rules) {
    this.webpack.module.rules = this.webpack.module.rules.concat(rules)
    return this
  }

  /**
   * Push plugin to webpack.module.plugins
   * @param  {*} plugin
   * @return {this}
   */
  addPlugin (plugin) {
    this.webpack.plugins.push(plugin)
    return this
  }

  /**
   * Concat plugins to webpack.module.plugins
   * @param  {Array} plugins
   * @return {this}
   */
  addPlugins (plugins) {
    this.webpack.plugins = this.webpack.plugins.concat(plugins)
    return this
  }
}

module.exports = WebpackBuilder
