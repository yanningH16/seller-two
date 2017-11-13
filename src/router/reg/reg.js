const Reg = (resolve) => {
  import('@/components/reg/reg').then((module) => {
    resolve(module)
  })
}
const reg = [{
  path: '/reg',
  component: Reg,
  name: 'reg'
}]
export default reg
