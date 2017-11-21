<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">账号信息</em>
    </div>
    <div class="personInfo">
      <div class="pic">
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="upPic">点击上传图片</i>
        </el-upload>
      </div>
      <div class="id">
        <span>账户ID</span>
        <p style="margin-top:16px">15037183341</p>
      </div>
      <ul class="infoMsg">
        <li>
          登陆密码
          <span class="span">已设置</span>
          <button class="btn">修改</button>
        </li>
        <li>
          提现密码
          <span class="span">已设置</span>
          <button class="btn">设置</button>
        </li>
        <li class="phone">联系方式
          <span>完善以下信息将有助于平台及时联系您</span>
        </li>
        <li style="margin-top:32px">
          <span style="margin-right:65px">姓名</span>
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span style="margin-right:68px">QQ</span>
          <el-input v-model="input2" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span style="margin-right:64px">邮箱</span>
          <el-input v-model="input3" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span style="margin-right:64px"> 手机</span>
          <el-input v-model="input4" placeholder="请输入内容"></el-input>
        </li>
        <li class="choose">
          <button class="btn" style="margin-right:32px">保存</button>
          <button class=" btn disabled">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'usrInfo',
  data () {
    return {
      imageUrl: 'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg',
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
  .personInfo
    background #fff
    margin-top 24px
    padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    .avatar-uploader
      border 1px solid #d9d9d9
      cursor pointer
      width 120px
      height 120px
      background rgba(250, 250, 250, 1)
      border-radius 50%
    .upPic
      font-size 14px
      display inline-block
      margin-top 50px
      margin-left 20px
    .avatar
      width 120px
      height 120px
      border-radius 50%
    .pic
      padding-top 40px
    .id
      float left
      margin-top -80px
      margin-left 150px
      font-size 14px
      color rgba(155, 155, 155, 1)
    .infoMsg
      margin-top 51px
      li
        margin-top 51px
        .span
          margin-left 40px
          margin-right 190px
      .phone
        border-bottom 1px solid #e5e5e5
        padding-bottom 10px
        color #444444
      .choose
        text-align center
</style>