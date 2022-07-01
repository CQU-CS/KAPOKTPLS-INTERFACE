import request from '@/utils/request'

export function getGoodsPurchase(data) {
  return request({
    url: '/goodsPurchase/queryByGoodsPurchase', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteGoodsPurchase(params) {
  return request({
    url: '/goodsPurchase/deleteGoodsPurchase', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addGoodsPurchase(data) {
  console.log(88888)
  console.log(data)
  return request({
    url: '/goodsPurchase/addGoodsPurchase', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editGoodsPurchase(data) {
  console.log(6666666)
  console.log(data)
  return request({
    url: '/goodsPurchase/editGoodsPurchase', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
