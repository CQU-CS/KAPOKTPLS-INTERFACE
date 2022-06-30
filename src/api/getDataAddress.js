import request from '../utils/request.js'

export function getAddress(data) {
  return request({
    url: '/address/queryByAddressDTO', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function deleteAddress(params) {
  return request({
    url: '/address/deleteByAddressId', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addAddress(data) {
  return request({
    url: '/address/addByAddress', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editAddress(data) {
  return request({
    url: '/address/editByAddress', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
