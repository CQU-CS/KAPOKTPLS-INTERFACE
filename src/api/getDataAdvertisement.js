import request from '../utils/request.js'

export function getAdvertisement(data) {
  return request({
    url: '/advertisement/queryByAdvertisementDTO', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function deleteAdvertisement(params) {
  return request({
    url: '/advertisement/deleteById', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addAdvertisement(data) {
  return request({
    url: '/advertisement/addByAdvertisement', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editAdvertisement(data) {
  return request({
    url: '/advertisement/editByAdvertisement', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
