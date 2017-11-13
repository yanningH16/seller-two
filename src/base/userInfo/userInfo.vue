<template>
  <div class="userInfo">
    <div class="nav">

    </div>
    <div class="reportButton">
      <el-button type="text" icon="el-icon-warning">举报</el-button>
    </div>
    <div class="info">
      <img :src="user.imgUrl" class="img">
      <span class="text">18667199035</span>
    </div>
    <div class="logout">
      <el-dropdown trigger="click" size="small" @command="logoStatus">
        <span class="el-dropdown-link" style="color:#ffffff">
          <span class="el-icon-caret-bottom"></span>
        </span>
        <el-dropdown-menu slot="dropdown" style="text-align:center;">
          <el-dropdown-item command="1">查看个人信息</el-dropdown-item>
          <el-dropdown-item command="2">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import md5 from 'md5'
// import { mapGetters } from "vuex"
export default {
  name: 'userInfo',
  data () {
    return {
      activeIndex2: '1'
    }
  },
  computed: {
    user () {
      return {
        // phone: this.userInfo.userName || this.userInfo.telephone,
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510127020787&di=7ea47f534e3e80cb465a5e45650c433d&imgtype=0&src=http%3A%2F%2Fimg21.mtime.cn%2Fpi%2F2011%2F01%2F26%2F143007.59370061.jpg'
      }
    }
  },
  methods: {
    logoStatus (index) {
      if (parseInt(index) === 1) {

      } else if (parseInt(index) === 2) {
        this.logout()
      }
    },
    logout () {
      this.$confirm('是否退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.logoutApi()
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.userInfo
  flex 0 0 $normal-height
  background $bg-small
  color $color-text-white
  text-align right
  font-size 0
  border-bottom 1px solid #dedede
  .reportButton
    display inline-block
    margin-right 100px
    button
      color #ffffff
  .nav
    display inline-block
  .info
    display inline-block
    height $normal-height
    line-height $normal-height
    cursor pointer
    .img
      width 30px
      height 30px
      vertical-align top
      margin 15px 0
      border-radius 50%
      margin-right 10px
    .text
      font-size $font-size-normal
  .logout
    display inline-block
    height $normal-height
    line-height $normal-height
    font-size $font-size-big
    padding 0 20px
    cursor pointer
</style>
