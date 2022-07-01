import request from '@/utils/request'

export function getPage(data) {
  return request({
    url: '/repairRecord/queryByPage',
    method: 'post',
    data
  })
}

export function deleteById(params) {
  return request({
    url: '/repairRecord/deleteById',
    method: 'post',
    params
  })
}

export function add(data) {
  return request({
    url: '/repairRecord/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/repairRecord/edit',
    method: 'post',
    data
  })
}
