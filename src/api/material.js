import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/materialSale/queryByPage',
    method: 'get',
    params
  })
}
