const webpack = require('webpack')
const path = require('path')
const config = require('./configs/options')

const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 5 })

const cssLoaders = require('./rules/cssLoaders')

function resolve (name) {
  return path.resolve(__dirname, '..', name)
}

function addDevClient (options) {
  if (options.mode === 'development') {
    Object.keys(options.entry).forEach(name => {
      options.entry[name] = ['./build/plugins/devClient.js'].concat(options.entry[name])
    })
  }
  return options.entry
}


module.exports = (options) => {
  const entry = addDevClient ({
    entry:  {
      app: [resolve('app/main.js')]
    },
    mode: options.mode
  })
  return {
    entry: entry,
    output: {
      publicPath:'/',
      path: resolve(config.builtPath || 'dist'),
      filename: 'static/js/[name].[hash].js',
      chunkFilename: 'static/js/[name].[chunkhash].js'
    },
    resolve: {
      modules: [resolve('node_modules'), resolve('src')],
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'vue-freedom': path.resolve(__dirname, '../'),
        '@': resolve('examples'),
      }
    },
    // externals: {
    //   vue: 'Vue',
    //   vuex: 'Vuex',
    //   'vue-router': 'VueRouter'
    // },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('app')],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /(\.jsx|\.js)$/,
          // use: {
          //   loader: "babel-loader"
          // },
          use: ['happypack/loader?id=babel'],
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
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
      new HappyPack({
        id: 'babel',
        loaders: ['babel-loader?cacheDirectory'],
        threadPool: happyThreadPool
      })
    ]
  }
}
