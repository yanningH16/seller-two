<template>
  <div class="wrap pushAdmin">
    <div class="shop">
      <em class="gray">账号信息</em>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="邀请员工账号" name="first">
          <div class="accountTab">
            <el-table :data="tableDataSell" style="width: 100%">
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="number" align="center" label="账号名">
              </el-table-column>
              <el-table-column prop="numberType" align="center" label="账号类型">
              </el-table-column>
              <el-table-column prop="admin" align="center" label="管理员">
              </el-table-column>
              <el-table-column align="center" label="帐号状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" align="center" label="注册时间">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邀请买手账号" name="second">
          <div class="accountTab">
            <el-table :data="tableDataBuy" style="width: 100%">
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="number" align="center" label="账号名">
              </el-table-column>
              <el-table-column prop="numberType" align="center" label="账号类型">
              </el-table-column>
              <el-table-column prop="admin" align="center" label="管理员">
              </el-table-column>
              <el-table-column align="center" label="帐号状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" align="center" label="注册时间">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理员账号" name="third">
          <div class="accountTab">
            <el-table :data="tableDataAdmin" style="width: 100%">
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="number" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="numberType" align="center" label="账号类型">
              </el-table-column>
              <el-table-column align="center" label="管理员状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='正常' ? 'tipSuccess' : scope.row.JDStatus==='冻结' ? 'tipError' : 'tipWait'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!-- 分页 -->
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'pushAdmin',
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      totalCount: 0,
      pageSize: 5,
      tableDataSell: [],
      tableDataBuy: [],
      tableDataAdmin: []
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.activeName === 'one') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(1, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(1, this.pageSize)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName === 'one') {
        this.sercherOne(val, this.pageSize)
      } else if (this.activeName === 'two') {
        this.sercherTwo(val, this.pageSize)
      } else if (this.activeName === 'three') {
        this.sercherThree(val, this.pageSize)
      }
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
  .content
    background #fff
    margin-top 24px
    padding 0 20px 20px
    .pager
      float right 
</style>