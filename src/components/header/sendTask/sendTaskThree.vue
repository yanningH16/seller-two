<template>
  <div class="sendTaskThree">
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
      <h2>费用合计</h2>
      <table class="table">
        <tr>
          <th>分类</th>
          <th>费用明细</th>
          <th>小计</th>
          <th>合计</th>
        </tr>
        <tr>
          <td>
            <span>本金冻结</span>
          </td>
          <td>
            <div>
              <p>商品: 9.00元*1件 / 单*25单</p>
              <p>运费备用金: 10.00元 / 单*25单</p>
            </div>
          </td>
          <td>
            <span>19.9元</span>
          </td>
          <td rowspan="2">
            <span class="red">91.78</span>元
          </td>
        </tr>
        <tr>
          <td>
            <span>佣金冻结</span>
          </td>
          <td>
            <div>
              <p>图文好评: 8.00元 / 单*2单</p>
              <p>纯文字好评: 6.00元 / 单*16单</p>
              <p>默认五星好评: 4.00元 / 单*2单</p>
              <p>plus会员: 3.00元 / 单*20单</p>
            </div>
          </td>
          <td>
            <span>19.9元</span>
          </td>
        </tr>
      </table>
      <h4>选择支付方式</h4>
      <div class="check">
        <el-checkbox v-model="way1">使用账户余额支付</el-checkbox>
        <span class="gray">(可用余额
          <b class="red">23</b>元)</span>
      </div>
      <div class="check">
        <el-checkbox v-model="way2">使用联盟佣金支付</el-checkbox>
        <span class="gray">(可用余额
          <b class="red">1234</b>元)</span>
      </div>
      <div class="warn">
        <span>余额不足,请
          <el-button type="text">先充值</el-button>再支付</span>
        <p>支付:
          <b class="red">91.78</b>元</p>
      </div>
      <div class="next">
        <button class="btn disabled" @click="doPrevent">上一步</button>
        <button class="btn" @click="doNext">确认</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sendTaskThree',
  data () {
    return {
      warnShow: true,
      active: 2,
      way1: true,
      way2: true
    }
  },
  methods: {
    doPrevent () {
      this.$router.push({ name: 'sendTaskTwo' })
    },
    doNext () {
      this.$router.push({ name: 'sendTaskFour' })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sendTaskThree
  padding-left 20px
  padding-right 20px
  .red
    color #FC1733
  .gray
    color #949494
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .warning
    height 36px
    background rgba(255, 171, 177, 0.4)
    color #FF3341
    font-size 12px
    line-height 36px
    padding-left 20px
    padding-right 20px
  .step
    padding 24px 140px 16px
    background #ffffff
    margin-bottom 1px
  .cont
    background #ffffff
    padding 20px
    margin-bottom 20px
    h2
      font-size 16px
      color #444444
      line-height 40px
    .table
      width 100%
      text-align center
      margin-bottom 40px
      tr
        height 150px
        font-size 14px
        color #444444
        &:first-child
          height 40px
        th
          border 1px solid #dedede
          background #fafafa
          vertical-align middle
        td
          border 1px solid #dedede
          vertical-align middle
          >div
            width 200px
            margin 0 auto
          p
            line-height 30px
            text-align left
    h4
      font-size 14px
      color #444444
      line-height 30px
    .check
      margin-top 16px
      margin-bottom 16px
    .warn
      text-align right
      font-size 14px
      b
        font-size 18px
    .next
      margin-top 100px
      margin-bottom 20px
      text-align center
</style>