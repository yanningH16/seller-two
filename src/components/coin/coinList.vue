<template>
  <div class="wrap">
    <div class="shop">
      <em class="gray">资金管理</em>>银行卡管理
    </div>
    <div class="personBank">
      <h3>银行卡管理</h3>
      <p class="affirms">该绑定的银行卡将用于提现,请认真核实好银行卡信息,确保信息准确无误</p>
      <ul class="addBank">
        <li class="add" @click="addbank=true">
          <span>+</span>
          <p>添加一张银行卡</p>
        </li>
        <li class="pic">
          <p class="acquiescence" v-show="acquies">默认银行卡</p>
          <p class="name">张大仙</p>
          <p class="number">0210</p>
          <p class="work" @click="dialogFormVisible=true">编辑</p>
        </li>
      </ul>
    </div>
    <!-- 添加银行卡的弹框 -->
    <div class="bank">
      <el-dialog title="添加银行卡" :visible.sync="addbank" :modal-append-to-body='false' width="40%">
        <el-form :model="form">
          <el-form-item label="银行">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="招商银行" value="shanghai"></el-option>
              <el-option label="农业银行" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-checkbox v-model="checked" style="margin-left:40px">设为默认银行卡</el-checkbox>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addbank = false">取 消</el-button>
          <el-button type="danger" @click="addSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 点击编辑出现的框 -->
    <div class="bank">
      <el-dialog title="编辑银行卡" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="40%">
        <el-form :model="form">
          <el-form-item label="银行">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-checkbox v-model="checked" style="margin-left:40px">设为默认银行卡</el-checkbox>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger">确认修改</el-button>
          <el-button>删除银行卡</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'coinList',
  data () {
    return {
      checked: true,
      dialogFormVisible: false,
      addbank: false,
      acquies: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    addSure () {
    },
    work () {

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
    padding-bottom 300px
    h3
      padding-top 40px
      font-size 16px
      color rgba(68, 68, 68, 1)
      border-bottom 1px solid #e5e5e5
      padding-bottom 12px
    .affirms
      font-size 12px
      color #ff2933
      float right
      margin-top -20px
    .addBank
      width 710px
      // border 1px solid red
      margin-left 25%
      margin-top 94px
      .add
        width 342px
        height 206px
        background #fafafa
        cursor pointer
        span
          width 80px
          height 80px
          border 1px dashed #ddeedd
          display inline-block
          text-align center
          line-height 80px
          margin-left 35%
          margin-top 15%
          font-size 30px
        p
          margin-left 32%
          margin-top 10px
      .pic
        background-image url('../../assets/image/gongshang.png')
        width 342px
        height 206px
      li
        float left
        margin-left 10px
        margin-top 10px
        position relative
        .acquiescence
          position relative
          top 60px
          left 100px
          color #ffffff
          font-size 12px
          font-weight 100
          color white
        .name
          position absolute
          top 43px
          right 24px
          font-size 16px
          color white
        .number
          position absolute
          top 96px
          right 24px
          font-size 24px
          color white
        .work
          position absolute
          width 60px
          height 30px
          border 1px solid #ffffff
          border-radius 4px
          line-height 30px
          text-align center
          bottom 16px
          right 20px
          color white
          cursor pointer
</style>