import axios from 'axios'
import { Message, Notification  } from 'element-ui'

// 创建axios实例
const service = axios.create({
  // __baseUrl来自index.html中提供的全局变量
  baseURL: process.env.NODE_ENV === 'production' ? __GLOBAL.baseUrl : '/apis',
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
 
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 获取服务器时间api是毫秒文本，做特殊处理
    let isNumber = !(isNaN( Number(res) ))
    if( isNumber ) {
      return response.data
    }
    if (res.errorCode !== "000000" && res.success !== 'true') {
      Message({
        message: res.errorMsg,
        type: 'error',
        duration: 5 * 1000
      })

      return;
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    Notification({
      message: error.message,
      type: 'error',
      showClose: false,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
