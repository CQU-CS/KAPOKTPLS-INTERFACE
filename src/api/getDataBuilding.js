import request from '../utils/request.js'

export function getBuilding(data) {
  return request({
    url: '/building/queryByBuildingDTO', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function deleteBuilding(params) {
  return request({
    url: '/building/deleteById', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addBuilding(data) {
  return request({
    url: '/building/addByBuilding', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editBuilding(data) {
  return request({
    url: '/building/editByBuilding', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function getBuildings(data) {
  return request({
    url: '/building/queryByBuilding', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}