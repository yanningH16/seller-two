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
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'admin',
  components: {
    NavMenu
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userMoney'
    ])
  },
  created () {
    this.$ajax.post('/api/order/search/sellerStatistics', {
      sellerUserId: this.userInfo.sellerUserId
    }).then((data) => {
      console.log(data)
      let res = data.data
      if (res.code === '200') {
        this.setTaskCountBuy(res.data.favorWaitPassCount)
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
    }).catch(() => {
      this.$message.error('网络错误，刷新下试试')
    })
  },
  methods: {
    toReport () {
      this.$router.push({ name: 'report' })
    },
    ...mapMutations({
      setTaskCount: 'SET_TASK_COUNT',
      setTaskCountBuy: 'SET_TASK_COUNT_BUY'
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.admin
  width 100%
  height 100%
  // position fixed
  display flex
  .menuBox
    flex 0 0 180px
    position fixed
    top 0
    left 0
    overflow auto
    width 180px
    background #0a1727
  .routerBox
    flex 1
    display flex
    margin-left 180px
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