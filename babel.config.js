module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime', 'transform-vue-jsx']
  // env: {
  //   'test': {
  //     'presets': ['env', 'stage-2'],
  //     'plugins': ['@vue/babel-plugin-transform-vue-jsx', '@babel/plugin-transform-runtime']
  //   }
  // }
}
