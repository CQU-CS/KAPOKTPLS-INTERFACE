import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/person/queryByPage',
    method: 'post',
    data
  })
}

export function deleteById(params) {
  return request({
    url: '/person/deleteById',
    method: 'post',
    params
  })
}

export function add(data) {
  return request({
    url: '/person/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/person/edit',
    method: 'post',
    data
  })
}
