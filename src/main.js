
import Vue from 'vue'
import App from './App'
import router from './router'
// 注册store
import store from './store'
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router, // 使用上vue-router
  store // 使用上vuex，映射store
})
