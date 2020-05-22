/**
 * @author Neko
 * @description 提示信息
 */

const toast = {
  state: {
    // 默认设置
    default: {
        /**
         * toast类型 ,'success' , 'warn' , 'info'
         */
        type: 'success',
        time: 4000,  // (ms)
        msg: '成功！',
        icon: '', // 暂时不用
        index: 0 // 删除标记
    },
    list: []
  },

  actions: {
    toast: ({commit}, info) => {
      commit('TOAST', info)
    }
  },

  mutations: {
    TOAST: (state, info = {}) => {
      let setting = {
        type: info.type || state.default.type,
        time: info.time || state.default.time,
        msg : info. msg || state.default. msg,
        icon: info.icon || state.default.icon,
        index: ++ state.default.index
      }
      state.list.push(setting)
      setTimeout(() => {
        let index = state.list.findIndex( (ele) => ele.index == setting.index)
        state.list.splice(state.list[index], 1)
      }, setting.time)
    }
  }
}

export default toast