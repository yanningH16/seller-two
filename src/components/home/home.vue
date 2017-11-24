<template>
  <div class="admin" element-loading-text="拼命加载中">
    <div class="menuBox">
      <navMenu></navMenu>
    </div>
    <div class="routerBox">
      <div class="routerContainer">
        <router-view/>
        <div v-if="$route.name!='myReport' && $route.name!='report'" class="report" @click="toReport">
          <span class="el-icon-warning"></span>
          <p>举报</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NavMenu from '../../base/navMenu/navMenu'
// import { mapMutations} from 'vuex'
export default {
  name: 'admin',
  components: {
    NavMenu
  },
  data () {
    return {

    }
  },
  methods: {
    toReport () {
      this.$router.push({ name: 'report' })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.admin
  width 100%
  height 100%
  position fixed
  display flex
  .menuBox
    flex 0 0 180px
    background #0a1727
  .routerBox
    flex 1
    display flex
    flex-direction column
    // min-width 1200px
    overflow hidden
    .routerContainer
      flex 1
      overflow hidden
      overflow-y auto
      background #efefef
      .report
        position fixed
        right 0
        bottom 0
        color #ffffff
        width 60px
        height 60px
        background rgba(68, 68, 68, 0.5)
        border-radius 4px
        text-align center
        cursor pointer
        &:hover
          opacity 0.8
        span
          font-size 20px
          line-height 35px
        p
          font-size 14px
          line-height 25px
</style>