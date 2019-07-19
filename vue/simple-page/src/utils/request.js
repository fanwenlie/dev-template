import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '',
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
    // debugger;
    var resData = response.data;
    // 同一手机号输入不能超过五次
    if (resData.result === 'error' && resData.msg.indexOf('5') !== -1) {
      
      alert(resData.msg)

    } else {
      return resData
    }
  },
  error => {
    console.error(error)// for debug
    alert(error)
    return Promise.reject(error)
  }
)

export default service
