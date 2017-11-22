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
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span class="bank">点击绑定银行卡</span>
      </div>
      <div style="margin-top:20px">
        <span class="account">充值金额</span>
        <el-input placeholder="请输入内容" v-model="input4">
          <template slot="append">.99</template>
        </el-input>
        <span style="font-size:12px">为快速到账,请按此金额付款,包括小数点后两位</span>
      </div>
      <div class="number">
        <button class="buttn buttn_small" @click="dialogVisible = true">生产充值单</button>
      </div>
    </div>
    <div class="contentDelit">
      <h3>待处理充值
        <span class="balance">您的押金账户余额:
          <em style="color:rgba(255,51,65,1)">39</em>元</span>
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
              <span class="tipSmall" :class="scope.row.JDStatus==='已完成' ? 'tipSuccess' : scope.row.JDStatus==='失败' ? 'tipError' : scope.row.JDStatus==='待审核'?'tipWait':'--'">{{scope.row.JDStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toview= true">查看充值账单</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹框部分 -->
    <el-dialog title="生产充值单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :modal-append-to-body='false'>
      <p style="font-size:16px;color:#333">请使用尾号
        <span style="color:#ff0020">0212</span>的
        <span style="color:#ff0020">招商银行</span>网银账户向以下银行账户转账,
        <span style="color:#ff0020">禁止使用支付宝!</span>请在24小时内付款,否则系统将自动取消充值单</p>
      <p style="font-size:16px;color:#ff8a22">财务审核时间为9:00-20:00</p>
      <ul>
        <li class="detali">
          收款账户名&nbsp;&nbsp;
          <span>黄军</span>
        </li>
        <li class="detali">
          银行卡号&nbsp;&nbsp;
          <span>1533565665856</span>
        </li>
        <li class="detali">
          收款账户详情&nbsp;&nbsp;
          <span>招商银行某某支行</span>
        </li>
        <li class="detali">
          收款金额&nbsp;&nbsp;
          <span>1000.97</span>
          <p style="margin-left:70px">为了汇款安全快速到账,请按添加小数点后金额汇款.如果金额不匹配会造成汇款到账延迟</p>
        </li>
        <li class="detali">
          备注/附言/摘要&nbsp;&nbsp;
          <span>k6129</span>
          <p style="margin-left:100px">请在备注/附言/摘要中严格要求填写<br>不要填写除此以外的其他字符(刷单,SD等),否则不能正确到账</p>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">确认转账</el-button>
        <el-button @click="dialogVisible = false">先不转</el-button>
      </span>
    </el-dialog>
    <!-- 充值单详情的弹窗 -->
    <el-dialog title="充值单详情" :visible.sync="toview" width="30%" :before-close="handleClose" :modal-append-to-body='false'>
      <div class="line"></div>
      <ul class="payPar">
        <li>
          充值账户名&nbsp;&nbsp;
          <span>黄军2</span>
        </li>
        <li>
          充值账户&nbsp;&nbsp;
          <span>5465464646546546</span>
        </li>
        <li>
          充值账户详情&nbsp;&nbsp;
          <span>某某银行某某支行</span>
        </li>
        <li class="lines"></li>
        <li>
          收款账户名
          <span>黄军</span>
        </li>
        <li>
          银行卡号&nbsp;&nbsp;
          <span>1533565665856</span>
        </li>
        <li>
          收款账户详情&nbsp;&nbsp;
          <span>招商银行某某支行</span>
        </li>
        <li>
          收款金额&nbsp;&nbsp;
          <span style="color:#FF2933">1000.97</span>
          <p style="margin-left:70px">为了汇款安全快速到账,请按添加小数点后金额汇款.如果金额不匹配会造成汇款到账延迟</p>
        </li>
        <li>
          备注/附言/摘要&nbsp;&nbsp;
          <span>k6129</span>
          <p style="margin-left:100px">请在备注/附言/摘要中严格要求填写<br>不要填写除此以外的其他字符(刷单,SD等),否则不能正确到账</p>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'coinPay',
  data () {
    return {
      input4: '',
      currentPage: 1,
      dialogVisible: false,
      toview: false,
      tableData: [{
        payWater: '55616156156156156',
        payNum: '100.00',
        remark: '备注一下',
        collectionBank: '545565695685856',
        moneyBank: '186669985665687',
        JDStatus: '已完成',
        creatTime: '2017-11-15 20:30:30'
      }],
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
    // handleClick (val) {
    //   console.log(val)
    // },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
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