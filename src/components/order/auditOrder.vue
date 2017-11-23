<template>
  <div class="auditOrder">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'auditOrder' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="待确认订单" name="first">
          <div class="firstTab tabCont">
            <div class="search">
              <span>平台：</span>
              <el-select v-model="platform" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="京东" value="0">
                </el-option>
              </el-select>
              <span>店铺：</span>
              <el-select v-model="shopName" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="挡风沙旗舰店" value="0">
                </el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="searchKey" style="width:350px;">
                <template slot="prepend">
                  <el-select v-model="searchKeyType" placeholder="请选择" style="width:120px;">
                    <el-option label="任务编号" value="0">
                    </el-option>
                    <el-option label="子任务编号" value="1">
                    </el-option>
                    <el-option label="买家姓名" value="2">
                    </el-option>
                    <el-option label="买家手机号" value="3">
                    </el-option>
                    <el-option label="买家用户名" value="4">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
              <button class="btn" style="margin-left:40px;">查询</button>
            </div>
            <el-button plain>
              <span style="font-weight:600">导出excel</span>
            </el-button>
            <div class="tabItem" v-for="(item, index) in 3" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i></i>
                  <strong>&nbsp;&nbsp;挡风沙旗舰店</strong>
                </li>
                <li style="width:30%">
                  <span class="gray">任务编号: </span>
                  <span>98444654654654654564564454</span>
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
                  <div>
                    <span>&nbsp;&nbsp;安卓数据线</span>
                    <a class="blue" href="###">商品链接</a>
                    <p>&nbsp;&nbsp;子任务编号：3412341234-334212561</p>
                  </div>
                </li>
                <li>
                  <a href="http://img15.3lian.com/2015/h1/299/86.jpg" target="_blank">
                    <img src="http://img15.3lian.com/2015/h1/299/86.jpg" alt="">
                  </a>
                  <div>
                    <span>姓名：皇军</span>
                    <span>订单金额：58</span>
                    <p>京东订单编号：3412341234-334212561&nbsp;&nbsp;
                      <span class="blue copy" data-clipboard-text='123' @click="doCopy">复制</span>
                    </p>
                    <p>京东用户名：笨拙的长颈鹿</p>
                    <p>手机号：15700114444</p>
                  </div>
                </li>
                <li>
                  <p>
                    <button class="btn btn-small" @click="toConfirm('type1')">确认</button>
                  </p>
                  <p>
                    <button class="btn btn-small disabled" @click="showReturn=true">驳回</button>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待买家评价" name="second">
          <div class="secondTab tabCont">
            <div class="search">
              <span>平台：</span>
              <el-select v-model="platform" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="京东" value="0">
                </el-option>
              </el-select>
              <span>店铺：</span>
              <el-select v-model="shopName" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="挡风沙旗舰店" value="0">
                </el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="searchKey" style="width:350px;">
                <template slot="prepend">
                  <el-select v-model="searchKeyType" placeholder="请选择" style="width:120px;">
                    <el-option label="任务编号" value="0">
                    </el-option>
                    <el-option label="子任务编号" value="1">
                    </el-option>
                    <el-option label="买家姓名" value="2">
                    </el-option>
                    <el-option label="买家手机号" value="3">
                    </el-option>
                    <el-option label="买家用户名" value="4">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
              <button class="btn" style="margin-left:40px;">查询</button>
            </div>
            <div class="tabItem" v-for="(item, index) in 3" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i></i>
                  <strong>&nbsp;&nbsp;挡风沙旗舰店</strong>
                </li>
                <li style="width:30%">
                  <span class="gray">任务编号: </span>
                  <span>98444654654654654564564454</span>
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
              <ul class="contType2">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511344372676&di=efa5889acb8cecfcf8222d867cd5f941&imgtype=0&src=http%3A%2F%2Fimg2.gao7.com%2Ffiles%2Fappleimage%2F277%2F277E8E4B-D0AD-4956-BF23-98987E2ADA88.jpg" alt="">
                  <div>
                    <p>姓名：皇军</p>
                    <p>京东用户名：笨拙的长颈鹿</p>
                    <p>手机号：15700177777</p>
                    <p>子任务编号：3412341234-334212561</p>
                  </div>
                </li>
                <li>
                  <a href="http://img15.3lian.com/2015/h1/299/86.jpg" target="_blank">
                    <img src="http://img15.3lian.com/2015/h1/299/86.jpg" alt="">
                  </a>
                  <div>
                    <p>京东订单编号：</p>
                    <p class="red">3412341234-334212561</p>
                    <p>订单金额：
                      <span class="red">68</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="evaluateText">
                    <b>图文好评</b>
                    <p>东西很不错，下次继续光顾哟， 东西很不错，下次继续光顾哟 东西很不错，下次继续光顾哟 有欧</p>
                  </div>
                  <div class="imgs" v-if="1">
                    <a v-for="(item, index) in 4" :key="index" href="http://img15.3lian.com/2015/h1/299/86.jpg" target="_blank">
                      <img src="http://img15.3lian.com/2015/h1/299/86.jpg" alt="">
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已驳回" name="third">
          <div class="thirdTab tabCont">
            <div class="search">
              <span>平台：</span>
              <el-select v-model="platform" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="京东" value="0">
                </el-option>
              </el-select>
              <span>店铺：</span>
              <el-select v-model="shopName" placeholder="请选择" style="margin-right: 20px;width:180px;">
                <el-option label="全部" value="">
                </el-option>
                <el-option label="挡风沙旗舰店" value="0">
                </el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="searchKey" style="width:350px;">
                <template slot="prepend">
                  <el-select v-model="searchKeyType" placeholder="请选择" style="width:120px;">
                    <el-option label="任务编号" value="0">
                    </el-option>
                    <el-option label="子任务编号" value="1">
                    </el-option>
                    <el-option label="买家姓名" value="2">
                    </el-option>
                    <el-option label="买家手机号" value="3">
                    </el-option>
                    <el-option label="买家用户名" value="4">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
              <button class="btn" style="margin-left:40px;">查询</button>
            </div>
            <div class="tabItem" v-for="(item, index) in 3" :key="index">
              <ul class="head">
                <li style="width:20%">
                  <i></i>
                  <strong>&nbsp;&nbsp;挡风沙旗舰店</strong>
                </li>
                <li style="width:30%">
                  <span class="gray">任务编号: </span>
                  <span>98444654654654654564564454</span>
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
              <ul class="cont contType3">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511344372676&di=efa5889acb8cecfcf8222d867cd5f941&imgtype=0&src=http%3A%2F%2Fimg2.gao7.com%2Ffiles%2Fappleimage%2F277%2F277E8E4B-D0AD-4956-BF23-98987E2ADA88.jpg" alt="">
                  <div>
                    <span>&nbsp;&nbsp;安卓数据线</span>
                    <a class="blue" href="###">商品链接</a>
                    <p>&nbsp;&nbsp;子任务编号：3412341234-334212561</p>
                  </div>
                </li>
                <li>
                  <a href="http://img15.3lian.com/2015/h1/299/86.jpg" target="_blank">
                    <img src="http://img15.3lian.com/2015/h1/299/86.jpg" alt="">
                  </a>
                  <div>
                    <span>姓名：皇军</span>
                    <span>订单金额：58</span>
                    <p>京东订单编号：3412341234-334212561&nbsp;&nbsp;
                      <span class="blue copy" data-clipboard-text='123' @click="doCopy">复制</span>
                    </p>
                    <p>京东用户名：笨拙的长颈鹿</p>
                    <p>手机号：15700114444</p>
                  </div>
                </li>
                <li>
                  <div>
                    <b class="gray">驳回原因：</b>
                    <el-tooltip popper-class="tooltipItem" effect="dark" content="这就几个字，更多可悬停 急的这就几个字，更多可悬停 急" placement="top" style="400px">
                      <p>：这就几个字，更多可悬停 急的..：这就几个字，更多可悬停 急的....</p>
                    </el-tooltip>
                  </div>
                  <div>
                    <b class="gray">解决方案：</b>
                    <el-tooltip popper-class="tooltipItem" effect="dark" content="Top Center 提示文字" placement="top" style="400px">
                      <p>：这就几个字，更多可悬停 急的..：这就几个字，更多可悬停 急的....</p>
                    </el-tooltip>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
    <div class="alertGroup">
      <!-- 驳回提示框 -->
      <el-dialog class="alertReturn" title="确认驳回订单" :modal-append-to-body="false" :visible.sync="showReturn" width="600px">
        <h2>客服会在 12 小时内联系买家处理，若买家不予处理，将扣除买家佣金！</h2>
        <ul class="cont">
          <li>
            <span>驳回理由</span>
            <el-select v-model="returnBackObj.reason" placeholder="请选择驳回理由" style="width:320px;">
              <el-option label="京东评价内容与审核内容不一致" value="0">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>理由备注</span>
            <el-input type="textarea" :rows="2" placeholder="请输入驳回理由备注" v-model="returnBackObj.common" style="width:320px;" resize="none">
            </el-input>
          </li>
          <li>
            <span>修改方案</span>
            <el-input type="textarea" :rows="4" placeholder="请输入修改方案" v-model="returnBackObj.plan" style="width:320px;" resize="none">
            </el-input>
          </li>
        </ul>
        <div class="footBtns">
          <button class="btn" @click="showReturn = false">确认</button>
          <button class="btn disabled" @click="showReturn = false">取消</button>
        </div>
      </el-dialog>
      <!-- 确认通过订单 -->
      <el-dialog class="alertConfirm" title="确认通过订单" :modal-append-to-body="false" :visible.sync="showConfirm" width="600px">
        <h3>确认通过订单！</h3>
        <ul class="cont">
          <li>
            <span>评价方式：</span>
          </li>
          <!-- <li>
            <span>默认好评，买家无序做任何操作，确认后本金和佣金会打至买家平台账号</span>
          </li> -->
          <!-- <li>
            <span>五星+文字好评</span>
            <div>
              <el-input type="textarea" :rows="3" placeholder="请输入指定文字" v-model="confirmObj.evaluteText" style="width:320px;" resize="none">
              </el-input>
            </div>
          </li> -->
          <li>
            <span>五星+图片+文字好评</span>
            <div>
              <el-input type="textarea" :rows="3" placeholder="请输入指定文字" v-model="confirmObj.evaluteText" style="width:384px;" resize="none">
              </el-input>
            </div>
            <div class="imgCont">
              <img v-for="(item, index) in confirmObj.imgArr" :key="index" :src="item" class="avatar">
              <el-upload class="imgUpload" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <i class="add el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </li>
        </ul>
        <div class="footBtns">
          <button class="btn" @click="sureToConfirm('type1')">确认</button>
          <button class="btn disabled" @click="showConfirm = false">取消</button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Clipboard from 'clipboard'
