import $utilHelper from '@/utils/utils'
import ApiFactory from '@/api/apiFactory'
let userDataStore = localStorage.getItem('userData')
let $apiFactory = new ApiFactory()
let Base64 = require('js-base64').Base64
// import loginApi from 'api/apiFactory'
if (userDataStore) {
  userDataStore = JSON.parse(userDataStore)
} else {
  userDataStore = {}
}

const state = {
  loginUser: userDataStore,
  loginStatus: userDataStore.id ? true : false,
  dialogState: false,
  searchDialog: ''
}

// actions
const actions = {
  signin: ({ commit }, info) => {
    commit('setUserInfo', info)
  },
  signout: ({ commit }) => {
    commit('clearUserInfo')
  },
  updateAvatar({ commit }, avatar) {
    commit('UPDATE_AVATAR', avatar)
  }
}

// mutations
const mutations = {
  setUserInfo: async (state, user) => {
    if (user) {
      let info = JSON.parse(Base64.decode(user.headers.authorization.split('.')[1]))
      let time = info.exp
      if (window.location.href.includes('//localhost')) {
        $utilHelper.setCookie('p-token', user.headers.authorization, time)
      } else {
        $utilHelper.setCookie('p-token', user.headers.authorization, time, '/', '.paixin.com')
      }
    } else if (!$utilHelper.cookie('p-token')) {
      return
    }
    let userDataString = JSON.stringify(user.data)
    let userString = user.data
    if (!userDataString || userDataString == 'undefined' || userDataString == '{}') {
      return
    } else {
      let mediaInfo = await $apiFactory.getLoginApi().newMedia()
      if (mediaInfo.status == 200) {
        userString.title = mediaInfo.data.title || '普通'
        if (mediaInfo.data.title.includes('新媒体')) {
          userString.media_id = mediaInfo.data.userXPackage.id
        }
      }
      localStorage.setItem('userData', JSON.stringify(userString))
    }
    state.loginUser = userString
    state.loginStatus = true
  },

  clearUserInfo: state => {
    state.loginUser = {}
    state.loginStatus = false
    localStorage.setItem('userData', '{}')
    document.cookie = 'p-token=1; max-age=0; domain=.paixin.com;path=/'
    document.cookie = 'p-token=1; max-age=0; domain=localhost;path=/'
  },

  UPDATE_AVATAR: (state, avatar) => {
    state.loginUser.avatar = avatar
  },

  switchDialogState: (state, info) => {
    state.dialogState = info
  },

  setSearchDialog: (state, info) => {
    state.searchDialog = info
  }
}

export default {
  state,
  actions,
  mutations
}
