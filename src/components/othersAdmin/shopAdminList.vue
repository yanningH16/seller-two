<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">其他管理</em>>店铺管理</div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <div class="icon">
            <i class="el-icon-document" style="margin-right:20px"></i>
            <i class="el-icon-delete"></i>
          </div>
          <table class="border">
            <tr>
              <i style="margin-left:20px">店铺信息:
                <em>索尼旗舰店</em>
                <span class="right">状态 :
                  <em>已审核</em>
                </span>
              </i>
            </tr>
            <tr>
              <i style="margin-left:20px">店铺链接:
                <em>http://www.baidu.com</em>
              </i>
            </tr>
            <tr>
              <i style="margin-left:20px">联系人方式: QQ
                <em>632311638</em> 微信
                <em>1503718341</em> 手机
                <em>15037183341</em>
              </i>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <router-link :to="{name:'shopAdmin'}">
        <button class="btn">+添加店铺</button>
      </router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'shopAdminList',
  data () {
    return {
      activeName: 'first'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 0 20px 0 20px
  .shop
    background #fff
    height 36px
    line-height 36px
    padding-left 20px
    font-size 14px
    color rgba(60, 60, 60, 1)
    .gray
      color rgba(137, 137, 137, 1)
  .content
    background #fff
    margin-top 24px
    padding 0 20px 336px
    position relative
    .border
      border 1px solid rgba(204, 204, 204, 1)
      width 100%
      line-height 40px
      margin-top 9px
      font-size 14px
      tr:nth-child(2n-1)
        border 1px solid rgba(204, 204, 204, 1)
        background #fafafa
      .right
        float right
        margin-right 20px
    .icon
      text-align right
      font-size 20px
      padding-top 40px
    .btn
      position absolute
      bottom 38px
      left 50%
</style>