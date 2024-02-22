import request from '@/utils/request'

// 获取七牛云token
export function getQiniuToken() {
  return request({
    url: 'qiniu/getQiniuToken',
    method: 'get',
  })
} 