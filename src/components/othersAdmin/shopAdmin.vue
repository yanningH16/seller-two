<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">其他管理</em>>店铺管理</div>
    <div class="content">
      <h3>商家绑定店铺</h3>
      <div class="line"></div>
      <ul class="content_info">
        <li class="site">
          <span>店铺首页网址&nbsp;&nbsp;</span>
          <el-input v-model="input" placeholder="请输入内容" style="width:384px"></el-input>
          <span class="shopInfo">读取店铺信息</span>
        </li>
        <li class="shopName">
          <span>店铺名称&nbsp;&nbsp;</span>
          <el-input v-model="input1" placeholder="请输入内容" style="width:384px"></el-input>
        </li>
        <li class="wangwang">
          <span>店铺旺旺ID&nbsp;&nbsp;</span>
          <el-input v-model="input2" placeholder="请输入内容" style="width:384px"></el-input>
        </li>
        <li class="type">
          <span>商品所属分类&nbsp;&nbsp;</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li class="pic">
          <span class="pic_admin">管理后台截图</span>
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <!-- <li class="addContent" v-for="(item,index) in addArr" :key='index'> -->
        <li class="addContent">
          <i class="el-icon-delete" style="float:right;font-size:20px"></i>
          <div>发货地址: <span>浙江省杭州市西湖区</span></div>
          <div style="margin-top:10px">街道地址: <span>仓溢东苑个违法而无人飞机</span></div>
          <div style="margin-top:10px">发货电话: <span>15037183341</span></div>
          <div class="line"></div>
        </li>
        <li class="pullDown" v-show="pull">
          <el-form :model="form">
            <el-form-item label="发货地址">
              <el-select v-model="form.region" placeholder="省份">
                <el-option label="区域一" value="dd"></el-option>
              </el-select>
              <el-select v-model="form.city" placeholder="市" style="margin-left:12px;margin-right:12px">
                <el-option label="区域一" value="dd"></el-option>
              </el-select>
              <el-select v-model="form.zone" placeholder="区">
                <el-option label="区域一" value="dd"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="街道地址">
              <el-input v-model="form.name" style="width:384px"></el-input>
            </el-form-item>
            <el-form-item label="发货电话">
              <el-input v-model="form.phone" style="width:384px"></el-input>
            </el-form-item>
          </el-form>
          <button class="btn" @click="save">保存</button>
        </li>
        <li class="addAddress">
          <i class="el-icon-circle-plus" style="color:rgba(23,159,255,1);cursor:pointer" @click="add"> 添加发货地址</i>
        </li>
        <li>
        <div class="line"></div>
        <p class="person">此店铺与平台对接人</p>
        </li>
        <li class="personInfo">
          姓名&nbsp;&nbsp;
          <el-input v-model="input" placeholder="请输入内容" style="width:384px"></el-input><br>
          <span style="margin-left:-10px">手机号&nbsp;&nbsp;</span>
          <el-input v-model="input" placeholder="请输入内容" style="width:384px;margin-top:20px"></el-input><br>
          <span>QQ号&nbsp;&nbsp;</span>
          <el-input v-model="input" placeholder="请输入内容" style="width:384px;margin-top:20px"></el-input>
        </li>
        <li>
         <router-link :to="{name:'shopAdminList'}"><button class=" btn" :class="{disabled:active}" style="margin-bottom:60px" :disabled='disable'>确认绑定</button></router-link> 
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'shopAdmin',
  data () {
    return {
      // 判断按钮是否可用
      disable: false,
      // 判断是否有这个类名的存在
      active: true,
      input: '',
      input1: '',
      input2: '',
      value: '',
      imageUrl: '',
      pull: true,
      addArr: [],
      form: {
        name: '',
        region: '',
        city: '',
        zone: '',
        phone: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕发多少纷纷'
      }]
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
    },
    add () {
      this.pull = !this.pull
    },
    save () {
      alert(1111)
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
    h3
      padding-top 40px
      font-size 16px
      color rgba(68, 68, 68, 1)
    .line
      height 1px
      background rgba(222, 222, 222, 1)
      margin-top 16px
    .content_info
      margin-top 10px
      font-size 14px
      color rgba(68, 68, 68, 1)
      text-align center
      margin-top 20px
      .site
        padding-left 153px
      .shopName
        margin-top 20px
      .wangwang
        margin-top 20px
        margin-left -11px
      .type
        margin-top 20px
        margin-left -22px
      .shopInfo
        display inline
        width 164px
        height 36px
        border 1px solid rgba(255, 51, 65, 1)
        color rgba(255, 51, 65, 1)
        padding 10px 40px
        margin-left 12px
        cursor pointer
      .pic
        margin-top 20px
        .pic_admin
          margin-left -418px
          margin-top 13px
          display inherit
        .avatar-uploader
          border 1px solid #d9d9d9
          cursor pointer
          width 180px
          height 180px
          background rgba(250, 250, 250, 1)
          display inline-block
          margin-top -14px
          margin-left -127px
        .el-icon-plus
          font-size 48px
          line-height 180px
      .addAddress
        margin-top 25px
        margin-left -300px
      .pullDown
        width 480px
        margin-top 20px
        padding 40px
        display block
        box-shadow 0 1px 5px rgba(0, 0, 0, 0.2)
        margin-left 37%
      .person
        margin-top 32px
        margin-left -1000px
        font-size 14px
        color rgba(68, 68, 68, 1)
      .personInfo
        margin-top 60px
        padding-bottom 60px
      .addContent
        width 480px
        display block
        margin-top 10px
        padding 40px
        margin-left 35%
        text-align left 
</style>