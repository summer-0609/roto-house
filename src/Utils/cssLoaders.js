const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (options) {
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.cssMinimize,
      sourceMap: options.cssSourceMap
    }
  }

  // generate loader string, object, array to be used with extract text plugin
  function generateLoaders (loader) {
    var loaders = [cssLoader]

    if (loader) {
      // wrap string & object to array
      if (typeof loader === 'string' ||
        (typeof loader === 'object' && loader.constructor === Object)) {
        loader = [loader]
      }

      loader.forEach(item => {
        loaders.push(handleLoader(item))
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.cssExtract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // generate loader string and object to loader config object
  function handleLoader (loader) {
    if (typeof loader === 'string') {
      return {
        loader: loader + '-loader',
        options: {
          sourceMap: options.cssSourceMap
        }
      }
    } else if (typeof loader === 'object' && loader.constructor === Object) {
      return loader
    }
  }

  function getScssConfig () {
    if (!options.sassResources) return [ 'sass' ]

    return [
      'sass',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: options.sassResources
        }
      }
    ]
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    scss: generateLoaders(getScssConfig())
  }
}
