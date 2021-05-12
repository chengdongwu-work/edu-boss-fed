import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器状态只能实现数据共享,在组件里访问方便,但是没有持久化的功能
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前用户状态
  },
  mutations: {
    // 修改容器数据必须实现mutation函数
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 为了页面刷新数据丢失
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
