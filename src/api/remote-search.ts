import request from '@/utils/request';

export function searchUser(name: string) {
  return request({
    url: '/vue-admin-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query: any) {
  return request({
    url: '/vue-admin-template/transaction/list',
    method: 'get',
    params: query
  })
}