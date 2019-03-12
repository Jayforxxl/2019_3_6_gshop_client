/*
vuex最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'
// 状态对象模块
import state from './state'
// 直接操作
import mutations from './mutations'
// 通过mutation操作
import actions from './actions'
// 计算属性
import getters from './getters'
// 声明使用
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
