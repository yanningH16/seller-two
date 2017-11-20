const shopAdmin = (resolve) => {
  import('@/components/othersAdmin/shopAdmin').then((module) => {
    resolve(module)
  })
}
const pushAdmin = (resolve) => {
  import('@/components/othersAdmin/pushAdmin').then((module) => {
    resolve(module)
  })
}
const myReport = (resolve) => {
  import('@/components/othersAdmin/myReport').then((module) => {
    resolve(module)
  })
}
const othersAdmin = [{
  path: 'othersAdmin/shopAdmin',
  component: shopAdmin,
  name: 'shopAdmin',
  meta: { title: '其它管理-店铺管理' }
},
{
  path: 'othersAdmin/pushAdmin',
  component: pushAdmin,
  name: 'pushAdmin',
  meta: { title: '其它管理-推广赚金' }
},
{
  path: 'othersAdmin/myReport',
  component: myReport,
  name: 'myReport',
  meta: { title: '其它管理-我的举报' }
}
]
export default othersAdmin
