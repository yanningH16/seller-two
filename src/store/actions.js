import * as types from './mutation-types'
import { setUserInfoStorage, setUserTokenStorage, setUserMoneyStorage } from '../assets/js/cache'
export const setUserInfo = function ({ commit }, query) {
  commit(types.SET_USER_INFO, setUserInfoStorage(query))
}
export const setUserToken = function ({ commit }, query) {
  commit(types.SET_USER_TOKEN, setUserTokenStorage(query))
}
export const setUserMoney = function ({ commit }, query) {
  commit(types.SET_USER_MONEY, setUserMoneyStorage(query))
}
export const clearUserInfo = function ({ commit }, query) {
  commit(types.CLEAR_USER_INFO, query)
}
export const setErrorTimeList = function ({ commit }, query) {
  commit(types.ERROR_TIME_LIST, query)
}
export const setTaskCount = function ({ commit }, query) {
  commit(types.SET_TASK_COUNT, query)
}
export const setTaskCountBuy = function ({ commit }, query) {
  commit(types.SET_TASK_COUNT_BUY, query)
}
