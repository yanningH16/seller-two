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
  meta: { title: '资金记录-充值押金' }
},
{
  path: 'coin/coinApply',
  component: CoinApply,
  name: 'coinApply',
  meta: { title: '资金记录-押金提现' }
},
{
  path: 'coin/coinList',
  component: CoinList,
  name: 'coinList',
  meta: { title: '资金记录-提现记录' }
}
]
export default coin
