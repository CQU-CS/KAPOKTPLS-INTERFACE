import request from '../utils/request.js'

export function getPicture(data) {
  return request({
    url: '/account/getPictureByNickname', //请求接口
    method: 'post', //请求方式
    data //请求参数
  })
}
