<template>
  <div class="sendTaskTwo">
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
      <div class="choosed">
        <span>已选择: </span>
        <b>手机京东&nbsp;&nbsp;垫付任务</b>
        <i></i>
        <span>爱上时尚旗舰店</span>
      </div>
      <h2>第一步: 填写商品信息</h2>
      <div class="step step1">
        <div class="input">
          <span>商品标题: </span>
          <el-input placeholder="请输入内容" style="">
            <span slot="suffix">0/20</span>
          </el-input>
        </div>
      </div>
      <h2>第二步: 设置如何找到商品</h2>
      <div class="step step2">
        2222
      </div>
      <h2>第三步: 选择任务类型与单数</h2>
      <div class="step step3">
        33333
      </div>
      <div class="next">
        <!-- <button class="btn" :class="{'disabled': !(shop && taskType)}" :disabled="!(shop && taskType)" @click="doNext">下一步</button> -->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sendTaskTwo',
  data () {
    return {
      warnShow: true,
      active: 1
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sendTaskTwo
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
    .next
      margin-top 280px
      margin-bottom 20px
      text-align center
    .choosed
      font-size 14px
      color #444444
      text-align right
      height 30px
      line-height 30px
      b
        color #FD9D28
        padding-right 20px
        margin-right 20px
        border-right 2px solid #cccccc
      i
        display inline-block
        width 20px
        height 20px
        background red
        vertical-align middle
    h2
      font-size 16px
      line-height 1
      padding-top 16px
      padding-bottom 16px
      font-weight bold
      border-bottom 1px solid #dedede
    .step
      padding 20px
</style>