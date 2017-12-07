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
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/home/header/overView') // 未定义路由条状到error
  } else {
    let routerTitle = ''
    if (to.meta.title) {
      routerTitle = to.meta.title
    } else {
      routerTitle = 'SD项目'
    }
    document.title = routerTitle
    next()
  }
})
export default router
