import request from '../utils/request.js'

export function getTruck(data){
  return request({
    url: '/truck/queryByTruckDTO',  // 请求接口
    method: 'post', // 请求方式
    data  // 请求参数
  })
}

export function deleteTruck(params) {
  return request({
    url: '/truck/deleteByTruckId', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function addTruck(data) {
  return request({
    url: '/truck/addByTruck', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function editTruck(data) {
  return request({
    url: '/truck/editByTruck', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}