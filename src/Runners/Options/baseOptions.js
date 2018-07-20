module.exports = {
  /**
   * @type {String}
   */
  mode: undefined,
  /**
   * @type {String}
   */
  moduleDirectory: process.cwd(),

  /**
   * @type {String}
   */
  appPath: 'src',

  /**
   * @type {String}
   */
  testPath: 'test',

  /**
   * @type {String}
   */
  indexFileName: 'index.html',

  /**
   * @type {String}
   */
  builtPath: 'dist',

  /**
   * @type {String}
   */
  assetsPath: 'static',

  /**
   * url root path
   * @private
   * @type {String}
   */
  publicPath: '/',

  /**
   * http port
   * @type {Number}
   */
  port: process.env.PORT || 8080,

  /**
   * enable css sourceMap
   * @type {Boolean}
   */
  cssSourceMap: true,

  /**
   * enable minize css
   * @type {Boolean}
   */
  cssMinimize: false,

  /**
   * sperate css in single .css file
   * @type {Boolean}
   */
  cssExtract: false,

  /**
   * enable production gzip
   * @type {Boolean}
   */
  productionGzip: false,

  /**
   * production gzip extensions
   * @type {Array}
   */
  productionGzipExtensions: ['js', 'css'],

  /**
   * analyzer report
   * @private
   * @type {Boolean}
   */
  bundleAnalyzerReport: process.env.BUNDLE_REPORT || process.env.npm_config_report,

  /**
   * enable human rule
   */
  enableHumanRule: true,

  /**
   *
   */
  sassResources: undefined
}