// import Md5 from 'md5'
export default {
  name: 'auditOrder',
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      platform: '',
      shopName: '',
      searchKey: '',
      searchKeyType: '0',
      // 驳回弹窗
      showReturn: false,
      returnBackObj: {
        reason: '',
        common: '',
        plan: ''
      },
      // 确认订单弹框
      showConfirm: false,
      confirmObj: {
        evaluteText: '',
        imgArr: []
      }
    }
  },
  methods: {
    doCopy () {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
      })
    },
    toConfirm (type) {
      this.showConfirm = true
    },
    sureToConfirm (type) {
      this.showConfirm = false
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      this.confirmObj.imgArr.push(URL.createObjectURL(file.raw))
      console.log(this.confirmObj.imgArr)
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.auditOrder
  padding 0 20px 20px
  font-size 14px
  .red
    color #FC1733
  .gray
    color #949494
  .blue
    color #179FFF
    cursor pointer
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .tab
    background #ffffff
  .tabCont
    padding 20px
    .search
      margin-bottom 20px
    .tabItem
      border 1px solid #DFF0FD
      margin-top 12px
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
        padding 20px
        font-size 14px
        li
          display flex
          padding-left 30px
          border-left 1px solid #dedede
          &:first-child
            flex 1.5
            padding-left 0
            padding-top 20px
            border-left none
            img
              width 60px
              height 60px
            span, a, p
              line-height 30px
          &:nth-child(2)
            flex 2
            a>img
              width 60px
              height 106px
              margin-right 20px
            span, p
              line-height 24px
              margin-right 20px
          &:nth-child(3)
            flex 1
            flex-direction column
            justify-content center
            align-items center
            button
              margin-top 12px
              margin-bottom 12px
      .contType2
        display flex
        padding 20px
        font-size 14px
        li
          display flex
          padding-left 30px
          border-left 1px solid #dedede
          &:first-child
            flex 1.5
            padding-left 0
            border-left none
            img
              width 60px
              height 60px
              margin-top 30px
              margin-right 14px
            p
              line-height 30px
          &:nth-child(2)
            flex 1
            a>img
              width 60px
              height 106px
              margin-right 20px
            p
              line-height 30px
          &:nth-child(3)
            flex 1.5
            flex-direction column
            justify-content center
            padding-left 30px
            .evaluateText
              display flex
              b
                height 20px
                line-height 20px
                padding-right 14px
                margin-right 14px
                border-right 1px solid #9b9b9b
              p
                flex 1
                line-height 20px
            a>img
              width 64px
              height 64px
              border-radius 4px
              margin-right 16px
              margin-top 16px
      .contType3
        li
          &:nth-child(3)
            flex 1
            flex-direction column
            justify-content center
            align-items center
            button
              margin-top 12px
              margin-bottom 12px
            >div
              display flex
              b
                height 20px
                line-height 20px
                padding-right 14px
                margin-right 14px
                border-right 1px solid #9b9b9b
              p
                flex 1
                max-width 200px
                line-height 20px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
              &:first-child
                border-bottom 1px solid #9b9b9b
                padding-bottom 16px
                margin-bottom 16px
  .pager
    padding 20px
  .alertGroup
    .footBtns
      text-align center
    .alertReturn
      h2
        padding 0 20px
        font-size 16px
        color #9b9b9b
      .cont
        padding 20px
        li
          margin-bottom 12px
          span
            margin-right 24px
            vertical-align top
            line-height 30px
    .alertConfirm
      h3
        font-size 14px
        padding 0 20px
        font-weight 600
      .cont
        padding 20px
        margin-bottom 20px
        display flex
        li
          span
            line-height 30px
          &:first-child
            width 70px
          &:last-child
            flex 1
            .imgCont
              margin-top 12px
              .imgUpload
                display inline-block
                vertical-align top
                width 120px
                height 120px
                background #fafafa
                border-radius 4px
                text-align center
                border 1px solid #dedede
                .add
                  width 120px
                  height 120px
                  font-size 60px
                  line-height 120px
                  color #dedede
              .avatar
                width 120px
                height 120px
                margin-right 12px
</style>
