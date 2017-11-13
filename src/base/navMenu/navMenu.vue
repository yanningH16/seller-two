<template>
  <div class="menu">
    <div class="logo">
      <!-- <img src="logo" alt="Logo" class="img"> -->
      <span style="color:#fff;line-height:60px">LOGO</span>
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
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'navMenu',
  data () {
    return {
      isActive: 0
    }
  },
  computed: {
    menus: {
      get () {
        return [
          {
            icon: 'el-icon-menu',
            header: '任务管理',
            routerHead: 'task',
            lines: [
              {
                text: '垫付任务',
                link: 'task',
                bradge: 12
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '资金记录',
            routerHead: 'coin',
            lines: [
              {
                text: '充值押金',
                link: 'coinPay',
                bradge: 3
              },
              {
                text: '押金提现',
                link: 'coinApply'
              },
              {
                text: '资金记录',
                link: 'coinList'
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
  background #0a1727
  height 100%
  .logo
    height $normal-height
    background $bg-small
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
        height $line-height
        line-height $line-height
        color $color-normal-d
        font-size $font-size-normal
        cursor pointer
        position relative
        &.routerHeaderActive
          color $color-hover
        .text
          margin-left 48px
        .icon
          text-align center
          position absolute
          top 14px
          left 20px
      .routerLine
        position relative
        height $line-height
        line-height $line-height
        color $color-normal
        font-size $font-size-small
        background $bg-small
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
</style>
