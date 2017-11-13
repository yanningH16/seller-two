<template>
  <div class="admin" element-loading-text="拼命加载中">
    <div class="menuBox">
      <navMenu></navMenu>
    </div>
    <div class="routerBox">
      <userInfo></userInfo>
      <div class="routerContainer">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NavMenu from '../../base/navMenu/navMenu'
import UserInfo from '../../base/userInfo/userInfo'
// import { mapMutations} from 'vuex'
export default {
  name: 'admin',
  components: {
    NavMenu,
    UserInfo
  },
  data () {
    return {

    }
  },
  methods: {

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
      background $bg-container
</style>