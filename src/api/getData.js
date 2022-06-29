import request from '../utils/request.js'

export function getCompany(data) {
  return request({
    url: '/company/queryByCompany', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function deleteCompany(params) {
  return request({
    url: '/company/deleteByCompanyId', //请求接口
    method: 'post', //请求方式
    params //请求参数
  })
}

export function addCompany(data) {
  return request({
    url: '/company/addByCompany', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}

export function editCompany(data) {
  return request({
    url: '/company/editByCompany', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
