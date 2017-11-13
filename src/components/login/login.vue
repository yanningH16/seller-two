<template>
  <div class="login">
    <div class="logo">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510149804507&di=38dc2b1b6be35acb5c774289b83f10fd&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0124f358cec437a801219c77cd9b01.jpg%40900w_1l_2o_100sh.jpg" alt="logo">
      <span>抱 一 通 信</span>
    </div>
    <div class="cont">
      <div class="text">
        <h1>数 据 智 能&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;驱 动 未 来</h1>
      </div>
      <div class="board">
        <h2>登&nbsp;录</h2>
        <div class="inputCont">
          <div class="input">
            <span class="el-icon-edit"></span>
            <input type="number" placeholder="输入手机号">
          </div>
          <div class="input">
            <span class="el-icon-edit-outline"></span>
            <input type="password" placeholder="输入登录密码">
          </div>
          <button>登&nbsp;录</button>
          <h3>
            <span>忘记密码</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'login',
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  position fixed
  min-width 800px
  width 100%
  height 100%
  background black
  .logo
    color #ffffff
    height 33px
    padding 26px 45px
    overflow hidden
    img
      width 108px
      height 33px
      line-height 33px
      opacity 37.53
      float left
      vertical-align middle
    span
      font-size 18px
      line-height 33px
      margin-left 12px
  .cont
    display flex
    justify-content space-around
    align-content center
    height calc(100% - 200px)
    .text
      align-self center
      font-size 24px
      line-height 33px
      color #ffffff
    .board
      align-self center
      background #ffffff
      border 1px solid #cccccc
      box-shadow 0 1px 12px rgba(255, 255, 255, 0.5)
      h2
        font-size 24px
        color #7c7c7c
        line-height 60px
        box-shadow 0 1px 0 #cfc9c9
        text-align center
      .inputCont
        padding 30px
        .input
          width 310px
          height 22px
          border 1px solid #cccccc
          padding 15px 8px
          margin-bottom 16px
          span
            display inline-block
            width 24px
            height 24px
            text-align center
          input
            width 250px
            margin-left 15px
            outline none
            border none
            font-size 16px
            line-height 22px
        button
          width 100%
          border none
          outline none
          line-height 52px
          color #ffffff
          font-size 16px
          background #40b6ff
          cursor pointer
          border-radius 2px
          margin-bottom 16px
          &:hover
            background #40b6f2
          &:active
            color lightgreen
        h3
          overflow hidden
          span
            font-size 12px
            float right
            line-height 38px
            cursor pointer
            &:hover
              color red
</style>