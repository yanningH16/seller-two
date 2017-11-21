<template>
  <div class="sendTaskFour">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'overView' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'overView' }">总览</el-breadcrumb-item>
        <el-breadcrumb-item>发布垫付任务</el-breadcrumb-item>
      </el-breadcrumb>
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
      <h1>支付成功，任务已发布等待客服审核</h1>
      <h3>{{ time }}s后自动返回任务详情
        <el-button type="text" @click="lookTask">&nbsp;&nbsp;立即查看 ></el-button>
      </h3>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sendTaskFour',
  data () {
    return {
      active: 4,
      time: 5
    }
  },
  methods: {
    timeOn () {
      let time = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(time)
        }
      }, 1000)
    },
    lookTask () {
      this.$router.push({ name: '' })
    }
  },
  mounted () {
    this.timeOn()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sendTaskFour
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
    padding-top 172px
    padding-bottom 300px
    text-align center
    h1
      font-size 20px
      color #444444
      line-height 50px
      font-weight bold
    h3
      font-size 14px
      color #3c3c3c
      font-family MicrosoftYaHei
</style>