<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">订单管理</em>>审核评价
    </div>
    <div class="personBank">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核评价" name="first">
          <div class="order">
            <ul>
              <li>
               <span>平台:</span> 
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </li>
              <li>
                <span>店铺:</span>
                <el-input v-model="input1" placeholder="请输入内容"></el-input>
              </li>
              <li class="orderLeft">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                  <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="任务编号" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </li>
              <li>
                <button class="btn">查询</button>
              </li>
            </ul>
           <el-button plain style="margin-top:20px">导出到Excel</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通过的评价" name="second">

        </el-tab-pane>
        <el-tab-pane label="驳回的评价" name="third">

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'appraiseOrder',
  data () {
    return {
      activeName: 'first',
      input: '',
      input1: '',
      input5: '',
      select: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
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
  .personBank
    background #fff
    margin-top 24px
    padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    .order ul
      margin-top 30px
      display flex
      min-width 1300px
      li
        margin-right 20px
</style>