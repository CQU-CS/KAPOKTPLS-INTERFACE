import request from '../utils/request.js'

export function getCertificate(data) {
  return request({
    url: '/certificate/queryByCertificate', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
export function deleteCertificate(params) {
  return request({
    url: '/certificate/deleteByCertificateId', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addCertificate(data) {
  return request({
    url: '/certificate/addByCertificate', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editCertificate(data) {
  return request({
    url: '/certificate/editByCertificate', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
