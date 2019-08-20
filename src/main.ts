import 'babel-polyfill'
import Vue from 'vue'
import App from '@/App'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  render: h => h(App)
})
