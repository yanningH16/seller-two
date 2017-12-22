<template>
  <div class="login">
    <div class="logo">
      <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510149804507&di=38dc2b1b6be35acb5c774289b83f10fd&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0124f358cec437a801219c77cd9b01.jpg%40900w_1l_2o_100sh.jpg" alt="logo"> -->
      <span>Y C H 项 目</span>
    </div>
    <div class="cont">
      <!-- <div class="text">
        <h1>数 据 智 能&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;驱 动 未 来</h1>
      </div> -->
      <div class="board">
        <h2>登&nbsp;录</h2>
        <div class="inputCont" @keyup.13="login">
          <div class="input">
            <span class="el-icon-edit"></span>
            <input type="number" placeholder="输入手机号" v-model="username">
          </div>
          <div class="input">
            <span class="el-icon-edit-outline"></span>
            <input type="password" placeholder="输入登录密码" v-model="password">
          </div>
          <button @click="login">登&nbsp;录</button>
          <h3>
            <router-link :to="{name:'Password'}">
              <span>忘记密码</span>
            </router-link>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'md5'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        this.$message({
          message: '请输入正确用户名或密码',
          type: 'warning'
        })
        return false
      } else if (this.password.length < 6) {
        this.$message({
          message: '密码不少于6位',
          type: 'warning'
        })
        return false
      } else {
        // 登录
        this.$ajax.post('/api/sellerAccout/login', {
          telephone: this.username,
          password: md5(this.password)
        }).then((data) => {
          // console.log(data)
          if (data.data.code === '200') {
            this.setUserInfo(data.data.data)
            this.setUserToken(data.headers.accesstoken)
            this.$message({
              message: '登录成功,页面跳转中...',
              type: 'success',
              onClose: () => {
                this.$router.push({ name: 'overView' })
              }
            })
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
      }
    },
    ...mapActions([
      'setUserInfo',
      'setUserToken'
    ])
  }
}
</script>
<style lang="stylus" scoped>
.login
  position fixed
  min-width 800px
  width 100%
  height 100%
  background #f8f8f8
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
      color #000000
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
          background #ff3341
          cursor pointer
          border-radius 2px
          margin-bottom 16px
          &:hover
            background #ff3341
          &:active
            color white
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