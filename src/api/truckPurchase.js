import request from '../utils/request.js'

export function getTruckPurchase(data){
  return request({
    url: '/truckPurchase/queryByTruckPurchaseDTO',  // 请求接口
    method: 'post', // 请求方式
    data  // 请求参数
  })
}

export function deleteTruckPurchase(params) {
  return request({
    url: '/truckPurchase/deleteByTruckPurchase', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function addTruckPurchase(data) {
  return request({
    url: '/truckPurchase/addByTruckPurchase', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function editTruckPurchase(data) {
  return request({
    url: '/truckPurchase/editByTrucKPurchase', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}
