<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">资金管理</em>>充值
    </div>
    <div class="contentPay">
      <h3>充值押金</h3>
      <div class="line"></div>
      <div style="margin-top:20px">
        <span class="account">付款账户</span>
        <el-select v-model="item" placeholder="请选择" value-key="value">
          <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item">
          </el-option>
        </el-select>
        <router-link :to="{name:'coinList'}">
          <span class="bank">点击绑定银行卡</span>
        </router-link>
      </div>
      <div style="margin-top:20px">
        <span class="account">充值金额</span>
        <el-input placeholder="请输入内容" v-model="input4">
          <template slot="append">.{{pointNum}}</template>
        </el-input>
        <span style="font-size:12px">为快速到账,请按此金额付款,包括小数点后两位</span>
      </div>
      <div class="number">
        <button class="buttn buttn_small" @click="getChargeInfo">生产充值单</button>
      </div>
    </div>
    <div class="contentDelit">
      <h3>待处理充值
        <span class="balance">您的押金账户余额:
          <em style="color:rgba(255,51,65,1)">{{this.userMoney.availableCapitalAmount}}</em>元</span>
      </h3>
      <div class="line"></div>
      <div class="actTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="payWater" align="center" label="充值单号">
          </el-table-column>
          <el-table-column prop="creatTime" align="center" label="提交时间">
          </el-table-column>
          <el-table-column prop="collectionBank" align="center" label="付款账户">
          </el-table-column>
          <el-table-column prop="moneyBank" align="center" label="收款账户">
          </el-table-column>
          <el-table-column prop="payNum" align="center" label="充值金额">
          </el-table-column>
          <el-table-column prop="remark" align="center" label="备注">
          </el-table-column>
          <el-table-column align="center" label="提现状态">
            <template slot-scope="scope">
              <span class="tipSmall" :class="scope.row.JDStatus==='成功' ? 'tipSuccess' : scope.row.JDStatus==='失败' ? 'tipError' : scope.row.JDStatus==='进行中'?'tipDoing':'--'">{{scope.row.JDStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看充值账单</el-button>
            </template>
          </el-table-column>
        </el-table>
        <noCont v-if="tableData.length===0"></noCont>
        <div class="pager" v-if="tableData.length!==0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹框部分 -->
    <el-dialog title="生产充值单" :visible.sync="dialogVisible" width="600px" :modal-append-to-body='false'>
      <p style="font-size:16px;color:#333">请使用尾号
        <span style="color:#ff0020">{{objDate.sellerBankCardNo |bankCard}}</span>的
        <span style="color:#ff0020">{{objDate.sellerBankName }}
        </span>网银账户向以下银行账户转账,
        <span style="color:#ff0020">禁止使用支付宝!</span>请在24小时内付款,否则系统将自动取消充值单</p>
      <p style="font-size:16px;color:#ff8a22">财务审核时间为9:00-20:00</p>
      <ul>
        <li class="detali">
          收款账户名&nbsp;&nbsp;
          <span>{{objDate.platformCardUserName}}</span>
        </li>
        <li class="detali">
          银行卡号&nbsp;&nbsp;
          <span>{{objDate.platformCardNo}}</span>
          <span class="blue copy" :data-clipboard-text='objDate.platformCardNo' @click="doCopy">复制</span>
        </li>
        <li class="detali">
          收款账户详情&nbsp;&nbsp;
          <span>{{objDate.platformCardBankCardName}}</span>
        </li>
        <li class="detali">
          收款金额&nbsp;&nbsp;
          <span>{{objDate.chargeAmount}}</span>
          <p style="margin-left:70px">为了汇款安全快速到账,请按添加小数点后金额汇款.如果金额不匹配会造成汇款到账延迟</p>
        </li>
        <li class="detali">
          备注/附言/摘要&nbsp;&nbsp;
          <span>{{objDate.memo}}</span>
          <span class="blue copy" :data-clipboard-text='objDate.memo' @click="doCopy">复制</span>
          <p style="margin-left:100px">请在备注/附言/摘要中严格要求填写<br>不要填写除此以外的其他字符(刷单,SD等),否则不能正确到账</p>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="transferMoney">确认转账</el-button>
        <el-button @click="dialogVisible = false">先不转</el-button>
      </span>
    </el-dialog>
    <!-- 充值单详情的弹窗 -->
    <el-dialog title="充值单详情" :visible.sync="toview" width="600px" :modal-append-to-body='false'>
      <div class="line"></div>
      <ul class="payPar">
        <li>
          充值账户名&nbsp;&nbsp;
          <span>{{lookData.sellerBankCardUserName}}</span>
        </li>
        <li>
          充值账户&nbsp;&nbsp;
          <span>{{lookData.sellerBankCardNo}}</span>
          <span class="blue copy" :data-clipboard-text='lookData.sellerBankCardNo' @click="doCopy">复制</span>
        </li>
        <li>
          充值账户详情&nbsp;&nbsp;
          <span>{{lookData.sellerBankCardName}}</span>
        </li>
        <li class="lines"></li>
        <li>
          收款账户名
          <span>{{lookData.platformBankCardUserName}}</span>
        </li>
        <li>
          银行卡号&nbsp;&nbsp;
          <span>{{lookData.platformBankCardNo}}</span>
          <span class="blue copy" :data-clipboard-text='lookData.platformBankCardNo' @click="doCopy">复制</span>
        </li>
        <li>
          收款账户详情&nbsp;&nbsp;
          <span>{{lookData.platformBankCardName}}</span>
        </li>
        <li>
          收款金额&nbsp;&nbsp;
          <span style="color:#FF2933">{{lookData.chargeAmount}}</span>
          <p style="margin-left:70px">为了汇款安全快速到账,请按添加小数点后金额汇款.如果金额不匹配会造成汇款到账延迟</p>
        </li>
        <li>
          备注/附言/摘要&nbsp;&nbsp;
          <span>{{lookData.memo}}</span>
          <span class="blue copy" :data-clipboard-text='lookData.memo' @click="doCopy">复制</span>
          <p style="margin-left:100px">请在备注/附言/摘要中严格要求填写<br>不要填写除此以外的其他字符(刷单,SD等),否则不能正确到账</p>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
import NoCont from '../../base/noCont/noCont'
export default {
  name: 'coinPay',
  mixins: [pageCommon],
  components: {
    NoCont
  },
  data () {
    return {
      input4: '',
      currentPage: 1,
      pageSize: 5,
      dialogVisible: false,
      toview: false,
      pointNum: 0,
      objDate: {},
      lookData: {},
      // 平台端银行卡名字
      platformCardBankCardName: '',
      // 备注
      memo: '',
      // 运营人员的卡号
      platformCardNo: '',
      // 商家的银行卡卡号
      sellerBankCardNo: '',
      platformCardUserName: '',
      sellerBankCardUserName: '',
      tableData: [],
      options: [],
      item: '',
      apiUrl: '/api/sellerorder/getChargeApplysBySellerUserId'
    }
  },
  created () {
    this.addBank()
    this.pointNum = Math.round(Math.random() * 99)
  },
  computed: {
    params () {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sellerUserId: this.userInfo.sellerUserId
      }
    },
    ...mapGetters([
      'userInfo',
      'userMoney'
    ])
  },
  methods: {
    doCopy () {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
      })
    },
    // 当点击生成充值单 获取到充值单的信息
    getChargeInfo () {
      if (this.item.value === '' || this.input4 === '') {
        this.$message({
          message: '请正确填写充值信息',
          type: 'warning'
        })
        return false
      }
      this.dialogVisible = true
      this.$ajax.post('/api/sellerAccout/getChargeInfo', {
        sellerUserId: this.userInfo.sellerUserId,
        sellerBankCardId: this.item.value,
        chargeAmount: this.input4 + '.' + this.pointNum
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let goods = {
            chargeAmount: res.data.chargeAmount,
            memo: res.data.memo,
            platformCardBankCardName: res.data.platformCardBankCardName,
            platformCardBankName: res.data.platformCardBankName,
            platformCardNo: res.data.platformCardNo,
            platformCardUserName: res.data.platformCardUserName,
            sellerBankCardNo: res.data.sellerBankCardNo,
            sellerBankName: res.data.sellerBankName,
            sellerBankCardUserName: res.data.sellerBankCardUserName
          }
          this.objDate = goods
          this.platformCardBankCardName = goods.platformCardBankCardName
          this.memo = goods.memo
          this.platformCardNo = goods.platformCardNo
          this.sellerBankCardNo = goods.sellerBankCardNo
          this.platformCardUserName = goods.platformCardUserName
          this.sellerBankCardUserName = goods.sellerBankCardUserName
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
    // 当点击生确认转账的时候触发的事件
    transferMoney () {
      this.$ajax.post('/api/sellerorder/createApply', {
        sellerUserId: this.userInfo.sellerUserId,
        sellerBankCardId: this.item.value,
        chargeAmount: this.input4 + '.' + this.pointNum,
        sellerBankCardName: this.item.label,
        platformBankCardId: this.userInfo.platformChargeBankCardId,
        platformBankCardName: this.platformCardBankCardName,
        memo: this.memo,
        sellerTelephone: this.userInfo.telephone,
        sellerUserName: '',
        sellerBankCardNo: this.sellerBankCardNo,
        platformBankCardNo: this.platformCardNo,
        sellerBankCardUserName: this.sellerBankCardUserName,
        platformBankCardUserName: this.platformCardUserName
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '充值成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.getTask(1, this.pageSize)
        } else {
          this.$message({
            message: data.data.message,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('未知错误！')
      })
    },
    addBank () {
      this.$ajax.post('/api/sellerAccout/getSellerBankCardList', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              label: word.bankName,
              value: word.sellerBankCardId
            }
            arr.push(goods)
          }
          this.options = arr
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
    // 待处理充值的列表
    setList (data) {
      let arr = []
      for (let word of data.chargeApplys) {
        let goods = {
          payWater: word.chargeApplyId,
          creatTime: word.gmtCreate,
          collectionBank: word.sellerBankCardNo,
          moneyBank: word.platformBankCardNo,
          payNum: word.chargeAmount,
          remark: word.memo,
          JDStatus: word.status === '0' ? '进行中' : word.status === '1' ? '成功' : '失败',
          chargeApplyId: word.chargeApplyId
        }
        arr.push(goods)
      }
      this.tableData = arr
    },
    // 点点击查看充值单触发的信息
    handleClick (index, data) {
      console.log(index, data)
      this.toview = true
      this.$ajax.post('/api/sellerorder/getChargeApplyByApplyId', {
        chargeApplyId: this.tableData[index].chargeApplyId
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let goods = {
            sellerUserName: res.data.sellerUserName || '暂无数据',
            sellerBankCardNo: res.data.sellerBankCardNo,
            sellerBankCardName: res.data.sellerBankCardName,
            // 收款账户名
            // 银行卡号
            platformBankCardNo: res.data.platformBankCardNo,
            platformBankCardName: res.data.platformBankCardName,
            chargeAmount: res.data.chargeAmount,
            memo: res.data.memo,
            platformBankCardUserName: res.data.platformBankCardUserName,
            sellerBankCardUserName: res.data.sellerBankCardUserName
          }
          this.lookData = goods
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
  .blue
    width 34px
    height 18px
    border 1px solid #179fff
    color #179fff !important
    padding 5px
    border-radius 4px
    margin-left 10px
    cursor pointer
  .shop
    background #fff
    height 36px
    line-height 36px
    padding-left 20px
    font-size 14px
    color rgba(60, 60, 60, 1)
    .gray
      color rgba(137, 137, 137, 1)
  .contentPay, .contentDelit
    background #fff
    margin-top 24px
    padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    .account
      margin-right 40px
    .bank
      color rgba(23, 159, 255, 1)
      margin-left 24px
    .number
      margin-top 40px
    h3
      padding-top 40px
      font-size 16px
      color rgba(68, 68, 68, 1)
    .line
      height 1px
      background rgba(229, 229, 229, 1)
      margin-top 16px
      // 第二部分的内容
    .balance
      float right
      color rgba(155, 155, 155, 1)
      margin-right 26px
    .actTab .pager
      float right
  .detali
    font-size 14px
    color rgba(155, 155, 155, 1)
    margin-top 30px
    span
      color rgba(68, 68, 68, 1)
  .line
    height 1px
    background #dedede
    margin-top -30px
  .payPar
    font-size 14px
    color rgba(155, 155, 155, 1)
    li
      margin-top 20px
    span
      color #444444
      font-weight 600
</style>