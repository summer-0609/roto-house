module.exports = {
  presets: [
    [require('babel-preset-env'), {
      modules: false,
      useBuiltIns: true,
      targets: {
        browsers: [
          'defaults',
          'not ie <= 100',
          'not ExplorerMobile <= 100',
          'not Opera <=100',
          'not OperaMini <= 100',
          'not OperaMini all',
          'not OperaMobile <= 100',
          'not BlackBerry <= 100'
        ]
      }
    }],
    require('babel-preset-stage-2'),
    require('babel-preset-react')
  ],
  plugins: [
    require('babel-plugin-transform-runtime')
  ],
  comments: false
}
