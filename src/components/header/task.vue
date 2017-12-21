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
        <el-tab-pane label="全部任务" name="all">
        </el-tab-pane>
        <el-tab-pane label="未支付任务" name="toPay">
        </el-tab-pane>
        <el-tab-pane label="待审核任务" name="toCheck">
        </el-tab-pane>
        <el-tab-pane label="待上线任务" name="toLine">
        </el-tab-pane>
        <el-tab-pane label="进行中任务" name="lined">
        </el-tab-pane>
        <el-tab-pane label="已完成任务" name="done">
        </el-tab-pane>
        <!-- <el-tab-pane label="已撤销任务" name="stop">
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="search">
      <span>任务类型：</span>
      <el-select v-model="searchObj.taskType" placeholder="请选择" style="margin-right: 20px;width:200px;">
        <el-option label="全部" value="">
        </el-option>
        <el-option label="垫付" value="0">
        </el-option>
        <el-option label="浏览" value="1">
        </el-option>
      </el-select>
      <span>平台：</span>
      <el-select v-model="searchObj.platform" placeholder="请选择" style="margin-right: 20px;width:200px;">
        <el-option label="全部" value="">
        </el-option>
        <el-option label="京东" value="0">
        </el-option>
        <el-option label="淘宝" value="1">
        </el-option>
        <el-option label="天猫" value="2">
        </el-option>
      </el-select>
      <span>关键词：</span>
      <el-input v-model="searchObj.keyword" placeholder="任务编号/商品名称关键词" style="margin-right: 20px;width:200px;"></el-input>
      <button class="btn" style="margin-left:40px;" @click="find">查询</button>
    </div>
    <div class="tabCont">
      <div class="tabItem" v-for="(item, index) in listArr" :key="index">
        <ul class="head">
          <li style="width:20%">
            <i :class="{'jdIcon': item.shopType==0, 'taobaoIcon': item.shopType==1, 'tianmaoIcon': item.shopType==2}"></i>
            <strong>&nbsp;&nbsp;{{ item.shopName }}</strong>
          </li>
          <li style="width:30%">
            <span class="gray">任务编号: </span>
            <span>{{ item.sellerTaskId }}</span>
            <span class="blue" @click="$router.push({name: 'taskDetail',query: {sellerTaskId: item.sellerTaskId}})">[查看任务详情]</span>
          </li>
          <li style="width:20%">
            <span class="gray">任务类型: </span>
            <span>{{ item.taskTypeDesc }}</span>
          </li>
          <li style="width:20%">
            <span class="gray">提交时间: </span>
            <span>{{ item.throwTime }}</span>
          </li>
        </ul>
        <ul class="cont">
          <li>
            <img :src="item.productPicUrl" alt="商品展示图片">
            <b>{{ item.productName }}</b>
          </li>
          <li>
            <p>付款价格：
              <span class="red">{{ item.payment }}</span>
            </p>
            <p>任务单数：{{ item.throwNum }}</p>
          </li>
          <li>
            <p>待确认订单：
              <span class="red">{{ item.toConfirmOrderNum }}</span>
            </p>
            <p>待确认评价截图：{{ item.toConfirmFavorNum }}</p>
          </li>
          <li>
            <p>已完成订单：{{ item.doneNum }}</p>
          </li>
          <li>
            <div class="status">
              <p>状态</p>
              <span v-if="item.taskStatus==1 || item.taskStatus==2" class="tipError">待提交</span>
              <span v-if="item.taskStatus==3" class="tipError">待支付</span>
              <span v-if="item.taskStatus==4" class="tipWait">待审核</span>
              <span v-if="item.taskStatus==5" class="tipWait">待上线</span>
              <span v-if="item.taskStatus==6" class="tipError">未通过</span>
              <span v-if="item.taskStatus==7" class="tipError">已撤销</span>
              <span v-if="item.taskStatus==8" class="tipDoing">进行中</span>
              <span v-if="item.taskStatus==9" class="tipDoing">已终止</span>
              <span v-if="item.taskStatus==20" class="tipSuccess">已完成</span>
              <span v-if="item.taskStatus==21" class="tipSuccess">已结束</span>
            </div>
          </li>
          <li>
            <div class="buttons">
              <button v-if="item.taskStatus==6" class="btn btn-small" @click="$router.push({name: 'sendTaskTwo',query: {rbSellerTaskId: item.sellerTaskId}})">修改</button>
              <button v-if="item.taskStatus==3" class="btn btn-small" @click="toPay(item.sellerTaskId)">去支付</button>
              <button v-if="item.taskStatus!=7 || item.taskStatus!=20 || item.taskStatus!=21" class="btn btn-small" @click="cancel(item.sellerTaskId)">撤销</button>
            </div>
          </li>
        </ul>
      </div>
      <noCont v-if="listArr.length===0"></noCont>
      <div class="pager" v-if="listArr.length!==0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
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
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
import NoCont from '../../base/noCont/noCont'

export default {
  name: 'task',
  mixins: [pageCommon],
  components: {
    NoCont
  },
  data () {
    return {
      activeName: 'all',
      showCancel: false,
      // 撤销对象
      cancelObj: {
        reason: '',
        common: '',
        plan: ''
      },
      // 搜索对象
      searchObj: {
        taskType: '0',
        platform: '0',
        keyword: '',
        keywordType: ''
      },
      listArr: [],
      apiUrl: '/api/seller/task/getTaskListByConditionAndSellerUserId'
    }
  },
  computed: {
    params () {
      return {
        sellerUserId: this.userInfo.sellerUserId,
        taskStatus: this.activeName,
        taskType: this.searchObj.taskType,
        shopType: this.searchObj.platform,
        keyword: this.searchObj.keyword,
        keywordType: this.searchObj.keywordType,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    },
    keyType: function () {
      if (this.searchObj.keyword) {
        let end = this.searchObj.keyword.substr(-1, 1)
        if (isNaN(end)) {
          return 'keyword'
        } else {
          return 'task'
        }
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClick (tab, event) {
      this.getTask()
    },
    find () {
      this.searchObj.keywordType = this.keyType
      this.getTask()
    },
    // 去支付
    toPay (sellerTaskId) {
      this.$router.push({ name: 'sendTaskThree', query: { sellerTaskId: sellerTaskId } })
    },
    cancel (sellerTaskId) {
      this.$confirm('确定要撤销该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/platform/task/cancelTask', {
          sellerTaskId: sellerTaskId
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
    },
    setList (data) {
      this.listArr = data
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
            display inline-block
            width 120px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            vertical-align middle
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