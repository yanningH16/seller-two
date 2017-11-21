import Vue from 'vue'
import Router from 'vue-router'

import error from './error/error'
import home from './home/home'
import login from './login/login'
import reg from './reg/reg'

const defaultRouter = [{
  path: '/',
  redirect: 'home/header/overView'
}]

Vue.use(Router)

export default new Router({
  routes: [...defaultRouter, ...error, ...home, ...login, ...reg],
  mode: 'history'
})
