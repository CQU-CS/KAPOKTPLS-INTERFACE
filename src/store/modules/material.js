import { getPage } from '@/api/material'

const getDefaultState = () => {
  return {

  }
}

const state = getDefaultState()

const mutations = {

}

const actions = {
  getPage({ commit }, pageInfo) {
    const { page,size } = pageInfo
    console.log(pageInfo)
    return new Promise((resolve, reject) => {
      getPage({ page: page, size: size }).then(response => {
        const { data } = response
        console.log(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
