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
const SendTaskThree = (resolve) => {
  import('@/components/header/sendTask/sendTaskThree').then((module) => {
    resolve(module)
  })
}
const SendTaskFour = (resolve) => {
  import('@/components/header/sendTask/sendTaskFour').then((module) => {
    resolve(module)
  })
}
const task = (resolve) => {
  import('@/components/header/task').then((module) => {
    resolve(module)
  })
}
const taskDetail = (resolve) => {
  import('@/components/header/taskDetail').then((module) => {
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
  path: 'header/overView/sendTaskThree',
  component: SendTaskThree,
  name: 'sendTaskThree',
  meta: { title: '首页-总览-发布垫付任务' }
}, {
  path: 'header/overView/sendTaskFour',
  component: SendTaskFour,
  name: 'sendTaskFour',
  meta: { title: '首页-总览-发布垫付任务' }
}, {
  path: 'header/task',
  component: task,
  name: 'task',
  meta: { title: '首页-任务管理' }
}, {
  path: 'header/taskDetail',
  component: taskDetail,
  name: 'taskDetail',
  meta: { title: '首页-任务管理-垫付任务详情' }
}]
export default header
