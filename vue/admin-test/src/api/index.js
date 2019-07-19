import request from '@/utils/request';
// 获取服务器时间
export function getServerTime() {
  return request({
    method: 'get',
    url: '/daily/systime'
  })
}

