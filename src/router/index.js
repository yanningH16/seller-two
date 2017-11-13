import Vue from 'vue'
import Router from 'vue-router'

import user from './user/user'
import error from './error/error'
import home from './home/home'
import login from './login/login'
import reg from './reg/reg'

const defaultRouter = [{
  path: '/',
  redirect: 'home/task'
}]

Vue.use(Router)

export default new Router({
  routes: [...defaultRouter, ...user, ...error, ...home, ...login, ...reg],
  mode: 'history'
})
