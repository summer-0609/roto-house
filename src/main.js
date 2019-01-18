import 'babel-polyfill'
import Vue from 'vue'
import app from './app.vue'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  render: h => h(app)
})
