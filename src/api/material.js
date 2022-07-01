import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/materialSale/queryByPage',
    method: 'get',
    params
  })
}

export function getMaterial(data) {
  return request({
    url: '/material/queryByMaterial', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteMaterial(params) {
  return request({
    url: '/material/deleteMaterial', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addMaterial(data) {
  return request({
    url: '/material/addMaterial', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editMaterial(data) {
  return request({
    url: '/material/editMaterial', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function exportMaterial() {
  return request({
    url: '/material/exportMaterial', //请求接口
    method: 'get' //请求方式
  })
}

