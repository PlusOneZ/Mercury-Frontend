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
          console.log('订单状态' + data['Code'])
          if (data['Code'] === '200') {
            console.log('进入')
            let orderInfo = data['order']
            that.userName = userName
            that.commodityName = orderInfo["Commodity"]['Name']
            that.commodityNumber = orderInfo['Count']
            that.price = orderInfo["Commodity"]['Price']
            that.orderTime = '2020/7/13-12:00:00'
            that.status = orderInfo['Status']
            that.location = orderInfo["Location"]
            that.giveBackLocation = orderInfo["ReturnLocation"]
            let backTime = orderInfo["ReturnTime"].replace('T', ' ').split('.')
            that.giveBackTime = backTime[0]
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

</style>