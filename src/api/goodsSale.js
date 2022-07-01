import request from '@/utils/request'

export function getGoodsSale(data) {
  return request({
    url: '/goodsSale/queryByGoodsSale', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteGoodsSale(params) {
  return request({
    url: '/goodsSale/deleteGoodsSale', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addGoodsSale(data) {
  console.log(88888)
  console.log(data)
  return request({
    url: '/goodsSale/addGoodsSale', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editGoodsSale(data) {
  console.log(6666666)
  console.log(data)
  return request({
    url: '/goodsSale/editGoodsSale', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
