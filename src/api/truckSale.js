import request from '../utils/request.js'

export function getTruckSale(data){
  return request({
    url: '/truckSale/queryByTruckSaleDTO',  // 请求接口
    method: 'post', // 请求方式
    data  // 请求参数
  })
}

export function deleteTruckSale(params) {
  return request({
    url: '/truckSale/deleteByTruckSaleId', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function addTruckSale(data) {
  return request({
    url: '/truckSale/addByTruckSale', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function editTruckSale(data) {
  return request({
    url: '/truckSale/editByTruckSale', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}
