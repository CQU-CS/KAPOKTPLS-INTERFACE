import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/notice/queryByPage',
    method: 'post',
    data
  })
}

export function deleteById(params) {
  return request({
    url: '/notice/deleteById',
    method: 'post',
    params
  })
}

export function add(data) {
  return request({
    url: '/notice/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/notice/edit',
    method: 'post',
    data
  })
}