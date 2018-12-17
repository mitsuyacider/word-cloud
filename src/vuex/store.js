import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    message: ''
  },
  mutations: {
    setMessage (state, data) {
      state.message = data
    }
  },
  actions: {
    setMessage (context, data) {
      context.commit('setMessage', data)
    }
  },
  getters: {
    getMessageFromNative (state) {
      return state.message
    }
  }
})
