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
        <h2>忘记密码</h2>
        <div class="inputCont">
          <div class="input">
            <span class="el-icon-edit"></span>
            <input @input="isCanUse" v-model="phoneNum" type="number" placeholder="输入手机号">
          </div>
          <div class="inputCode">
            <div class="smInput">
              <span class="el-icon-edit-outline"></span>
              <input type="password" placeholder="输入验证码">
            </div>
            <span class="testButton" v-show="!isCan">
              验证码
            </span>
            <span class="testButton active" v-show="isCan">
              验证码
            </span>
          </div>
          <div class="input pCont">
            <span class="el-icon-edit-outline"></span>
            <input type="password" placeholder="输入新密码">
          </div>
          <div class="input">
            <span class="el-icon-edit-outline"></span>
            <input type="password" placeholder="再次输入密码">
          </div>
          <button>提&nbsp;交</button>
          <h3>
            <span>去登录</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'reg',
  data () {
    return {
      isCan: false,
      phoneNum: ''
    }
  },
  methods: {
    isCanUse () {
      if (/^1[34578]\d{9}$/.test(this.phoneNum)) {
        this.isCan = true
      } else {
        this.isCan = false
      }
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
        .inputCode
          display flex
          .smInput
            width 176px
            height 16px
            border 1px solid #cccccc
            padding 14px 9px
            margin-bottom 24px
            span
              display inline-block
              width 24px
              height 24px
              text-align center
            input
              margin-left 15px
              width 130px
              outline none
              border none
              font-size 16px
              line-height 16px
          .testButton
            display inline-block
            border-radius 2px
            text-align center
            cursor pointer
            margin-left 23px
            width 108px
            height 44px
            line-height 44px
            color #ffffff
            background #999999
            font-size 16px
          .active
            background #40b6ff
        .input
          width 310px
          height 16px
          border 1px solid #cccccc
          padding 14px 9px
          margin-bottom 24px
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
        .pCont
          margin-bottom 42px
          &:after
            content '6-18位数字+字母'
            display inline-block
            font-size 12px
            color #999999
            line-height 28px
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