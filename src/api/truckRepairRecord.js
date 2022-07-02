import request from '../utils/request.js'

export function getTruckRepairRecord(data){
  return request({
    url: '/truckRepairRecord/queryByTruckRepairRecordDTO',  // 请求接口
    method: 'post', // 请求方式
    data  // 请求参数
  })
}

export function deleteTruckRepairRecord(params) {
  return request({
    url: '/truckRepairRecord/deleteByTruckRepairRecord', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function addTruckRepairRecord(data) {
  return request({
    url: '/truckRepairRecord/addByTruckRepairRecord', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function editTruckRepairRecord(data) {
  return request({
    url: '/truckRepairRecord/editByTruckRepairRecord', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}
