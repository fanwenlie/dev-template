// 解决vuex在ie下报错的问题[issues/474](https://github.com/vuejs-templates/webpack/issues/474)
// 必须放在前面引入，否则无效
import 'es6-promise/auto'

import Vue from 'vue'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 覆盖element默认样式
import '@/styles/default/element-var.scss'

import '@/assets/css/ionicons/css/ionicons.min.css'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/permission' // permission control

import inject from './config/inject'

// fixed: 去除ios微信默认bounce效果
require('./assets/lib/nobounce')

Vue.use(inject)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
