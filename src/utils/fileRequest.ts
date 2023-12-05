//用于文件上传的请求

import axios from 'axios'

let instance = axios.create()

instance.defaults.baseURL = 'http://127.0.0.1:3000/dev-api'
instance.defaults.headers['Content-Type'] = 'multipart/form-data'
//application/x-www-form-urlencoded

instance.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default instance