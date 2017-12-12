<template>
  <div>
    < </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'payTixian',
  data () {
    return {
      value3: '',
      tableData_1: [],
      pageSize: 5,
      options: [{
        value: '',
        label: '全部'
      }, {
        value: 'CAPITAL',
        label: '本金'
      }, {
        value: 'COMMISSION',
        label: '佣金'
      }],
      value: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      this.sellerRecord(1, this.pageSize)
    },
    handleSizeChange (val) {
      this.sellerRecord(1, val)
    },
    handleCurrentChange (val) {
      this.sellerRecord(val, this.pageSize)
    },
    sellerRecord (pageNo, pageSize) {
      this.$ajax.post('/api/userFund/getSellerFundFlowsByUsageType', {
        usageType: ['1', '2'],
        pageNo: pageNo,
        pageSize: pageSize,
        sellerUserAccountId: this.userInfo.sellerUserId,
        startTime: this.value3 ? this.value3[0] : '',
        endTime: this.value3 ? this.value3[1] : '',
        fundsFlowType: this.value
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.fundsFlows) {
            let goods = {
              sureTime: word.gmtModify,
              pay: word.income || '--',
              cash: word.pay || '--',
              type: word.fundsFlowType === 'TYP_SELLER_CAPITAL_CHARGE' ? '本金' : word.fundsFlowType === 'TYP_SELLER_CAPITAL_FREEZE' ? '本金' : word.fundsFlowType === 'TYP_SELLER_CAPITAL_PAY' ? '本金' : '佣金',
              balance: word.availableCommission,
              number: word.fundsFlowId,
              remark: word.content
            }
            arr.push(goods)
          }
          this.tableData_1 = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
ul
  margin-top 40px
  display flex
  border-bottom 1px solid #e5e5e5
  padding-bottom 24px
  li
    margin-right 20px
.actTab
  margin-top 24px
</style>