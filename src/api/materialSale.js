import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/materialSale/queryByPage',
    method: 'post',
    data
  })
}

export function deleteById(params) {
  return request({
    url: '/materialSale/deleteById',
    method: 'post',
    params
  })
}

export function add(data) {
  return request({
    url: '/materialSale/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/materialSale/edit',
    method: 'post',
    data
  })
}
