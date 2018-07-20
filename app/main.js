import Vue from 'vue'
import app from './app.vue'
console.log(process.env.NODE_ENV)
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(app)
})
// import React from 'react';
// import {render} from 'react-dom';
// import Greeter from './Gretter.js';
// render(<Greeter />, document.getElementById('root'));
