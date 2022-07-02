import request from '../utils/request.js'

export function getTransportationTask(data){
  return request({
    url: '/transportationTask/queryByTransportationTaskDTO',  // 请求接口
    method: 'post', // 请求方式
    data  // 请求参数
  })
}

export function deleteTransportationTask(params) {
  return request({
    url: '/transportationTask/deleteByTransportationTask', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function addTransportationTask(data) {
  return request({
    url: '/transportationTask/addByTransportationTask', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function editTransportationTask(data) {
  return request({
    url: '/transportationTask/editByTransportationTask', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}
