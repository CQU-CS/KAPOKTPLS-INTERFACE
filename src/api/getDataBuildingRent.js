import request from '../utils/request.js'

export function getBuildingRent(data) {
  return request({
    url: '/buildingRent/queryByBuildingRentDTO', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function deleteBuildingRent(params) {
  return request({
    url: '/buildingRent/deleteById', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addBuildingRent(data) {
  return request({
    url: '/buildingRent/addByBuildingRent', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editBuildingRent(data) {
  return request({
    url: '/buildingRent/editByBuildingRent', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
