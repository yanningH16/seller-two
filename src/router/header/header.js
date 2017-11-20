const OverView = (resolve) => {
  import('@/components/header/overView').then((module) => {
    resolve(module)
  })
}
const SendTaskOne = (resolve) => {
  import('@/components/header/sendTask/sendTaskOne').then((module) => {
    resolve(module)
  })
}
const SendTaskTwo = (resolve) => {
  import('@/components/header/sendTask/sendTaskTwo').then((module) => {
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
}, {
  path: 'header/overView/sendTaskOne',
  component: SendTaskOne,
  name: 'sendTaskOne',
  meta: { title: '首页-总览-发布垫付任务' }
}, {
  path: 'header/overView/sendTaskTwo',
  component: SendTaskTwo,
  name: 'sendTaskTwo',
  meta: { title: '首页-总览-发布垫付任务' }
}, {
  path: 'header/task',
  component: task,
  name: 'task',
  meta: { title: '首页-任务管理' }
}]
export default header
