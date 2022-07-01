import request from '../utils/request.js'

export function getAccount(data) {
  return request({
    url: '/account/queryByAccountDTO', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function deleteAccount(params) {
  return request({
    url: '/account/deleteById', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addAccount(data) {
  return request({
    url: '/account/addByAccount', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editAccount(data) {
  return request({
    url: '/account/editByAccount', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
