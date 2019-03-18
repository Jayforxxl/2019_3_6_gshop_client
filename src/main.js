
import Vue from 'vue'
import App from './App'
import router from './router'
// 注册store
import store from './store'
// Vue.config.productionTip = false
import './mock/mockServer' // 不用写变量名，因为mockServer没有export

// 导入mint-ui中的按钮组件
import {Button} from 'mint-ui'
// 注册全局组件标签
Vue.component(Button.name,Button) // 注册完之后便能使用组件<mt-button>

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router, // 使用上vue-router
  store // 使用上vuex，映射store
})
