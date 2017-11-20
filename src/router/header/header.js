const OverView = (resolve) => {
  import('@/components/header/overView').then((module) => {
    resolve(module)
  })
}
const task = (resolve) => {
  import('@/components/header/task').then((module) => {
    resolve(module)
  })
}
const header = [{
  path: 'header/overView',
  component: OverView,
  name: 'overView',
  meta: { title: '首页-总览' }
},
{
  path: 'header/task',
  component: task,
  name: 'task',
  meta: { title: '首页-任务管理' }
}
]
export default header
