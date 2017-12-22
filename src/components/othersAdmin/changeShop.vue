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
          <el-input v-model="this.GetShopInfo.shopHomePageUrl" placeholder="请输入内容" style="width:384px" disabled></el-input>
          <!-- <span class="shopInfo">读取店铺信息</span> -->
        </li>
        <li class="shopName">
          <span>店铺名称&nbsp;&nbsp;</span>
          <el-input v-model="this.GetShopInfo.shopName" placeholder="请输入内容" style="width:384px" disabled></el-input>
        </li>
        <li class="wangwang">
          <span>店铺旺旺ID&nbsp;&nbsp;</span>
          <el-input v-model="this.GetShopInfo.productFirstClassId" placeholder="请输入内容" style="width:384px" disabled></el-input>
        </li>
        <li class="type">
          <span>商品所属分类&nbsp;&nbsp;</span>
          <el-select v-model="this.GetShopInfo.productFirstClassDetail" placeholder="请选择" disabled>
            <el-option v-for="item in shopType" :key="item.value" :label="item.className" :value="item">
            </el-option>
          </el-select>
        </li>
        <li class="pic">
          <span class="pic_admin">管理后台截图</span>
          <el-upload disabled class="avatar-uploader" :show-file-list="false" :http-request="uploadImg" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" ref="upload" action="">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" width="182px" height="182px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <!-- 发货地址显示部分 -->
        <li class="addContent" v-for="(item,index) in addArr" :key='index'>
          <i class="el-icon-delete" style="float:right;font-size:20px;cursor:pointer" @click="remove(index)"></i>
          <div>发货地址:
            <span>{{item.province+' '+item.city+' '+item.region}}</span>
          </div>
          <div style="margin-top:10px">街道地址:
            <span>{{item.address}}</span>
          </div>
          <div style="margin-top:10px">发货电话:
            <span>{{item.telephone}}</span>
          </div>
          <div class="line"></div>
        </li>
        <li class="pullDown" v-show="pull">
          <el-form>
            <el-form-item label="发货地址">
              <el-select v-model="itemPro" placeholder="省份" @change="provinceChange" value-key='code'>
                <el-option v-for="(itemPro,index) in provinces" :key="index" :label="itemPro.name" :value="itemPro"></el-option>
              </el-select>
              <el-select v-model="itemCity" placeholder="市" style="margin-left:12px;margin-right:12px" @change="cityChange" value-key='code'>
                <el-option v-for="(itemCity,index) in city" :key="index" :label="itemCity.name" :value="itemCity"></el-option>
              </el-select>
              <el-select v-model="itemZone" placeholder="区" value-key='code'>
                <el-option v-for="(itemZone,index) in zone" :key="index" :label="itemZone.name" :value="itemZone"></el-option>
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
          <el-input v-model="input4" placeholder="请输入内容" style="width:384px"></el-input><br>
          <span style="margin-left:-10px">手机号&nbsp;&nbsp;</span>
          <el-input v-model="input5" placeholder="请输入内容" style="width:384px;margin-top:20px"></el-input><br>
          <span>QQ号&nbsp;&nbsp;</span>
          <el-input v-model="input6" placeholder="请输入内容" style="width:384px;margin-top:20px"></el-input>
        </li>
        <li>
          <button class=" btn" style="margin-bottom:60px" @click="addSure">确认修改</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getImgSize, uploadFile, uploadPromise } from '../../assets/js/upload'
