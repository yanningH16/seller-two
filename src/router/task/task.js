const Task = (resolve) => {
  import('@/components/task/task').then((module) => {
    resolve(module)
  })
}
const task = [{
  path: 'task',
  component: Task,
  name: 'task'
}]
export default task
