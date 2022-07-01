import request from '../utils/request.js'
// export function docSelectOne(data) {
// 	return request({
// 		url: '/doc/selectOne',//请求接口
// 		method: 'post',//请求方式
// 		data//请求参数
// 	})
// }
// //获取doc集合数据
// export function getDocByCondition(data) {
// 	return request({
// 		url: '/doc/getDocByCondition',//请求接口
// 		method: 'post',//请求方式
// 		data//请求参数
// 	})
// }
// //获取类型数据
// export function getCategoryByCondition(data){
// 	return request({
// 		url: '/category/getCategoryByCondition',//请求接口
// 		method: 'post',//请求方式
// 		data//请求参数
// 	})
// }
// //用户登录
// export function userLogin(data){
// 	return request({
// 		url: '/login',//请求接口
// 		method: 'post',//请求方式
// 		data//请求参数
// 	})
// }
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