export default {
  name: 'shopAdmin',
  data () {
    return {
      // 判断按钮是否可用
      disable: false,
      // 判断是否有这个类名的存在
      active: true,
      GetShopInfo: {},
      shopType: [],
      provinces: [],
      itemPro: null,
      city: [],
      itemCity: null,
      zone: [],
      itemZone: null,
      isCanUpload: false,
      jieName: '',
      phone: '',
      input4: '',
      input5: '',
      input6: '',
      value: '',
      className: '',
      valueCode: '',
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
    // this.Provinces()
    this.shopInfo()
    this.addressInfo()
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
    // 当进入的时候进行请求数据进行相应的填充
    shopInfo () {
      this.$ajax.post('/api/seller/shop/getShopInfoByShopId', {
        sellerShopId: this.$route.query.sellerShopId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let obj = {
            shopHomePageUrl: res.data.shopHomePageUrl,
            shopName: res.data.shopName,
            productFirstClassId: res.data.productFirstClassId,
            productFirstClassDetail: res.data.productFirstClassDetail,
            shopManagePlatformUrls: res.data.shopManagePlatformUrls,
            contacterName: res.data.contacterName,
            contacterTelephone: res.data.contacterTelephone,
            contacterQqNum: res.data.contacterQqNum
          }
          this.GetShopInfo = obj
          this.input4 = obj.contacterName
          this.input5 = obj.contacterTelephone
          this.input6 = obj.contacterQqNum
          this.imageUrl = obj.shopManagePlatformUrls
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('未知错误！')
      })
    },
    // 当进入页面获取发货地址的信息的填充
    addressInfo () {
      this.$ajax.post('/api/seller/shop/getPostLocationListByShopId', {
        sellerShopId: this.$route.query.sellerShopId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              province: word.province,
              city: word.city,
              region: word.region,
              address: word.address,
              telephone: word.telephone,
              pCode: word.provinceCode,
              cCode: word.cityCode,
              zCode: word.regionCode
            }
            arr.push(goods)
          }
          this.addArr = arr
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
    // 第二部分的修改，当点击添加发货地址的时候触发事件
    add () {
      this.pull = !this.pull
      this.Provinces()
    },
    // 当点击保存的时候进行收货地的保存
    save () {
      if (this.itemCode === '' || this.itemCity === '' || this.itemZone === '' || this.jieName === '' || this.phone === '') {
        this.$message({
          message: '请正确填写信息',
          type: 'warning'
        })
        return false
      } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号错误,请重新填写',
          type: 'warning'
        })
        return false
      } else {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addArr.push({
          province: this.itemPro.name,
          city: this.itemCity.name,
          region: this.itemZone.name,
          address: this.jieName,
          telephone: this.phone,
          pCode: this.itemPro.code,
          cCode: this.itemCity.code,
          zCode: this.itemZone.code
        })
      }
      this.addContent = true
      this.pull = false
    },
    // 当点击确认绑定的时候做的请求
    addSure () {
      if (this.addArr.length === 0 || this.input4 === '' || this.input5 === '' || this.input6 === '') {
        this.$message({
          message: '请正确填写所有内容,不能留空哦...',
          type: 'warning'
        })
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.input5))) {
        this.$message({
          message: '手机号格式错误,请重新填写',
          type: 'warning'
        })
        return false
      }
      let shopArr = []
      for (let i of this.addArr) {
        shopArr.push({
          province: i.province,
          provinceCode: i.pCode,
          city: i.city,
          cityCode: i.cCode,
          region: i.region,
          regionCode: i.zCode,
          telephone: i.telephone,
          address: i.address
        })
      }
      this.$ajax.post('/api/seller/shop/changeShop', {
        sellerShopId: this.$route.query.sellerShopId,
        // screenShot: this.imageUrl,
        postAddressList: JSON.stringify(shopArr),
        concatName: this.input4,
        concatTelephone: this.input5,
        concatQQnum: this.input6
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '店铺修改成功',
            type: 'success'
          })
          this.$router.push({ name: 'shopAdminList' })
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
      this.itemCity = ''
      this.itemZone = ''
      this.zone = []
      this.getCity()
    },
    cityChange () {
      this.getZone()
      this.itemZone = ''
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
        provinceCode: this.itemPro.code
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code,
              provinceCode: word.provinceCode
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
        cityCode: this.itemCity.code
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code,
              cityCode: word.cityCode
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
    },
    remove (index) {
      this.addArr.splice(index, 1)
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
      min-width 800px
      max-width 1100px
      .site
        margin-left -28px
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
        // background rgba(0, 0, 0, 0.5)
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
        display inline-block
        box-shadow 0 1px 5px rgba(0, 0, 0, 0.2)
        margin-left 80px
      .person
        margin-top 32px
        margin-left -80%
        font-size 14px
        color rgba(68, 68, 68, 1)
      .personInfo
        margin-top 60px
        padding-bottom 60px
      .addContent
        width 480px
        display inline-block
        margin-top 10px
        padding 40px
        text-align left
</style>