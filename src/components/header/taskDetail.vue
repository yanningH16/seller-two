<template>
  <div class="taskDetail">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'overView' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'task' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>垫付任务详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top">
      <div class="top-left">
        <div class="title">
          <span>{{ taskInfoObj.shopType == 0 ? '京东' : taskInfoObj.shopType == 1 ? '淘宝' : '天猫' }} | {{ taskInfoObj.shopName }} | {{ taskInfoObj.taskTypeDetail }}</span>
        </div>
        <div class="top-left-cont">
          <h3>任务编号：{{ taskInfoObj.sellerTaskId }}</h3>
          <ul class="detail">
            <li>
              <p>付款价格：
                <span class="red">{{ taskInfoObj.payment }}</span>
              </p>
              <p>任务数量：
                <span class="red">{{ taskInfoObj.throwNum }}</span>
              </p>
            </li>
            <li>
              <p>待确认好评：
                <span class="red">{{ taskInfoObj.toConfirmOrderNum }}</span>
              </p>
              <p>待确认评价截图：
                <span class="red">{{ taskInfoObj.toConfirmFavorNum }}</span>
              </p>
            </li>
            <li>
              <p>已完成订单：
                <span class="red">{{ taskInfoObj.confirmedFavorNum }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==1 || taskInfoObj.status==2">
        <h2>任务已选取店铺及任务类型</h2>
        <p>任务已选取店铺及任务类型<br /> 您需完善商品信息设置：
          <span class="blue" @click="toDo('finsh')">去完善</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==3">
        <h2>任务信息已设置,待支付订单</h2>
        <p>任务信息已设置,待支付订单<br /> 您需支付该任务：
          <span class="blue" @click="toDo('pay')">去支付</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==4">
        <h2>任务已提交，等待客服审核</h2>
        <p>您的任务已提交，客服审核通过之后即可上线<br />
          <span class="red">16:00</span>点之前提交的任务当日审核上线；<br/>
          <span class="red">16:00</span>点之后提交的任务次日
          <span class="red">6:00</span>统一上线<br/> 审核之前您还可以：
          <span class="blue" @click="toDo('cancel')">撤销任务</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==5">
        <h2>任务已通过</h2>
        <p>任务已通过<br/> 您还可以：
          <span class="blue" @click="toDo('cancel')">撤销任务</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==6">
        <h2>任务未通过审核</h2>
        <p>任务未通过审核<br/> 您可以：
          <span class="blue" @click="toDo('return')">去修改</span><br />
          <span class="blue" @click="toDo('cancel')">撤销任务</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==7">
        <h2>任务已被撤销</h2>
        <p>任务已被撤销<br/> 您可以：
          <span class="blue" @click="toDo('new')">去发布新任务</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==8">
        <h2>任务进行中</h2>
        <p>任务进行中<br/> 您还可以：
          <span class="blue" @click="toDo('cancel')">撤销任务</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==9">
        <h2>任务已被终止</h2>
        <p>任务已被终止<br/> 您可以：
          <span class="blue" @click="toDo('new')">去发布新任务</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==20">
        <h2>任务已完成</h2>
        <p>任务已完成<br/> 您可以：
          <span class="blue" @click="toDo('new')">去发布新任务</span>
        </p>
      </div>
      <div class="top-right" v-if="taskInfoObj.status==21">
        <h2>任务已结束</h2>
        <p>任务已结束<br/> 您可以：
          <span class="blue" @click="toDo('new')">去发布新任务</span>
        </p>
      </div>
    </div>
    <div class="cont">
      <div class="step">
        <h2>1.商品信息</h2>
        <div class="step1">
          <img :src="goodsInfoObj.productPicUrl" alt="商品展示图">
          <div>
            <p>
              <span>商品名称：{{ goodsInfoObj.productName }}</span>
              所在分类：{{ goodsInfoObj.productClassFirstDetail }}
            </p>
            <p>商品链接：
              <a class="blue link" target="_blank" :href="goodsInfoObj.productUrl">{{ goodsInfoObj.productUrl }}</a>
              <!-- <span class="blue link"></span> -->
            </p>
            <p>
              <span>试客件数 / 人：{{ goodsInfoObj.numPerOrder }}件</span>
              商品单价：{{ goodsInfoObj.productShowPrice }}元（
              <i v-if="goodsInfoObj.isPostFree==0">不</i>包邮）
            </p>
            <p>小计：{{ goodsInfoObj.productShowPrice * goodsInfoObj.numPerOrder}}元</p>
          </div>
        </div>
      </div>
      <div class="step">
        <h2>2.如何找到商品</h2>
        <ul class="step2">
          <li v-for="(item,index) in searchListArr" :key="index">
            <h3>搜索关键词{{ index+1 }}：{{ item.keyword }}</h3>
            <p>
              <span class="gray">排序方式：</span>
              {{ item.sortClass || '其他' }}
            </p>
            <p>
              <span class="gray">价格区间：</span>
              {{ item.priceLow }}-{{ item.priceHigh }}元
            </p>
            <p>
              <span class="gray">品牌：</span>
              {{ item.brand }}
            </p>
            <p>
              <span class="gray">发货地：</span>
              {{ item.postLocation }}
            </p>
            <p>
              <span class="gray">评价数（约）：</span>
              {{ item.favorNum }}
            </p>
            <p>
              <span class="gray">预计翻页数：</span>
              {{ item.pageNum }}
            </p>
          </li>
        </ul>
      </div>
      <div class="step">
        <h2>3.任务分数发放计划</h2>
        <div class="planList charts" :style="{width:'100%',height:'500px'}" ref="charts">
          <div id="myChart" ref="myChart"></div>
        </div>
      </div>
      <div class="step">
        <h2>4.费用合计</h2>
        <div class="step4">
          <table class="table">
            <tr>
              <th>分类</th>
              <th>费用明细</th>
              <th>小计</th>
              <th>合计</th>
            </tr>
            <tr>
              <td>
                <span>本金冻结</span>
              </td>
              <td>
                <div>
                  <p>商品: {{ totalPriceObj.productUnitPrice }}元*{{ totalPriceObj.numPerOrder }}件 / 单*{{ totalPriceObj.totalNum }}单</p>
                  <p>运费备用金: {{ totalPriceObj.postPrice }}元 / 单*{{ totalPriceObj.totalNum }}单</p>
                </div>
              </td>
              <td>
                <span>{{ benjin }}元</span>
              </td>
              <td rowspan="2">
                <span class="red">{{ totalPriceObj.totalPrice }}</span>元
              </td>
            </tr>
            <tr>
              <td>
                <span>佣金冻结</span>
              </td>
              <td>
                <div>
                  <p>图文好评: {{ totalPriceObj.graphicFavorPrice }}元 / 单*{{ totalPriceObj.graphicFavorNum }}单</p>
                  <p>纯文字好评: {{ totalPriceObj.wordFavorPrice }}元 / 单*{{ totalPriceObj.wordFavorNum }}单</p>
                  <p>默认五星好评: {{ totalPriceObj.defaultFavorPrice }}元 / 单*{{ totalPriceObj.defaultFavorNum }}单</p>
                  <p>plus会员: {{ totalPriceObj.plusPrice }}元 / 单*{{ totalPriceObj.plusNum }}单</p>
                </div>
              </td>
              <td>
                <span>{{ yongjin }}元</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="step">
        <h2>5.申请任务进展</h2>
        <div class="step5">
          <el-table :data="buyerListArr" style="width: 100%">
            <el-table-column prop="telephone" align="center" label="手机号">
            </el-table-column>
            <el-table-column prop="buyerName" align="center" label="买号">
            </el-table-column>
            <el-table-column prop="orderId" align="center" label="订单编号">
            </el-table-column>
            <el-table-column prop="taskDayId" align="center" label="试用编号">
            </el-table-column>
            <el-table-column align="center" label="任务状态">
              <template slot-scope="scope">
                <span>{{ scope.row.status == 1 ? '待下单' : scope.row.status == 2 ? '待修改' : scope.row.status == 3 ? '待审核' : scope.row.status == 4 ? '审核通过' : scope.row.status == 10 ? '待评价' : scope.row.status == 11 ? '待审核评价' : scope.row.status == 12 ? '评价被驳回' : scope.row.status == 13 ? '评价通过待返佣' : scope.row.status == 19 ? '已取消' : scope.row.status == 20 ? '已完成' : '其他状态'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts'
import { pageCommon } from '../../assets/js/mixin'
export default {
  name: 'taskDetail',
  mixins: [pageCommon],
  data () {
    return {
      // 任务信息
      taskInfoObj: {},
      // 商品信息
      goodsInfoObj: {},
      // 增值服务费用
      totalPriceObj: {},
      // 买手列表
      buyerListArr: [],
      tableData: [{
        phone: '18666554455',
        buyerName: '次u三分',
        orderNum: '156415fasf4as5d45sa5fas',
        tryNum: '54s5dsa5d4sa4f4545a4',
        status: '待审核'
      }],
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['计划下单数', '实际下单数']
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0', '9-8', '9-9', '9-10', '9-11', '9-12', '9-13']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '计划下单数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#029E4A'
              }
            },
            data: [11, 11, 15, 13, 12, 13, 10]
          },
          {
            name: '实际下单数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#40B6FF'
              }
            },
            data: [1, 4, 2, 5, 3, 2, 9]
          }
        ]
      },
      apiUrl: '/api/seller/order/getBuyerListBy'
    }
  },
  computed: {
    searchListArr: function () {
      let arr = []
      if (this.goodsInfoObj.searchWordList) {
        arr = JSON.parse(this.goodsInfoObj.searchWordList)
      }
      return arr
    },
    benjin: function () {
      let benjin = 0
      benjin = (this.totalPriceObj.productUnitPrice) * (this.totalPriceObj.numPerOrder) * (this.totalPriceObj.totalNum) + (this.totalPriceObj.postPrice) * (this.totalPriceObj.totalNum)
      return benjin
    },
    yongjin: function () {
      let yongjin = 0
      yongjin = (this.totalPriceObj.graphicFavorPrice) * (this.totalPriceObj.graphicFavorNum) +
        (this.totalPriceObj.wordFavorPrice) * (this.totalPriceObj.wordFavorNum) +
        (this.totalPriceObj.defaultFavorPrice) * (this.totalPriceObj.defaultFavorNum) +
        (this.totalPriceObj.plusPrice) * (this.totalPriceObj.plusNum)
      return yongjin
    },
    params () {
      return {
        sellerTaskId: this.$route.query.sellerTaskId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    }
  },
  methods: {
    resizeCharts () {
      this.$refs.myChart.style.height = this.$refs.charts.style.height
      this.$refs.myChart.style.width = this.$refs.charts.style.width
    },
    timeFilter (time) {
      time = time.toString()
      let month = time.substr(4, 2)
      let day = time.substr(6, 2)
      return month + '-' + day
    },
    setCharts () {
      this.resizeCharts()
      let myCharts = echarts.init(this.$refs.myChart)
      myCharts.setOption(this.option)
    },
    // 根据状态进行可操作
    toDo (status, sellerTaskId) {
      switch (status) {
        case 'finsh': // 去完善信息
          this.$router.push({ name: 'sendTaskTwo', query: { sellerTaskId: this.taskInfoObj.sellerTaskId } })
          break
        case 'pay': // 去支付
          this.$router.push({ name: 'sendTaskThree', query: { sellerTaskId: this.taskInfoObj.sellerTaskId } })
          break
        case 'cancel': // 撤销任务
          this.getCancel()
          break
        case 'return': // 去修改任务
          this.$router.push({ name: 'sendTaskTwo', query: { rbSellerTaskId: this.taskInfoObj.sellerTaskId } })
          break
        case 'new': // 创建新任务
          this.$router.push({ name: 'sendTaskOne' })
          break
        default:
          break
      }
    },
    // 获取基本信息
    getTaskInfo () {
      this.$ajax.post('/api/seller/task/getTaskDetail', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.taskInfoObj = data.data.data
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
    // 获取商品信息
    getGoodsInfo () {
      this.$ajax.post('/api/seller/task/getTaskProductInfo', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.goodsInfoObj = data.data.data
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
    // 获取任务试用份数
    getTaskNum () {
      this.$ajax.post('/api/seller/task/getTrailList', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          let dateArr = data.data.data
          let arrDay = []
          let actualNumArr = []
          let throwTimeArr = []
          for (let m of dateArr) {
            let date = m.time
            let formDate = date.substr(4, 2) + '-' + date.substr(6)
            arrDay.push(formDate)
            actualNumArr.push(m.actualNum)
            throwTimeArr.push(m.throwTime)
          }
          this.option.xAxis.data = arrDay
          this.option.series[0].data = throwTimeArr
          this.option.series[1].data = actualNumArr
          this.setCharts()
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
    // 获取增值服务费用
    getTotalPrice () {
      this.$ajax.post('/api/seller/task/getTaskCost', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          // console.log(data)
          this.totalPriceObj = data.data.data
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
    // 获取买手列表
    setList (data) {
      this.buyerListArr = data
    },
    // 撤销任务请求
    getCancel () {
      this.$confirm('确定要撤销该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/platform/task/cancelTask', {
          sellerTaskId: this.taskInfoObj.sellerTaskId
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              type: 'success',
              message: '撤销成功!'
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  mounted () {
    this.getTaskInfo()
    this.getGoodsInfo()
    this.getTaskNum()
    this.getTotalPrice()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.taskDetail
  font-size 14px
  min-width 1000px
  padding-left 20px
  padding-right 20px
  margin-bottom 20px
  .red
    color #FF2933
  .blue
    color #1C95FF
    cursor pointer
  .link
    max-width 700px
    display inline-block
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    vertical-align middle
  .gray
    color #666666
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .top
    display flex
    justify-content flex-start
    .top-left
      background #ffffff
      border-radius 4px
      flex 1
      max-width 900px
      box-shadow 0 0 15px rgba(0, 0, 0, 0.07)
      .title
        height 40px
        line-height 40px
        padding-left 28px
        color #ffffff
        font-size 14px
        background #FF8A22
      .top-left-cont
        padding 0 28px
        h3
          font-size 14px
          color #9B9B9B
          line-height 38px
        .detail
          padding 20px 0
          display flex
          justify-content flex-start
          li
            flex 1
            padding-left 40px
            border-left 1px solid #d8d8d8
            font-size 14px
            color #3C3C3C
            line-height 38px
            &:first-child
              border none
    .top-right
      border-radius 4px
      min-width 300px
      background #ffffff
      box-shadow 0 0 15px rgba(0, 0, 0, 0.07)
      margin-left 20px
      padding 38px 65px
      color #444444
      h2
        font-size 20px
        line-height 20px
        margin-bottom 20px
      p
        font-size 12px
        line-height 20px
  .cont
    padding 20px
    margin-top 20px
    background #ffffff
    border-radius 4px
    font-size 14px
    color #444444
    .step
      h2
        font-size 16px
        color #444444
        line-height 1
        padding-bottom 12px
        margin-bottom 24px
        margin-top 40px
        border-bottom 1px solid #d8d8d8
      img
        width 60px
        height 60px
        margin-top 20px
      .step1
        display flex
        >div
          margin-left 40px
          span
            display inline-block
            width 220px
          p
            line-height 30px
      .step2
        display flex
        li
          margin-right 120px
        h3
          line-height 1
          margin-bottom 20px
        p
          font-size 14px
          line-height 30px
        span
          display inline-block
          width 100px
      .step4
        table
          width 100%
          text-align center
          margin-bottom 40px
          tr
            height 150px
            font-size 14px
            color #444444
            &:first-child
              height 40px
            th
              border 1px solid #dedede
              background #fafafa
              vertical-align middle
              min-width 100px
            td
              border 1px solid #dedede
              vertical-align middle
              >div
                width 250px
                margin 0 auto
              p
                line-height 30px
                text-align left
</style>