<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">资金管理</em>>提现
    </div>
    <div class="contentPay">
      <h3>本金提现</h3>
      <div class="line"></div>
      <div style="margin-top:20px">
        <span class="account">提现类型</span>
        <i style="color:#444">本金 &nbsp;&nbsp;&nbsp; {{ userMoney.availableCapitalAmount }}元</i>
      </div>
      <div style="margin-top:20px">
        <span class="account">返款方式</span>
        <i style="color:#444">转账至银行卡</i>
      </div>
      <div style="margin-top:20px">
        <span class="account">收款账户</span>
        <el-select v-model="item" placeholder="请选择" value-key="value">
          <el-option v-for="(item,index) in options" :key="index" :label="item.label+' '+item.bankCardNo+' '+item.userName" :value="item">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top:20px">
        <span class="account">提现金额</span>
        <el-input placeholder="请输入提现金额" v-model="input4">
          <!-- <template slot="append" v-show="false">.{{pointNum}}</template> -->
        </el-input>
        <span style="font-size:12px">单次提现最少500元</span>
      </div>
      <div style="margin-top:20px">
        <span class="account">提现密码</span>
        <el-input placeholder="请输入提现密码" v-model="input5" type="password">
          <!-- <template slot="append" v-show="false">.{{pointNum}}</template> -->
        </el-input>
      </div>
      <div style="margin-top:20px;font-size:12px">
        <span class="account">温馨提示：提现到账预计3-5个工作日内，周六日提现申请顺延至周一处理，周五提现申请处理时间截止到中午12:00，12:00之后提现同样顺延至周一处理。 平台完成提现操作到账时间以各大银行为准。</span>
      </div>
      <div class="number">
        <button class="buttn " style="margin-left:180px" @click="getChargeInfo">申请提现</button>
      </div>
    </div>
    <div class="contentDelit">
      <h3>提现记录
        <span class="balance">您的本金账户余额:
          <em style="color:rgba(255,51,65,1)">{{ userMoney.availableCapitalAmount }}</em>元</span>
      </h3>
      <div class="line"></div>
      <div class="actTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="payWater" align="center" label="提现流水号">
          </el-table-column>
          <el-table-column prop="creatTime" align="center" label="申请时间">
          </el-table-column>
          <el-table-column prop="remark" align="center" label="提现类型">
          </el-table-column>
          <el-table-column prop="collectionBank" align="center" label="付款账户">
          </el-table-column>
          <el-table-column prop="moneyBank" align="center" label="收款账户">
          </el-table-column>
          <el-table-column prop="payNum" align="center" label="提现金额金额">
          </el-table-column>
          <el-table-column align="center" label="提现状态">
            <template slot-scope="scope">
              <span class="tipSmall" :class="scope.row.JDStatus==='成功' ? 'tipSuccess' : scope.row.JDStatus==='失败' ? 'tipError' : scope.row.JDStatus==='进行中'?'tipDoing':'--'">{{scope.row.JDStatus}}</span>
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
    <!-- <el-dialog title="生产充值单" :visible.sync="dialogVisible" width="600px" :modal-append-to-body='false'>
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
          所属银行&nbsp;&nbsp;
          <span>{{objDate.platformCardBankCardName}}</span>
        </li>
        <li class="detali">
          提现金额金额&nbsp;&nbsp;
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
    </el-dialog> -->
  </div>
</template>
<script type="text/ecmascript-6">
import Clipboard from 'clipboard'
import { mapGetters, mapActions } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
import NoCont from '../../base/noCont/noCont'
import md5 from 'md5'
export default {
  name: 'coinPay',
  mixins: [pageCommon],
  components: {
    NoCont
  },
  data () {
    return {
      input4: '',
      input5: '',
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
      apiUrl: '/api/withdrawApply/getSellerApplysBySellerId'
    }
  },
  created () {
    this.addBank()
    if (!this.userInfo.withdrawPassword) {
      this.$confirm('您还未设置提现密码,前去设置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'userInfo' })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '注意,您还未设置提现密码,暂不能进行提现'
        })
      })
    }
  },
  mounted () {
    this.getMoney()
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
    // 获取资金
    getMoney () {
      this.$ajax.post('/api/userFund/getSellerUserFund', {
        sellerUserAccountId: this.userInfo.sellerUserId
      }).then((data) => {
        if (data.data.code === '200') {
          let res = data.data.data
          this.setUserMoney(res)
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
    doCopy () {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
      })
    },
    // 当点击申请提现,进行提现申请
    getChargeInfo () {
      if (this.item.value === '' || this.input4 === '' || this.input5 === '') {
        this.$message({
          message: '请正确填写充值信息',
          type: 'warning'
        })
        return false
      }
      if (this.input4 < 500) {
        this.$message({
          message: '单次提现应金额大于500',
          type: 'warning'
        })
        return false
      }
      if (this.input4 > this.userMoney.availableCapitalAmount) {
        this.$message({
          message: '提现金额大于已有金额,请重新输入',
          type: 'warning'
        })
        return false
      }
      // this.dialogVisible = true
      this.$ajax.post('/api/withdrawApply/createSellerApply', {
        userId: this.userInfo.sellerUserId,
        sellerBankCardId: this.item.value,
        withdrawAmount: this.input4,
        withdrawPassword: md5(this.input5),
        withdrawType: 0,
        bankCardName: this.item.label,
        bankCardNo: this.item.bankCardNo,
        bankName: this.item.userName
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: data.data.message,
            type: 'success'
          })
          this.getTask()
          this.getMoney()
          this.input4 = ''
          this.input5 = ''
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('未知错误！')
      })
    },
    // 银行卡的信息
    addBank () {
      this.$ajax.post('/api/sellerAccout/getSellerBankCardList', {
        sellerUserId: this.userInfo.sellerUserId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              label: word.bankName,
              value: word.sellerBankCardId,
              bankCardNo: word.bankCardNo,
              isDefault: word.isDefault,
              userName: word.userName
            }
            arr.push(goods)
          }
          this.options = arr
          this.item = this.options[0]
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
      for (let word of data.withdrawApplys) {
        let goods = {
          payWater: word.withdrawApplyId,
          creatTime: word.gmtCreate,
          collectionBank: word.platformBankCardName || '--',
          moneyBank: word.bankCardNo,
          payNum: word.actualAmount,
          remark: '本金提现',
          JDStatus: word.status === '0' ? '进行中' : word.status === '1' ? '成功' : '失败'
        }
        arr.push(goods)
      }
      this.tableData = arr
    },
    ...mapActions([
      'setUserMoney'
    ])
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