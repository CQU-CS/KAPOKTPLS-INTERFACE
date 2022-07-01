import request from '@/utils/request'

export function getMaterialInventory(data) {
  return request({
    url: '/materialInventory/queryByMaterialInventory', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteMaterialInventory(params) {
  return request({
    url: '/materialInventory/deleteMaterialInventory', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addMaterialInventory(data) {
  console.log(88888)
  console.log(data)
  return request({
    url: '/materialInventory/addMaterialInventory', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editMaterialInventory(data) {
  return request({
    url: '/materialInventory/editMaterialInventory', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
