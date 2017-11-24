<template>
  <div class="reports">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'myReport' }">其他管理</el-breadcrumb-item>
        <el-breadcrumb-item>我的举报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabs">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="time" align="center" label="提交时间">
        </el-table-column>
        <el-table-column prop="reporter" align="center" label="举报人">
        </el-table-column>
        <el-table-column prop="reported" align="center" label="被举报人">
        </el-table-column>
        <el-table-column prop="reason" align="center" label="原因" width="150">
          <template slot-scope="scope">
            <el-tooltip popper-class="tooltipItem" effect="dark" :content="scope.row.reason" placement="top">
              <span class="overflow">{{ scope.row.reason }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" class="tipDoing tipSmall">处理中</span>
            <span v-if="scope.row.status==2" class="tipSuccess tipSmall">已完成</span>
            <span v-if="scope.row.status==3" class="tipWait tipSmall">待审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="result" align="center" label="处理结果" width="150">
          <template slot-scope="scope">
            <el-tooltip popper-class="tooltipItem" effect="dark" :content="scope.row.result" placement="top">
              <span class="overflow">{{ scope.row.result }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'report',
  data () {
    return {
      currentPage: 1,
      tableData: [{
        time: '2017-10-20 18:50:50',
        reporter: '18667889965',
        reported: '18877774445',
        reason: '海关大厦发生法啊说海关大厦发生法啊说话撒海关大厦发生法啊说话撒海关大厦发生法啊说话撒海关大厦发生法啊说话撒海关大厦发生法啊说话撒话撒',
        status: 3,
        result: '高峰时段和沙发上撒海关大厦发生法啊说话撒海关大厦发生法啊说话撒海关大厦发生法啊说话撒海关大厦发生法啊说话撒花洒'
      }]
    }
  },
  methods: {
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
.reports
  min-width 1000px
  padding-left 20px
  padding-right 20px
  .red
    color #FF2933
  .blue
    color #1C95FF
    cursor pointer
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .tabs
    background #ffffff
    margin-top 24px
    padding 20px
    .overflow
      display inline-block
      width 150px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
</style>