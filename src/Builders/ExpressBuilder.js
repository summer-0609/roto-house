const express = require('express')
const chalk = require('chalk')

class ExpressBuilder {
  constructor (options) {
    this.app = express(options)
    this.beforeListenQueues = []
    this.afterListenQueues = []
    this.listeningMessage = chalk.yellow('Hello, I\'am Fresh house.')
  }

  addBeforeListenQueue (callback) {
    this.beforeListenQueues.push(callback)
    return this
  }

  addAfterListenQueue (callback) {
    this.afterListenQueues.push(callback)
    return this
  }

  callBeforeListenQueues () {
    this.beforeListenQueues.forEach(fn => {
      fn.call(this, this.app)
    })
    return this
  }

  callAfterListenQueues () {
    this.afterListenQueues.forEach(fn => {
      fn.call(this, this.app)
    })
    return this
  }

  listen (port) {
    if (!port) {
      throw new Error('please set port number.')
    }
    this.callBeforeListenQueues()
    console.log(this.listeningMessage)
    this.server = this.app.listen(port)
    this.callAfterListenQueues()
  }
}

module.exports = ExpressBuilder
