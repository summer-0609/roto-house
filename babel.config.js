module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        }
      }
    ],
    '@vue/babel-preset-jsx'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ],
  comments: false,
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: ['babel-plugin-dynamic-import-node']
    }
  }
}
