import Mock from 'mockjs'
import loginAPI from './login'
import tableAPI from './table'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 表格相关
Mock.mock(/\/table\/list\.*/, 'get', tableAPI.list)

export default Mock
