<template>
  <div class="order">
    <ul class="top">
      <li>
        <span>平台:</span>
        <el-select v-model="input" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <span>店铺:</span>
        <el-select v-model="input1" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
    <!-- <el-button plain style="margin-top:20px">导出到Excel</el-button> -->
    <!-- 内容部分 -->
    <div>
      <div class="content">
        <div class="header">
          <p style="color:#444444">店铺名字</p>
          <p>任务编号:
            <span>4646464654646</span>
          </p>
          <!-- <p>京东订单编号:
            <span>5656856565656</span>
          </p> -->
          <p>任务类型:
            <span>图文好评</span>
            <!-- <span>文字好评</span> -->
          </p>
          <p>提交时间:
            <span>2017-08-25 12:23:23</span>
          </p>
        </div>
        <!-- 左边内容部分 -->
        <ul class="text">
          <li>
            <img class="float_img" src="http://img1.3lian.com/2015/w10/21/d/1.jpg" alt="" width="60px" height="60px">
            <div class="float">
              <p>
                <span>商品的名字</span>
              </p>
              <p style="margin-top:15px">子任务编号:
                <span>5465656856</span>
              </p>
            </div>
          </li>
          <!-- 中间部分 -->
          <li class="midd">
            <img class="midd_img" src="http://img1.3lian.com/2015/w10/21/d/1.jpg" alt="" width="60px" height="60px">
            <div class="float_content">
              <p>姓名:
                <span>黄军</span>
              </p>
              <p style="margin-top:15px">京东订单编号:
                <span>54654656565656256</span>
              </p>
              <p style="margin-top:15px">京东用户名:
                <span>哈哈哈哈哈或</span>
              </p>
              <p style="margin-top:15px">手机号:
                <span>15037183341</span>
              </p>
            </div>
          </li>
          <!-- 右边部分 -->
          <li class="right">
            <p style="padding-bottom:20px">
              驳回原因:
              <el-tooltip  effect="dark" popper-class="tooltipItem" content="超出部分显示内容" placement="top-start">
                <span class="right_text">绝地反击噢k京东foe见覅返利积分开始了对方诶费劲儿</span>
              </el-tooltip>
            </p>
            <p class="right_first">
              解决方案:
              <el-tooltip popper-class="tooltipItem" effect="dark" content="超出部分显示内容" placement="top-start">
                <span class="right_text">绝地反击噢诶费劲儿</span>
              </el-tooltip>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'appraiseOrderSucess',
  data () {
    return {
      input: '',
      input1: '',
      input5: '',
      select: '',
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
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.order
  .top
    margin-top 30px
    display flex
    min-width 1300px
    li
      margin-right 20px
  .content
    padding-bottom 20px
    border 1px solid rgba(198, 223, 243, 0.6)
    margin-top 12px
    .header
      display flex
      justify-content space-around
      font-size 12px
      padding 10px 0
      background rgba(198, 223, 243, 0.3)
      min-width 1000px
      p span
        color #444444
    .text
      display flex
      justify-content space-between
      overflow hidden
      color #444444
      min-width 1000px
      li
        margin-top 41px
        margin-left 22px
        .float_img
          float left
          margin-right 10px
        .float
          font-size 14px
          float left
          color rgba(68, 68, 68, 1)
        .midd_img
          width 60px
          height 107px
          float left
          margin-right 10px
        .float_content
          font-size 14px
          float left
          color rgba(68, 68, 68, 1)
      .right
        margin-right 80px
        .right_first
          border-top 1px solid #dedede
          padding-top 20px
        .right_text
          width 100px
          overflow  hidden
          text-overflow ellipsis
          white-space  nowrap
      .midd
        margin-top 30px
        border-left 1px solid #dedede
        border-right 1px solid #dedede
        padding-left 60px
        padding-right 70px
</style>
