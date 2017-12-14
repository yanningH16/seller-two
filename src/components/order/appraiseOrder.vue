<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray" style="background: none">订单管理</em>>审核评价
    </div>
    <div class="personBank">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核评价" name="11">
          <div class="order1">
            <ul class="top">
              <li>
                <span>平台:</span>
                <el-select v-model="platform" placeholder="请选择">
                  <el-option label="全部" value="">
                  </el-option>
                  <el-option label="京东" value="0">
                  </el-option>
                  <el-option label="淘宝" value="1">
                  </el-option>
                  <el-option label="天猫" value="2">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>店铺:</span>
                <el-select v-model="shopName" placeholder="请选择">
                  <el-option label="全部" value="">
                  </el-option>
                  <el-option v-for="(item,index) in shopList" :key="index" :label="item.shopName" :value="item.shopId">
                  </el-option>
                </el-select>
              </li>
              <li class="orderLeft">
                <el-input v-model="inputKey" placeholder="请输入内容" class="input-with-select">
                  <el-select v-model="inputKeyType" slot="prepend" placeholder="请选择" style="width:120px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="任务编号" value="task"></el-option>
                    <el-option label="关键词" value="keyword"></el-option>
                  </el-select>
                </el-input>
              </li>
              <li>
                <button class="btn" @click="getTask">查询</button>
              </li>
            </ul>
            <!-- <el-button plain v-if="0" style="margin-top:20px">导出到Excel</el-button> -->
            <!-- 内容部分 -->
            <div v-for="(item,index) in toCheckList" :key="index">
              <div class="content">
                <div class="header">
                  <p style="color:#444444">
                    <i :class="{ 'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2 }" class="icon"></i>
                    {{ item.shopName }}
                  </p>
                  <p>任务编号:
                    <span>{{ item.buyerTaskId }}</span>
                  </p>
                  <p>京东订单编号:
                    <span>{{ item.realOrderId }}</span>
                  </p>
                  <p>任务类型:
                    <span>{{ item.favorTaskType==0?'默认好评' : item.favorTaskType==1?'文字好评':item.favorTaskType==2?'图文好评' : '其他'}}</span>
                  </p>
                  <p>提交时间:
                    <span>{{ item.submitTime }}</span>
                  </p>
                </div>
                <!-- 里面内容部分 -->
                <ul class="text">
                  <li>
                    <img class="float_img" :src="item.productPicUrl" alt="pic" width="60px" height="60px">
                    <div class="float">
                      <p>姓名:
                        <span>{{ item.buyerName }}</span>
                      </p>
                      <p style="margin-top:15px">京东用户名:
                        <span>{{ item.jdUserName }}</span>
                      </p>
                      <p style="margin-top:15px">手机号:
                        <span>{{ item.telephone }}</span>
                      </p>
                      <p style="margin-top:15px">子任务编号:
                        <span>{{ item.taskDayId }}</span>
                      </p>
                    </div>
                  </li>
                  <!-- 中间部分 -->
                  <li class="midd">
                    <p style="width:300px">
                      <span>{{ item.favorTaskType==0?'默认好评' : item.favorTaskType==1?'文字好评':item.favorTaskType==2?'图文好评' : '其他'}}</span>
                      <em>{{ item.sellerFavor }}</em>
                    </p>
                    <div class="midd_img" v-if="item.favorTaskType==2">
                      <img @click="lookImg(m)" v-for="(m, i) in (JSON.parse(item.sellerFavorPic) || [])" :key="i" :src="m" alt="pic">
                    </div>
                  </li>
                  <!-- 右边部分 -->
                  <li class="right">
                    <p style="float:left">
                      <em>评价截图:</em><br><img @click="lookImg(JSON.parse(item.buyerFavorPic) || '')" :src="JSON.parse(item.buyerFavorPic) || ''" alt="pic" width="60px" height="100px">
                    </p>
                    <p style="float:left;margin-left:46px">
                      <em>物流截图:</em><br><img @click="lookImg(JSON.parse(item.logisticsPicId) || '')" :src="JSON.parse(item.logisticsPicId) || ''" alt="pic" width="60px" height="100px">
                    </p>
                  </li>
                </ul>
              </div>
              <div class="work">
                <button class=" btn gray" @click="toReject(item.buyerTaskId)">驳回</button>
                <button class="btn small" @click="toConfirm(item.buyerTaskId)">返佣</button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通过的评价" name="20">
          <div class="order2">
            <ul class="top">
              <li>
                <span>平台:</span>
                <el-select v-model="platform" placeholder="请选择">
                  <el-option label="全部" value="">
                  </el-option>
                  <el-option label="京东" value="0">
                  </el-option>
                  <el-option label="淘宝" value="1">
                  </el-option>
                  <el-option label="天猫" value="2">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>店铺:</span>
                <el-select v-model="shopName" placeholder="请选择">
                  <el-option label="全部" value="">
                  </el-option>
                  <el-option v-for="(item,index) in shopList" :key="index" :label="item.shopName" :value="item.shopId">
                  </el-option>
                </el-select>
              </li>
              <li class="orderLeft">
                <el-input v-model="inputKey" placeholder="请输入内容" class="input-with-select">
                  <el-select v-model="inputKeyType" slot="prepend" placeholder="请选择" style="width:120px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="任务编号" value="task"></el-option>
                    <el-option label="关键词" value="keyword"></el-option>
                  </el-select>
                </el-input>
              </li>
              <li>
                <button class="btn" @click="getTask">查询</button>
              </li>
            </ul>
            <!-- <el-button plain style="margin-top:20px">导出到Excel</el-button> -->
            <!-- 内容部分 -->
            <div v-for="(item,index) in passList" :key="index">
              <div class="content">
                <div class="header">
                  <p style="color:#444444">
                    <i :class="{ 'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2 }" class="icon"></i>
                    {{ item.shopName }}
                  </p>
                  <p>任务编号:
                    <span>{{ item.buyerTaskId }}</span>
                  </p>
                  <p>京东订单编号:
                    <span>{{ item.realOrderId }}</span>
                  </p>
                  <p>任务类型:
                    <span>{{ item.favorTaskType == 0 ? '默认好评' : item.favorTaskType == 1 ? '五星文字好评' : item.favorTaskType == 2 ? '图文好评' : '其他' }}</span>
                  </p>
                  <p>提交时间:
                    <span>{{ item.submitTime }}</span>
                  </p>
                </div>
                <!-- 里面内容部分 -->
                <ul class="text">
                  <li>
                    <img class="float_img" :src="item.productPicUrl" alt="pic" width="60px" height="60px">
                    <div class="float">
                      <p>姓名:
                        <span>{{ item.buyerName }}</span>
                      </p>
                      <p style="margin-top:15px">京东用户名:
                        <span>{{ item.jdUserName }}</span>
                      </p>
                      <p style="margin-top:15px">手机号:
                        <span>{{ item.telephone }}</span>
                      </p>
                      <p style="margin-top:15px">子任务编号:
                        <span>{{ item.taskDayId }}</span>
                      </p>
                    </div>
                  </li>
                  <!-- 中间部分 -->
                  <li class="midd">
                    <p style="width:300px">
                      <span>{{ item.favorTaskType == 0 ? '默认好评' : item.favorTaskType == 1 ? '五星文字好评' : item.favorTaskType == 2 ? '图文好评' : '其他' }}</span>
                      <em>{{ item.sellerFavor }}</em>
                    </p>
                    <div class="midd_img" v-if="item.favorTaskType==2">
                      <img v-for="(m,i) in JSON.parse(item.sellerFavorPic) || []" :key="i" @click="lookImg(m)" :src="m" alt="pic">
                    </div>
                  </li>
                  <!-- 右边部分 -->
                  <li class="right">
                    <p style="float:left">
                      <em>评价截图:</em><br><img @click="lookImg(JSON.parse(item.buyerFavorPic) || '')" :src="JSON.parse(item.buyerFavorPic) || ''" alt="pic" width="60px" height="100px">
                    </p>
                    <p style="float:left;margin-left:46px">
                      <em>物流截图:</em><br><img @click="lookImg(JSON.parse(item.logisticsPicId) || '')" :src="JSON.parse(item.logisticsPicId) || ''" alt="pic" width="60px" height="100px">
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="驳回的评价" name="12">
          <div class="order3">
            <ul class="top">
              <li>
                <span>平台:</span>
                <el-select v-model="platform" placeholder="请选择">
                  <el-option label="全部" value="">
                  </el-option>
                  <el-option label="京东" value="0">
                  </el-option>
                  <el-option label="淘宝" value="1">
                  </el-option>
                  <el-option label="天猫" value="2">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>店铺:</span>
                <el-select v-model="shopName" placeholder="请选择">
                  <el-option label="全部" value="">
                  </el-option>
                  <el-option v-for="(item,index) in shopList" :key="index" :label="item.shopName" :value="item.shopId">
                  </el-option>
                </el-select>
              </li>
              <li class="orderLeft">
                <el-input v-model="inputKey" placeholder="请输入内容" class="input-with-select">
                  <el-select v-model="inputKeyType" slot="prepend" placeholder="请选择" style="width:120px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="任务编号" value="task"></el-option>
                    <el-option label="关键词" value="keyword"></el-option>
                  </el-select>
                </el-input>
              </li>
              <li>
                <button class="btn" @click="getTask">查询</button>
              </li>
            </ul>
            <!-- <el-button plain style="margin-top:20px">导出到Excel</el-button> -->
            <!-- 内容部分 -->
            <div v-for="(item,index) in rejectList" :key="index">
              <div class="content">
                <div class="header">
                  <p style="color:#444444">
                    <i :class="{ 'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2 }" class="icon"></i>
                    {{ item.shopName }}
                  </p>
                  <p>任务编号:
                    <span>{{ item.buyerTaskId }}</span>
                  </p>
                  <p>任务类型:
                    <span>{{ item.favorTaskType == 0 ? '默认好评' : item.favorTaskType == 1 ? '五星文字好评' : item.favorTaskType == 2 ? '图文好评' : '其他' }}</span>
                  </p>
                  <p>提交时间:
                    <span>{{ item.submitTime }}</span>
                  </p>
                </div>
                <!-- 左边内容部分 -->
                <ul class="text">
                  <li>
                    <img class="float_img" :src="item.productPicUrl" alt="pic" width="60px" height="60px">
                    <div class="float">
                      <p>
                        <span>{{ item.productName }}</span>
                      </p>
                      <p style="margin-top:15px">子任务编号:
                        <span>{{ item.taskDayId }}</span>
                      </p>
                    </div>
                  </li>
                  <!-- 中间部分 -->
                  <li class="midd">
                    <img v-for="(m,i) in JSON.parse(item.realOrderPicUrl) || []" :key="i" @click="lookImg(m)" class="midd_img" :src="m" alt="pic" width="60px" height="60px">
                    <div class="float_content">
                      <p>姓名:
                        <span>{{ item.buyerName }}</span>
                      </p>
                      <p style="margin-top:15px">京东订单编号:
                        <span>{{ item.realOrderId }}</span>
                      </p>
                      <p style="margin-top:15px">京东用户名:
                        <span>{{ item.jdUserName }}</span>
                      </p>
                      <p style="margin-top:15px">手机号:
                        <span>{{ item.telephone }}</span>
                      </p>
                    </div>
                  </li>
                  <!-- 右边部分 -->
                  <li class="right">
                    <p style="padding-bottom:20px">
                      驳回原因:
                      <el-tooltip effect="dark" popper-class="tooltipItem" :content="item.rejectReason || '暂未填写原因'" placement="top-start">
                        <span class="right_text">{{ item.rejectReason || '暂未填写原因' }}</span>
                      </el-tooltip>
                    </p>
                    <p class="right_first">
                      备注:
                      <el-tooltip popper-class="tooltipItem" effect="dark" :content="item.comment || '暂无填写备注'" placement="top-start">
                        <span class="right_text">{{ item.comment || '暂无填写备注' }}</span>
                      </el-tooltip>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div v-show="showLookImg">
        <lookImg :imgUrl="lookImgUrl" @close="showLookImg=false"></lookImg>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
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
              <el-option v-for="(item,index) in rejectReasonList" :key="index" :label="item.rejectReason" :value="item.rejectReason">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>理由备注</span>
            <el-input type="textarea" :rows="2" placeholder="请输入驳回理由备注" v-model="returnBackObj.common" style="width:320px;" resize="none">
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
        <h3 style="text-align:center;">此操作确认通过评价并返佣金给买家！</h3>
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
export default {
  name: 'appraiseOrder',
  mixins: [pageCommon],
  components: {
    LookImg
  },
  data () {
    return {
      activeName: '11',
      platform: '',
      shopName: '',
      shopList: [],
      inputKey: '',
      inputKeyType: '',
      apiUrl: '/api/seller/order/getFavorOrderListByStatus',
      toCheckList: [],
      rejectList: [],
      rejectReasonList: [],
      passList: [],
      showLookImg: false,
      // 驳回弹窗
      showReturn: false,
      returnBackObj: {
        reason: '',
        common: ''
      },
      showConfirm: false,
      lookImgUrl: ''
    }
  },
  computed: {
    params () {
      return {
        sellerUserId: this.userInfo.sellerUserId,
        shopType: this.platform,
        shopId: this.shopName,
        keyword: this.inputKey,
        keywordType: this.inputKeyType,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        status: this.activeName
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
      this.getTask()
    },
    lookImg (url) {
      this.showLookImg = true
      this.lookImgUrl = url
    },
    // 点击驳回按钮触发
    toReject (buyerTaskId) {
      sessionStorage.setItem('__buyerTaskId__', buyerTaskId)
      this.showReturn = true
      this.$ajax.post('/api/config/rejectReason/getReasonList', {
        rejectType: 1 // type : 0 下单  1 评价
      }).then((data) => {
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
    sureToReject () {
      this.$ajax.post('/api/seller/order/rejectFavorOrder', {
        buyerTaskId: sessionStorage.getItem('__buyerTaskId__') || '',
        rejectReason: this.returnBackObj.reason || '',
        comment: this.returnBackObj.common || ''
      }).then((data) => {
        if (data.data.code === '200') {
          this.showReturn = false
          this.$message({
            type: 'success',
            message: '驳回成功!'
          })
          this.returnBackObj = {
            reason: '',
            common: ''
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
    toConfirm (buyerTaskId) {
      this.showConfirm = true
      sessionStorage.setItem('__buyerTaskId__', buyerTaskId)
    },
    // 确认好评
    sureToConfirm () {
      let buyerTaskId = sessionStorage.getItem('__buyerTaskId__') || ''
      this.$ajax.post('/api/seller/order/passFavorOrder', {
        buyerTaskId: buyerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.showConfirm = false
          this.$message({
            type: 'success',
            message: '确认评价成功!'
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
    setList (data) {
      if (this.activeName === '11') {
        this.toCheckList = data
      } else if (this.activeName === '12') {
        this.rejectList = data
      } else if (this.activeName === '20') {
        this.passList = data
      }
    }
  },
  mounted () {
    this.getShopList()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 0 20px 0 20px
  min-width 1200px
  .icon
    display inline-block
    width 16px
    height 16px
    margin-right 16px
    vertical-align middle
  .gray
    cursor pointer
    color #9b9b9b
    background #ededed
    width 60px
    height 22px
    line-height 22px
  .shop
    background #fff
    height 36px
    line-height 36px
    padding-left 20px
    font-size 14px
    color rgba(60, 60, 60, 1)
    .gray
      color rgba(137, 137, 137, 1)
  .personBank
    background #fff
    margin-top 24px
    padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    .order1
      .top
        margin-top 30px
        margin-bottom 30px
        display flex
        min-width 1300px
        li
          margin-right 20px
      .content
        padding-bottom 20px
        border 1px solid rgba(198, 223, 243, 0.6)
        margin-top 12px
        .header
          display flex
          justify-content space-around
          font-size 12px
          padding 10px 0
          background rgba(198, 223, 243, 0.3)
          min-width 1000px
          p span
            color #444444
        .text
          display flex
          justify-content space-between
          overflow hidden
          color #444444
          min-width 1000px
          li
            margin-top 41px
            margin-left 22px
            .float_img
              float left
              margin-right 10px
            .float
              font-size 14px
              float left
              color rgba(68, 68, 68, 1)
            .midd_img img
              width 64px
              height 64px
              margin-right 16px
              margin-top 21px
          .right
            padding-right 82px
            margin-top 10px
          .midd
            margin-top 30px
            border-left 1px solid #dedede
            border-right 1px solid #dedede
            padding-left 50px
            padding-right 60px
            p span
              border-right 1px solid #dedede
              padding-right 12px
            p em
              margin-left 12px
              display inline-block
              max-width 210px
              vertical-align top
      .work
        margin-top 16px
        float right
    .order2
      .top
        margin-top 30px
        margin-bottom 30px
        display flex
        min-width 1300px
        li
          margin-right 20px
      .content
        padding-bottom 20px
        border 1px solid rgba(198, 223, 243, 0.6)
        margin-top 12px
        .header
          display flex
          justify-content space-around
          font-size 12px
          padding 10px 0
          background rgba(198, 223, 243, 0.3)
          min-width 1000px
          p span
            color #444444
        .text
          display flex
          justify-content space-between
          overflow hidden
          color #444444
          min-width 1000px
          li
            margin-top 41px
            margin-left 22px
            .float_img
              float left
              margin-right 10px
            .float
              font-size 14px
              float left
              color rgba(68, 68, 68, 1)
            .midd_img img
              width 64px
              height 64px
              margin-right 16px
              margin-top 21px
          .right
            margin-right 82px
            margin-top 10px
          .midd
            margin-top 30px
            border-left 1px solid #dedede
            border-right 1px solid #dedede
            padding-left 40px
            padding-right 50px
            p span
              border-right 1px solid #dedede
              padding-right 12px
            p em
              margin-left 12px
              display inline-block
              max-width 210px
              vertical-align top
    .order3
      .top
        margin-top 30px
        margin-bottom 30px
        display flex
        min-width 1300px
        li
          margin-right 20px
      .content
        padding-bottom 20px
        border 1px solid rgba(198, 223, 243, 0.6)
        margin-top 12px
        .header
          display flex
          justify-content space-around
          font-size 12px
          padding 10px 0
          background rgba(198, 223, 243, 0.3)
          min-width 1000px
          p span
            color #444444
        .text
          display flex
          justify-content space-between
          overflow hidden
          color #444444
          min-width 1000px
          li
            margin-top 41px
            margin-left 22px
            .float_img
              float left
              margin-right 10px
            .float
              font-size 14px
              float left
              color rgba(68, 68, 68, 1)
            .midd_img
              width 60px
              height 107px
              float left
              margin-right 10px
            .float_content
              font-size 14px
              float left
              color rgba(68, 68, 68, 1)
          .right
            margin-right 80px
            .right_first
              border-top 1px solid #dedede
              padding-top 20px
            .right_text
              width 100px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              display inline-block
              vertical-align middle
          .midd
            margin-top 30px
            border-left 1px solid #dedede
            border-right 1px solid #dedede
            padding-left 60px
            padding-right 70px
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
      .footBtns
        margin-top 60px
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