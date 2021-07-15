<template>
  <el-main class=" bg-gradient-to-r from-blue-200 to-blue-400 bg-opacity-100">
    <center>
      <p class="font-black text-2xl"  >订单信息</p>
    </center>
      <div class=" rounded-2xl bg-white border-black mt-4 space-y-6 ">
        <div class="divide-y divide-black space-y-4">
          <div>
            <p class="font-black text-xl">地址信息</p>
            <div class="grid grid-cols-3 grid-rows-1 gap-3">
              <div class="row-start-1 col-start-1 flex flex-nowrap">
                <p class="text-1xl">交易地址：</p>
                <p class="text-1xl">{{Location}}</p>
              </div>
              <div class="row-start-1 col-start-2 flex flex-nowrap">
                <p class="text-1xl">归还地址：</p>
                <p class="text-1xl">{{ReturnLocation}}</p>
              </div>
            </div>
          </div>
          <div>
            <p class="font-black text-xl flex justify-start">卖家信息</p>
            <div class="grid grid-cols-3 grid-rows-2 gap-3">
              <p class="text-1xl row-start-1 col-start-1">昵称：</p>
              <p class="text-1xl row-start-1 col-start-2">真实姓名：</p>
              <p class="text-1xl row-start-2 col-start-1">电话：</p>
              <p class="text-1xl row-start-2 col-start-2">邮件：</p>
            </div>
          </div>
          <div>
            <p class="font-black text-xl flex justify-start">订单信息</p>
            <div class="grid grid-cols-2 grid-rows-2 gap-x-3">
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
        <table class="w=3/4 border-collapse border border-black w-full table-fixed">
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
            <td class="border-t border-black"> 
              <img class="float-left w-10 h-10" :src= CommodityImage>
              <p class="text-1xl flex-wrap">{{CommodityName}}</p>
            </td>
            <td class="border border-black">{{CommodityStatus}}</td>
            <td class="border border-black">￥{{CommodityPrice}}</td>
            <td class="border border-black">{{CommodityCount}}</td>
          </tr>
          </tbody>
        </table>
        <div class=" mt-6">
          <div class="flex flex-nowrap justify-end">
            <p class="text-xl">实付 :</p>
            <p class="text-xl text-red-700">￥{{CommodityTotalPrice}}</p>
          </div>
        </div>
        <div class="flex flex-rol space-x-40 md:space-x-96 justify-center">
        <comment  :isRating='T' :id="OrderId" :userId="OwnerId"></comment>
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
        OwnerId :"1234",
        T: true
      }
  },
  methods:{
    getData(){
      var arr = this
      api({
          url: "order/"+this.OrderId,
          method: "get"
        }).then(
          (res) => {
            let data = res.data.order
            console.log(data)
            arr.Location = data.Location
            this.ReturnLocation = data.ReturnLocation
            this.Time = data.Time.substr(0,19).replace("T"," ");
            this.ReturnTime = data.ReturnTime.substr(0,20).replace("T"," ");
            this.CommodityImage = data.Commodity.Cover
            this.CommodityName = data.Commodity.Name
            if(data.Status == 'UNPAID'){
              this.CommodityStatus = '尚未支付'
            }else if(data.Status == 'CANCELLED'){
              this.CommodityStatus = '订单已取消'
            }else if(data.Status == 'PAID'){
              this.CommodityStatus = '订单已支付'
            }
            this.CommodityCount = data.Count
            this.CommodityPrice = data.Commodity.Price.toFixed(2)
            this.CommodityTotalPrice =  (this.CommodityPrice*this.CommodityCount).toFixed(2)
            console.log(this.CommodityTotalPrice)
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
        this.OrderId = "46952171303439855700"
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