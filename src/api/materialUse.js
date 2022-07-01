import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/materialUse/queryByPage',
    method: 'post',
    data
  })
}

export function deleteById(params) {
  return request({
    url: '/materialUse/deleteById',
    method: 'post',
    params
  })
}

export function add(data) {
  return request({
    url: '/materialUse/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/materialUse/edit',
    method: 'post',
    data
  })
}
