<template>
  <div class="sendTaskTwo" ref="sendTaskTwo">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'overView' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'overView' }">总览</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!isReturnBack">发布垫付任务</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isReturnBack">修改垫付任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <div class="warning" v-if="warnShow && !isReturnBack">
      <i class="el-icon-warning"></i>
      <span style="margin-left:20px;margin-right:40px;">(1) 当日18点前发布的任务，当日审核通过后进行分发。</span>
      <span>（2）当日22点后发布的任务，将在当日审核后于次日8点起开始。</span>
      <b class="el-icon-close" style="float:right;margin-top:14px;font-weight: bold" @click="warnShow=false"></b>
    </div> -->
    <div class="step" v-if="!isReturnBack">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="选择任务类型"></el-step>
        <el-step title="填写任务信息"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="发布成功"></el-step>
      </el-steps>
    </div>
    <div class="returnBack" style="background:rgba(255, 171, 177, 0.2);color:#FF3341;" v-if="isReturnBack">
      <div>驳回原因：</div>
      <p>{{ returnBackObj.comment }}</p>
    </div>
    <div class="cont" ref="cont">
      <div class="choosed">
        <span>已选择: </span>
        <b>{{ creatShopInfo.taskType == 1 ? '手机京东' : creatShopInfo.taskType == 2 ? '微信京东' : creatShopInfo.taskType == 3 ? '手淘App' : '其他' }}&nbsp;&nbsp;垫付任务</b>
        <i :class="{ 'jdIcon': creatShopInfo.shopType==0, 'taobaoIcon': creatShopInfo.shopType==1, 'tianmaoIcon': creatShopInfo.shopType==2 }"></i>
        <span>{{ creatShopInfo.shopName }}</span>
      </div>
      <h2>第一步: 填写商品信息</h2>
      <div class="step step1">
        <div class="input" ref="input">
          <span class="must">商品标题：</span>
          <el-input placeholder="请输入内容" v-model="sendObj.productName" style="width:600px;">
            <span slot="suffix" style="line-height:40px;">{{ sendObj.productName.length }}/20</span>
          </el-input>
          <p>请输入试用商品简称，不要和京东/淘宝商品名相同，防止买手直接搜索名称购买</p>
        </div>
        <div class="input">
          <span class="must">商品链接：</span>
          <el-input placeholder="请输入内容" v-model="sendObj.productUrl" style="width:600px;"></el-input>
          <strong v-show="!(creatShopInfo.taskType==3)" class="readShopInfo" @click="readShopInfo">读取链接信息</strong>
          <p>我们会根据您填写的试用商品链接抓取部分商品的宝贝描述。</p>
        </div>
        <div class="input">
          <span class="must">商品主图：上传的商品将会展示在平台，图片大小为
            <b class="red">600*600</b>，格式jpg/png/gif，图片大小
            <b class="red">1M</b>以内</span>
          <div class="uploadImg">
            <h3>商品展示图</h3>
            <el-upload class="avatar-uploader" ref="upload" action="" :show-file-list="false" :http-request="uploadImg" :before-upload="beforeAvatarUpload">
              <img v-if="sendObj.productPicUrl" :src="sendObj.productPicUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <span class="must">商品类目</span>
          <div v-if="creatShopInfo.shopType==0" style="display: inline-block;">
            <el-select v-model="classValue.classOne" value-key="id" placeholder="请选择" style="width:140px;margin-left:12px;" @change="chooseClass(1)">
              <el-option :label="classValue.classOne.className" :value="classValue.classOne">
              </el-option>
              <el-option v-for="(item, index) in classObj.classOne" :key="index" :label="item.className" :value="item">
              </el-option>
            </el-select>
            <el-select v-model="classValue.classTwo" value-key="id" placeholder="请选择" style="width:140px;margin-left:12px;" @change="chooseClass(2)">
              <el-option :label="classValue.classTwo.className" :value="classValue.classTwo">
              </el-option>
              <el-option v-for="(item, index) in classObj.classTwo" :key="index" :label="item.className" :value="item">
              </el-option>
            </el-select>
            <el-select v-model="classValue.classThree" value-key="id" placeholder="请选择" style="width:140px;margin-left:12px;" @change="chooseClass(3)">
              <el-option :label="classValue.classThree.className" :value="classValue.classThree">
              </el-option>
              <el-option v-for="(item, index) in classObj.classThree" :key="index" :label="item.className" :value="item">
              </el-option>
            </el-select>
          </div>
          <div v-else style="display: inline-block;">
            <el-select v-model="classValue.classOne" value-key="id" placeholder="请选择" style="width:140px;margin-left:12px;" @change="chooseTbClass(1)">
              <el-option v-for="(item, index) in classObj.classOne" :key="index" :label="item.className" :value="item">
              </el-option>
            </el-select>
            <el-select v-model="classValue.classTwo" value-key="id" placeholder="请选择" style="width:140px;margin-left:12px;" @change="chooseTbClass(2)">
              <el-option v-for="(item, index) in classObj.classTwo" :key="index" :label="item.className" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="setFormat">
            <span class="must">设置商品规格
              <b class="gray">（若手机和pc端的价格不一致，请填写手机端价格）</b>
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
                <input type="number" v-model="sendObj.productShowPrice" :disabled="isReturnBack" placeholder="请填写">
              </td>
              <td>
                <input type="number" v-model="sendObj.productOrderPrice" :disabled="isReturnBack" @blur="getPrice" placeholder="请填写">
              </td>
              <td>
                <input type="number" v-model="sendObj.numPerOrder" :disabled="isReturnBack" @blur="getPrice" placeholder="请填写">
              </td>
              <td>
                <input type="text" v-model="sendObj.productFormat" @focus="productFormat(1)" @blur="productFormat(0)" :disabled="isReturnBack" placeholder="任意规格(按照试用价格下单)">
              </td>
            </tr>
          </table>
          <el-radio-group v-model="sendObj.isPostageFree" :disabled="isReturnBack">
            <div class="checkBox">
              <el-radio :label="0">
                <b style="color: #3c3c3c">商品本身不包邮</b>
                <span class="gray">（买家无需联系客服，商家额外支付{{ priceObj.postPrice || 10 }}元／单作为运费押金，任务完成后剩余的运费押金将返还给商家）</span>
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
            <li v-if="creatShopInfo.shopType==0">
              <span>是否允许买家使用白条付款</span>
              <el-radio-group v-model="sendObj.isSupportBaiTiao">
                <el-radio :label="1">
                  <b style="color: #3c3c3c">允许</b>
                </el-radio>
                <el-radio :label="0">
                  <b style="color: #3c3c3c">不允许</b>
                </el-radio>
              </el-radio-group>
            </li>
            <li v-else>
              <span>是否允许买家使用花呗付款</span>
              <el-radio-group v-model="sendObj.isSupportBaiTiao">
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
              <el-radio-group v-model="sendObj.isSupportCredit">
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
              <el-radio-group v-model="sendObj.isSupportTicket">
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
        <ul v-if="creatShopInfo.shopType==0" class="keywordList" v-for="(item, index) in keywordList" :key="index">
          <li>
            <span class="must">关键词来源{{ index+1 }}：让买手在
              <b class="red">京东APP</b>搜索关键字&nbsp;&nbsp;</span>
            <el-input style="width:340px;" v-model="item.keyword" placeholder="请输入搜索关键字"></el-input>
            <span v-if="index!==0" class="el-icon-delete deleBtn" @click="deleKeyArr(index)"></span>
          </li>
          <!-- <li style="margin-top:24px;margin-bottom:14px;">
              <el-button type="text" @click="item.showSearch = !item.showSearch">{{ item.showSearch ? '搜索范围' : '查看搜索范围' }}&nbsp;&nbsp;</el-button>
              <b class="gray">&nbsp;&nbsp;若关键词排名较低，请务必设置此项，以便设置能找到商品</b>
            </li> -->
          <li class="searchBox" v-show="item.showSearch" :key="index">
            <span>排序方式：</span>
            <el-select placeholder="请选择" v-model="item.sortClass" style="width: 140px;">
              <el-option label="综合排序" value="综合排序">
              </el-option>
              <el-option label="价格排序" value="价格排序">
              </el-option>
            </el-select>
            <b class="gray">
              &nbsp;&nbsp;推荐按销量排序查找，商品位置更稳定更好找
            </b>
            <!-- <i class="deleBtn el-icon-circle-close-outline" @click="item.showSearch = false"></i> -->
            <h4>买家通过
              <span class="red">价格筛选，发货地</span>缩小范围</h4>
            <div class="filter">
              <div class="col col1">
                <p>
                  <span>价格:</span>&nbsp;
                  <el-input style="width:140px;" type="number" v-model="item.priceLow" placeholder="请输入价格"></el-input>
                  —
                  <el-input style="width:140px;" type="number" v-model="item.priceHigh" placeholder="请输入价格"></el-input>&nbsp;元</p>
                <p>
                  <span>评价数约:</span>&nbsp;
                  <el-input style="width:140px;" type="number" v-model="item.favorNum" placeholder="请输入数量"></el-input>
                </p>
              </div>
              <div class="col col2">
                <p>
                  <span>发货地:</span>&nbsp;
                  <el-select placeholder="请选择" v-model="item.postLocation" style="width: 140px;">
                    <el-option v-for="(address, i) in positionArr" :key="i" :label="address.name" :value="address.name">
                    </el-option>
                  </el-select>
                </p>
                <p>
                  <span>目标翻页数:</span>&nbsp;
                  <el-input style="width:140px;" type="number" v-model="item.pageNum" placeholder="请输入数量"></el-input>
                </p>
              </div>
              <div class="col col3">
                <p>
                  <span>品牌:</span>&nbsp;
                  <el-input style="width:140px;" v-model="item.brand" placeholder="请输入品牌"></el-input>
                </p>
              </div>
            </div>
            <!-- <div class="save">
                  <button class="btn btn-small" @click="saveKey(index)">保存</button>
                </div> -->
          </li>
          <!-- </transition-group> -->
        </ul>
        <ul v-if="creatShopInfo.shopType==1 || creatShopInfo.shopType==2" class="keywordList" v-for="(item, index) in keywordList" :key="index">
          <li>
            <span class="must">关键词来源{{ index+1 }}：让买手在
              <b class="red">淘宝APP</b>搜索关键字&nbsp;&nbsp;</span>
            <el-input style="width:340px;" v-model="item.keyword" placeholder="请输入搜索关键字"></el-input>
            <!-- <span v-if="index!==0" class="el-icon-delete deleBtn" @click="deleKeyArr(index)"></span> -->
          </li>
          <li class="searchBox" v-show="item.showSearch" :key="index">
            <span>排序方式：</span>
            <el-select placeholder="请选择" v-model="item.sortClass" style="width: 140px;">
              <el-option label="综合排序" value="综合排序">
              </el-option>
              <el-option label="价格排序" value="价格排序">
              </el-option>
            </el-select>
            <b class="gray">
              &nbsp;&nbsp;推荐按销量排序查找，商品位置更稳定更好找
            </b>
            <h4>买家通过
              <span class="red">价格筛选，发货地</span>缩小范围</h4>
            <div class="filter">
              <div class="col col1">
                <p>
                  <span>价格:</span>&nbsp;
                  <el-input style="width:140px;" type="number" v-model="item.priceLow" placeholder="请输入价格"></el-input>
                  —
                  <el-input style="width:140px;" type="number" v-model="item.priceHigh" placeholder="请输入价格"></el-input>&nbsp;元</p>
              </div>
              <div class="col col2">
                <p>
                  <span>发货地:</span>&nbsp;
                  <el-select placeholder="请选择" v-model="item.postLocation" style="width: 140px;">
                    <el-option v-for="(address, i) in positionArr" :key="i" :label="address.name" :value="address.name">
                    </el-option>
                  </el-select>
                </p>
              </div>
              <div class="col col3">
                <p>
                  <span>付款人数:</span>&nbsp;
                  <el-input type="number" style="width:140px;" v-model="item.pageNum" placeholder="请输入人数"></el-input>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <!-- </transition-group> -->
        <!-- <div class="addKeyword">
          <el-button type="text" @click="addKeyArr">
            <i class="el-icon-circle-plus"></i>
            可多添加{{ 5-keywordList.length }}个搜索关键词方案
          </el-button>
          <span class="gray">(最多可添加5组关键词方案)</span>
        </div> -->
      </div>
      <h2 v-if="!isReturnBack">第三步: 选择任务类型与单数</h2>
      <div v-if="!isReturnBack" id="taskTwoDisabled" class="step step3 taskTwoDisabled">
        <span>任务开展时间&nbsp;:&nbsp;</span>
        <el-date-picker v-model="taskStarTime" :picker-options="timeOption" @change="setTaskStarTime" type="date" placeholder="选择日期" format="yyyy/MM/dd">
        </el-date-picker>
        <table class="dateTable">
          <tr>
            <th colspan="7">{{ newTaskStarTime }}</th>
          </tr>
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
          <tr v-for="(items, indexs) in timeArr" :key="indexs">
            <td v-for="(item, index) in items.line" :key="index">
              <div v-if="item.day!=''">
                <b>{{ item.day }}</b>
                <p>投放数量</p>
                <div class="numAdd">
                  <span class="l" @click="dele(indexs, index)">－</span>
                  <input type="number" v-model="item.num" @input="watchNum(indexs, index, item.num)">
                  <span class="r" @click="add(indexs, index)">+</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <span class="must">总计{{ sendTotalNum }}单任务，其中：</span>
        <div class="total">
          <div class="checkList">
            <div class="check">
              <el-checkbox v-model="setFavorNumObj.wordFavor.checked" @change="setFavorNum">
                <span>五星+文字好评（{{ priceObj.wordPrice || 11 }}元 / 单）</span>
              </el-checkbox>
            </div>
            <div class="check">
              <el-checkbox v-model="setFavorNumObj.picFavor.checked" @change="setFavorNum">
                <span>五星+图片+文字好评（{{ priceObj.graphicPrice || 12 }}元 / 单）</span>
              </el-checkbox>
            </div>
            <div class="check">
              <el-checkbox v-model="setFavorNumObj.defaultFavor.checked" @change="setFavorNum(1)">
                <span>默认好评（{{ priceObj.defaultPrice || 10 }}元 / 单）</span>
              </el-checkbox>
            </div>
          </div>
          <div class="checkList">
            <div class="check">
              <span>设置执行人数&nbsp;:&nbsp;</span>
              <el-input style="width:140px;" v-model="setFavorNumObj.wordFavor.num" @input="setFavorNum" placeholder="请输入人数"></el-input>
            </div>
            <div class="check">
              <span>设置执行人数&nbsp;:&nbsp;</span>
              <el-input style="width:140px;" v-model="setFavorNumObj.picFavor.num" @input="setFavorNum" placeholder="请输入人数"></el-input>
            </div>
            <div class="check">
              <span>设置执行人数&nbsp;:&nbsp;</span>
              <span class="red" style="height:40px;line-height:40px">{{ setFavorNumObj.defaultFavor.num }}</span>人
              <!-- <el-input style="width:140px;" readonly v-model="setFavorNumObj.defaultFavor.num" placeholder="请输入人数"></el-input> -->
            </div>
          </div>
        </div>
        <div v-if="creatShopInfo.shopType==0">
          <span class="must" @click="aaa">设置买号类型：</span>
          <div class="buyerType">
            <el-radio-group v-model="buyerType">
              <p>
                <el-radio :label="1">全员为plus (+{{ priceObj.plusPrice || 3 }}元 / 单)</el-radio>
              </p>
              <p>
                <el-radio :label="0">非plus会员</el-radio>
              </p>
            </el-radio-group>
          </div>
        </div>
      </div>
      <h2 v-if="!isReturnBack && creatShopInfo.shopType!=0">第四步: 增值服务</h2>
      <div v-if="!isReturnBack && creatShopInfo.shopType!=0" class="step step4">
        <ul class="server">
          <li>
            <el-checkbox @change="cancelArea" v-model="increaseObj.area.checked">地域限制</el-checkbox>
            <span class="red">(所选区域不可接该任务)+0.1元 / 单</span>
          </li>
          <li v-show="increaseObj.area.checked">
            <ul class="area">
              <li style="background:#EDEDED;">编辑区域</li>
              <li v-for="(item,index) in increaseObj.area.areaArr" :key="index">
                <el-checkbox @change="chooseAreaArr(index,item.checked)" class="bold" v-model="item.checked">{{ item.area }}</el-checkbox>
                <el-checkbox-group style="display:inline-block;" v-model="item.chooseArr">
                  <el-checkbox @change="isCheckAreaBox" v-for="(add, i) in item.arr" :key="i" :label="add"></el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
          </li>
          <li>
            <el-checkbox v-model="increaseObj.age.checked">年龄设置</el-checkbox>
            <span class="red">(选定年龄段内的用户可接该任务)+0.5 元 / 单</span>
          </li>
          <li v-show="increaseObj.age.checked">
            <el-radio v-model="increaseObj.age.chooseAge" label="0">18岁以下</el-radio>
            <el-radio v-model="increaseObj.age.chooseAge" label="1">18-25岁以下</el-radio>
            <el-radio v-model="increaseObj.age.chooseAge" label="2">26-35岁以下</el-radio>
            <el-radio v-model="increaseObj.age.chooseAge" label="3">36岁以下</el-radio>
          </li>
          <li>
            <el-checkbox v-model="increaseObj.gender.checked">性别设置</el-checkbox>
            <span class="red">(选定性别可接该任务)+0.5 元 / 单</span>
          </li>
          <li v-show="increaseObj.gender.checked">
            <el-radio v-model="increaseObj.gender.chooseGender" label="1">男</el-radio>
            <el-radio v-model="increaseObj.gender.chooseGender" label="2">女</el-radio>
          </li>
          <li>
            <el-checkbox v-model="increaseObj.allowZhuan.checked"></el-checkbox>
            <span class="red">仅限钻石级别的买号可接该任务+0.5元／单</span>
          </li>
          <li>
            <el-checkbox v-model="increaseObj.allowHuaBei.checked"></el-checkbox>
            <span class="red">仅限开通花呗的买号可接该任务+2元／单(指已开通花呗的用户，账号安全，权重高)</span>
          </li>
        </ul>
      </div>
      <div style="padding:20px;">
        <span>任务备注&nbsp;:&nbsp;</span>
        <el-input v-model="taskCommon" style="width:340px;" placeholder="请输入备注"></el-input>
      </div>
      <div class="next" v-if="!isReturnBack">
        <button class="btn disab" @click="doPrevent">上一步</button>
        <button class="btn" :disabled="postFinish" @click="doNext">
          <em v-if="postFinish" class="el-icon-loading"></em>
          <em v-else>下一步</em>
        </button>
        <!-- <button class="btn" :class="{'disab': !(shop && taskType)}" :disab="!(shop && taskType)" @click="doNext">下一步</button> -->
      </div>
      <div class="next" v-if="isReturnBack">
        <button class="btn disab" @click="$router.push({name: 'overView'})">取消</button>
        <button class="btn" @click="sureToFix">确认</button>
        <!-- <button class="btn" :class="{'disab': !(shop && taskType)}" :disab="!(shop && taskType)" @click="doNext">下一步</button> -->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getImgSize, uploadPromise, uploadFile } from '../../../assets/js/upload'
