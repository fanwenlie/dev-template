/**
 * Vue注入多种插件，以后会经常用到的方法
 */

import axios from '@/utils/request'

export default {
  install: (Vue, options) => {
      Vue.prototype.$axios = axios
  }
}