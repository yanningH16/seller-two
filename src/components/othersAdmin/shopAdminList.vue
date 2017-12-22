<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">其他管理</em>>店铺管理</div>
    <div class="content">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="用户管理" name="first">
          <table class="border" v-for="(item,index) in shopList" :key="index">
            <div class="icon">
            </div>
            <tr>
              <i style="margin-left:20px">店铺名称:
                <em>{{item.shopName}}</em>
                <span class="right">状态 :
                  <em>{{item.status}}</em>
                  <i class="el-icon-document" style="margin-right:10px;margin-left:10px;cursor:pointer" @click="change(index)"></i>
                  <i class="el-icon-delete" style="cursor:pointer" @click="open2(index)"></i>
                </span>
              </i>
            </tr>
            <tr>
              <i style="margin-left:20px">店铺链接:
                <em>{{item.shopHomePageUrl}}</em>
              </i>
            </tr>
            <tr>
              <i style="margin-left:20px">联系人方式:&nbsp;&nbsp; 姓名:
                <em>{{item.contactName}}&nbsp;&nbsp;</em> 手机:
                <em>{{item.contactTelephone}}&nbsp;&nbsp;</em>QQ:
                <em>{{item.contactQQ}}</em>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'shopAdminList',
  data () {
    return {
      activeName: 'first',
      shopList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.shoplist()
  },
  methods: {
    // 删除店铺的操作
    open2 (index) {
      console.log(this.shopList[index])
      this.$confirm('此操作将永久删除该店铺, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/seller/shop/deleteShop', {
          sellerShopId: this.shopList[index].shopId
        }).then((data) => {
          console.log(data)
          let res = data.data
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // this.refresh()
            this.shoplist()
          } else {
            this.shoplist()
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error('未知错误！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 刷新本地用户信息
    refresh () {
      this.$ajax.post('/api/buyerAccount/refresh', {
        telephone: this.userInfo.telephone
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.setUserInfo(res.data)
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
    },
    // 获取店铺列表的接口
    shoplist () {
      this.$ajax.post('/api/seller/shop/getShopListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId,
        shopType: 0
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          // 用来判断是否存在res.data
          if (res.data) {
            for (let word of res.data) {
              let goods = {
                shopName: word.shopName,
                shopHomePageUrl: word.shopHomePageUrl,
                contactQQ: word.contactQQ,
                contactName: word.contactName,
                contactTelephone: word.contactTelephone,
                status: word.status === '1' ? '已审核' : '未审核',
                shopId: word.shopId
              }
              arr.push(goods)
            }
          }
          this.shopList = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error(err)
      })
    },
    change (index) {
      this.$router.push({ name: 'changeShop', query: { sellerShopId: this.shopList[index].shopId } })
    },
    ...mapActions([
      'setUserInfo'
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
    padding 0 0 336px
    position relative
    .border
      border 1px solid rgba(204, 204, 204, 1)
      width 100%
      line-height 40px
      margin-top 15px
      font-size 14px
      min-width 500px
      tr:nth-child(2n-1)
        border 1px solid rgba(204, 204, 204, 1)
        background #fafafa
      .right
        float right
        margin-right 20px
    .btn
      position absolute
      bottom 110px
      left 50%
</style>