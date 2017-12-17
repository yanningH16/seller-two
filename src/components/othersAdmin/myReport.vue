<template>
  <div class="reports">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'myReport' }">其他管理</el-breadcrumb-item>
        <el-breadcrumb-item>我的举报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabs">
      <el-table :data="tableData" style="width: 100%" v-if="tableData.length!==0">
        <el-table-column prop="time" align="center" label="提交时间">
        </el-table-column>
        <el-table-column prop="complainPhone" align="center" label="举报人">
        </el-table-column>
        <el-table-column prop="chuaqinInfo" align="center" label="被举报人">
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
            <span v-if="scope.row.status==0" class="tipWait tipSmall">待审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="statusDetail" align="center" label="处理结果" width="150">
          <!-- <template slot-scope="scope">
            <el-tooltip popper-class="tooltipItem" effect="dark" :content="scope.row.result" placement="top">
              <span class="overflow">{{ scope.row.result }}</span>
            </el-tooltip>
          </template> -->
        </el-table-column>
      </el-table>
      <noCont v-if="tableData.length===0"></noCont>
      <div class="pager" v-if="tableData.length!==0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
import NoCont from '../../base/noCont/noCont'
export default {
  name: 'report',
  mixins: [pageCommon],
  components: {
    NoCont
  },
  data () {
    return {
      currentPage: 1,
      tableData: [],
      apiUrl: '/api/seller/complain/getComplainListBySellerUserId'
    }
  },
  computed: {
    params () {
      return {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        sellerUserId: this.userInfo.sellerUserId
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          time: word.time || '暂无数据',
          complainPhone: word.complainPhone || '暂无数据',
          chuaqinInfo: word.chuaqinInfo || '暂无数据',
          reason: word.reason || '暂无数据',
          status: word.status || '暂无数据',
          statusDetail: word.statusDetail || '暂无数据'
        }
        arr.push(goods)
      }
      this.tableData = arr
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