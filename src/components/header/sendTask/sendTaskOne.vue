<template>
  <div class="sendTaskOne">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'overView' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'overView' }">总览</el-breadcrumb-item>
        <el-breadcrumb-item>发布垫付任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="warning" v-if="warnShow">
      <i class="el-icon-warning"></i>
      <span style="margin-left:20px;margin-right:40px;">(1) 当日18点前发布的任务，当日审核通过后进行分发。</span>
      <span>（2）当日22点后发布的任务，将在当日审核后于次日8点起开始。</span>
      <b class="el-icon-close" style="float:right;margin-top:14px;font-weight: bold" @click="warnShow=false"></b>
    </div>
    <div class="step">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="选择任务类型"></el-step>
        <el-step title="填写任务信息"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="发布成功"></el-step>
      </el-steps>
    </div>
    <div class="cont">
      <div class="step1">
        <h2>第一步: 选择店铺</h2>
        <div class="taskType" v-for="(item, index) in shopListArr" :key="index" style="padding-left:60px;">
          <el-radio v-model="shop" :label="item">
            <span :class="{'jdIcon': item.shopType==0 , 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2}"></span>
            <b style="font-size:14px;color:#444444;">{{ item.shopName }}</b>
          </el-radio>
        </div>
      </div>
      <div class="step2">
        <h2>第二部: 选择任务类型</h2>
        <el-radio-group v-model="taskType" style="padding-left:60px;">
          <div class="taskType">
            <el-radio :label="1">
              <span class="jdIcon"></span>
              <b style="font-size:14px;color:#444444;">京东App任务
                <span style="color:#949494">(用户在京东app下单)</span>
              </b>
            </el-radio>
          </div>
          <div class="taskType">
            <el-radio :label="2">
              <span class="jdIcon"></span>
              <b style="font-size:14px;color:#444444;">微信京东任务
                <span style="color:#949494">(用户在微信京东下单)</span>
              </b>
            </el-radio>
          </div>
        </el-radio-group>
      </div>
      <div class="next">
        <button class="btn" :class="{'disabled-btn': !(shop && taskType)}" :disabled="!(shop && taskType)" @click="doNext">下一步</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'sendTaskOne',
  data () {
    return {
      warnShow: true,
      active: 0,
      shop: null,
      taskType: null,
      shopListArr: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    doNext () {
      // 创建发布任务
      this.$ajax.post('/api/seller/task/createTask', {
        shopType: this.shop.shopType,
        shopId: this.shop.shopId,
        taskType: this.taskType,
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        // console.log(data)
        if (data.data.code === '200') {
          this.$router.push({ name: 'sendTaskTwo', query: { sellerTaskId: data.data.data.sellerTaskId } })
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('服务器错误！')
      })
    },
    // 获取店铺列表
    getShopList () {
      this.$ajax.post('/api/seller/shop/getShopListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId,
        shopType: 3
      }).then((data) => {
        // console.log(data)
        this.shopListArr = data.data.data
      }).catch((err) => {
        console.log(err)
        this.$message.error('服务器错误！')
      })
    },
    toPushTask () {
      this.$ajax.post('/api/seller/shop/getShopListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId,
        shopType: 3
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          // console.log(data)
          if (res.data) {
            this.$router.push({ name: 'sendTaskOne' })
          } else {
            this.$message({
              message: '您还未绑定店铺,请先绑定店铺',
              type: 'warning'
            })
            this.$router.push({ name: 'shopAdmin', query: { toBindShop: 1 } })
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
    }
  },
  mounted () {
    this.getShopList()
    this.toPushTask()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sendTaskOne
  padding-left 20px
  padding-right 20px
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .warning
    height 36px
    background rgba(255, 171, 177, 0.2)
    color #FF3341
    font-size 12px
    line-height 36px
    padding-left 20px
    padding-right 20px
    span
      font-weight bold
  .step
    padding 24px 140px 16px
    background #ffffff
    margin-bottom 1px
  .cont
    padding 20px
    background #ffffff
    h2
      font-size 16px
      color #333333
      line-height 32px
      margin-top 16px
      margin-bottom 16px
    .jdIcon
      display inline-block
      width 14px
      height 14px
      vertical-align middle
    .taskType
      height 30px
      line-height 30px
    .next
      margin-top 100px
      margin-bottom 20px
      text-align center
</style>