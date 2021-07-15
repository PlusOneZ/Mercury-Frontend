<template>
  <el-main class=" bg-gradient-to-r from-blue-200 to-blue-400 bg-opacity-100">
    <div class=" pl-10 pr-10 pt-6 pb-6 rounded-2xl bg-white mt-2 space-y-6  ml-8 mr-8">
      <div class="divide-y-2 divide-dotted divide-opacity-60 divide-blue-400 space-y-4">
        <div>
          <p class=" font-black text-xl mb-1">地址信息</p>
          <div class="grid grid-cols-2 grid-rows-1 gap-3">
            <div class="row-start-1 col-start-1 flex flex-nowrap">
              <p class="text-1xl">交易地址：</p>
              <p class="text-1xl">{{Location}}</p>
            </div>
            <div class="row-start-1 col-start-2 flex flex-nowrap">
              <p class="text-1xl">归还地址：</p>
              <p class="text-1xl" v-if="ReturnLocation">{{ReturnLocation}}</p>
              <p class="text-1xl" v-if="!ReturnLocation">暂无</p>
            </div>
          </div>
        </div>
        <div>
          <p class="font-black text-xl flex justify-start mb-1">卖家信息</p>
          <div class="grid grid-cols-2 grid-rows-2 gap-3">
            <p class="text-1xl row-start-1 col-start-1">昵称：{{OwnerName}}</p>
            <p class="text-1xl row-start-1 col-start-2">真实姓名：{{OwnerRealName}}</p>
            <p class="text-1xl row-start-2 col-start-1">电话：{{OwnerPhone}}</p>
          </div>
        </div>
        <div>
          <p class="font-black text-xl flex justify-start mb-1">订单信息</p>
          <div class="grid grid-cols-2 grid-rows-2  gap-3">
            <div class="text-1xl row-start-1 col-start-1">
              <p>订单编号：</p>
              <p>{{OrderId}}</p>
            </div>
            <div class="text-1xl row-start-2 col-start-1">
              <p>创建时间：</p>
              <p>{{Time}}</p>
            </div>
            <div class="text-1xl row-start-2 col-start-2">
              <p>归还时间：</p>
              <p>{{ReturnTime}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-1 mr-1 rounded-lg border-2 border-blue-300 border-opacity-80">
        <table class="w-full table-fixed">
          <thead>
          <tr>
            <th class="w=1/6  bg-blue-100">商品</th>
            <th class="w=1/6 bg-blue-100">状态</th>
            <th class="w=1/6 bg-blue-100">单价</th>
            <th class="w=1/6 bg-blue-100">数量</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="flex justify-center">
              <img class="float-left w-10 h-10" :src= "'https://139.196.20.137:5001/'+CommodityImage">
              <p class="text-1xl flex-wrap">{{CommodityName}}</p>
            </td>
            <td class="text-center">{{CommodityStatus}}</td>
            <td class="text-center">￥{{CommodityPrice}}</td>
            <td class="text-center">{{CommodityCount}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 mr-2">
        <div class="flex flex-nowrap justify-end">
          <p class="text-xl">实付 :</p>
          <p class="text-xl text-red-700">￥{{CommodityTotalPrice}}</p>
        </div>
      </div>
      <div class="flex flex-rol space-x-40 md:space-x-96 justify-center">
        <comment  :isRating='T' :id="OrderId" :userId="BuyerId"></comment>
        <el-button type="primary" icon="el-icon-chat-dot-square" round>联系卖家</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
import {api} from "@/request";
import comment from "@/components/Public/comment";

export default {

  name: "OrderDetail",
  components:{
    comment
  },
  data() {
    return {
      OrderId : "",
      Location :"",
      ReturnLocation :"",
      Time :"",
      ReturnTime :"",
      CommodityImage :"",
      CommodityName :"",
      CommodityStatus :"",
      CommodityCount :0,
      CommodityPrice :0.0,
      CommodityTotalPrice :0.0,
      OwnerName :"",
      BuyerId :"",
      OwnerRealName:"",
      OwnerPhone:"",
      T: true,
      flag:false
    }
  },
  methods:{
    getData(){
      api({
        url: "order/"+this.OrderId,
        method: "get"
      }).then(
          (res) => {
            let data = res.data.order[0]
            console.log(data)
            this.Location = data.Location
            this.ReturnLocation = data.ReturnLocation
            this.Time = data.Time.substr(0,19).replace("T"," ");
            this.ReturnTime = data.ReturnTime.substr(0,20).replace("T"," ");
            this.CommodityImage = data.CommodityCover
            this.CommodityName = data.CommodityName
            if(data.Status == 'UNPAID'){
              this.CommodityStatus = '尚未支付'
            }else if(data.Status == 'CANCELLED'){
              this.CommodityStatus = '订单已取消'
            }else if(data.Status == 'PAID'){
              this.CommodityStatus = '订单已支付'
            }
            this.CommodityCount = data.Count
            this.CommodityPrice = data.CommodityPrice.toFixed(2)
            console.log( this.CommodityCount)
            this.CommodityTotalPrice =  (this.CommodityPrice*this.CommodityCount).toFixed(2)
            this.OwnerName = data.OwnerName
            this.BuyerId = data.BuyerId
            this.OwnerRealName = data.OwnerRealName
            this.OwnerPhone = data.OwnerPhone
            this.flag = true
          },
          (error) => {
            console.log(error)
          })
    }
  },
  created: function() {
    this.firstPlayFlag = false
    this.$nextTick(() => {
      console.log(this.$route.params)
      let temp = this.$route.params
      console.log(temp['OrderId'])
      if (temp['OrderId'] !== undefined) {
        this.OrderId = temp['OrderId']
      } else {
        this.OrderId = "60393826540906558305"
      }
      console.log(this.OrderId)
      this.getData()
    })
  }

}
</script>

<style scoped>
.el-header {
  background: #0f1423;
}
.position{
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>