import Vuex from 'vuex'
import user from './modules/user'
import scrolltop from './modules/scrolltop'
import toast from './modules/toast'
export default new Vuex.Store({
  modules: {
    user,
    scrolltop,
    toast
  }
})
