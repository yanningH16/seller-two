<template>
  <div class="overView">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'overView' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>总览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="moneyList">
      <ul class="leftMoney">
        <li>
          <img src="../../assets/image/benjin.png" alt="">
          <div>
            <h3>账户余额</h3>
            <h2 style="color:#179FFF;">{{ moneyObj.availableCapitalAmount }}</h2>
          </div>
        </li>
        <li>
          <img src="../../assets/image/yongjin.png" alt="">
          <div>
            <h3>冻结金额(元)</h3>
            <h2 style="color:#FF2933;">{{ moneyObj.frozenCapitalAmount }}</h2>
          </div>
        </li>
        <li>
          <img src="../../assets/image/lianmeng.png" alt="">
          <div>
            <h3>联盟佣金(元)</h3>
            <h2 style="color:#FF8A22;">{{ moneyObj.availableCommissionAmount }}</h2>
          </div>
        </li>
      </ul>
      <ul class="rightCtrl">
        <li>
          <button class="btn disabled" @click="$router.push({name: 'coinPay'})">余额充值</button>
        </li>
        <li>
          <button class="btn" @click="toPushTask">发布垫付任务</button>
        </li>
      </ul>
    </div>
    <div class="taskList">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="垫付任务" name="first">
          <div class="orderList">
            <h2>待确认垫付订单</h2>
            <div class="toCheck">
              <noCont class="smallNoCont" v-if="toCheckOrderArr.length===0"></noCont>
              <div class="item" v-for="(item,index) in toCheckOrderArr" :key="index" @click="toCheck">
                <i :class="{'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2}"></i>
                <strong>{{ item.shopName }}</strong>
                <span>(
                  <b class="red">+{{ item.num }}</b>)</span>
              </div>
            </div>
            <h2>买家已评价待确认</h2>
            <div class="toSure">
              <noCont class="smallNoCont" v-if="toCheckFavorArr.length===0"></noCont>
              <div class="item" v-for="(item,index) in toCheckFavorArr" :key="index" @click="toFavor">
                <i :class="{'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2}"></i>
                <strong>{{ item.shopName }}</strong>
                <span>(
                  <b class="red">+{{ item.num }}</b>)</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="任务发布提醒" name="second">
          <div class="returnOrder">
            <h2>未通过审核任务</h2>
            <noCont v-if="returnBackArr.length===0"></noCont>
            <div class="listItem" v-for="(item, index) in returnBackArr" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i :class="{'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2}"></i>
                  <strong>&nbsp;&nbsp;{{ item.shopName }}</strong>
                </li>
                <li style="width:40%">
                  <span class="gray">任务编号: </span>
                  <span>{{ item.sellerTaskId }}</span>
                  <span class="blue" @click="toDo('lookDetail', item.sellerTaskId)"> [ 查看任务详情 ] </span>
                </li>
                <li style="width:20%">
                  <span class="gray">任务类型: </span>
                  <span>{{ item.taskType == '0' ? '垫付任务' : '浏览任务' }}</span>
                </li>
                <li style="width:20%">
                  <span class="gray">提交时间: </span>
                  <span>{{ item.submitTime }}</span>
                </li>
              </ul>
              <ul class="cont">
                <li>
                  <img :src="item.productPicUrl" alt="商品图片">
                  <span>&nbsp;&nbsp;{{ item.productName }}</span>
                </li>
                <li>
                  <p>付款价格:
                    <span class="red">{{ item.payment }}</span>
                  </p>
                  <p>任务单数: {{ item.totalNum }}</p>
                </li>
                <li>
                  <p>待确认订单:
                    <span class="red">{{ item.toConfirmOrderNum }}</span>
                  </p>
                  <p>待确认评价截图: {{ item.toConfirmFavorNum }}</p>
                </li>
                <li>
                  <p>已完成订单:
                    <span class="red">{{ item.doneNum }}</span>
                  </p>
                  <el-tooltip popper-class="tooltipItem" effect="dark" :content=" '未通过原因:' + item.comment" placement="top">
                    <p class="overflow">未通过原因: {{ item.comment }}</p>
                  </el-tooltip>
                </li>
                <li>
                  <p>
                    <button class="btn btn-small" @click="toDo('toFix',item.sellerTaskId)">修改</button>
                  </p>
                  <p>
                    <button class="btn btn-small disabled" @click="toDo('cancel',item.sellerTaskId)">撤销</button>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import NoCont from '../../base/noCont/noCont'
