import Vue from 'vue'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'


import inject from './config/inject'

// fixed: 去除ios微信默认bounce效果
// require('./assets/lib/nobounce')

Vue.use(inject)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
