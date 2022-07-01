import request from '../utils/request.js'

export function getGoods(data) {
  return request({
    url: '/goods/queryByGoodsDTO', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteGoods(params) {
  return request({
    url: '/goods/deleteByGoodsId', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addGoods(data) {
  return request({
    url: '/goods/addByGoods', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editGoods(data) {
  return request({
    url: '/goods/editByGoods', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
