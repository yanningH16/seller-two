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
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
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
        <el-upload class="avatar-uploader" :show-file-list="false" :http-request="uploadImg" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" ref="upload" action="">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" width="120px" height="120" style="border-right:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9">
          <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:122px;font-size:30px"></i>
        </el-upload>
      </li>
      <li style="margin-top:130px">
        <button class="btn" @click="sureReport">确认举报</button>
      </li>
    </ul>

  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getImgSize, uploadFile, uploadPromise } from '../../assets/js/upload'
export default {
  name: 'myReport',
  data () {
    return {
      textarea: '',
      isCanUpload: false,
      input: '',
      imageUrl: '',
      options: [{
        label: '举报原因1'
      }, {
        label: '举报原因2'
      }, {
        label: '举报原因3'
      }, {
        label: '举报原因4'
      }, {
        label: '举报原因5'
      }],
      value: ''
    }
  },
  watch: {
    isCanUpload (val) {
      if (val) {
        this.$refs.upload.submit()
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    uploadImg (img) {
      if (!this.isCanUpload) {
        return false
      }
      uploadPromise.then((res) => {
        if (res.statusText === 'OK') {
          uploadFile(res.data, img.file).then((res) => {
            // this.imageUrl = res.url
            this.imageUrl = res
          }).catch(() => {
            this.$message.error('网络错误，请刷新试试')
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，请刷新试试')
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
        this.isCanUpload = false
        return false
      } else if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        this.isCanUpload = false
        return false
      } else {
        getImgSize(file).then((img) => {
          this.isCanUpload = true
        })
      }
    },
    sureReport () {
      this.$ajax.post('/api/seller/complain/complainBuyer', {
        chuaqinInfo: this.input,
        complainReason: this.value,
        complainComment: this.textarea,
        picUrls: this.imageUrl,
        complainId: this.userInfo.sellerUserId,
        complainPhone: this.userInfo.telephone
      }).then((data) => {
        if (data.data.code === '200') {
          this.$confirm('举报成功', '提示', {
            confirmButtonText: '查看举报列表',
            cancelButtonText: '返回上一步',
            type: 'success'
          }).then(() => {
            this.$router.push({ name: 'myReport' })
          }).catch(() => {
            window.history.back(-1)
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error('未知错误，请重新刷新')
      })
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