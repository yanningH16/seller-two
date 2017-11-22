const userInfo = (resolve) => {
  import('@/components/user/userInfo').then((module) => {
    resolve(module)
  })
}
const out = (resolve) => {
  import('@/components/user/out').then((module) => {
    resolve(module)
  })
}
const user = [
  {
    path: 'user/userInfo',
    component: userInfo,
    name: 'userInfo',
    meta: { title: '个人信息' }
  },
  {
    path: 'user/out',
    component: out,
    name: 'out',
    meta: { title: '退出登陆' }
  }
]
export default user
