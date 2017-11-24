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
            <el-option v-for="item in shopType" :key="item.value" :label="item.className" :value="item.id">
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
        <li class="addContent" v-for="(item,index) in addArr" :key='index'>
          <i class="el-icon-delete" style="float:right;font-size:20px"></i>
          <div>发货地址:
            <span>{{item.itemCode+item.itemCity+item.itemZone}}</span>
          </div>
          <div style="margin-top:10px">街道地址:
            <span>{{item.jieName}}</span>
          </div>
          <div style="margin-top:10px">发货电话:
            <span>{{item.phone}}</span>
          </div>
          <div class="line"></div>
        </li>
        <li class="pullDown" v-show="pull">
          <el-form>
            <el-form-item label="发货地址">
              <el-select v-model="itemCode" placeholder="省份" @change="provinceChange">
                <el-option v-for="(item,index) in provinces" :key="index" :label="item.name" :value="item"></el-option>
              </el-select>
              <el-select v-model="itemCity" placeholder="市" style="margin-left:12px;margin-right:12px" @change="cityChange">
                <el-option v-for="(item,index) in city" :key="index" :label="item.name" :value="item"></el-option>
              </el-select>
              <el-select v-model="itemZone" placeholder="区">
                <el-option v-for="(item,index) in zone" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="街道地址">
              <el-input v-model="jieName" style="width:384px"></el-input>
            </el-form-item>
            <el-form-item label="发货电话">
              <el-input v-model="phone" style="width:384px"></el-input>
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
          <button class=" btn" style="margin-bottom:60px" @click="addSure">确认绑定</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'shopAdmin',
  data () {
    return {
      // 判断按钮是否可用
      disable: false,
      // 判断是否有这个类名的存在
      active: true,
      shopType: [],
      provinces: [],
      itemCode: null,
      city: [],
      itemCity: null,
      zone: [],
      itemZone: null,
      jieName: '',
      phone: '',
      input: '',
      input1: '',
      input2: '',
      value: '',
      imageUrl: '',
      pull: false,
      addArr: [],
      addContent: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.shopFirst()
    this.Provinces()
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
      if (this.itemCode === '' || this.itemCity === '' || this.itemZone === '' || this.jieName === '' || this.phone === '') {
        this.$message({
          message: '请正确填写信息',
          type: 'warning'
        })
        return false
      } else {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addArr.push({
          itemCode: this.itemCode,
          itemCity: this.itemCity,
          itemZone: this.itemZone,
          jieName: this.jieName,
          phone: this.phone
        })
      }
      this.addContent = true
      this.pull = false
    },
    // 当点击确认绑定的时候做的请求
    addSure () {
      this.$ajax.post('/api/seller/shop/addShop', {
        sellerUserId: this.userInfo.sellerUserId,
        shopHomePage: this.input,
        shopName: this.input1,
        productClassId: this.value,
        screenShot: ''
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              className: word.className
            }
            arr.push(goods)
          }
          this.shopType = arr
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
    // 商品所属的一级分类
    shopFirst () {
      this.$ajax.post('/api/config/productClass/getJDFirstClass', {
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              className: word.className
            }
            arr.push(goods)
          }
          this.shopType = arr
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
    // 检测当省份发生变化出发的改变事件
    provinceChange () {
      this.getCity()
      this.itemCode = this.itemCode.name
      this.itemCity = null
      this.itemZone = null
    },
    cityChange () {
      this.getZone()
      this.itemCity = this.itemCity.name
      this.itemZone = null
    },
    // 获取省的接口
    Provinces () {
      this.$ajax.post('/api/config/location/getProvinceList', {
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code
            }
            arr.push(goods)
          }
          this.provinces = arr
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
    // 通过省份获取市
    getCity () {
      this.$ajax.post('/api/config/location/getCityListByProvinceCode', {
        provinceCode: this.itemCode.code
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              provinceCode: word.code
            }
            arr.push(goods)
          }
          this.city = arr
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
    // 通过市获取区的值
    getZone () {
      this.$ajax.post('/api/config/location/getAreaListByCityCode', {
        cityCode: this.itemCity.provinceCode
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              provinceCode: word.code
            }
            arr.push(goods)
          }
          this.zone = arr
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
        // border 1px solid rgba(255, 51, 65, 1)
        color white
        padding 10px 40px
        margin-left 12px
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