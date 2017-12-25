<template>
  <div class="wrap pushAdmin">
    <div class="shop">
      <em class="gray">推广赚钱</em>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="邀请员工账号" name="one">
          <div class="accountTab">
            <el-table :data="tableDataSell" style="width: 100%" v-if="tableDataSell.length!==0">
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="number" align="center" label="账号名">
              </el-table-column>
              <el-table-column prop="numberType" align="center" label="账号类型">
              </el-table-column>
              <el-table-column prop="admin" align="center" label="管理员">
              </el-table-column>
              <el-table-column align="center" label="帐号状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" align="center" label="注册时间">
              </el-table-column>
            </el-table>
            <noCont v-if="this.tableDataSell.length===0"></noCont>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邀请买手账号" name="two">
          <div class="accountTab">
            <el-table :data="tableDataBuy" style="width: 100%" v-if="tableDataBuy.length!==0">
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="number" align="center" label="账号名">
              </el-table-column>
              <el-table-column prop="numberType" align="center" label="账号类型">
              </el-table-column>
              <el-table-column prop="admin" align="center" label="管理员">
              </el-table-column>
              <el-table-column align="center" label="帐号状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" align="center" label="注册时间">
              </el-table-column>
            </el-table>
            <noCont v-if="this.tableDataBuy.length===0"></noCont>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理员账号" name="three">
          <div class="accountTab">
            <el-table :data="tableDataAdmin" style="width: 100%" v-if="tableDataAdmin.length!==0">
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="number" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="numberType" align="center" label="账号类型">
              </el-table-column>
              <el-table-column align="center" label="管理员状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
            </el-table>
            <noCont v-if="tableDataAdmin.length===0"></noCont>
          </div>
        </el-tab-pane>
        <!-- 分页 -->
        <div class="pager" v-if="showPager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import NoCont from '../../base/noCont/noCont'
import { mapGetters } from 'vuex'
export default {
  name: 'pushAdmin',
  components: {
    NoCont
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    showPager: function () {
      if (this.activeName === 'one' && this.tableDataSell.length !== 0) {
        return true
      } else if (this.activeName === 'two' && this.tableDataBuy.length !== 0) {
        return true
      } else if (this.activeName === 'three' && this.tableDataAdmin.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      activeName: 'one',
      currentPage: 1,
      totalCount: 0,
      pageSize: 5,
      tableDataSell: [],
      tableDataBuy: [],
      tableDataAdmin: []
    }
  },
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    handleClick (tab, event) {
      if (this.activeName === 'one') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(1, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(1, this.pageSize)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.activeName === 'one') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(1, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(1, this.pageSize)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName === 'one') {
        this.sercherOne(val, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(val, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(val, this.pageSize)
      }
    },
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/buyerAccount/getEmployeeListBySellerUserId', {
        pageNo: pageNo,
        pageSize: pageSize,
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.employees) {
            let goods = {
              name: word.userName,
              number: word.telephone,
              deduct: word.pay,
              numberType: word.buyerType === '1' ? '员工' : '--',
              admin: word.sellerManagerId === '1' ? '--' : '--',
              JDStatus: word.buyerType === '1' ? '正常' : '冻结',
              time: word.gmtCreate
            }
            arr.push(goods)
          }
          this.tableDataSell = arr
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
    sercherTwo (pageNo, pageSize) {
      this.$ajax.post('/api/buyerAccount/getBuyerListBySellerUserId', {
        pageNo: pageNo,
        pageSize: pageSize,
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.buyers) {
            let goods = {
              name: word.userName,
              number: word.telephone,
              deduct: word.pay,
              numberType: word.buyerType === '0' ? '买手' : '--',
              admin: word.sellerManagerId === '1' ? '--' : '--',
              JDStatus: word.buyerStatus === '1' ? '正常' : '冻结',
              time: word.gmtCreate
            }
            arr.push(goods)
          }
          this.tableDataBuy = arr
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
    sercherThree (pageNo, pageSize) {
      this.$ajax.post('/api/sellerManagerAccount/getManagerListBySellerUserId', {
        pageNo: pageNo,
        pageSize: pageSize,
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.managers) {
            let goods = {
              name: word.userName || '--',
              number: word.telephone,
              deduct: word.pay,
              numberType: word.buyerType === '1' ? '员工' : '员工',
              JDStatus: word.status === '1' ? '正常' : '冻结'
            }
            arr.push(goods)
          }
          this.tableDataAdmin = arr
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
  .content
    background #fff
    margin-top 24px
    // padding 0 20px 20px
    .pager
      float right
</style>