const webpack = require('webpack')
const path = require('path')

const ora = require('ora')
const chalk = require('chalk')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// const UgifyJsPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const config = require('./configs/options')
const appEnvs = require('./configs/appEnvs')

const compiler = webpack(merge(baseConfig({ mode: 'production' }), {
  mode: 'production',
  output: {
    publicPath: './'
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin(appEnvs),
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
      filename: 'sourcemap/[name].[chunkhash].map',
      append: false
    }),
    new CleanWebpackPlugin([`${config.builtPath || 'dist'}/*`], {
      root: path.resolve(__dirname, '..')
    }),
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors', 'mainifest'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
      // chunkFilename: 'static/css/[id].[contenthash].css'
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'mainifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          test: /node_modules\/(.*)\.js/,
          name: 'vendors',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false
        }
      }
    },
    minimizer: [
      new ParallelUglifyPlugin({
        uglifyJS: {
          output: {
            beautify: false,
            comments: false
          },
          compress: {
            warnings: false,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        },
        cache: true, // 开启缓存
        parallel: true, // 平行压缩
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({
        safe: true,
        discardComments: {
          removeAll: true
        },
        autoprefixer: false,
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'), // css 压缩优化器
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, // 去除所有注释
        canPrint: true
      })
      // new UgifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   uglifyOptions: {
      //     warnings: false,
      //     console: false,
      //     ie8: true
      //   },
      //   sourceMap: true
      // }),
    ]
  }
}))

function resolve (name) {
  return path.resolve(__dirname, '..', name)
}

const spinner = ora('building for production...').start()

compiler.run((err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete..\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
