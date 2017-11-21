<template>
  <div>
    <ul>
      <li>
        时间:
        <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </li>
      <li>
        备注:
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <button class="btn">查询</button>
      </li>
    </ul>
    <div class="actTab">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" align="center" label="流水编号">
        </el-table-column>
        <el-table-column prop="pay" align="center" label="充值">
        </el-table-column>
        <el-table-column prop="cash" align="center" label="提现">
        </el-table-column>
        <el-table-column prop="type" align="center" label="类型">
        </el-table-column>
        <el-table-column prop="balance" align="center" label="结余">
        </el-table-column>
        <el-table-column prop="sureTime" align="center" label="确认时间">
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span class="tipSmall" :class="scope.row.JDStatus==='成功' ? 'tipSuccess' : scope.row.JDStatus==='失败' ? 'tipError' : '--'">{{scope.row.JDStatus}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'payTixian',
  data () {
    return {
      value3: '',
      tableData: [{
        number: '5645464646546',
        pay: '100.00',
        cash: '1100.00',
        type: '佣金',
        balance: '100.00',
        sureTime: '2017-11-15 20:30:30',
        JDStatus: '成功'
      }],
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
ul
  margin-top 40px
  display flex
  border-bottom 1px solid #e5e5e5
  padding-bottom 24px
  li
    margin-right 20px
.actTab
  margin-top 24px
</style>