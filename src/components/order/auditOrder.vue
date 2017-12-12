<template>
  <div class="auditOrder">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'auditOrder' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="待确认订单" name="first">
          <div class="firstTab tabCont">
            <div class="search">
              <span>平台：</span>
              <el-select v-model="platform" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="京东" value="0">
                </el-option>
                <el-option label="淘宝" value="1">
                </el-option>
                <el-option label="天猫" value="2">
                </el-option>
              </el-select>
              <span>店铺：</span>
              <el-select v-model="shopName" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option v-for="(item,index) in shopList" :key="index" :label="item.shopName" :value="item.shopId">
                </el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="searchKey" style="width:350px;">
                <template slot="prepend">
                  <el-select v-model="searchKeyType" placeholder="请选择" style="width:120px;">
                    <el-option label="全部" value="">
                    </el-option>
                    <el-option label="任务编号" value="task">
                    </el-option>
                    <el-option label="关键词" value="keyword">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
              <button class="btn" style="margin-left:40px;" @click="getTask">查询</button>
            </div>
            <el-button plain v-if="0">
              <span style="font-weight:600">导出excel</span>
            </el-button>
            <div class="tabItem" v-for="(item, index) in toCheckOrderList" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i :class="{ 'jdIcon':item.shopType==0, 'taobaoIcon':item.shopType==1, 'tianmaoIcon': item.shopType==2}"></i>
                  <strong>&nbsp;&nbsp;{{ item.shopName }}</strong>
                </li>
                <li style="width:30%">
                  <span class="gray">任务编号: </span>
                  <span>{{ item.buyerTaskId }}</span>
                </li>
                <li style="width:20%">
                  <span class="gray">任务类型: </span>
                  <span>{{ item.favorTaskType == 0 ? '默认好评' : item.favorTaskType == 1 ? '五星文字好评' : item.favorTaskType == 2 ? '图文好评' : '其他' }}</span>
                </li>
                <li style="width:20%">
                  <span class="gray">提交时间: </span>
                  <span>{{ item.submitTime }}</span>
                </li>
              </ul>
              <ul class="cont">
                <li>
                  <img :src="item.productPicUrl" alt="pic">
                  <div>
                    <span>&nbsp;&nbsp;{{ item.productName }}</span>
                    <a class="blue" :href="item.productUrl" target="_blank">商品链接</a>
                    <p>&nbsp;&nbsp;子任务编号：{{ item.taskDayId }}</p>
                  </div>
                </li>
                <li>
                  <a @click="lookImg((JSON.parse(item.realOrderPicUrl))[0] || '')">
                    <img :src="(JSON.parse(item.realOrderPicUrl))[0] || ''" alt="pic">
                  </a>
                  <div>
                    <span>姓名：{{ item.buyerName }}</span>
                    <span>订单金额：{{ item.realOrderPrice }}</span>
                    <p>京东订单编号：{{ item.realOrderId }}&nbsp;&nbsp;
                      <span class="blue copy" :data-clipboard-text='item.realOrderId' @click="doCopy">复制</span>
                    </p>
                    <p>京东用户名：{{ item.jdUserName }}</p>
                    <p>手机号：{{ item.telephone }}</p>
                  </div>
                </li>
                <li>
                  <p>
                    <button class="btn btn-small" @click="toConfirm(item.favorTaskType,item.buyerTaskId)">确认</button>
                  </p>
                  <p>
                    <button class="btn btn-small disabled" @click="toReject(item.buyerTaskId)">驳回</button>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待买家评价" name="second">
          <div class="secondTab tabCont">
            <div class="search">
              <span>平台：</span>
              <el-select v-model="platform" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="京东" value="0">
                </el-option>
                <el-option label="淘宝" value="1">
                </el-option>
                <el-option label="天猫" value="2">
                </el-option>
              </el-select>
              <span>店铺：</span>
              <el-select v-model="shopName" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option v-for="(item,index) in shopList" :key="index" :label="item.shopName" :value="item.shopId">
                </el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="searchKey" style="width:350px;">
                <template slot="prepend">
                  <el-select v-model="searchKeyType" placeholder="请选择" style="width:120px;">
                    <el-option label="全部" value="">
                    </el-option>
                    <el-option label="任务编号" value="task">
                    </el-option>
                    <el-option label="关键词" value="keyword">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
              <button class="btn" style="margin-left:40px;" @click="getTask">查询</button>
            </div>
            <div class="tabItem" v-for="(item, index) in toFavorList" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i :class="{ 'jdIcon':item.shopType==0, 'taobaoIcon':item.shopType==1, 'tianmaoIcon': item.shopType==2}"></i>
                  <strong>&nbsp;&nbsp;{{ item.shopName }}</strong>
                </li>
                <li style="width:30%">
                  <span class="gray">任务编号: </span>
                  <span>{{ item.buyerTaskId }}</span>
                </li>
                <li style="width:20%">
                  <span class="gray">任务类型: </span>
                  <span>{{ item.favorTaskType == 0 ? '默认好评' : item.favorTaskType == 1 ? '五星文字好评' : item.favorTaskType == 2 ? '图文好评' : '其他' }}</span>
                </li>
                <li style="width:20%">
                  <span class="gray">提交时间: </span>
                  <span>{{ item.submitTime }}</span>
                </li>
              </ul>
              <ul class="contType2">
                <li>
                  <img :src="item.productPicUrl" alt="pic">
                  <div>
                    <p>姓名：{{ item.buyerName }}</p>
                    <p>京东用户名：{{ item.jdUserName }}</p>
                    <p>手机号：{{ item.telephone }}</p>
                    <p>子任务编号：{{ item.taskDayId }}</p>
                  </div>
                </li>
                <li>
                  <a @click="lookImg((JSON.parse(item.realOrderPicUrl))[0] || '')">
                    <img :src="(JSON.parse(item.realOrderPicUrl))[0] || ''" alt="pic">
                  </a>
                  <div>
                    <p>京东订单编号：</p>
                    <p class="red">{{ item.realOrderId }}</p>
                    <p>订单金额：
                      <span class="red">{{ item.realOrderPrice }}</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="evaluateText">
                    <b>{{ item.favorTaskType == 0 ? '默认好评' : item.favorTaskType == 1 ? '五星文字好评' : item.favorTaskType == 2 ? '图文好评' : '其他' }}</b>
                    <p>{{ item.sellerFavor || '无评价信息' }}</p>
                  </div>
                  <div class="imgs" v-if="item.favorTaskType == 2">
                    <a @click="lookImg(m)" v-for="(m, i) in (JSON.parse(item.sellerFavorPicUrl) || [])" :key="i">
                      <img :src="m" alt="pic">
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已驳回" name="third">
          <div class="thirdTab tabCont">
            <div class="search">
              <span>平台：</span>
              <el-select v-model="platform" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="京东" value="0">
                </el-option>
                <el-option label="淘宝" value="1">
                </el-option>
                <el-option label="天猫" value="2">
                </el-option>
              </el-select>
              <span>店铺：</span>
              <el-select v-model="shopName" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option v-for="(item,index) in shopList" :key="index" :label="item.shopName" :value="item.shopId">
                </el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="searchKey" style="width:350px;">
                <template slot="prepend">
                  <el-select v-model="searchKeyType" placeholder="请选择" style="width:120px;">
                    <el-option label="全部" value="">
                    </el-option>
                    <el-option label="任务编号" value="task">
                    </el-option>
                    <el-option label="关键词" value="keyword">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
              <button class="btn" style="margin-left:40px;" @click="getTask">查询</button>
            </div>
            <div class="tabItem" v-for="(item, index) in rejectOrderList" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i :class="{ 'jdIcon':item.shopType==0, 'taobaoIcon':item.shopType==1, 'tianmaoIcon': item.shopType==2}"></i>
                  <strong>&nbsp;&nbsp;{{ item.shopName }}</strong>
                </li>
                <li style="width:30%">
                  <span class="gray">任务编号: </span>
                  <span>{{ item.buyerTaskId }}</span>
                </li>
                <li style="width:20%">
                  <span class="gray">任务类型: </span>
                  <span>{{ item.favorTaskType==0 ? '默认好评' : item.favorTaskType==1 ? '文字好评' : item.favorTaskType==2 ? '图文好评' : '其他' }}</span>
                </li>
                <li style="width:20%">
                  <span class="gray">提交时间: </span>
                  <span>{{ item.submitTime }}</span>
                </li>
              </ul>
              <ul class="cont contType3">
                <li>
                  <img :src="item.productPicUrl" alt="pic">
                  <div>
                    <span>&nbsp;&nbsp;{{ item.productName }}</span>
                    <a class="blue" :href="item.productUrl" target="_blank">商品链接</a>
                    <p>&nbsp;&nbsp;子任务编号：{{ item.taskDayId }}</p>
                  </div>
                </li>
                <li>
                  <a @click="lookImg((JSON.parse(item.realOrderPicUrl))[0] || '')">
                    <img :src="(JSON.parse(item.realOrderPicUrl))[0] || ''" alt="pic">
                  </a>
                  <div>
                    <span>姓名：{{ item.buyerName }}</span>
                    <span>订单金额：{{ item.realOrderPrice }}</span>
                    <p>京东订单编号：{{ item.realOrderId }}&nbsp;&nbsp;
                      <span class="blue copy" :data-clipboard-text="item.realOrderId" @click="doCopy">复制</span>
                    </p>
                    <p>京东用户名：{{ item.jdUserName }}</p>
                    <p>手机号：{{ item.telephone }}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <b class="gray">驳回原因：</b>
                    <el-tooltip popper-class="tooltipItem" effect="dark" :content="item.rejectReason" placement="top" style="400px">
                      <p>{{ item.rejectReason }}</p>
                    </el-tooltip>
                  </div>
                  <div>
                    <b class="gray">解决方案：</b>
                    <el-tooltip popper-class="tooltipItem" effect="dark" :content="item.solution" placement="top" style="400px">
                      <p>{{ item.solution }}</p>
                    </el-tooltip>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
      <div v-show="showLookImg">
        <lookImg :imgUrl="lookImgUrl" @close="showLookImg=false"></lookImg>
      </div>
    </div>
    <div class="alertGroup">
      <!-- 驳回提示框 -->
      <el-dialog class="alertReturn" title="确认驳回订单" :modal-append-to-body="false" :visible.sync="showReturn" width="600px">
        <h2>客服会在 12 小时内联系买家处理，若买家不予处理，将扣除买家佣金！</h2>
        <ul class="cont">
          <li>
            <span>驳回理由</span>
            <el-select v-model="returnBackObj.reason" placeholder="请选择驳回理由" style="width:320px;">
              <el-option v-for="(item,index) in rejectReasonList" :key="index" :label="item.rejectReason" :value="item.rejectReason+'&&'+item.step">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>理由备注</span>
            <el-input type="textarea" :rows="2" placeholder="请输入驳回理由备注" v-model="returnBackObj.common" style="width:320px;" resize="none">
            </el-input>
          </li>
          <li>
            <span>修改方案</span>
            <el-input type="textarea" :rows="4" placeholder="请输入修改方案" v-model="returnBackObj.plan" style="width:320px;" resize="none">
            </el-input>
          </li>
        </ul>
        <div class="footBtns">
          <button class="btn" @click="sureToReject">确认</button>
          <button class="btn disabled" @click="showReturn = false">取消</button>
        </div>
      </el-dialog>
      <!-- 确认通过订单 -->
      <el-dialog class="alertConfirm" title="确认通过订单" :modal-append-to-body="false" :visible.sync="showConfirm" width="600px">
        <h3>确认通过订单！</h3>
        <ul class="cont">
          <li>
            <span>评价方式：</span>
          </li>
          <li v-if="favorType==0">
            <span>默认好评，买家无序做任何操作，确认后本金和佣金会打至买家平台账号</span>
          </li>
          <li v-if="favorType==1">
            <span>五星+文字好评</span>
            <div>
              <el-input type="textarea" :rows="3" placeholder="请输入指定文字" v-model="confirmObj.evaluteText" style="width:320px;" resize="none">
              </el-input>
            </div>
          </li>
          <li v-if="favorType==2">
            <span>五星+图片+文字好评</span>
            <div>
              <el-input type="textarea" :rows="3" placeholder="请输入指定文字" v-model="confirmObj.evaluteText" style="width:384px;" resize="none">
              </el-input>
            </div>
            <div class="imgCont">
              <img v-for="(item, index) in confirmObj.imgArr" :key="index" :src="item" class="avatar">
              <el-upload v-if="confirmObj.imgArr.length<5" class="imgUpload" action="" :show-file-list="false" :http-request="uploadImg" :before-upload="beforeAvatarUpload">
                <i class="add el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </li>
        </ul>
        <div class="footBtns">
          <button class="btn" @click="sureToConfirm">确认</button>
          <button class="btn disabled" @click="showConfirm = false">取消</button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
