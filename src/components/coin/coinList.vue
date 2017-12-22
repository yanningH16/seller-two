<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">资金管理</em>>银行卡管理
    </div>
    <div class="personBank">
      <h3>银行卡管理</h3>
      <p class="affirms">该绑定的银行卡将用于提现,请认真核实好银行卡信息,确保信息准确无误</p>
      <ul class="addBank">
        <li class="pic" :style="{background:'url('+item.bankBg+')'}" v-for="(item,index) in bankCardList" :key="index">
          <p class="acquiescence">{{item.isDefault}}</p>
          <p class="name">{{item.userName}}</p>
          <p class="number">{{item.bankCardNo|bankCard}}</p>
          <p class="work" @click="bianji(index)">编辑</p>
        </li>
        <li class="add" @click="addBank">
          <span>+</span>
          <p>添加一张银行卡</p>
        </li>
      </ul>
    </div>
    <!-- 添加银行卡的弹框 -->
    <div class="bank">
      <el-dialog title="添加银行卡" :visible.sync="addbank" :modal-append-to-body='false' width="40%">
        <el-form>
          <el-form-item label="银行">
            <el-select v-model="item" placeholder="请选择" value-key='id'>
              <el-option v-for="(item,index) in bankNameList" :label="item.bankName" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="personname"></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="Card"></el-input>
          </el-form-item>
        </el-form>
        <el-checkbox v-model="checked" style="margin-left:40px">设为默认银行卡</el-checkbox>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addbank = false">取 消</el-button>
          <el-button type="danger" @click="addSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 点击编辑出现的框 -->
    <div class="bank">
      <el-dialog title="查看银行卡" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="40%">
        <el-form>
          <el-form-item label="银行">
            <el-input v-model="this.bankInfo.bankName" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="this.bankInfo.userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="this.bankInfo.bankCardNo" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-checkbox v-model="checked" style="margin-left:40px">设为默认银行卡</el-checkbox>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="change">确认</el-button>
          <el-button @click="bankDele()">删除银行卡</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Zhongguo from './image/zhongguo.png'
