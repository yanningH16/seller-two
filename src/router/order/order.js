const auditOrder = (resolve) => {
  import('@/components/order/auditOrder').then((module) => {
    resolve(module)
  })
}
const appraiseOrder = (resolve) => {
  import('@/components/order/appraiseOrder').then((module) => {
    resolve(module)
  })
}
const order = [{
  path: 'order/auditOrder',
  component: auditOrder,
  name: 'auditOrder',
  meta: { title: '订单管理-审核订单' }
},
{
  path: 'order/appraiseOrder',
  component: appraiseOrder,
  name: 'appraiseOrder',
  meta: { title: '订单管理-审核评价' }
}
]
export default order
