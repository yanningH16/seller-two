<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">资金管理</em>>资金记录
    </div>
    <div class="contentShop">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="消费明细" name="first">
          <ul>
            <li>
              时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </li>
            <li>
              备注:
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              任务编号:
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </li>
            <li>
              <button class="btn">查询</button>
            </li>
          </ul>
          <div class="actTab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="sureTime" align="center" label="确认时间">
              </el-table-column>
              <el-table-column prop="revenue" align="center" label="入款">
              </el-table-column>
              <el-table-column prop="deduct" align="center" label="扣款">
              </el-table-column>
              <el-table-column prop="type" align="center" label="类型">
              </el-table-column>
              <el-table-column prop="balance" align="center" label="结余">
              </el-table-column>
              <el-table-column prop="number" align="center" label="编号">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="备注">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="充值提现" name="second">
          <payTixian></payTixian>
        </el-tab-pane>
      </el-tabs>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import PayTixian from './payTixain'
export default {
  components: {
    PayTixian
  },
  name: 'coinApply',
  data () {
    return {
      activeName: 'first',
      value3: '',
      input: '',
      currentPage: 1,
      tableData: [{
        sureTime: '2017-11-15 20:30:30',
        revenue: '100.00',
        deduct: '100.00',
        type: '佣金',
        balance: '100.00',
        number: '554646856546546',
        remark: '备注一下'
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
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
  .contentShop
    background #fff
    margin-top 24px
    padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    ul
      margin-top 40px
      display flex
      border-bottom 1px solid #e5e5e5
      padding-bottom 24px
      li
        margin-right 20px
    .pager
      float right
</style>