export default {
  name: 'overView',
  components: {
    NoCont
  },
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      toCheckOrderArr: [],
      toCheckFavorArr: [],
      returnBackArr: [],
      moneyObj: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClick (tab, event) {
      if (tab.name === 'second') {
        this.getReturnBack()
      }
    },
    toPushTask () {
      this.$ajax.post('/api/seller/shop/getShopListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId,
        shopType: 3
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          console.log(data)
          if (res.data) {
            this.$router.push({ name: 'sendTaskOne' })
          } else {
            this.$message({
              message: '您还未绑定店铺,请先绑定店铺',
              type: 'warning'
            })
            this.$router.push({ name: 'shopAdminList', query: { toBindShop: 1 } })
          }
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 去审核待确认订单
    toCheck () {
      this.$router.push({ name: 'auditOrder' })
    },
    toFavor () {
      this.$router.push({ name: 'appraiseOrder' })
    },
    toDo (type, sellerTaskId) {
      if (type === 'lookDetail') {
        this.$router.push({ name: 'taskDetail', query: { sellerTaskId: sellerTaskId } })
      } else if (type === 'toFix') {
        this.$router.push({ name: 'sendTaskTwo', query: { rbSellerTaskId: sellerTaskId } })
      } else if (type === 'cancel') {
        this.doCancel(sellerTaskId)
      }
    },
    // 获取待确认订单列表
    getOrderList () {
      this.$ajax.post('/api/seller/order/getTodoTaskNumListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.toCheckOrderArr = res.data.toConfirmOrderList
          this.toCheckFavorArr = res.data.toConfirmFavorList
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取未通过审核的列表
    getReturnBack () {
      this.$ajax.post('/api/seller/task/getRejectTaskListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.returnBackArr = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 请求撤销任务接口
    doCancel (sellerTaskId) {
      this.$confirm('确定要撤销该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/platform/task/cancelTask', {
          sellerTaskId: sellerTaskId
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              type: 'success',
              message: '撤销成功!'
            })
            this.getTask()
          } else {
            this.$message({
              type: 'warning',
              message: data.data.message
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 获取资金
    getMoney () {
      this.$ajax.post('/api/userFund/getSellerUserFund', {
        sellerUserAccountId: this.userInfo.sellerUserId
      }).then((data) => {
        if (data.data.code === '200') {
          let res = data.data.data
          this.moneyObj = res
          this.setUserMoney(res)
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    ...mapActions([
      'setUserMoney'
    ])
  },
  mounted () {
    this.getOrderList()
    this.getMoney()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.overView
  min-width 1000px
  padding-left 20px
  padding-right 20px
  .red
    color #FF2933
  .blue
    color #1C95FF
    cursor pointer
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .moneyList
    margin-bottom 20px
    height 145px
    display flex
    justify-content space-between
    .leftMoney
      flex 1
      display flex
      margin-right 20px
      li
        flex 1
        display flex
        flex-direction row
        max-width 400px
        min-width 220px
        background #ffffff
        margin-right 16px
        padding 20px
        border-radius 4px
        border 1px solid #dedede
        box-shadow 0 0 15px rgba(0, 0, 0, 0.07)
        img
          width 68px
          height 68px
          border-radius 50%
          align-self center
        >div
          flex 2
          padding-top 14px
          margin-left 24px
          h3
            font-size 16px
            line-height 36px
          h2
            font-size 24px
            line-height 44px
    .rightCtrl
      width 200px
      background #ffffff
      border-radius 4px
      border 1px solid #dedede
      box-shadow 0 0 15px rgba(0, 0, 0, 0.07)
      padding-top 30px
      li
        text-align center
        button
          width 118px
          margin-bottom 16px
  .taskList
    background #ffffff
    border-radius 4px
    margin-bottom 20px
    .orderList
      padding 20px
      min-height 500px
      h2
        font-size 14px
        line-height 30px
      .toCheck
        border-bottom 1px dashed #dedede
        margin-bottom 40px
      >div
        padding-top 20px
        padding-bottom 30px
        .item
          display inline-block
          width 160px
          height 40px
          line-height 40px
          padding-left 10px
          padding-right 10px
          margin-right 32px
          margin-bottom 12px
          border 1px solid #dedede
          border-radius 4px
          font-size 14px
          cursor pointer
          i
            display inline-block
            width 20px
            height 20px
            // background red
            vertical-align middle
          strong
            display inline-block
            width 90px
            vertical-align middle
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
          span
            float right
  .returnOrder
    padding 20px
    h2
      font-size 14px
      line-height 30px
      font-weight 600
      margin-bottom 20px
    .listItem
      border 1px solid #DFF0FD
      margin-bottom 16px
      .head
        height 32px
        line-height 32px
        padding 0 20px
        background #F6FBFF
        box-shadow 0 1px 0 #DFF0FD
        display flex
        justify-content space-between
        font-size 12px
        i
          display inline-block
          width 16px
          height 16px
          vertical-align middle
      .cont
        display flex
        padding 20px
        font-size 14px
        li
          flex 1
          padding-left 40px
          border-left 1px solid #dedede
          &:first-child
            padding-left 0
            border-left none
          &:last-child
            text-align center
          >span
            line-height 60px
          img
            width 60px
            height 60px
            vertical-align top
          p
            line-height 30px
          .overflow
            width 140px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
</style>