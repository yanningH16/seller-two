const CoinPay = (resolve) => {
  import('@/components/coin/coinPay').then((module) => {
    resolve(module)
  })
}
const CoinApply = (resolve) => {
  import('@/components/coin/coinApply').then((module) => {
    resolve(module)
  })
}
const CoinList = (resolve) => {
  import('@/components/coin/coinList').then((module) => {
    resolve(module)
  })
}
const coin = [{
  path: 'coin/coinPay',
  component: CoinPay,
  name: 'coinPay',
  meta: { title: '资金管理-充值' }
},
{
  path: 'coin/coinApply',
  component: CoinApply,
  name: 'coinApply',
  meta: { title: '资金管理-资金记录' }
},
{
  path: 'coin/coinList',
  component: CoinList,
  name: 'coinList',
  meta: { title: '资金管理-银行卡管理' }
}
]
export default coin
