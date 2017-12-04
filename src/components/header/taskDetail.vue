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
          <span>京东 | 品炫旗舰店 | 京东App垫付</span>
        </div>
        <div class="top-left-cont">
          <h3>任务编号：5456456466545655</h3>
          <ul class="detail">
            <li>
              <p>付款价格：
                <span class="red">9</span>
              </p>
              <p>任务数量：
                <span class="red">9</span>
              </p>
            </li>
            <li>
              <p>待确认好评：
                <span class="red">9</span>
              </p>
              <p>待确认评价截图：
                <span class="red">9</span>
              </p>
            </li>
            <li>
              <p>已完成订单：
                <span class="red">9</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="top-right">
        <h2>任务已提交，等待客服审核</h2>
        <p>您的任务已提交，客服审核通过之后即可上线<br />
          <span class="red">16:00</span>点之前提交的任务当日审核上线；<br/>
          <span class="red">16:00</span>点之后提交的任务次日
          <span class="red">6:00</span>统一上线<br/> 审核之前您还可以：
          <span class="blue">撤销任务</span>
        </p>
      </div>
    </div>
    <div class="cont">
      <div class="step">
        <h2>1.商品信息</h2>
        <div class="step1">
          <img src="http://pic28.photophoto.cn/20130830/0005018667531249_b.jpg" alt="">
          <div>
            <p>
              <span>商品名称：安卓数据线</span>
              所在分类：手机周边
            </p>
            <p>商品链接：
              <span class="blue">http:wwwbaidu.com</span>
            </p>
            <p>
              <span>试客件数 / 人：1件</span>
              商品单价：9元（包邮）
            </p>
            <p>小计：9元</p>
          </div>
        </div>
      </div>
      <div class="step">
        <h2>2.如何找到商品</h2>
        <ul class="step2">
          <li>
            <h3>搜索关键词1：安卓</h3>
            <p>
              <span class="gray">排序方式：</span>
              综合排序
            </p>
            <p>
              <span class="gray">价格区间：</span>
              0.00-100.00元
            </p>
            <p>
              <span class="gray">品牌：</span>
              阿迪
            </p>
            <p>
              <span class="gray">发货地：</span>
              全国
            </p>
            <p>
              <span class="gray">评价数（约）：</span>
              51
            </p>
            <p>
              <span class="gray">预计翻页数：</span>
              5
            </p>
          </li>
          <li>
            <h3>搜索关键词1：安卓</h3>
            <p>
              <span class="gray">排序方式：</span>
              综合排序
            </p>
            <p>
              <span class="gray">价格区间：</span>
              0.00-100.00元
            </p>
            <p>
              <span class="gray">品牌：</span>
              阿迪
            </p>
            <p>
              <span class="gray">发货地：</span>
              全国
            </p>
            <p>
              <span class="gray">评价数（约）：</span>
              51
            </p>
            <p>
              <span class="gray">预计翻页数：</span>
              5
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
                  <p>商品: 9.00元*1件 / 单*10单</p>
                  <p>运费备用金: 10元 / 单*10单</p>
                </div>
              </td>
              <td>
                <span>10元</span>
              </td>
              <td rowspan="2">
                <span class="red">10</span>元
              </td>
            </tr>
            <tr>
              <td>
                <span>佣金冻结</span>
              </td>
              <td>
                <div>
                  <p>图文好评: 10元 / 单*10单</p>
                  <p>纯文字好评: 10元 / 单*10单</p>
                  <p>默认五星好评: 10元 / 单*10单</p>
                  <p>plus会员: 10元 / 单*10单</p>
                </div>
              </td>
              <td>
                <span>10元</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="step">
        <h2>5.申请任务进展</h2>
        <div class="step5">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="phone" align="center" label="手机号">
            </el-table-column>
            <el-table-column prop="buyerName" align="center" label="买号">
            </el-table-column>
            <el-table-column prop="orderNum" align="center" label="订单编号">
            </el-table-column>
            <el-table-column prop="tryNum" align="center" label="试用编号">
            </el-table-column>
            <el-table-column prop="status" align="center" label="任务状态">
            </el-table-column>
          </el-table>
        </div>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
let echarts = require('echarts')
export default {
  name: 'taskDetail',
  data () {
    return {
      currentPage: 1,
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
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
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
    }
  },
  mounted () {
    this.setCharts()
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
    justify-content space-between
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
        margin-bottom 24px
        margin-top 40px
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