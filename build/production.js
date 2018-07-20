const webpack = require('webpack')
const path = require('path')

const ora = require('ora')
const chalk = require('chalk')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.js')
const { VueLoaderPlugin } = require('vue-loader')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UgifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('./configs/options')
const appEnvs = require('./configs/appEnvs')

const compiler = webpack(merge(baseConfig({ mode: 'production' }), {
  mode: 'production',
  output: {
    publicPath:'./',
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin(appEnvs),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([`${config.builtPath || 'dist'}/*`], {
      root: path.resolve(__dirname, '..')
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors', 'mainifest']
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
      // chunkFilename: 'static/css/[id].[contenthash].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        },
        autoprefixer: false
      },
      canPrint: true
    })
    // new webpack.SourceMapDevToolPlugin({
    //   test: /\.js$/,
    //   filename: 'sourcemap/[name].[chunkhash].map',
    //   append: false
    // })
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
      new UgifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          console: false,
          ie8: true
        },
        sourceMap: true
      })
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

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
