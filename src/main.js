// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
import axios from './assets/js/http'
import 'babel-polyfill' // 浏览器兼容
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/stylus/index.styl'

Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.filter('bankCard', function (value) {
  if (!value) {
    return false
  }
  let reg = /^(\d{4})[\d]*(\d{4})$/
  return value.replace(reg, '$2')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
