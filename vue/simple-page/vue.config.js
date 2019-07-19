module.exports = {
  baseUrl: '/',
  devServer: {
    proxy: {
      '/apis': { //将www.exaple.com印射为/apis
        target: 'http://127.0.0.1:8088', // 接口域名
        // secure: false, // 如果是https接口，需要配置这个参数
        // changeOrigin: true, //是否跨域
        //  '/apis' 为匹配项，target 为被请求的地址，因为在 ajax 的 url 中加了前缀 '/apis'，而原本的接口是没有这个前缀的，所以需要通过 pathRewrite 来重写地址，将前缀 '/apis' 转为 '/'。如果本身的接口地址就有 '/apis' 这种通用前缀，就可以把 pathRewrite 删掉。
        // pathRewrite: {
        //   '^/apis': ''
        // },
        // headers: {
        //   'Cookie': 'JSESSIONID=DBFD3C7121994DA5CC7E85B51764CDC1;' //这里可以设置cookies, 也可以不设置
        // }
      }
    }
  }
}