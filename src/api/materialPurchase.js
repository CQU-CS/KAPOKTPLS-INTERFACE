import request from '@/utils/request'

export function getMaterialPurchase(data) {
  return request({
    url: '/materialPurchase/queryByMaterialPurchase', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteMaterialPurchase(params) {
  return request({
    url: '/materialPurchase/deleteMaterialPurchase', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addMaterialPurchase(data) {
  console.log(88888)
  console.log(data)
  return request({
    url: '/materialPurchase/addMaterialPurchase', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editMaterialPurchase(data) {
  console.log(6666666)
  console.log(data)
  return request({
    url: '/materialPurchase/editMaterialPurchase', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
