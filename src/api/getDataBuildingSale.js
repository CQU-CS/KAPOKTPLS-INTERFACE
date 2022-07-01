import request from '../utils/request.js'

export function getBuildingSale(data) {
  return request({
    url: '/buildingSale/queryByBuildingSaleDTO', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function deleteBuildingSale(params) {
  return request({
    url: '/buildingSale/deleteById', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addBuildingSale(data) {
  return request({
    url: '/buildingSale/addByBuildingSale', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editBuildingSale(data) {
  return request({
    url: '/buildingSale/editByBuildingSale', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
