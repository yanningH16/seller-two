<template>
  <div class="wrap pushAdmin">
    <div class="shop">
      <em class="gray">推广赚钱</em>
    </div>
    <div class="pushMan">
      <div class="left">
        <img src="../../assets/image/headImg.jpg" alt="">
        <h5>受邀人是员工</h5>
      </div>
      <div class="right">
        <p>
          <strong style="color: #FF2933">100
            <sup>%</sup>
          </strong>
          <span>
            员工所做的浏览任务与垫付任务,所获取的佣金百分百由您获取,佣金与充值的本金等值.
          </span>
        </p>
        <p>
          <strong style="color: #EE7707">1
            <sup>元/单</sup>
          </strong>
          <span>
            员工邀请的买手每做完一单垫付任务,您的佣金账户就会增加1元钱.
          </span>
        </p>
        <div class="input">
          <input type="text" v-model="url">
          <span class="copy" @click="doCopy" :data-clipboard-text=copyCont>复制</span>
        </div>
      </div>
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
        <!-- <el-tab-pane label="管理员账号" name="three">
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
        </el-tab-pane> -->
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
import Clipboard from 'clipboard'
export default {
  name: 'pushAdmin',
  components: {
    NoCont
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    copyCont: function () {
      let cont = `请大家进入如下链接进行注册：${this.url}，注意请不要将链接泄露给除本公司以外的人。`
      return cont
    },
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
      url: 'http://www.baidu.com',
      tableDataSell: [],
      tableDataBuy: [],
      tableDataAdmin: [],
      iniviteCode: {}
    }
  },
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    doCopy () {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
      })
    },
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
    // 获取邀请code
    getCodeUrl () {
      this.$ajax.post('/api/sellerAccout/getInviteCode', {
        sellerAccountId: this.userInfo.sellerUserId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.iniviteCode = res.data
          this.url = res.data.inviteStaffCode
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
  },
  mounted () {
    this.getCodeUrl()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 0 20px 0 20px
  .pushMan
    margin-top 20px
    padding 20px 40px
    border-radius 4px
    background #ffffff
    display flex
    .left
      width 120px
      margin-right 40px
      img
        width 100px
        height 100px
      h5
        font-size 16px
        line-height 40px
    .right
      width 500px
      p
        display flex
        margin 20px 0
        strong
          width 70px
          margin-right 10px
          font-size 24px
          font-weight 1000
          vertical-align baseline
          sup
            font-size 10px
            font-weight bolder
        span
          flex 1
          font-size 14px
          line-height 20px
      .input
        box-sizing border-box
        width 100%
        border 2px solid #20A0FF
        input
          line-height 30px
          padding-left 5px
          padding-right 5px
          width calc(100% - 60px)
          outline none
        span
          float right
          width 50px
          line-height 30px
          text-align center
          color #ffffff
          background #20A0FF
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