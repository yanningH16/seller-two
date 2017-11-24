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
const report = (resolve) => {
  import('@/components/othersAdmin/report').then((module) => {
    resolve(module)
  })
}
const myReport = (resolve) => {
  import('@/components/othersAdmin/myReport').then((module) => {
    resolve(module)
  })
}
const shopAdminList = (resolve) => {
  import('@/components/othersAdmin/shopAdminList').then((module) => {
    resolve(module)
  })
}
const othersAdmin = [{
  path: 'othersAdmin/shopAdminList',
  component: shopAdminList,
  name: 'shopAdminList',
  meta: { title: '其它管理-店铺列表' }
},
{
  path: 'othersAdmin/pushAdmin',
  component: pushAdmin,
  name: 'pushAdmin',
  meta: { title: '其它管理-推广赚金' }
},
{
  path: 'othersAdmin/report',
  component: report,
  name: 'report',
  meta: { title: '其它管理-举报' }
},
{
  path: 'othersAdmin/myReport',
  component: myReport,
  name: 'myReport',
  meta: { title: '其它管理-我的举报' }
},
{
  path: 'othersAdmin/shopAdmin',
  component: shopAdmin,
  name: 'shopAdmin',
  meta: { title: '其它管理-店铺管理' }
}
]
export default othersAdmin
