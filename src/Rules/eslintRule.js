module.exports = runner => {
  return {
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [
      runner.path.join(runner.options.moduleDirectory, runner.options.appPath),
      runner.path.join(runner.options.moduleDirectory, runner.options.testPath)
    ],
    options: {
      formatter: require('eslint-friendly-formatter'),
      root: true,
      parser: 'babel-eslint',
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      },
      env: {
        browser: true
      },
      // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
      extends: 'standard',
      // required to lint *.vue files
      plugins: [
        'html'
      ],
      // add your custom rules here
      'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-trailing-spaces': ['error', { 'ignoreComments': true }]
      }
    }
  }
}
