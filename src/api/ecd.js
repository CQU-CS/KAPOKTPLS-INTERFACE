import request from '../utils/request.js'

export function getEcd(data) {
  return request({
    url: '/ecd/queryByEcd', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteEcd(params) {
  return request({
    url: '/ecd/deleteByEcdId', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addEcd(data) {
  return request({
    url: '/ecd/addByEcd', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editEcd(data) {
  return request({
    url: '/ecd/editByEcd', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
