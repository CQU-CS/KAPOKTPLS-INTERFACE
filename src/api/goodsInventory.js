import request from '@/utils/request'

export function getGoodsInventory(data) {
  return request({
    url: '/goodsInventory/queryByGoodsInventory', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteGoodsInventory(params) {
  return request({
    url: '/goodsInventory/deleteGoodsInventory', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addGoodsInventory(data) {
  console.log(88888)
  console.log(data)
  return request({
    url: '/goodsInventory/addGoodsInventory', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editGoodsInventory(data) {
  return request({
    url: '/goodsInventory/editGoodsInventory', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
