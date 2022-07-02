import request from '../utils/request.js'
export function getPerson(data) {
  return request({
    url: '/person/queryByPerson', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function getCompany(data) {
  return request({
    url: '/company/queryByCompany', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function deleteCompany(params) {
  return request({
    url: '/company/deleteByCompanyId', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function addCompany(data) {
  return request({
    url: '/company/addByCompany', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function editCompany(data) {
  return request({
    url: '/company/editByCompany', // 请求接口
    method: 'post', // 请求方式
    data // 请求参数
  })
}

export function getIndexStatistic(params) {
  return request({
    url: '/statistic/getIndexStatistic', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function getHalfYearIncome(params) {
  return request({
    url: '/statistic/getHalfYearIncome', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function getHalfYearExpenditures(params) {
  return request({
    url: '/statistic/getHalfYearExpenditures', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}

export function getSectorDiagram(params) {
  return request({
    url: '/statistic/getSectorDiagram', // 请求接口
    method: 'post', // 请求方式
    params // 请求参数
  })
}