const ProxyMiddleware = require('http-proxy-middleware')

module.exports = (app, proxyMaps) => {
  Object.keys(proxyMaps).forEach(name => {
    let options = proxyMaps[name]
    if (typeof options === 'string') options = { target: options }
    app.use(ProxyMiddleware(options.filter || name, options))
  })
}