import Jianshe from './image/jianshe.png'
import Bohai from './image/bohai.png'
import Gongshang from './image/gongshang.png'
import Guangfa from './image/guangfa.png'
import Hengfeng from './image/hengfeng.png'
import Huaxia from './image/huaxia.png'
import Jiaotong from './image/jiaotong.png'
import Mingsheng from './image/minsheng.png'
import Nongye from './image/nongye.png'
import Shanghai from './image/shanghaipufa.png'
import Shenzhen from './image/shenzhenfazhan.png'
import Xingye from './image/xingye.png'
import Zhaoshang from './image/zhaoshang.png'
import Zheshang from './image/zheshang.png'
import Guangda from './image/zhongguoguangda.png'
import Zhongxin from './image/zhongxin.png'
export default {
  name: 'coinList',
  data () {
    return {
      checked: true,
      dialogFormVisible: false,
      addbank: false,
      bankNameList: [],
      bankCardList: [],
      personname: '',
      Card: '',
      item: '',
      bankInfo: {},
      bankImg: [{ name: '中国银行', bgUrl: Zhongguo },
      { name: '中国建设银行', bgUrl: Jianshe }, { name: '渤海银行', bgUrl: Bohai },
      { name: '中国工商银行', bgUrl: Gongshang }, { name: '广发银行', bgUrl: Guangfa }, { name: '恒丰银行', bgUrl: Hengfeng },
      { name: '华夏银行', bgUrl: Huaxia },
      { name: '交通银行', bgUrl: Jiaotong }, { name: '中国民生银行', bgUrl: Mingsheng }, { name: '中国农业银行', bgUrl: Nongye },
      { name: '上海浦东发展银行', bgUrl: Shanghai }, { name: '深圳发展银行', bgUrl: Shenzhen }, { name: '兴业银行', bgUrl: Xingye },
      { name: '招商银行', bgUrl: Zhaoshang }, { name: '浙商银行', bgUrl: Zheshang }, { name: '中国光大银行', bgUrl: Guangda },
      { name: '中信银行', bgUrl: Zhongxin }]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.bankCard()
  },
  methods: {
    // 添加银行卡的时候获取银行卡列表
    addBank () {
      this.addbank = true
      this.item = ''
      this.personname = ''
      this.Card = ''
      this.$ajax.post('/api/config/bankCard/getBankInfoList', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              bankName: word.bankName,
              id: word.id
            }
            arr.push(goods)
          }
          this.bankNameList = arr
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
    addSure () {
      this.$ajax.post('/api/sellerAccout/addSellerBankCard', {
        sellerUserId: this.userInfo.sellerUserId,
        bankName: this.item.bankName,
        bankNameId: this.item.id,
        userName: this.personname,
        bankCardNo: this.Card,
        isDefault: this.checked === true ? '1' : '0'
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '银行卡添加成功',
            type: 'success'
          })
          this.bankCard()
          this.addbank = false
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
    // 获取银行卡列表
    bankCard () {
      this.$ajax.post('/api/sellerAccout/getSellerBankCardList', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              bankCardNo: word.bankCardNo,
              bankName: word.bankName,
              isDefault: word.isDefault === '1' ? '默认银行卡' : '',
              userName: word.userName,
              sellerBankCardId: word.sellerBankCardId
            }
            for (let i of this.bankImg) {
              if (i.name === word.bankName) {
                goods.bankBg = i.bgUrl
              }
            }
            arr.push(goods)
          }
          this.bankCardList = arr
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
    // 获取银行卡信息
    bianji (index) {
      let that = this
      let BankCrarId = this.bankCardList[index].sellerBankCardId
      this.dialogFormVisible = true
      this.$ajax.post('/api/sellerAccout/getBankCardInfo', {
        sellerBankCardId: BankCrarId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          let obj = {
            bankName: res.data.bankName,
            userName: res.data.userName,
            bankCardNo: res.data.bankCardNo,
            sellerBankCardId: res.data.sellerBankCardId,
            isDefault: res.data.isDefault === '1' ? (that.checked = true) : (that.checked = false)
          }
          this.bankInfo = obj
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
    bankDele () {
      let cardId = this.bankInfo.sellerBankCardId
      this.$ajax.post('/api/sellerAccout/deleteBankCard', {
        sellerBankCardId: cardId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '银行卡删除成功',
            type: 'success'
          })
          this.bankCard()
          this.dialogFormVisible = false
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
    change () {
      let cardId = this.bankInfo.sellerBankCardId
      this.$ajax.post('/api/sellerAccout/changeBankCard', {
        sellerBankCardId: cardId,
        bankName: this.bankInfo.bankName,
        userName: this.bankInfo.userName,
        bankCardNo: this.bankInfo.bankCardNo,
        isDefault: this.checked === true ? '1' : '0',
        sellerUserId: this.userInfo.sellerUserId,
        bankNameId: '1'
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '银行卡信息成功',
            type: 'success'
          })
          this.bankCard()
          this.dialogFormVisible = false
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
  .personBank
    background #fff
    margin-top 24px
    padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    padding-bottom 300px
    h3
      padding-top 40px
      font-size 16px
      color rgba(68, 68, 68, 1)
      border-bottom 1px solid #e5e5e5
      padding-bottom 12px
    .affirms
      font-size 12px
      color #ff2933
      float right
      margin-top -20px
    .addBank
      width 710px
      // border 1px solid red
      margin-left 25%
      margin-top 94px
      .add
        width 342px
        height 206px
        background #fafafa
        cursor pointer
        span
          width 80px
          height 80px
          border 1px dashed #ddeedd
          display inline-block
          text-align center
          line-height 80px
          margin-left 35%
          margin-top 15%
          font-size 30px
        p
          margin-left 32%
          margin-top 10px
      .pic
        width 342px
        height 206px
      li
        float left
        margin-left 10px
        margin-top 10px
        position relative
        .acquiescence
          position relative
          top 60px
          left 100px
          color #ffffff
          font-size 12px
          font-weight 100
          color white
        .name
          position absolute
          top 43px
          right 24px
          font-size 16px
          color white
        .number
          position absolute
          top 96px
          right 24px
          font-size 24px
          color white
        .work
          position absolute
          width 60px
          height 30px
          border 1px solid #ffffff
          border-radius 4px
          line-height 30px
          text-align center
          bottom 16px
          right 20px
          color white
          cursor pointer
</style>