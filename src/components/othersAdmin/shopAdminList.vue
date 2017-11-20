<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">其他管理</em>>店铺管理</div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <div class="icon">
            <i class="el-icon-document"></i>
            <i class="el-icon-delete"></i>
          </div>
          <table class="border">
            <tr>测试一下大家诶飞飞机二级分
              <span class="right">的法兰克福</span>
            </tr>
            <tr>测试一下大家诶飞飞机二级分</tr>
            <tr>测试一下大家诶飞飞机二级分</tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'shopAdminList',
  data () {
    return {
      activeName: 'first'
    }
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
    padding-left 20px
    padding-right 20px
    .border
      border 1px solid rgba(204, 204, 204, 1)
      width 100%
      line-height 40px
      tr:nth-child(2n-1)
        border 1px solid rgba(204, 204, 204, 1)
        background #fafafa
      .right
        float right
    .icon
      text-align right
      font-size 18px
      padding-top 40px
</style>