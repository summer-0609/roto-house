const path = require('path')
const config = require('./configs/options')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) // cpus核数

// const { VueLoaderPlugin } = require('vue-loader')

const cssLoaders = require('./rules/cssLoaders')

function resolve (name) {
  return path.resolve(__dirname, '..', name)
}

function addDevClient (options) {
  if (options.mode === 'development') {
    Object.keys(options.entry).forEach(name => {
      options.entry[name] = [
        'webpack-hot-middleware/client?reload=true&noInfo=true'
      ].concat(options.entry[name])
    })
  }
  return options.entry
}

module.exports = options => {
  const entry = addDevClient({
    entry: {
      app: [resolve('src/main.ts')]
    },
    mode: options.mode
  })
  return {
    entry: entry,
    output: {
      publicPath: '/',
      path: resolve(config.builtPath || 'dist'),
      filename: 'static/js/[name].[hash].js',
      chunkFilename: 'static/js/[name].[chunkhash].js'
    },
    resolve: {
      modules: [resolve('node_modules'), resolve('src')],
      extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@components': resolve('src/components'),
        '@': resolve('src')
      }
    },
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter'
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          use: ['happypack/loader?id=jsloader'],
          exclude: /node_modules/
        },
        {
          test: /(\.tsx)$/,
          exclude: /node_modules/,
          use: ['happypack/loader?id=tsxloader']
        },
        {
          test: /(\.ts)$/,
          exclude: /node_modules/,
          use: ['happypack/loader?id=tsloader']
        },
        ...cssLoaders({
          mode: options.mode,
          sourceMap: options.sourceMap,
          extract: options.mode === 'production'
        }),
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:7].[ext]',
            fallback: 'file-loader'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new HappyPack({
        id: 'tsxloader',
        loaders: [
          'babel-loader',
          'vue-jsx-hot-loader',
          {
            loader: 'tslint-loader',
            options: {
              formatter: 'codeFrame',
              enforce: 'pre',
              emitErrors: true,
              typeCheck: true,
              fix: false
            }
          }
        ],
        threadPool: happyThreadPool
      }),
      new HappyPack({
        id: 'tsloader',
        loaders: [
          {
            loader: 'tslint-loader',
            options: {
              formatter: 'codeFrame',
              enforce: 'pre',
              emitErrors: true,
              typeCheck: true,
              fix: false
            }
          }
        ],
        threadPool: happyThreadPool
      }),
      new HappyPack({
        id: 'jsloader',
        loaders: ['babel-loader', 'eslint-loader'],
        threadPool: happyThreadPool
      })
    ]
  }
}
