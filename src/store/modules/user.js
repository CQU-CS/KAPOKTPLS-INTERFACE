import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: '',
    map: [],
    basicAs: false,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
    state.basicAs = false
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
    state.basicAs = (role=='root'||role=='基本信息管理员')?true:false
  },
  SET_MAP: (state, map) => {
    state.map = map
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account_account, account_password } = userInfo
    console.log(7)
    return new Promise((resolve, reject) => {
      console.log(8)
      login({ accountAccount: account_account.trim(), accountPassword: account_password }).then((response) => {
        console.log(9)
        const { datas } = response
        // sessionStorage.setItem('user', JSON.stringify({ 'user': datas.nickname }))// 存储用户信息到浏览器
        console.log(123)
        console.log(datas)
        sessionStorage.setItem('user', JSON.stringify(datas))
        console.log(10)
        commit('SET_TOKEN', datas.token)
        console.log(11)
        setToken(datas.token)
        console.log(12)
        resolve()
      }).catch(error => {
        console.log(13)
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(1515)
      console.log(state.token)
      getInfo({token:state.token}).then(response => {
        const { datas } = response

        if (!datas) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, role, map } = datas

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', role)
        commit('SET_MAP', map)
        resolve(datas)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
