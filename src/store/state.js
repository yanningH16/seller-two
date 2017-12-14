import { loadUserInfo, loadUserToken, loadUserMoney } from '../assets/js/cache'
const state = {
  userInfo: loadUserInfo(),
  userToken: loadUserToken(),
  userMoney: loadUserMoney(),
  // userAccountId: null,
  errorTimeList: []
}
export default state
