import request from '@/utils/request'
import {
  json2QueryStr
} from '@/utils/index'

/**
 * TIPS: __GLOBAL是全局变量
 * 获取员工列表
 * 如果data中有keyword字段，则为搜索
 * @param {Object} data 
 */
export function getEmployeeList(data) {
  return request({
    method: 'post',
    url: '/employee/list',
    headers: {
      'X-CSRF-TOKEN': process.env.NODE_ENV === 'production' ? __GLOBAL.csrfToken : '0ecb38fd-05c6-46a2-bba1-5bbb6ad545ca'
    },
    data: json2QueryStr(data)
  })
}

/**
 * 获取单个员工详细信息
 * @param {Object} params 
 */
export function getEmployeeOne(params) {
  return request({
    method: 'get',
    url: '/employee/get',
    params
  })
}

