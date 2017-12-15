import Vue from 'vue'
import Router from 'vue-router'

import error from './error/error'
import home from './home/home'
import login from './login/login'
import reg from './reg/reg'

const defaultRouter = [{
  path: '/',
  redirect: 'login'
}]

Vue.use(Router)

const routes = [...defaultRouter, ...error, ...home, ...login, ...reg]
let router = new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 设置title
router.beforeEach((to, from, next) => {
  if (to.meta.title || to.params.message) {
    document.title = to.meta.title || to.params.message.title
  } else {
    document.title = 'SD项目'
  }
  next()
})
export default router
