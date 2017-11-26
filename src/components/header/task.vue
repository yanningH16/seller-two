<template>
  <div class="task">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'overView' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabNav">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="全部任务" name="first">
        </el-tab-pane>
        <el-tab-pane label="未支付任务" name="second">
        </el-tab-pane>
        <el-tab-pane label="待审核任务" name="third">
        </el-tab-pane>
        <el-tab-pane label="待上线任务" name="fourth">
        </el-tab-pane>
        <el-tab-pane label="进行中任务" name="fifth">
        </el-tab-pane>
        <el-tab-pane label="已完成任务" name="sixth">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="search">
      <span>任务类型：</span>
      <el-select v-model="searchObj.taskType" placeholder="请选择" style="margin-right: 20px;width:200px;">
        <el-option label="全部" value="">
        </el-option>
        <el-option label="垫付" value="0">
        </el-option>
      </el-select>
      <span>平台：</span>
      <el-select v-model="searchObj.platform" placeholder="请选择" style="margin-right: 20px;width:200px;">
        <el-option label="全部" value="">
        </el-option>
        <el-option label="京东" value="0">
        </el-option>
      </el-select>
      <span>关键词：</span>
      <el-input v-model="searchObj.keyword" placeholder="任务编号/商品名称关键词" style="margin-right: 20px;width:200px;"></el-input>
      <button class="btn" style="margin-left:40px;">查询</button>
    </div>
    <div class="tabCont">
      <div class="tabItem" v-for="(item, index) in 5" :key="index">
        <ul class="head">
          <li style="width:20%">
            <i></i>
            <strong>&nbsp;&nbsp;挡风沙旗舰店</strong>
          </li>
          <li style="width:30%">
            <span class="gray">任务编号: </span>
            <span>98444654654654654564564454</span>
            <span class="blue">[查看任务类型]</span>
          </li>
          <li style="width:20%">
            <span class="gray">任务类型: </span>
            <span>图文好评</span>
          </li>
          <li style="width:20%">
            <span class="gray">提交时间: </span>
            <span>2017-08-25 12:22:11</span>
          </li>
        </ul>
        <ul class="cont">
          <li>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511344372676&di=efa5889acb8cecfcf8222d867cd5f941&imgtype=0&src=http%3A%2F%2Fimg2.gao7.com%2Ffiles%2Fappleimage%2F277%2F277E8E4B-D0AD-4956-BF23-98987E2ADA88.jpg" alt="">
            <b>安卓数据线</b>
          </li>
          <li>
            <p>付款价格：
              <span class="red">9.90</span>
            </p>
            <p>任务单数：02</p>
          </li>
          <li>
            <p>待确认订单：
              <span class="red">99</span>
            </p>
            <p>待确认评价截图：02</p>
          </li>
          <li>
            <p>已完成订单：99</p>
          </li>
          <li>
            <div class="status">
              <p>状态</p>
              <span class="tipSuccess">已完成</span>
            </div>
          </li>
          <li>
            <div class="buttons">
              <button class="btn btn-small" @click="showCancel=true">撤销</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
    <div class="alertCont">
      <el-dialog class="alertReturn" title="撤销任务" :modal-append-to-body="false" :visible.sync="showCancel" width="600px">
        <ul class="cont">
          <li>
            <span>撤销理由</span>
            <el-select v-model="cancelObj.reason" placeholder="请选择撤销理由" style="width:320px;">
              <el-option label="京东评价内容与审核内容不一致" value="0">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>理由备注</span>
            <el-input type="textarea" :rows="2" placeholder="请输入撤销理由备注" v-model="cancelObj.common" style="width:320px;" resize="none">
            </el-input>
          </li>
          <li>
            <span>修改方案</span>
            <el-input type="textarea" :rows="4" placeholder="请输入修改方案" v-model="cancelObj.plan" style="width:320px;" resize="none">
            </el-input>
          </li>
        </ul>
        <div class="footBtns">
          <button class="btn" @click="showCancel = false">确认</button>
          <button class="btn disabled" @click="showCancel = false">取消</button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'task',
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      showCancel: false,
      // 撤销对象
      cancelObj: {
        reason: '',
        common: '',
        plan: ''
      },
      // 搜索对象
      searchObj: {
        taskType: '',
        platform: '',
        keyword: ''
      }
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
.task
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
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .tabNav
    background #ffffff
  .search
    background #ffffff
    padding 20px
  .tabCont
    background #ffffff
    padding 20px
    .tabItem
      border 1px solid #DFF0FD
      margin-bottom 16px
      .head
        height 32px
        line-height 32px
        padding 0 20px
        background #F6FBFF
        box-shadow 0 1px 0 #DFF0FD
        display flex
        justify-content space-between
        font-size 12px
        i
          display inline-block
          width 16px
          height 16px
          vertical-align middle
          background red
      .cont
        display flex
        padding 14px 0
        justify-content space-between
        li
          flex 1
          padding-left 20px
          border-left 1px solid #dedede
          &:first-child
            border-left none
          img
            width 60px
            height 60px
            vertical-align middle
          b
            line-height 60px
          p
            line-height 30px
          .status
            text-align center
            margin-left -20px
          .buttons
            line-height 60px
            margin-left -20px
            text-align center
  .alertCont
    .footBtns
      text-align center
    .alertReturn
      .cont
        padding 20px
        li
          margin-bottom 12px
          span
            margin-right 24px
            vertical-align top
            line-height 30px
</style>