import LookImg from '../../base/lookImg/lookImg'
import { uploadPromise, uploadFile } from '../../assets/js/upload'
import Clipboard from 'clipboard'
// import Md5 from 'md5'
export default {
  name: 'auditOrder',
  mixins: [pageCommon],
  components: {
    LookImg
  },
  data () {
    return {
      activeName: 'first',
      showLookImg: false,
      favorType: '',
      lookImgUrl: '',
      platform: '',
      shopName: '',
      shopList: [],
      searchKey: '',
      searchKeyType: '',
      // 驳回原因列表
      rejectReasonList: [],
      // 待确认订单列表
      toCheckOrderList: [],
      // 待买家评价列表
      toFavorList: [],
      // 已驳回列表
      rejectOrderList: [],
      // 驳回弹窗
      showReturn: false,
      returnBackObj: {
        reason: '',
        common: '',
        plan: ''
      },
      // 确认订单弹框
      showConfirm: false,
      confirmObj: {
        evaluteText: '',
        imgArr: []
      }
    }
  },
  computed: {
    params () {
      return {
        shopType: this.platform,
        shopId: this.shopName,
        keyword: this.searchKey,
        keywordType: this.searchKeyType,
        sellerUserId: this.userInfo.sellerUserId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    },
    apiUrl () {
      if (this.activeName === 'first') {
        return '/api/seller/order/getToCheckOrderList'
      } else if (this.activeName === 'second') {
        return '/api/seller/order/getCheckedOrderList'
      } else if (this.activeName === 'third') {
        return '/api/seller/order/getRejectOrderList'
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    lookImg (url) {
      this.showLookImg = true
      this.lookImgUrl = url
    },
    doCopy () {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
      })
    },
    toConfirm (type, buyerTaskId) {
      this.showConfirm = true
      sessionStorage.setItem('__buyerTaskId__', buyerTaskId)
      if (parseInt(type) === 0) {
        this.favorType = 0
      } else if (parseInt(type) === 1) {
        this.favorType = 1
      } else if (parseInt(type) === 2) {
        this.favorType = 2
      }
    },
    uploadImg (img) {
      uploadPromise.then((res) => {
        if (res.statusText === 'OK') {
          uploadFile(res.data, img.file).then((res) => {
            this.confirmObj.imgArr.push(res)
          }).catch(() => {
            this.$message.error('网络错误，请刷新试试')
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，请刷新试试')
      })
    },
    toReject (buyerTaskId) {
      sessionStorage.setItem('__buyerTaskId__', buyerTaskId)
      this.showReturn = true
      this.$ajax.post('/api/config/rejectReason/getReasonList', {
        rejectType: 0 // type : 0 下单  1 评价
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.rejectReasonList = data.data.data
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 确认驳回按钮
    sureToReject () {
      let reason = this.returnBackObj.reason.split('&&')[0] || ''
      let step = this.returnBackObj.reason.split('&&')[1] || ''
      this.$ajax.post('/api/seller/order/rejectOrder', {
        buyerTaskId: sessionStorage.getItem('__buyerTaskId__') || '',
        rejectReason: reason,
        comment: this.returnBackObj.common || '',
        solution: this.returnBackObj.plan,
        step: step
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.showReturn = false
          this.$message({
            type: 'success',
            message: '驳回成功!'
          })
          this.returnBackObj = {
            reason: '',
            common: '',
            plan: ''
          }
          this.getTask()
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 确认订单并填写好评
    sureToConfirm () {
      let buyerTaskId = sessionStorage.getItem('__buyerTaskId__') || ''
      this.$ajax.post('/api/seller/order/confirmOrder', {
        buyerTaskId: buyerTaskId,
        sellerFavor: this.confirmObj.evaluteText,
        sellerFavorPicUrl: this.confirmObj.imgArr
      }).then((data) => {
        if (data.data.code === '200') {
          this.showConfirm = false
          this.confirmObj = {
            evaluteText: '',
            imgArr: []
          }
          this.$message({
            type: 'success',
            message: '确认订单成功!'
          })
          this.getTask()
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
      this.getTask()
    },
    beforeAvatarUpload (file) {
      console.log(file)
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
    // 获取店铺列表
    getShopList () {
      this.$ajax.post('/api/seller/shop/getShopListBySellerUserId', {
        sellerUserId: this.userInfo.sellerUserId,
        shopType: 3
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.shopList = data.data.data
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 设置列表
    setList (data) {
      if (this.activeName === 'first') {
        this.toCheckOrderList = data
      } else if (this.activeName === 'second') {
        this.toFavorList = data
      } else if (this.activeName === 'third') {
        this.rejectOrderList = data
      }
    }
  },
  mounted () {
    this.getShopList()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.auditOrder
  padding 0 20px 20px
  font-size 14px
  .red
    color #FC1733
  .gray
    color #949494
  .blue
    color #179FFF
    cursor pointer
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .tab
    background #ffffff
  .tabCont
    padding 20px
    .search
      margin-bottom 20px
    .tabItem
      border 1px solid #DFF0FD
      margin-top 12px
      .head
        height 32px
        line-height 32px
        padding 0 20px
        background #F6FBFF
        box-shadow 0 1px 0 #DFF0FD
        display flex
        justify-content space-between
        font-size 12px
        i
          display inline-block
          width 16px
          height 16px
          vertical-align middle
      .cont
        display flex
        padding 20px
        font-size 14px
        li
          display flex
          padding-left 30px
          border-left 1px solid #dedede
          &:first-child
            flex 1.5
            padding-left 0
            padding-top 20px
            border-left none
            img
              width 60px
              height 60px
            span, a, p
              line-height 30px
          &:nth-child(2)
            flex 2
            a>img
              width 60px
              height 106px
              margin-right 20px
            span, p
              line-height 24px
              margin-right 20px
          &:nth-child(3)
            flex 1
            flex-direction column
            justify-content center
            align-items center
            button
              margin-top 12px
              margin-bottom 12px
      .contType2
        display flex
        padding 20px
        font-size 14px
        li
          display flex
          padding-left 30px
          border-left 1px solid #dedede
          &:first-child
            flex 1.5
            padding-left 0
            border-left none
            img
              width 60px
              height 60px
              margin-top 30px
              margin-right 14px
            p
              line-height 30px
          &:nth-child(2)
            flex 1
            a>img
              width 60px
              height 106px
              margin-right 20px
            p
              line-height 30px
          &:nth-child(3)
            flex 1.5
            flex-direction column
            justify-content center
            padding-left 30px
            .evaluateText
              display flex
              b
                height 20px
                line-height 20px
                padding-right 14px
                margin-right 14px
                border-right 1px solid #9b9b9b
              p
                flex 1
                line-height 20px
            a>img
              width 64px
              height 64px
              border-radius 4px
              margin-right 16px
              margin-top 16px
      .contType3
        li
          &:nth-child(3)
            flex 1
            flex-direction column
            justify-content center
            align-items center
            button
              margin-top 12px
              margin-bottom 12px
            >div
              display flex
              b
                height 20px
                line-height 20px
                padding-right 14px
                margin-right 14px
                border-right 1px solid #9b9b9b
              p
                flex 1
                max-width 200px
                line-height 20px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
              &:first-child
                border-bottom 1px solid #9b9b9b
                padding-bottom 16px
                margin-bottom 16px
  .pager
    padding 20px
  .alertGroup
    .footBtns
      text-align center
    .alertReturn
      h2
        padding 0 20px
        font-size 16px
        color #9b9b9b
      .cont
        padding 20px
        li
          margin-bottom 12px
          span
            margin-right 24px
            vertical-align top
            line-height 30px
    .alertConfirm
      h3
        font-size 14px
        padding 0 20px
        font-weight 600
      .cont
        padding 20px
        margin-bottom 20px
        display flex
        li
          span
            line-height 30px
          &:first-child
            width 70px
          &:last-child
            flex 1
            .imgCont
              margin-top 12px
              .imgUpload
                display inline-block
                vertical-align top
                width 120px
                height 120px
                background #fafafa
                border-radius 4px
                text-align center
                border 1px solid #dedede
                .add
                  width 120px
                  height 120px
                  font-size 60px
                  line-height 120px
                  color #dedede
              .avatar
                width 120px
                height 120px
                margin-right 12px
</style>
