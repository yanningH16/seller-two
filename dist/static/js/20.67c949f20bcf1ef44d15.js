webpackJsonp([20],{"1kS7":function(e,t){t.f=Object.getOwnPropertySymbols},"50JG":function(e,t,s){"use strict";function a(e){s("smji")}Object.defineProperty(t,"__esModule",{value:!0});var n=s("5YsC"),o=s("psBm"),i=s("VU/8"),p=a,r=i(n.a,o.a,!1,p,"data-v-1b6c3be7",null);t.default=r.exports},"5YsC":function(e,t,s){"use strict";var a=s("Dd8w"),n=s.n(a),o=s("SJI6");s.n(o);t.a={name:"sendTaskOne",data:function(){return{warnShow:!0,active:0,shop:{shopType:"",shopName:""},taskType:null,shopListArr:[]}},computed:n()({},Object(o.mapGetters)(["userInfo"])),methods:{doNext:function(){var e=this;this.$ajax.post("/api/seller/task/createTask",{shopType:this.shop.shopType,shopId:this.shop.shopId,taskType:this.taskType,sellerUserId:this.userInfo.sellerUserId}).then(function(t){"200"===t.data.code?e.$router.push({name:"sendTaskTwo",query:{sellerTaskId:t.data.data.sellerTaskId}}):e.$message({message:t.data.message,type:"warning"})}).catch(function(t){e.$message.error("服务器错误！")})},getShopList:function(){var e=this;this.$ajax.post("/api/seller/shop/getShopListBySellerUserId",{sellerUserId:this.userInfo.sellerUserId,shopType:3}).then(function(t){e.shopListArr=t.data.data}).catch(function(t){e.$message.error("服务器错误！")})},toPushTask:function(){var e=this;this.$ajax.post("/api/seller/shop/getShopListBySellerUserId",{sellerUserId:this.userInfo.sellerUserId,shopType:3}).then(function(t){var s=t.data;"200"===s.code?s.data?e.$router.push({name:"sendTaskOne"}):(e.$message({message:"您还未绑定店铺,请先绑定店铺",type:"warning"}),e.$router.push({name:"shopAdmin",query:{toBindShop:1}})):e.$message({message:s.message,type:"warning"})}).catch(function(e){})}},mounted:function(){this.getShopList(),this.toPushTask()}}},"C+Ao":function(e,t,s){t=e.exports=s("FZ+f")(!0),t.push([e.i,".sendTaskOne[data-v-1b6c3be7]{padding-left:20px;padding-right:20px}.sendTaskOne .nav[data-v-1b6c3be7]{background:#fff;padding:12px 16px;padding-right:16px;margin-bottom:24px;border-radius:4px}.sendTaskOne .warning[data-v-1b6c3be7]{height:36px;background:rgba(255,171,177,.2);color:#ff3341;font-size:12px;line-height:36px;padding-left:20px;padding-right:20px}.sendTaskOne .warning span[data-v-1b6c3be7]{font-weight:700}.sendTaskOne .step[data-v-1b6c3be7]{padding:24px 140px 16px;background:#fff;margin-bottom:1px}.sendTaskOne .cont[data-v-1b6c3be7]{padding:20px;background:#fff}.sendTaskOne .cont h2[data-v-1b6c3be7]{font-size:16px;color:#333;line-height:32px;margin-top:16px;margin-bottom:16px}.sendTaskOne .cont .inblock[data-v-1b6c3be7]{display:inline-block;width:14px;height:14px;vertical-align:middle}.sendTaskOne .cont .taskType[data-v-1b6c3be7]{height:30px;line-height:30px}.sendTaskOne .cont .next[data-v-1b6c3be7]{margin-top:100px;margin-bottom:20px;text-align:center}","",{version:3,sources:["C:/Users/Administrator/Desktop/项目二/seller/src/components/header/sendTask/sendTaskOne.vue"],names:[],mappings:"AACA,8BACE,kBAAmB,AACnB,kBAAoB,CACrB,AACD,mCACE,gBAAiB,AACjB,kBAAmB,AACnB,mBAAoB,AACpB,mBAAoB,AACpB,iBAAmB,CACpB,AACD,uCACE,YAAa,AACb,gCAAkC,AAClC,cAAe,AACf,eAAgB,AAChB,iBAAkB,AAClB,kBAAmB,AACnB,kBAAoB,CACrB,AACD,4CACE,eAAkB,CACnB,AACD,oCACE,wBAAyB,AACzB,gBAAiB,AACjB,iBAAmB,CACpB,AACD,oCACE,aAAc,AACd,eAAiB,CAClB,AACD,uCACE,eAAgB,AAChB,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,kBAAoB,CACrB,AACD,6CACE,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,qBAAuB,CACxB,AACD,8CACE,YAAa,AACb,gBAAkB,CACnB,AACD,0CACE,iBAAkB,AAClB,mBAAoB,AACpB,iBAAmB,CACpB",file:"sendTaskOne.vue",sourcesContent:["\n.sendTaskOne[data-v-1b6c3be7] {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.sendTaskOne .nav[data-v-1b6c3be7] {\n  background: #fff;\n  padding: 12px 16px;\n  padding-right: 16px;\n  margin-bottom: 24px;\n  border-radius: 4px;\n}\n.sendTaskOne .warning[data-v-1b6c3be7] {\n  height: 36px;\n  background: rgba(255,171,177,0.2);\n  color: #ff3341;\n  font-size: 12px;\n  line-height: 36px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.sendTaskOne .warning span[data-v-1b6c3be7] {\n  font-weight: bold;\n}\n.sendTaskOne .step[data-v-1b6c3be7] {\n  padding: 24px 140px 16px;\n  background: #fff;\n  margin-bottom: 1px;\n}\n.sendTaskOne .cont[data-v-1b6c3be7] {\n  padding: 20px;\n  background: #fff;\n}\n.sendTaskOne .cont h2[data-v-1b6c3be7] {\n  font-size: 16px;\n  color: #333;\n  line-height: 32px;\n  margin-top: 16px;\n  margin-bottom: 16px;\n}\n.sendTaskOne .cont .inblock[data-v-1b6c3be7] {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  vertical-align: middle;\n}\n.sendTaskOne .cont .taskType[data-v-1b6c3be7] {\n  height: 30px;\n  line-height: 30px;\n}\n.sendTaskOne .cont .next[data-v-1b6c3be7] {\n  margin-top: 100px;\n  margin-bottom: 20px;\n  text-align: center;\n}"],sourceRoot:""}])},Dd8w:function(e,t,s){"use strict";t.__esModule=!0;var a=s("woOf"),n=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=n.default||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e}},NpIQ:function(e,t){t.f={}.propertyIsEnumerable},R4wc:function(e,t,s){var a=s("kM2E");a(a.S+a.F,"Object",{assign:s("To3L")})},To3L:function(e,t,s){"use strict";var a=s("lktj"),n=s("1kS7"),o=s("NpIQ"),i=s("sB3e"),p=s("MU5D"),r=Object.assign;e.exports=!r||s("S82l")(function(){var e={},t={},s=Symbol(),a="abcdefghijklmnopqrst";return e[s]=7,a.split("").forEach(function(e){t[e]=e}),7!=r({},e)[s]||Object.keys(r({},t)).join("")!=a})?function(e,t){for(var s=i(e),r=arguments.length,c=1,l=n.f,d=o.f;r>c;)for(var A,h=p(arguments[c++]),b=l?a(h).concat(l(h)):a(h),v=b.length,u=0;v>u;)d.call(h,A=b[u++])&&(s[A]=h[A]);return s}:r},V3tA:function(e,t,s){s("R4wc"),e.exports=s("FeBl").Object.assign},psBm:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sendTaskOne"},[s("div",{staticClass:"nav"},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{name:"overView"}}},[e._v("首页")]),e._v(" "),s("el-breadcrumb-item",{attrs:{to:{name:"overView"}}},[e._v("总览")]),e._v(" "),s("el-breadcrumb-item",[e._v("发布垫付任务")])],1)],1),e._v(" "),s("div",{staticClass:"step"},[s("el-steps",{attrs:{active:e.active,"finish-status":"success","align-center":""}},[s("el-step",{attrs:{title:"选择任务类型"}}),e._v(" "),s("el-step",{attrs:{title:"填写任务信息"}}),e._v(" "),s("el-step",{attrs:{title:"支付"}}),e._v(" "),s("el-step",{attrs:{title:"发布成功"}})],1)],1),e._v(" "),s("div",{staticClass:"cont"},[s("div",{staticClass:"step1"},[s("h2",[e._v("第一步: 选择店铺")]),e._v(" "),e._l(e.shopListArr,function(t,a){return s("div",{key:a,staticClass:"taskType",staticStyle:{"padding-left":"60px"}},[s("el-radio",{attrs:{label:t},model:{value:e.shop,callback:function(t){e.shop=t},expression:"shop"}},[s("span",{staticClass:"inblock",class:{jdIcon:0==t.shopType,taobaoIcon:1==t.shopType,tianmaoIcon:2==t.shopType}}),e._v(" "),s("b",{staticStyle:{"font-size":"14px",color:"#444444"}},[e._v(e._s(t.shopName))])])],1)})],2),e._v(" "),s("div",{staticClass:"step2"},[s("h2",[e._v("第二部: 选择任务类型")]),e._v(" "),s("el-radio-group",{staticStyle:{"padding-left":"60px"},model:{value:e.taskType,callback:function(t){e.taskType=t},expression:"taskType"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:0===parseInt(e.shop.shopType),expression:"parseInt(shop.shopType)===0"}],staticClass:"taskType"},[s("el-radio",{attrs:{label:1}},[s("span",{staticClass:"jdIcon inblock"}),e._v(" "),s("b",{staticStyle:{"font-size":"14px",color:"#444444"}},[e._v("京东App任务\n              "),s("span",{staticStyle:{color:"#949494"}},[e._v("(用户在京东app下单)")])])])],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0===parseInt(e.shop.shopType),expression:"parseInt(shop.shopType)===0"}],staticClass:"taskType"},[s("el-radio",{attrs:{label:2}},[s("span",{staticClass:"jdIcon inblock"}),e._v(" "),s("b",{staticStyle:{"font-size":"14px",color:"#444444"}},[e._v("微信京东任务\n              "),s("span",{staticStyle:{color:"#949494"}},[e._v("(用户在微信京东下单)")])])])],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1===parseInt(e.shop.shopType),expression:"parseInt(shop.shopType)===1"}],staticClass:"taskType"},[s("el-radio",{attrs:{label:3}},[s("span",{staticClass:"taobaoIcon inblock"}),e._v(" "),s("b",{staticStyle:{"font-size":"14px",color:"#444444"}},[e._v("手淘App任务\n              "),s("span",{staticStyle:{color:"#949494"}},[e._v("(用户在手淘app下单)")])])])],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2===parseInt(e.shop.shopType),expression:"parseInt(shop.shopType)===2"}],staticClass:"taskType"},[s("el-radio",{attrs:{label:3}},[s("span",{staticClass:"tianmaoIcon inblock"}),e._v(" "),s("b",{staticStyle:{"font-size":"14px",color:"#444444"}},[e._v("手淘App任务\n              "),s("span",{staticStyle:{color:"#949494"}},[e._v("(用户在手淘app下单)")])])])],1)])],1),e._v(" "),s("div",{staticClass:"next"},[s("button",{staticClass:"btn",class:{"disabled-btn":!(e.shop&&e.taskType)},attrs:{disabled:!(e.shop&&e.taskType)},on:{click:e.doNext}},[e._v("下一步")])])])])},n=[],o={render:a,staticRenderFns:n};t.a=o},smji:function(e,t,s){var a=s("C+Ao");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s("rjj0")("66e01a84",a,!0)},woOf:function(e,t,s){e.exports={default:s("V3tA"),__esModule:!0}}});
//# sourceMappingURL=20.67c949f20bcf1ef44d15.js.map