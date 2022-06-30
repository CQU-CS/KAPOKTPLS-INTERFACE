import request from '../utils/request.js'

export function getCarrierManage(data) {
  return request({
    url: '/carrierManage/queryByCarrierManage', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteCarrierManage(params) {
  return request({
    url: '/carrierManage/deleteByCarrierManageId', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addCarrierManage(data) {
  return request({
    url: '/carrierManage/addByCarrierManage', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editCarrierManage(data) {
  return request({
    url: '/carrierManage/editByCarrierManage', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
