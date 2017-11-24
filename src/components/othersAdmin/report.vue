<template>
  <div class="wrap">
    <h4>举报</h4>
    <ul class="infoMsg">
      <li style="padding-top:124px">
        <span>*</span>举报对象
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </li>
      <li>
        <span>*</span>举报原因
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <em class="beizhu">其它备注</em>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </li>
      <li class="pic">
        <span class="word">上传截图</span>
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="upPic el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </li>
      <li style="margin-top:130px">
        <button class="btn">确认举报</button>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'myReport',
  data () {
    return {
      textarea: '',
      input: '',
      imageUrl: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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
body
  width 100%
  height 100%
  h4
    width 100%
    height 40px
    background rgba(255, 51, 65, 0.3)
    color #ff3341
    font-size 20px
    text-align center
    line-height 40px
  .infoMsg
    background #ffffff
    text-align center
    padding-bottom 200px
    li
      padding-top 40px
      font-size 14px
      color #3c3c3c
      span
        color #fb132d
    .pic
      margin-left -200px
      .word
        color #444444
        vertical-align top
        display inline-block
      .avatar-uploader
        border 1px solid #d9d9d9
        cursor pointer
        width 120px
        height 120px
        background rgba(250, 250, 250, 1)
        display inline-block
      .upPic
        width 120px
        height 120px
        font-size 50px
        line-height 120px
        color #dedede
    .beizhu
      display inline-block
      vertical-align top
</style>