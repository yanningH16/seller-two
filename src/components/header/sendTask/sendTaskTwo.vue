<template>
  <div class="sendTaskTwo">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'overView' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'overView' }">总览</el-breadcrumb-item>
        <el-breadcrumb-item>发布垫付任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="warning" v-if="warnShow">
      <i class="el-icon-warning"></i>
      <span style="margin-left:20px;margin-right:40px;">(1) 当日18点前发布的任务，当日审核通过后进行分发。</span>
      <span>（2）当日22点后发布的任务，将在当日审核后于次日8点起开始。</span>
      <b class="el-icon-close" style="float:right;margin-top:14px;font-weight: bold" @click="warnShow=false"></b>
    </div>
    <div class="step">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="选择任务类型"></el-step>
        <el-step title="填写任务信息"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="发布成功"></el-step>
      </el-steps>
    </div>
    <div class="cont">
      <div class="choosed">
        <span>已选择: </span>
        <b>手机京东&nbsp;&nbsp;垫付任务</b>
        <i></i>
        <span>爱上时尚旗舰店</span>
      </div>
      <h2>第一步: 填写商品信息</h2>
      <div class="step step1">
        <div class="input">
          <span class="must">商品标题：</span>
          <el-input placeholder="请输入内容" style="width:600px;">
            <span slot="suffix" style="line-height:40px;">0/20</span>
          </el-input>
          <p>请输入试用商品简称，不要和淘宝商品名相同，防止试客直接搜索名称购买</p>
        </div>
        <div class="input">
          <span class="must">商品链接：</span>
          <el-input placeholder="请输入内容" style="width:600px;"></el-input>
          <p>我们会根据您填写的试用商品链接抓取部分商品的宝贝描述。</p>
        </div>
        <div class="input">
          <span class="must">商品主图：上传的商品将会展示在平台，图片大小为
            <b class="red">600*600</b>，格式jpg/png/gif，图片大小
            <b class="red">1M</b>以内</span>
          <div class="uploadImg">
            <h3>商品展示图</h3>
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <span class="must">商品类目</span>
          <el-select v-model="classOne" placeholder="请选择" style="width:140px;margin-left:12px;">
            <el-option v-for="(item, index) in classOneArr" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="classOne" placeholder="请选择" style="width:140px;margin-left:12px;">
            <el-option v-for="(item, index) in classOneArr" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="classOne" placeholder="请选择" style="width:140px;margin-left:12px;">
            <el-option v-for="(item, index) in classOneArr" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="setFormat">
            <span class="must">设置商品规格
              <b class="gray">（若手机淘宝和pc端的价格不一致，请填写手机端价格）</b>
            </span>
          </div>
          <table class="table">
            <tr>
              <th>
                <span class="must">商品展示价格（元）</span>
              </th>
              <th>
                <span class="must">商品下单价格（元）</span>
              </th>
              <th>
                <span class="must">买家每单拍（件）</span>
              </th>
              <th>
                <span class="must">商品规格</span>
              </th>
            </tr>
            <tr>
              <td>
                <input type="number" placeholder="请填写">
              </td>
              <td>
                <input type="number" placeholder="请填写">
              </td>
              <td>
                <input type="number" placeholder="请填写">
              </td>
              <td>
                <input type="text" placeholder="任意规格(按照试用价格下单)">
              </td>
            </tr>
          </table>
          <el-radio-group v-model="isPost">
            <div class="checkBox">
              <el-radio :label="0">
                <b style="color: #3c3c3c">商品本身不包邮</b>
                <span class="gray">（买家无需联系客服，商家额外支付10元／单作为运费押金，任务完成后剩余的运费押金将返还给商家）</span>
              </el-radio>
            </div>
            <div class="checkBox">
              <el-radio :label="1">
                <b style="color: #3c3c3c">商品本身包邮</b>
                <span class="gray">（买家直接按商品实际金额下单）</span>
              </el-radio>
            </div>
          </el-radio-group>
          <h4>支持付款方式：</h4>
          <ul class="payWay">
            <li>
              <span>是否允许买家使用花呗付款</span>
              <el-radio-group v-model="isSuportHuabei">
                <el-radio :label="1">
                  <b style="color: #3c3c3c">允许</b>
                </el-radio>
                <el-radio :label="0">
                  <b style="color: #3c3c3c">不允许</b>
                </el-radio>
              </el-radio-group>
            </li>
            <li>
              <span>是否允许买家使用信用卡付款</span>
              <el-radio-group v-model="isSuportCard">
                <el-radio :label="1">
                  <b style="color: #3c3c3c">允许</b>
                </el-radio>
                <el-radio :label="0">
                  <b style="color: #3c3c3c">不允许</b>
                </el-radio>
              </el-radio-group>
            </li>
            <li>
              <span>是否允许买家使用优惠券付款</span>
              <el-radio-group v-model="isSuportTics">
                <el-radio :label="1">
                  <b style="color: #3c3c3c">允许</b>
                </el-radio>
                <el-radio :label="0">
                  <b style="color: #3c3c3c">不允许</b>
                </el-radio>
              </el-radio-group>
            </li>
          </ul>
        </div>
      </div>
      <h2>第二步: 设置如何找到商品</h2>
      <div class="step step2">
        <ul class="keywordList">
          <li>
            <span>关键词来源1：让试客在
              <b class="red">京东APP</b>搜索关键字&nbsp;&nbsp;</span>
            <el-input style="width:340px;" placeholder="请输入搜索关键字"></el-input>
            <span class="el-icon-delete deleBtn"></span>
          </li>
          <li style="margin-top:24px;margin-bottom:14px;">
            <el-button type="text">搜索范围&nbsp;&nbsp;</el-button>
            <b class="gray">&nbsp;&nbsp;若关键词排名较低，请务必设置此项，以便设置能找到商品</b>
          </li>
          <li class="searchBox">
            <span>排序方式：</span>
            <el-select placeholder="请选择" style="width: 140px;">
              <el-option label="综合排序" value="1">
              </el-option>
            </el-select>
            <b class="gray">
              &nbsp;&nbsp;推荐按销量排序查找，商品位置更稳定更好找
            </b>
            <i class="deleBtn el-icon-circle-close-outline"></i>
            <h4>买家通过
              <span class="red">价格筛选，发货地</span>缩小范围(选填)</h4>
            <div class="filter">
              <div class="col col1">
                <p>
                  <span>价格:</span>&nbsp;
                  <el-input style="width:120px;" placeholder="请输入价格"></el-input>
                  —
                  <el-input style="width:120px;" placeholder="请输入价格"></el-input>&nbsp;元</p>
                <p>
                  <span>评价数约:</span>&nbsp;
                  <el-input style="width:120px;" placeholder="请输入数量"></el-input>
                </p>
              </div>
              <div class="col col2">
                <p>
                  <span>发货地:</span>&nbsp;
                  <el-select placeholder="请选择" style="width: 120px;">
                    <el-option label="中国" value="1">
                    </el-option>
                  </el-select>
                </p>
                <p>
                  <span>目标翻页数:</span>&nbsp;
                  <el-input style="width:120px;" placeholder="请输入数量"></el-input>
                </p>
              </div>
              <div class="col col3">
                <p>
                  <span>现有收货/下单人数约:</span>&nbsp;
                  <el-input style="width:120px;" placeholder="请输入数量"></el-input>
                </p>
              </div>
            </div>
            <div class="save">
              <button class="btn btn-small">保存</button>
            </div>
          </li>
        </ul>
        <div class="addKeyword">
          <el-button type="text">
            <i class="el-icon-circle-plus"></i>
            可多添加2个淘宝搜索关键词方案
          </el-button>
          <span class="gray">(最多可添加5组关键词方案)</span>
        </div>
      </div>
      <h2>第三步: 选择任务类型与单数</h2>
      <div class="step step3">
        <span>任务开展时间&nbsp;:&nbsp;</span>
        <el-date-picker v-model="taskStarTime" type="date" placeholder="选择日期" format="yyyy/MM/dd" value-format="yyyy-MM-dd">
        </el-date-picker>
        <table class="dateTable">
          <thead>2017-11-21</thead>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
          <tr>
            <td>
              <b>9</b>
              <span>投放数量</span>
              <div class="numAdd">
                <span class="l">-</span>
                <input type="number">
                <span class="r">+</span>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="next">
        <!-- <button class="btn" :class="{'disabled': !(shop && taskType)}" :disabled="!(shop && taskType)" @click="doNext">下一步</button> -->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sendTaskTwo',
  data () {
    return {
      warnShow: true,
      active: 1,
      imageUrl: '',
      classOne: '',
      classOneArr: [{
        value: '选项1',
        label: '黄金糕'
      }],
      // 是否包邮
      isPost: 0,
      isSuportHuabei: 1,
      isSuportCard: 1,
      isSuportTics: 1,
      // 任务开展时间
      taskStarTime: '',
      // 投放数量
      num1: 1
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt1M
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sendTaskTwo
  padding-left 20px
  padding-right 20px
  .red
    color #FC1733
  .gray
    color #949494
  .must
    &:before
      content '*'
      color #FC1733
      font-size 20px
      vertical-align middle
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .warning
    height 36px
    background rgba(255, 171, 177, 0.4)
    color #FF3341
    font-size 12px
    line-height 36px
    padding-left 20px
    padding-right 20px
  .step
    padding 24px 140px 16px
    background #ffffff
    margin-bottom 1px
  .cont
    background #ffffff
    padding 20px
    min-width 900px
    .next
      margin-top 280px
      margin-bottom 20px
      text-align center
    .choosed
      font-size 14px
      color #444444
      text-align right
      height 30px
      line-height 30px
      b
        color #FD9D28
        padding-right 20px
        margin-right 20px
        border-right 2px solid #cccccc
      i
        display inline-block
        width 20px
        height 20px
        background red
        vertical-align middle
    h2
      font-size 16px
      line-height 1
      padding-top 16px
      padding-bottom 16px
      font-weight bold
      border-bottom 1px solid #dedede
    h4
      margin-top 20px
      margin-bottom 20px
      color #444444
    .step
      padding 20px
      font-size 14px
      color #3c3c3c
      .input
        margin-bottom 32px
        p
          font-size 12px
          color #9b9b9b
          margin-top 8px
          margin-left 77px
    .uploadImg
      margin-top 12px
      margin-bottom 32px
      width 120px
      height 150px
      border 1px solid #dedede
      text-align center
      .avatar
        width 120px
        height 120px
        display block
      .avatar-uploader-icon
        font-size 50px
        color #8c939d
        width 120px
        height 120px
        line-height 120px
        text-align center
      h3
        font-size 14px
        line-height 30px
        height 30px
        color #9b9b9b
        background #efefef
    .setFormat
      margin-top 32px
      margin-bottom 12px
    .table
      width 100%
      tr
        height 40px
        line-height 40px
        text-align center
      th
        border 1px solid #dedede
        background #fafafa
      td
        border 1px solid #dedede
        input
          width 100%
          outline none
          text-align center
    .checkBox
      height 14px
      line-height 1
      margin-top 20px
      margin-bottom 16px
    .payWay
      li
        font-size 14px
        color #444444
        height 14px
        margin-bottom 26px
        span
          display inline-block
          width 250px
    .keywordList
      padding-bottom 32px
      border-bottom 1px solid #cccccc
      .deleBtn
        float right
        font-size 20px
        cursor pointer
        margin-top 12px
      .searchBox
        padding 14px 20px
        border 1px solid #dedede
        box-shadow 0 1px 5px rgba(0, 0, 0, 0.12)
    .filter
      display flex
      .col
        flex 1
        margin-right 20px
        span
          display inline-block
          min-width 75px
          max-width 140px
        p
          margin-bottom 12px
      .col2
        max-width 260px
    .save
      text-align center
      margin-top 24px
    .addKeyword
      margin-top 28px
</style>