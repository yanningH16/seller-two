<template>
  <div class="menu">
    <div class="logo">
      <!-- <img src="logo" alt="Logo" class="img"> -->
      <span style="color:#fff;line-height:80px;font-size:32px;">LOGO</span>
    </div>
    <div class="router">
      <div class="routerBox" v-for="(item,index) in menus" :key="index" ref="routerBox" @click="setRouterActive">
        <div class="routerHeader" :class="{'routerHeaderActive':isActive===index}">
          <span class="icon" :class="item.icon"></span>
          <span class="text">{{item.header}}</span>
        </div>
        <router-link tag="div" class="routerLine" v-for="(line,lineIndex) in item.lines" :key="lineIndex" :to="{name:line.link}" ref="routerLine">
          <span class="text">{{line.text}}</span>
          <span class="bradge" v-if="line.bradge">{{line.bradge}}</span>
        </router-link>
      </div>
    </div>
    <div class="state">
      <img :src="srcPic" alt="" class="pic">
      <p class="phone">
        <span>15037183341</span>
        <i class="el-icon-caret-bottom"></i>
      </p>
      <p class="balance">账户余额:
        <span>120.00</span>
      </p>
      <p class="pay">立即充值</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'navMenu',
  data () {
    return {
      isActive: 0,
      srcPic: 'http://img0.imgtn.bdimg.com/it/u=370586742,3427985766&fm=27&gp=0.jpg'
    }
  },
  computed: {
    menus: {
      get () {
        return [
          {
            icon: 'el-icon-menu',
            header: '首页',
            routerHead: 'header',
            lines: [
              {
                text: '总览',
                link: 'overView',
                bradge: 12
              },
              {
                text: '任务管理',
                link: 'task'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '订单管理',
            routerHead: 'order',
            lines: [
              {
                text: '审核订单',
                link: 'auditOrder'
              },
              {
                text: '审核评价',
                link: 'appraiseOrder',
                bradge: 3
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '资金管理',
            routerHead: 'coin',
            lines: [
              {
                text: '充值',
                link: 'coinPay'
              },
              {
                text: '资金记录',
                link: 'coinApply'
              },
              {
                text: '银行卡管理',
                link: 'coinList'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '其它管理',
            routerHead: 'othersAdmin',
            lines: [
              {
                text: '店铺管理',
                link: 'shopAdmin'
              },
              {
                text: '推广赚钱',
                link: 'pushAdmin'
              },
              {
                text: '我的举报',
                link: 'myReport'
              }
            ]
          }
        ]
      },
      set (val) {
        return val
      }
    }
  },
  methods: {
    setRouterActive () {
      this.$nextTick(() => {
        let activeRouter = this.$route.path
        if (activeRouter.indexOf('task') !== -1) {
          this.isActive = 0
        } else if (activeRouter.indexOf('coin') !== -1) {
          this.isActive = 1
        }
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.menu
  background #090723
  height 100%
  .logo
    height 80px
    text-align center
    .img
      position relative
      width 60%
      top 20%
      left 20%
  .router
    .routerBox
      font-size 0
      .routerHeader
        height 40px
        line-height 40px
        color #ffffff
        font-size 16px
        cursor pointer
        position relative
        &.routerHeaderActive
          color $color-hover
        .text
          margin-left 48px
        .icon
          text-align center
          position absolute
          top 12px
          left 20px
      .routerLine
        position relative
        height 40px
        line-height 40px
        color #e7e7e7
        font-size 14px
        cursor pointer
        &:hover
          background $bg-active
          transition background-color 0.3s, color 0.3s
          &::before
            content ''
            height 100%
            width 5px
            background $bg-red
            position absolute
            transition all 0.3s
        &.router-link-active
          background $bg-active
          &::before
            content ''
            height 100%
            width 5px
            background $bg-red
            position absolute
        .text
          margin-left 48px
        .bradge
          position absolute
          height 12px
          line-height 12px
          margin 12px 0
          right 15px
          background $bg-red
          border-radius 10px
          padding 2px 4px
          text-align center
  .state
    margin-top 36px
    text-align center
    color white
    font-size 14px
    .pic
      width 40px
      height 40px
      border-radius 50%
    .phone
      margin-top 20px
      cursor pointer
    .balance
      margin-top 12px
    .pay
      margin-top 12px
      color rgba(255, 41, 51, 1)
      cursor pointer
</style>
