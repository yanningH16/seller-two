<template>
  <div class="order2">
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
          <p style="color:#444444">商品名字</p>
          <p>任务编号:
            <span>4646464654646</span>
          </p>
          <p>京东订单编号:
            <span>5656856565656</span>
          </p>
          <p>任务类型:
            <span>图文好评</span>
            <!-- <span>文字好评</span> -->
          </p>
          <p>提交时间:
            <span>2017-08-25 12:23:23</span>
          </p>
        </div>
        <!-- 里面内容部分 -->
        <ul class="text">
          <li>
            <img class="float_img" src="http://img1.3lian.com/2015/w10/21/d/1.jpg" alt="" width="60px" height="60px">
            <div class="float">
              <p>姓名:
                <span>黄军</span>
              </p>
              <p style="margin-top:15px">京东用户名:
                <span>哈哈哈哈哈或</span>
              </p>
              <p style="margin-top:15px">手机号:
                <span>15037183341</span>
              </p>
              <p style="margin-top:15px">子任务编号:
                <span>5465656856</span>
              </p>
            </div>
          </li>
          <!-- 中间部分 -->
          <li class="midd">
            <p style="width:300px">
              <!-- <span>图文好评</span> -->
              <span>文字好评</span>
              <em>东西很不错,下次继续光</em>
            </p>
            <div class="midd_img">
              <img src="http://pic.35pic.com/normal/06/99/77/7254496_155434853000_2.jpg" alt="">
              <img src="http://pic.35pic.com/normal/06/99/77/7254496_155434853000_2.jpg" alt="">
              <img src="http://pic.35pic.com/normal/06/99/77/7254496_155434853000_2.jpg" alt="">
              <img src="http://pic.35pic.com/normal/06/99/77/7254496_155434853000_2.jpg" alt="">
            </div>
          </li>
          <!-- 右边部分 -->
          <li class="right">
            <p style="float:left">
              <em>评价截图:</em><br><img src="http://pic.35pic.com/normal/06/99/77/7254496_155434853000_2.jpg" alt="" width="60px" height="100px">
            </p>
            <p style="float:left;margin-left:46px">
              <em>物流截图:</em><br><img src="http://pic.35pic.com/normal/06/99/77/7254496_155434853000_2.jpg" alt="" width="60px" height="100px">
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
.order2
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
        .midd_img img
          width 64px
          height 64px
          margin-right 16px
          margin-top 21px
      .right
        margin-right 82px
        margin-top 10px
      .midd
        margin-top 30px
        border-left 1px solid #dedede
        border-right 1px solid #dedede
        padding-left 40px
        padding-right 50px
        p span
          border-right 1px solid #dedede
          padding-right 12px
        p em
          margin-left 12px
</style>
