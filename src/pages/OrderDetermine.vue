<template>
  <div class="mt-8 ml-10 mr-10">
    <el-descriptions title="订单详情" :column="4" border class="rounded-lg ">
      <el-descriptions-item label="订单号">{{ orderId }}</el-descriptions-item>
      <el-descriptions-item label="卖家姓名">
        <template #label>
          <i class="el-icon-user"></i>
          &nbsp;用户名
        </template>
        {{ userName }}
      </el-descriptions-item>
      <el-descriptions-item label="商品名称" :span="2">{{ commodityName }}</el-descriptions-item>
      <el-descriptions-item label="购买数量">{{ commodityNumber }}</el-descriptions-item>
      <el-descriptions-item label="应付金额">￥{{ (price * commodityNumber).toFixed(2) }}</el-descriptions-item>
      <el-descriptions-item label="订单时间">{{ orderTime }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">{{ status }}</el-descriptions-item>
      <el-descriptions-item label="交易地点">{{ location }}</el-descriptions-item>
      <el-descriptions-item label="还物时间" v-if="giveBackTime!=='0001-01-01 00:00:00'">
        {{ giveBackTime }}
      </el-descriptions-item>
      <el-descriptions-item label="还物地点" v-if="giveBackLocation!==null">
        {{ giveBackLocation }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="mt-8 flex justify-center">
      <el-button type="info" @click="back()">返 回</el-button>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <el-button type="success" @click="pay()">确 认 支 付</el-button>
    </div>
  </div>
</template>

<script>
import {api} from "@/request";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
import {CookieManager} from "../cookie";

export default {
  name: "OrderDetermine",
  mounted() {
    let user = this.store.getters['user/userInfo']
    let userName = user.name
    if (userName === '') {
      userName = '未命名的牛逼人'
    }
    console.log('username' + userName)
    let temp = this.$route.params
    this.orderId = temp['orderId']
    console.log("orderId:" + this.orderId)
    if (this.orderId === undefined) {
      this.orderId = '79125477284355261410'
    }
    console.log('order/' + this.orderId.replaceAll('"', ''))
    const that = this
    api({
      url: 'order/' + this.orderId.replaceAll('"', ''),
      method: "get",
    })
        .then(function (response) {
          let data = response.data
          console.log(JSON.stringify(data));
          console.log()
          console.log('订单状态' + data['Code'])
          if (data['Code'] === '200') {
            console.log('进入')
            let orderInfo = data['order'][0]
            that.userName = userName
            console.log('1111111111111111111111111111111111111111')
            that.commodityName = orderInfo['CommodityName']
            that.commodityNumber = orderInfo['Count']
            that.price = orderInfo['CommodityPrice']
            that.orderTime = orderInfo['Time'].replace('T', ' ').split('.')
            that.orderTime = that.orderTime[0]
            that.status = orderInfo['Status']
            console.log('2222222222222222222222222222222222222222222')
            that.location = orderInfo["Location"]
            that.giveBackLocation = orderInfo["ReturnLocation"]
            let backTime = orderInfo["ReturnTime"]
            if(backTime !== undefined) {
              backTime = backTime.replace('T', ' ').split('.')
              that.giveBackTime = backTime[0]
            }
            else
            {
              that.giveBackTime = '0001-01-01 00:00:00'
            }
            console.log(that.giveBackLocation)
          } else {
            ElMessage.error({
              message: '输入错误了...',
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          console.log(error);
          ElMessage.error({
            message: '服务器在开小差...',
            type: 'error'
          })
        });
  },
  data: function () {
    return {
      orderId: 18100000000,
      userName: 'rzcnb',
      commodityName: '网页自动对齐仪器',
      commodityNumber: 2,
      price: 66.66,
      orderTime: '2020/7/13-12:00:00',
      status: '未支付',
      location: '嘉定校区的北苑食堂',
      giveBackLocation: '四平校区的济世楼',
      giveBackTime: '2020/7/13-12:00:00',
    }
  },
  methods: {
    back: function () {
      this.$router.go(-1);
    },
    pay: function () {
      var FormData = require('form-data');
      var data = new FormData();
      let token = CookieManager.get("token")
      data.append('newStatus', 'PAID');
      data.append('token', token);
      const that = this
      api({
        url: 'order/' + this.orderId.replaceAll('"', ''),
        method: "put",
        data : data
      })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            ElMessage.success({
              message: '支付成功',
              type: 'success'
            });
            that.$router.go(-1);
          })
          .catch(function (error) {
            console.log(error);
            ElMessage.error({
              message: '服务器在开小差...',
              type: 'error'
            })
          });
    }
  },
  setup() {
    let store = useStore()
    return {
      store
    }
  }
}
</script>

<style scoped>
.el-main {
  background: -webkit-linear-gradient(left top, #2f90b9 2.5%, #1781b5 7.5%, #93b5cf 20%, #d8e3e7 50%, #93b5cf 70%, #1781b5 92.5%, #2f90b9 97.5%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #000, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #000, #fff); /* Firefox 3.6 - 15 */
  background-color: #93b5cf;
}
</style>