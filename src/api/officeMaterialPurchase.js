import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/officeMaterialPurchase/queryByPage',
    method: 'post',
    data
  })
}

export function deleteById(params) {
  return request({
    url: '/officeMaterialPurchase/deleteById',
    method: 'post',
    params
  })
}

export function add(data) {
  return request({
    url: '/officeMaterialPurchase/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/officeMaterialPurchase/edit',
    method: 'post',
    data
  })
}