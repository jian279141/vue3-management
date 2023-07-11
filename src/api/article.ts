import request from '@/utils/request'

type QueryType = {
  page?: number,
  limit?: number,
}

export function fetchList(query: QueryType) {
  return request({
    url: '/vue-admin-template/article/list',
    method: 'get',
    params: query
  })
}