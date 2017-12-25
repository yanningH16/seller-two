<template>
  <div class="wrap coinApply">
    <div class="shop">
      <em class="gray">资金管理</em>>资金记录
    </div>
    <div class="contentShop">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="消费明细" name="first">
          <ul>
            <li>
              时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd'>
              </el-date-picker>
            </li>
            <li>
              类型:
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              订单编号:
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </li>
            <li>
              <button class="btn" @click="search">查询</button>
            </li>
          </ul>
          <div class="actTab">
            <noCont v-if="tableData.length===0"></noCont>
            <el-table :data="tableData" style="width: 100%" v-if="tableData.length!==0">
              <el-table-column prop="sureTime" align="center" label="确认时间">
              </el-table-column>
              <el-table-column prop="revenue" align="center" label="入款">
              </el-table-column>
              <el-table-column prop="deduct" align="center" label="扣款">
              </el-table-column>
              <el-table-column prop="type" align="center" label="类型">
              </el-table-column>
              <el-table-column prop="balance" align="center" label="结余">
              </el-table-column>
              <el-table-column prop="number" align="center" label="编号">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="备注">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="充值提现" name="second">
          <ul>
            <li>
              时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd'>
              </el-date-picker>
            </li>
            <li>
              类型:
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <button class="btn" @click="search_1">查询</button>
            </li>
          </ul>
          <div class="actTab">
            <noCont v-if="tableData_1.length===0"></noCont>
            <el-table :data="tableData_1" style="width: 100%" v-if="tableData_1.length!==0">
              <el-table-column prop="number" align="center" label="流水编号">
              </el-table-column>
              <el-table-column prop="pay" align="center" label="充值">
              </el-table-column>
              <el-table-column prop="cash" align="center" label="提现">
              </el-table-column>
              <el-table-column prop="type" align="center" label="类型">
              </el-table-column>
              <el-table-column prop="balance" align="center" label="结余">
              </el-table-column>
              <el-table-column prop="sureTime" align="center" label="确认时间">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="备注">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pager" v-if="showPager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import NoCont from '../../base/noCont/noCont'
export default {
  name: 'coinApply',
  components: {
    NoCont
  },
  data () {
    return {
      activeName: 'first',
      value3: '',
      input: '',
      currentPage: 1,
      totalCount: 0,
      pageSize: 5,
      tableData: [],
      tableData_1: [],
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
  computed: {
    showPager: function () {
      if (this.activeName === 'first' && this.tableData.length !== 0) {
        return true
      } else if (this.activeName === 'second' && this.tableData_1.length !== 0) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters([
      'userInfo',
      'userToken'
    ])
  },
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    handleClick (tab, event) {
      if (this.activeName === 'first') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName === 'second') {
        this.sellerRecord(1, this.pageSize)
      }
    },
    handleSizeChange (val) {
      if (this.activeName === 'first') {
        this.sercherOne(1, val)
      } else if (this.activeName === 'second') {
        this.sellerRecord(1, val)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName === 'first') {
        this.sercherOne(val, this.pageSize)
      } else if (this.activeName === 'second') {
        this.sellerRecord(val, this.pageSize)
      }
    },
    search () {
      this.sercherOne(1, this.pageSize)
    },
    search_1 () {
      this.sellerRecord(1, this.pageSize)
    },
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/userFund/getSellerFundFlowsByUsageType', {
        usageType: ['0'],
        pageNo: pageNo,
        pageSize: pageSize,
        sellerUserAccountId: this.userInfo.sellerUserId,
        startDate: this.value3 ? this.value3[0] : '',
        endDate: this.value3 ? this.value3[1] : '',
        orderId: this.input,
        fundsFlowType: this.value
      }).then((data) => {
        // console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.fundsFlows) {
            let goods = {
              sureTime: word.gmtModify,
              revenue: word.income || '--',
              deduct: word.pay || '--',
              type: word.fundsFlowType === 'TYP_SELLER_CAPITAL_CHARGE' ? '本金' : word.fundsFlowType === 'TYP_SELLER_CAPITAL_FREEZE' ? '本金' : word.fundsFlowType === 'TYP_SELLER_CAPITAL_PAY' ? '本金' : '佣金',
              balance: word.availableCapital || word.availableCommission,
              number: word.orderId,
              remark: word.content
            }
            arr.push(goods)
          }
          this.tableData = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
    },
    sellerRecord (pageNo, pageSize) {
      this.$ajax.post('/api/userFund/getSellerFundFlowsByUsageType', {
        usageType: ['1', '2'],
        pageNo: pageNo,
        pageSize: pageSize,
        sellerUserAccountId: this.userInfo.sellerUserId,
        startDate: this.value3 ? this.value3[0] : '',
        endDate: this.value3 ? this.value3[1] : '',
        fundsFlowType: this.value
      }).then((data) => {
        // console.log(data)
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
              balance: word.availableCapital || word.availableCommission,
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
.wrap
  padding 0 20px 0 20px
  .shop
    background #fff
    height 36px
    line-height 36px
    padding-left 20px
    font-size 14px
    color rgba(60, 60, 60, 1)
    .gray
      color rgba(137, 137, 137, 1)
  .contentShop
    background #fff
    margin-top 24px
    // padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    ul
      margin-top 40px
      display -webkit-box
      display flex
      width 100%
      border-bottom 1px solid #e5e5e5
      padding-bottom 24px
      li
        margin-right 20px
    .pager
      float right
      padding-bottom 20px
</style>