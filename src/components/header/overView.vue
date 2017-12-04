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
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511344372676&di=efa5889acb8cecfcf8222d867cd5f941&imgtype=0&src=http%3A%2F%2Fimg2.gao7.com%2Ffiles%2Fappleimage%2F277%2F277E8E4B-D0AD-4956-BF23-98987E2ADA88.jpg" alt="">
          <div>
            <h3>本金</h3>
            <h2 style="color:#179FFF;">1492.73</h2>
          </div>
        </li>
        <li>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511344372676&di=efa5889acb8cecfcf8222d867cd5f941&imgtype=0&src=http%3A%2F%2Fimg2.gao7.com%2Ffiles%2Fappleimage%2F277%2F277E8E4B-D0AD-4956-BF23-98987E2ADA88.jpg" alt="">
          <div>
            <h3>冻结押金(元)</h3>
            <h2 style="color:#FF2933;">1492.73</h2>
          </div>
        </li>
        <li>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511344372676&di=efa5889acb8cecfcf8222d867cd5f941&imgtype=0&src=http%3A%2F%2Fimg2.gao7.com%2Ffiles%2Fappleimage%2F277%2F277E8E4B-D0AD-4956-BF23-98987E2ADA88.jpg" alt="">
          <div>
            <h3>联盟佣金(元)</h3>
            <h2 style="color:#FF8A22;">1492.73</h2>
          </div>
        </li>
      </ul>
      <ul class="rightCtrl">
        <li>
          <button class="btn disabled">充值本金</button>
        </li>
        <li>
          <button class="btn" @click="$router.push({name: 'sendTaskOne'})">发布垫付任务</button>
        </li>
      </ul>
    </div>
    <div class="taskList">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="垫付任务" name="first">
          <div class="orderList">
            <h2>待确认垫付订单</h2>
            <div class="toCheck">
              <div class="item" v-for="(item,index) in 6" :key="index">
                <i></i>
                <strong>多大阿旗舰店</strong>
                <span>(
                  <b class="red">+9</b>)</span>
              </div>
            </div>
            <h2>买家已评价待确认</h2>
            <div class="toSure">
              <div class="item" v-for="(item,index) in 6" :key="index">
                <i></i>
                <strong>多大阿旗舰店</strong>
                <span>(
                  <b class="red">+9</b>)</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="任务发布提醒" name="second">
          <div class="returnOrder">
            <h2>未通过审核任务</h2>
            <div class="listItem" v-for="(item, index) in 3" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i></i>
                  <strong>&nbsp;&nbsp;挡风沙旗舰店</strong>
                </li>
                <li style="width:40%">
                  <span class="gray">任务编号: </span>
                  <span>98444654654654654564564454</span>
                  <span class="blue"> [ 查看任务详情 ] </span>
                </li>
                <li style="width:20%">
                  <span class="gray">任务类型: </span>
                  <span>垫付</span>
                </li>
                <li style="width:20%">
                  <span class="gray">提交时间: </span>
                  <span>2017-08-25 12:22:11</span>
                </li>
              </ul>
              <ul class="cont">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511344372676&di=efa5889acb8cecfcf8222d867cd5f941&imgtype=0&src=http%3A%2F%2Fimg2.gao7.com%2Ffiles%2Fappleimage%2F277%2F277E8E4B-D0AD-4956-BF23-98987E2ADA88.jpg" alt="">
                  <span>&nbsp;&nbsp;安卓数据线</span>
                </li>
                <li>
                  <p>付款价格:
                    <span class="red">9.90</span>
                  </p>
                  <p>任务单数: 02</p>
                </li>
                <li>
                  <p>待确认订单:
                    <span class="red">99</span>
                  </p>
                  <p>待确认评价截图: 0</p>
                </li>
                <li>
                  <p>已完成订单:
                    <span class="red">99</span>
                  </p>
                  <el-tooltip popper-class="tooltipItem" effect="dark" content="未通过原因: 123456577896552" placement="top">
                    <p class="overflow">未通过原因: 123456577896552</p>
                  </el-tooltip>
                </li>
                <li>
                  <p>
                    <button class="btn btn-small">修改</button>
                  </p>
                  <p>
                    <button class="btn btn-small disabled">撤销</button>
                  </p>
                </li>
              </ul>
            </div>
            <div class="pager">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'overView',
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      toCheckOrderArr: [],
      toCheckFavorArr: [],
      returnBackArr: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      console.log(this.activeName)
      // 获取未通过审核列表
      if (this.activeName === 'second') {
        this.getFavorList()
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 获取待确认订单列表
    getOrderList () {
      this.$ajax.post('/api/seller/order/getTodoTaskNumListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        console.log(data)
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
    getFavorList () {
      this.$ajax.post('/api/seller/task/getRejectTaskListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        console.log(data)
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
    }
  },
  mounted () {
    this.getOrderList()
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
            background red
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
          background red
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