export default {
  name: 'sendTaskTwo',
  data () {
    return {
      // 下一步不可用
      postFinish: false,
      warnShow: true,
      // 是否驳回
      isReturnBack: false,
      active: 1,
      // 获取的价格对象
      priceObj: {},
      // 商品分类对象
      classObj: {
        classOne: [],
        classTwo: [],
        classThree: []
      },
      // 商品选择
      classValue: {
        classOne: {
          className: '',
          id: ''
        },
        classTwo: {
          className: '',
          id: ''
        },
        classThree: {
          className: '',
          id: ''
        }
      },
      // 地址对象数组
      positionArr: [],
      // 任务开展时间
      taskStarTime: '',
      timeOption: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      // 日历数组
      timeArr: [],
      // 复选框的以选择数组
      taskTotal: [],
      // 设置买号类型
      buyerType: 0,
      // 关键词数组
      keywordList: [{
        showSearch: true,
        keyword: '', // 关键词
        sortClass: '', // 排序方式
        priceHigh: '', // 价格区间高
        priceLow: '', // 价格区间低
        brand: '', // 品牌
        postLocation: '', // 发货地
        favorNum: '', // 评价数
        pageNum: '' // 翻页数
      }],
      // 执行人数数组
      setFavorNumObj: {
        wordFavor: {
          checked: false,
          num: 0
        },
        picFavor: {
          checked: false,
          num: 0
        },
        defaultFavor: {
          checked: true,
          num: 0
        }
      },
      // 创建店铺的信息
      creatShopInfo: {},
      // 增值服务对象
      increaseObj: {
        area: {
          checked: false,
          areaArr: [{
            checked: false,
            chooseArr: [],
            area: '华东',
            arr: ['上海市', '江苏省', '浙江省', '安徽省', '江西省']
          }, {
            checked: false,
            chooseArr: [],
            area: '华北',
            arr: ['北京市', '天津市', '山西省', '山东省', '河北省', '内蒙古']
          }, {
            checked: false,
            chooseArr: [],
            area: '华中',
            arr: ['湖南省', '湖北省', '河南省']
          }, {
            checked: false,
            chooseArr: [],
            area: '华南',
            arr: ['广东省', '广西', '福建省', '海南省']
          }, {
            checked: false,
            chooseArr: [],
            area: '东北',
            arr: ['辽宁省', '吉林省', '黑龙江']
          }, {
            checked: false,
            chooseArr: [],
            area: '西北',
            arr: ['陕西省', '新疆', '甘肃省', '宁夏', '青海省']
          }, {
            checked: false,
            chooseArr: [],
            area: '西南',
            arr: ['重庆市', '云南省', '贵州省', '西藏', '四川省']
          }]
        },
        age: {
          checked: false,
          chooseAge: ''
        },
        gender: {
          checked: false,
          chooseGender: ''
        },
        allowZhuan: {
          checked: false
        },
        allowHuaBei: {
          checked: false
        }
      },
      taskCommon: '',
      sendObj: {
        productName: '', // 商品标题
        productUrl: '', // 商品链接
        productPicUrl: '', // 商品主图url
        productClassFirstId: '', // 商品一级类目id
        productClassSecondId: '', // 商品二级类目id
        productClassThirdId: '', // 商品三级类目id
        productClassFirstDesc: '', // 商品一级类目详细
        productClassSecondDesc: '', // 商品二级类目详细
        productClassThirdDesc: '', // 商品三级类目详细
        productShowPrice: '', // 商品展示价格
        productOrderPrice: '', // 商品下单价格
        numPerOrder: '', // 买家每单拍几件
        productFormat: '任意规格', // 商品规格
        isPostageFree: 1, // 是否包邮 0 - 否，1-是
        isSupportBaiTiao: 0, // 是否支持白条/花呗
        // isSupportHuabei: 0,
        isSupportCredit: 0, // 是否支持信用卡
        isSupportTicket: 0, // 是否支持优惠卷
        searchKeywordList: [{ // 关键词方案列表
          keyword: '', // 关键词
          sortClass: '', // 排序方式
          priceHigh: '', // 价格区间高
          priceLow: '', // 价格区间低
          brand: '', // 品牌
          postLocation: '', // 发货地
          favorNum: '', // 评价数
          pageNum: '' // 翻页数
        }],
        taskNumList: [{ // 任务数量列表
          time: '', // 2017-11-16
          num: '' // 投放数量
        }],
        totalNum: 0, // 全部投放数量
        wordFavorNum: 0, // 文字好评数量
        graphicWordFavorNum: 0, // 图文好评数量
        plusNum: '', // plus数量
        defaultFavorNum: 0, // 默认好评数量
        sellerTaskId: '', // 商家任务id
        throwTime: '' // 上线时间2017-11-19
      },
      // 被驳回的信息对象
      returnBackObj: {}
    }
  },
  watch: {
    sendDateList (val) {
      this.sendObj.taskNumList = val
    },
    sendTotalNum (val) {
      this.sendObj.totalNum = val
      this.setFavorNumObj.defaultFavor.num = val
      this.setFavorNum()
    },
    sendSearchKeywordList (val) {
      this.sendObj.searchKeywordList = val
    }
  },
  computed: {
    newTaskStarTime: function () {
      let timeArr = this.taskStarTime.toLocaleString().split('/')
      return timeArr[0] + '年' + timeArr[1] + '月'
    },
    sendDateList: function () {
      let arr = []
      if (this.timeArr.length !== 0) {
        for (let i = 0; i < 3; i++) {
          for (let m of this.timeArr[i].line) {
            if (m.date !== '') {
              arr.push({
                time: m.date,
                num: m.num
              })
            }
          }
        }
      }
      return arr
    },
    sendTotalNum: function () {
      let totalNum = 0
      if (this.timeArr.length !== 0) {
        for (let i = 0; i < 3; i++) {
          for (let k of this.timeArr[i].line) {
            if (k.date !== '') {
              totalNum += (k.num - 0)
            }
          }
        }
      }
      return totalNum
    },
    sendSearchKeywordList: function () {
      let arr = []
      for (let m of this.keywordList) {
        arr.push({
          keyword: m.keyword, // 关键词
          sortClass: m.sortClass, // 排序方式
          priceHigh: m.priceHigh, // 价格区间高
          priceLow: m.priceLow, // 价格区间低
          brand: m.brand, // 品牌
          postLocation: m.postLocation, // 发货地
          favorNum: m.favorNum, // 评价数
          pageNum: m.pageNum
        })
      }
      return arr
    }
  },
  methods: {
    aaa () {
      // console.log(this.sendObj)
    },
    readShopInfo () {
      if (this.sendObj.productUrl) {
        this.$ajax.post('/api/seller/shop/getProductUrlInfo', {
          shopType: this.creatShopInfo.shopType,
          productUrl: this.sendObj.productUrl
        }).then((data) => {
          if (data.data.code === '200') {
            let res = data.data.data
            // 商品名
            this.sendObj.productName = res.name
            // 一级分类
            this.classValue.classOne = {
              className: res.classFirst,
              id: '1'
            }
            this.sendObj.productClassFirstId = '1'
            this.sendObj.productClassFirstDesc = res.classFirst
            // 二级分类
            this.classValue.classTwo = {
              className: res.classSecond,
              id: '1'
            }
            this.sendObj.productClassSecondId = '1'
            this.sendObj.productClassSecondDesc = res.classSecond
            // 三级分类
            this.classValue.classThree = {
              className: res.classThird,
              id: '1'
            }
            this.sendObj.productClassThirdId = '1'
            this.sendObj.productClassThirdDesc = res.classThird
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.$message({
          message: '请先填写商品链接地址',
          type: 'warning'
        })
      }
    },
    // 根据价格获取评价的价格
    getPrice () {
      if (this.sendObj.productOrderPrice && this.sendObj.numPerOrder) {
        this.$ajax.post('/api/seller/task/getFavorByPrice', {
          shopType: parseInt(this.creatShopInfo.shopType) === 0 ? 0 : 1,
          price: this.sendObj.productOrderPrice * this.sendObj.numPerOrder
        }).then((data) => {
          // console.log(data)
          if (data.data.code === '200') {
            this.priceObj = data.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 判断规格
    productFormat (type) {
      if (type === 1) { // 聚焦时
        if (this.sendObj.productFormat === '任意规格') {
          this.sendObj.productFormat = ''
        }
      } else if (type === 0) { // 失焦时
        if (this.sendObj.productFormat === '') {
          this.sendObj.productFormat = '任意规格'
        }
      }
    },
    setMyDate (val) {
      if (val) {
        this.taskStarTime = val
        this.filterTime(val)
      } else {
        let now = new Date()
        now.setDate(now.getDate() + 1)
        this.taskStarTime = now
        this.filterTime(now)
      }
    },
    // 筛选日历
    filterTime (time) {
      let week = time.getDay()
      let arr = []
      let times = time
      let timeArr = []
      for (let i = 0; i < week; i++) {
        arr.push({
          day: '',
          date: '',
          num: 0
        })
      }
      for (let i = 0; i < 14; i++) {
        let thisTime = new Date(times).getDate()
        let date = (new Date(times)).getFullYear() + '-' + ((new Date(times)).getMonth() + 1) + '-' + (new Date(times)).getDate()
        times = new Date(times).setDate(new Date(times).getDate() + 1)
        arr.push({
          day: thisTime,
          date: date,
          num: 0
        })
      }
      for (let i = 0; i < 7 - week; i++) {
        arr.push({
          day: '',
          date: '',
          num: 0
        })
      }
      for (let i = 0; i < 3; i++) {
        timeArr.push({
          line: arr.slice(7 * i, 7 * (i + 1))
        })
      }
      this.timeArr = timeArr
    },
    dele (lineIndex, arrIndex) {
      if (this.timeArr[lineIndex].line[arrIndex].num <= 0) {
        this.timeArr[lineIndex].line[arrIndex].num = 0
      } else {
        this.timeArr[lineIndex].line[arrIndex].num--
      }
      // 连续规则
      if (parseInt(this.timeArr[lineIndex].line[arrIndex].num) === 0) {
        if (lineIndex === 0) {
          for (let i = arrIndex; i < 7; i++) {
            this.timeArr[0].line[i].num = 0
          }
          for (let i = 0; i < 7; i++) {
            this.timeArr[1].line[i].num = 0
            this.timeArr[2].line[i].num = 0
          }
        } else if (lineIndex === 1) {
          for (let i = arrIndex; i < 7; i++) {
            this.timeArr[1].line[i].num = 0
          }
          for (let i = 0; i < 7; i++) {
            this.timeArr[2].line[i].num = 0
          }
        } else if (lineIndex === 2) {
          for (let i = arrIndex; i < 7; i++) {
            this.timeArr[2].line[i].num = 0
          }
        }
      }
    },
    add (lineIndex, arrIndex) {
      this.timeArr[lineIndex].line[arrIndex].num++
      if (lineIndex === 0) {
        for (let i = 0; i < arrIndex; i++) {
          if (parseInt(this.timeArr[0].line[i].num) === 0) {
            this.timeArr[0].line[i].num = 1
          }
        }
      } else if (lineIndex === 1) {
        for (let i = 0; i < 7; i++) {
          if (parseInt(this.timeArr[0].line[i].num) === 0) {
            this.timeArr[0].line[i].num = 1
          }
        }
        for (let i = 0; i < arrIndex; i++) {
          if (parseInt(this.timeArr[1].line[i].num) === 0) {
            this.timeArr[1].line[i].num = 1
          }
        }
      } else if (lineIndex === 2) {
        for (let i = 0; i < 7; i++) {
          if (parseInt(this.timeArr[0].line[i].num) === 0) {
            this.timeArr[0].line[i].num = 1
          }
        }
        for (let i = 0; i < 7; i++) {
          if (parseInt(this.timeArr[1].line[i].num) === 0) {
            this.timeArr[1].line[i].num = 1
          }
        }
        for (let i = 0; i < arrIndex; i++) {
          if (parseInt(this.timeArr[2].line[i].num) === 0) {
            this.timeArr[2].line[i].num = 1
          }
        }
      }
    },
    // 检测填写的数量符合规则
    watchNum (lineIndex, arrIndex, inputNum) {
      // 连续规则
      if (parseInt(this.timeArr[lineIndex].line[arrIndex].num) === 0) {
        if (lineIndex === 0) {
          for (let i = arrIndex; i < 7; i++) {
            this.timeArr[0].line[i].num = 0
          }
          for (let i = 0; i < 7; i++) {
            this.timeArr[1].line[i].num = 0
            this.timeArr[2].line[i].num = 0
          }
        } else if (lineIndex === 1) {
          for (let i = arrIndex; i < 7; i++) {
            this.timeArr[1].line[i].num = 0
          }
          for (let i = 0; i < 7; i++) {
            this.timeArr[2].line[i].num = 0
          }
        } else if (lineIndex === 2) {
          for (let i = arrIndex; i < 7; i++) {
            this.timeArr[2].line[i].num = 0
          }
        }
      } else if (this.timeArr[lineIndex].line[arrIndex].num < 0) {
        this.timeArr[lineIndex].line[arrIndex].num = 0
      } else {
        if (lineIndex === 0) {
          for (let i = 0; i < arrIndex; i++) {
            if (parseInt(this.timeArr[0].line[i].num) === 0) {
              this.timeArr[0].line[i].num = 1
            }
          }
        } else if (lineIndex === 1) {
          for (let i = 0; i < 7; i++) {
            if (parseInt(this.timeArr[0].line[i].num) === 0) {
              this.timeArr[0].line[i].num = 1
            }
          }
          for (let i = 0; i < arrIndex; i++) {
            if (parseInt(this.timeArr[1].line[i].num) === 0) {
              this.timeArr[1].line[i].num = 1
            }
          }
        } else if (lineIndex === 2) {
          for (let i = 0; i < 7; i++) {
            if (parseInt(this.timeArr[0].line[i].num) === 0) {
              this.timeArr[0].line[i].num = 1
            }
          }
          for (let i = 0; i < 7; i++) {
            if (parseInt(this.timeArr[1].line[i].num) === 0) {
              this.timeArr[1].line[i].num = 1
            }
          }
          for (let i = 0; i < arrIndex; i++) {
            if (parseInt(this.timeArr[2].line[i].num) === 0) {
              this.timeArr[2].line[i].num = 1
            }
          }
        }
      }
    },
    // 改变任务开展时间时设置
    setTaskStarTime () {
      this.setMyDate(this.taskStarTime)
    },
    uploadImg (img) {
      uploadPromise.then((res) => {
        console.log(res)
        if (res.statusText === 'OK') {
          uploadFile(res.data, img.file).then((res) => {
            this.sendObj.productPicUrl = res
          }).catch((err) => {
            console.log(err)
            this.$message.error('网络错误，请刷新试试')
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，请刷新试试')
      })
    },
    beforeAvatarUpload (file) {
      return new Promise((resolve, reject) => {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
          reject(new Error('上传头像图片只能是 JPG,PNG 格式!'))
        } else if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
          reject(new Error('上传头像图片大小不能超过 1MB!'))
        } else {
          getImgSize(file).then((img) => {
            // console.log(file)
            if (img.width > 600 || img.height > 600) {
              this.$message.error('展示主图最大为600*600!')
              reject(new Error('展示主图最大为600*600!'))
            } else {
              resolve()
            }
          }).catch((error) => {
            reject(error)
          })
        }
      })
    },
    doPrevent () {
      this.$router.push({ name: 'sendTaskOne' })
    },
    deleKeyArr (index) {
      this.keywordList.splice(index, 1)
    },
    addKeyArr () {
      if (this.keywordList.length < 5) {
        this.keywordList.push({
          showSearch: true,
          keyword: '', // 关键词
          sortClass: '', // 排序方式
          priceHigh: '', // 价格区间高
          priceLow: '', // 价格区间低
          brand: '', // 品牌
          postLocation: '', // 发货地
          favorNum: '', // 评价数
          pageNum: '' // 翻页数
        })
      } else {
        this.$message({
          message: '最多添加5条关键词组哦',
          type: 'warning'
        })
      }
    },
    saveKey (index) {
      if ((this.keywordList[index].priceLow) && (this.keywordList[index].priceLow - 0 > this.keywordList[index].priceHigh - 0)) {
        this.$message({
          message: '最低价不能高于最高价格哦',
          type: 'warning'
        })
      } else {
        this.keywordList[index].showSearch = false
      }
    },
    // 设置执行人数
    setFavorNum (index) {
      if (this.setFavorNumObj.wordFavor.checked) {
        this.setFavorNumObj.defaultFavor.num = this.sendTotalNum - this.setFavorNumObj.wordFavor.num
      }
      if (this.setFavorNumObj.picFavor.checked) {
        this.setFavorNumObj.defaultFavor.num = this.sendTotalNum - this.setFavorNumObj.picFavor.num
      }
      if (this.setFavorNumObj.wordFavor.checked && this.setFavorNumObj.picFavor.checked) {
        this.setFavorNumObj.defaultFavor.num = this.sendTotalNum - this.setFavorNumObj.wordFavor.num - this.setFavorNumObj.picFavor.num
      }
      // 默认好评不可点击取消
      if (index === 1) {
        // this.setFavorNumObj.defaultFavor.num = this.sendTotalNum
        this.setFavorNumObj.defaultFavor.checked = true
      }
      if (this.setFavorNumObj.defaultFavor.num < 0) {
        this.setFavorNumObj.defaultFavor.num = this.sendTotalNum
        this.setFavorNumObj.wordFavor.num = 0
        this.setFavorNumObj.picFavor.num = 0
        this.$message({
          message: '您已设置超出数量',
          type: 'warning'
        })
      }
    },
    doNext () {
      if (this.sendObj.productName === '') {
        this.$message({
          message: '请输入商品标题',
          type: 'warning'
        })
      } else if (this.sendObj.productUrl === '') {
        this.$message({
          message: '请输入商品链接',
          type: 'warning'
        })
      } else if (this.sendObj.productPicUrl === '') {
        this.$message({
          message: '请上传商品主图',
          type: 'warning'
        })
      } else if (this.sendObj.productShowPrice === '') {
        this.$message({
          message: '请填写商品展示价格',
          type: 'warning'
        })
      } else if (this.sendObj.productOrderPrice === '') {
        this.$message({
          message: '请填写商品下单价格',
          type: 'warning'
        })
      } else if (this.sendObj.numPerOrder === '') {
        this.$message({
          message: '请填写买家每单拍几件',
          type: 'warning'
        })
      } else if (this.sendObj.productFormat === '') {
        this.$message({
          message: '请填写商品规格',
          type: 'warning'
        })
      } else if (this.keywordList[0].keyword === '') {
        this.$message({
          message: '请填写搜索关键词',
          type: 'warning'
        })
      } else if (this.keywordList[0].sortClass === '') {
        this.$message({
          message: '请选择搜索排序方式',
          type: 'warning'
        })
      } else if (this.keywordList[0].priceLow === '') {
        this.$message({
          message: '请填写商品最低价',
          type: 'warning'
        })
      } else if (this.keywordList[0].priceHigh === '') {
        this.$message({
          message: '请填写商品最高价',
          type: 'warning'
        })
      } else if (this.keywordList[0].postLocation === '') {
        this.$message({
          message: '请选择商品发货地',
          type: 'warning'
        })
      } else if (this.keywordList[0].pageNum === '') {
        this.$message({
          message: '请填写翻页数 / 付款人数',
          type: 'warning'
        })
      } else {
        if (this.$route.query.syb) {
          window.history.go(-1)
        } else {
          this.postFinish = true
          if (this.buyerType === 1) {
            this.sendObj.plusNum = this.sendTotalNum
          } else {
            this.sendObj.plusNum = 0
          }
          if (this.setFavorNumObj.wordFavor.checked) {
            this.sendObj.wordFavorNum = this.setFavorNumObj.wordFavor.num
          } else {
            this.sendObj.wordFavorNum = 0
          }
          if (this.setFavorNumObj.picFavor.checked) {
            this.sendObj.graphicWordFavorNum = this.setFavorNumObj.picFavor.num
          } else {
            this.sendObj.graphicWordFavorNum = 0
          }
          if (this.setFavorNumObj.defaultFavor.checked) {
            this.sendObj.defaultFavorNum = this.setFavorNumObj.defaultFavor.num
          } else {
            this.sendObj.defaultFavorNum = 0
          }
          this.sendObj.throwTime = this.sendDateList[0].time
          this.sendObj.sellerTaskId = this.creatShopInfo.sellerTaskId

          // 增值服务
          if (parseInt(this.creatShopInfo.shopType) !== 0) {
            let areaArrs = []
            for (let m of this.increaseObj.area.areaArr) {
              areaArrs = areaArrs.concat(m.chooseArr)
            }
            this.sendObj.isLimitLocation = this.increaseObj.area.checked ? 1 : 0
            this.sendObj.isLimitGender = this.increaseObj.gender.checked ? 1 : 0
            this.sendObj.isLimitAge = this.increaseObj.age.checked ? 1 : 0
            this.sendObj.isLimitDiamond = this.increaseObj.allowZhuan.checked ? 1 : 0
            this.sendObj.isLimitHuabei = this.increaseObj.allowHuaBei.checked ? 1 : 0
            this.sendObj.exludeLocations = areaArrs
            this.sendObj.ageIndex = this.increaseObj.age.chooseAge
            this.sendObj.gender = this.increaseObj.gender.chooseGender
          }
          // 任务备注
          this.sendObj.comment = this.taskCommon
          // console.log(this.sendObj)
          sessionStorage.setItem('taskTwo_sendObj', JSON.stringify(this.sendObj))

          this.$ajax.post('/api/seller/task/addTaskInfo', this.sendObj).then((data) => {
            // console.log(data)
            if (data.data.code === '200') {
              this.$router.push({ name: 'sendTaskThree', query: { sellerTaskId: data.data.data.sellerTaskId } })
            } else {
              this.$message({
                message: data.data.message,
                type: 'warning'
              })
            }
            this.postFinish = false
          }).catch((err) => {
            console.log(err)
            this.$message.error('服务器错误！')
          })
        }
        // this.$router.push({ name: 'sendTaskThree' })
      }
    },
    // 获取分类列表
    getClassApi (url, classIndex, id) {
      if (classIndex === 1) {
        this.$ajax.post(url, {
        }).then((data) => {
          if (data.data.code === '200') {
            this.classObj.classOne = data.data.data
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (classIndex === 2) {
        this.$ajax.post(url, {
          firstId: id
        }).then((data) => {
          if (data.data.code === '200') {
            this.classObj.classTwo = data.data.data
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (classIndex === 3) {
        this.$ajax.post(url, {
          secondId: id
        }).then((data) => {
          if (data.data.code === '200') {
            this.classObj.classThree = data.data.data
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 获取淘宝分类
    getTbClassApi (url, classIndex, id) {
      if (classIndex === 1) {
        this.$ajax.post(url, {
        }).then((data) => {
          if (data.data.code === '200') {
            this.classObj.classOne = data.data.data
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (classIndex === 2) {
        this.$ajax.post(url, {
          firstId: id
        }).then((data) => {
          if (data.data.code === '200') {
            this.classObj.classTwo = data.data.data
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 全不选地区
    cancelArea (value) {
      if (!value) {
        for (let m of this.increaseObj.area.areaArr) {
          m.checked = false
          m.chooseArr = []
        }
      }
    },
    // 检测显示选中地区
    isCheckAreaBox (value) {
      if (value) {
        this.increaseObj.area.checked = true
      }
    },
    // 获取地址
    getPositionArr () {
      this.$ajax.post('/api/config/location/getProvinceList', {
      }).then((data) => {
        if (data.data.code === '200') {
          this.positionArr = data.data.data
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 当分类选框变化时
    chooseClass (index) {
      if (index === 1) {
        // this.classValue.classTwo = {}
        // this.classValue.classThree = {}
        // this.classObj.classThree = ''
        this.getClassApi('/api/config/productClass/getJDSecondClassByFirstid', 2, this.classValue.classOne.id)
        this.sendObj.productClassFirstId = this.classValue.classOne.id
        this.sendObj.productClassFirstDesc = this.classValue.classOne.className
      } else if (index === 2) {
        // this.classValue.classThree = {}
        this.getClassApi('/api/config/productClass/getThirdClassBySecondId', 3, this.classValue.classTwo.id)
        this.sendObj.productClassSecondId = this.classValue.classTwo.id
        this.sendObj.productClassSecondDesc = this.classValue.classTwo.className
      } else if (index === 3) {
        this.sendObj.productClassThirdId = this.classValue.classThree.id
        this.sendObj.productClassThirdDesc = this.classValue.classThree.className
      }
    },
    chooseTbClass (index) {
      if (index === 1) {
        this.classValue.classTwo = {}
        this.getTbClassApi('/api/config/productClass/getTBSecondClassByFirstid', 2, this.classValue.classOne.id)
        this.sendObj.productClassFirstId = this.classValue.classOne.id
        this.sendObj.productClassFirstDesc = this.classValue.classOne.className
      } else if (index === 2) {
        this.sendObj.productClassSecondId = this.classValue.classTwo.id
        this.sendObj.productClassSecondDesc = this.classValue.classTwo.className
      }
    },
    // 获取上一步创建店铺的信息
    getCreatShopInfo () {
      this.$ajax.post('/api/seller/task/getTaskDetail', {
        sellerTaskId: this.$route.query.sellerTaskId || this.$route.query.rbSellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.creatShopInfo = data.data.data
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取被驳回的信息
    getReturnBackInfo () {
      this.$ajax.post('/api/seller/task/getRejectTaskDetail', {
        sellerTaskId: this.$route.query.rbSellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          let rbObj = data.data.data
          let searchArr = JSON.parse(rbObj.searchWordList)
          for (let m of searchArr) {
            m.showSearch = true
          }
          this.returnBackObj = rbObj
          this.sendObj.isPostageFree = rbObj.isPostFree - 0
          this.sendObj.isSupportBaiTiao = rbObj.isSupportBaitiao - 0
          this.sendObj.isSupportCredit = rbObj.isSupportCredit - 0
          this.sendObj.isSupportTicket = rbObj.isSupportTicket - 0
          this.sendObj.numPerOrder = rbObj.numPerOrder
          this.sendObj.productFormat = rbObj.productFormat
          this.sendObj.productName = rbObj.productName
          this.sendObj.productPicUrl = rbObj.productPicUrl
          this.sendObj.productShowPrice = rbObj.productShowPrice
          this.sendObj.productOrderPrice = rbObj.productUnitPrice
          this.sendObj.productUrl = rbObj.productUrl
          this.taskCommon = rbObj.comment
          this.keywordList = searchArr
          this.sendObj.sellerTaskId = rbObj.sellerTaskId
          this.classValue.classOne = rbObj.productClassFirstDesc
          this.classValue.classTwo = rbObj.productClassSecondDesc
          this.classValue.classThree = rbObj.productClassThirdDesc
          // console.log(this.sendObj)
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 地区选择
    chooseAreaArr (index, checked) {
      if (checked) {
        this.increaseObj.area.checked = true
        this.increaseObj.area.areaArr[index].chooseArr = this.increaseObj.area.areaArr[index].arr
      } else {
        this.increaseObj.area.areaArr[index].chooseArr = []
      }
    },
    // 发送修改信息
    sureToFix () {
      this.$ajax.post('/api/seller/task/updateRejectTask', {
        sellerTaskId: this.$route.query.rbSellerTaskId,
        productName: this.sendObj.productName,
        productUrl: this.sendObj.productUrl,
        productPicUrl: this.sendObj.productPicUrl,
        productFormat: this.sendObj.productFormat,
        isSupportBaitiao: this.sendObj.isSupportBaiTiao,
        isSupportCredit: this.sendObj.isSupportCredit,
        isSupportTickt: this.sendObj.isSupportTicket,
        searchWordList: this.sendObj.searchKeywordList,
        productClassFirstId: this.sendObj.productClassFirstId || this.returnBackObj.productClassFirstId,
        productClassSecondId: this.sendObj.productClassSecondId || this.returnBackObj.productClassSecondId,
        productClassThirdId: this.sendObj.productClassThirdId || this.returnBackObj.productClassThirdId,
        productClassFirstDesc: this.sendObj.productClassFirstDesc || this.returnBackObj.productClassFirstDesc,
        productClassSecondDesc: this.sendObj.productClassSecondDesc || this.returnBackObj.productClassSecondDesc,
        productClassThirdDesc: this.sendObj.productClassThirdDesc || this.returnBackObj.productClassThirdDesc
      }).then((data) => {
        // console.log(data)
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ name: 'taskDetail', query: { sellerTaskId: data.data.data.sellerTaskId } })
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    // 设置日期表格
    this.setMyDate()
    // 获取地址列表
    this.getPositionArr()
    // 获取上一步店铺信息
    this.getCreatShopInfo()
    // 获取分类列表
    setTimeout(() => {
      if (parseInt(this.creatShopInfo.shopType) === 0) {
        this.getClassApi('/api/config/productClass/getJDFirstClass', 1)
      } else {
        this.getTbClassApi('/api/config/productClass/getTBFirstClass', 1)
      }
    }, 2000)
    if (this.$route.query.rbSellerTaskId) {
      // 设置被驳回的信息
      this.isReturnBack = true
      this.getReturnBackInfo()
    }
    if (this.$route.query.syb && sessionStorage.getItem('taskTwo_sendObj')) {
      let old = JSON.parse(sessionStorage.getItem('taskTwo_sendObj'))
      this.sendObj = old
      this.classValue = {
        classOne: {
          className: old.productClassFirstDesc,
          id: old.productClassFirstId
        },
        classTwo: {
          className: old.productClassSecondDesc,
          id: old.productClassSecondId
        },
        classThree: {
          className: old.productClassThirdDesc,
          id: old.productClassThirdId
        }
      }
      this.keywordList = old.searchKeywordList
      // this.timeArr = old.taskNumList
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
  .returnBack
    padding 28px 100px
    display flex
    font-size 14px
    background #ffffff
    margin-bottom 1px
    box-shadow 0 1px 1px #dedede
    div
      width 100px
      text-align right
      line-height 30px
    p
      flex 1
      line-height 30px
  .warning
    height 36px
    background rgba(255, 171, 177, 0.2)
    color #FF3341
    font-size 12px
    line-height 36px
    padding-left 20px
    padding-right 20px
    span
      font-weight bold
  .step
    padding 24px 140px 16px
    background #ffffff
    margin-bottom 1px
  .cont
    background #ffffff
    padding 20px
    margin-bottom 20px
    min-width 900px
    .next
      margin-top 100px
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
        .readShopInfo
          border 1px solid #FF3341
          margin-left 12px
          display inline-block
          height 36px
          line-height 36px
          text-align center
          cursor pointer
          width 160px
          font-size 12px
          color #FF3341
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
          &:disabled
            color #dedede
            background none
            &:hover
              cursor not-allowed
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
      padding-top 20px
      // border-bottom 1px dashed #cccccc
      transform translate3d(0, 0px, 0)
      opacity 1
      .deleBtn
        float right
        font-size 20px
        cursor pointer
        margin-top 12px
        &:first-child
          display none
      .searchBox
        margin-top 20px
        padding 14px 20px
        // border 1px solid #dedede
        // box-shadow 0 1px 5px rgba(0, 0, 0, 0.12)
    .fade-enter-active, .fade-leave-active
      transition all 0.5s ease-out
    .fade-enter, .fade-leave-active
      transform translate3d(0, -50px, 0)
      opacity 0
    .filter
      // display flex
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
    .dateTable
      width 100%
      margin-top 14px
      margin-bottom 32px
      tr
        height 95px
        text-align center
        &:first-child
          height 42px
          line-height 42px
        &:nth-child(2)
          height 42px
          line-height 42px
          background #fafafa
        th
          border 1px solid #cccccc
        td
          width 134px
          padding-top 5px
          border 1px solid #cccccc
          b
            font-size 28px
            color #444444
            line-height 36px
          p
            font-size 12px
            color #666666
          .numAdd
            width 78px
            height 20px
            overflow hidden
            border 1px solid #cccccc
            margin 5px auto
            span
              width 19px
              height 20px
              background #f0f0f0
              color #9b9b9b
              font-size 18px
              text-align center
              line-height 20px
              cursor pointer
            input
              float left
              width 36px
              line-height 20px
              outline none
              text-align center
            .l
              float left
              border-right 1px solid #cccccc
            .r
              float right
              border-left 1px solid #cccccc
    .total
      padding-left 20px
      .checkList
        display flex
        margin-top 12px
        margin-bottom 12px
        .check
          flex 1
          margin-right 80px
    .buyerType
      padding-left 20px
      p
        margin-top 16px
        margin-bottom 16px
  .step4
    .server
      >li
        margin 27px 0
        font-size 14px
      .area
        border 1px solid #DEDEDE
        li
          height 40px
          line-height 40px
          padding 0 20px
          &:nth-child(2n)
            background rgba(23, 159, 255, 0.1)
          .bold
            margin-right 50px
</style>