const Login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}
const login = [{
  path: '/login',
  component: Login,
  name: 'login'
}]
export default login
