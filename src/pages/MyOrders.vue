<template>
  <div>
    <el-table
        :data="orderList"
        :key="itemKey"
        style="width: 100%">
      <el-table-column
          fixed
          prop="picture"
          label="商品图片"
          width="160"
          align="center">
        <el-image
            style="width: 100px; height: 100px"
            :src="url"
        >

        </el-image>
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品名称"
          width="180"
          align="center">
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品价格"
          width="100"
          align="center">
      </el-table-column>
      <el-table-column
          prop="count"
          label="数量"
          width="60"
          align="center">
      </el-table-column>
      <el-table-column
          prop="totalPrice"
          label="总价格"
          width="100"
          align="center">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="360"
          align="center">
        <template #default="scope">
          <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="primary"
              size="small">
            查看订单
          </el-button>
          <el-button
              @click.prevent="cancelOrder(scope.$index)"
              type="primary"
              size="small">
            取消订单
          </el-button>
          <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="primary"
              size="small">
            联系卖家
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {useStore} from "vuex";
export default {
  data() {
    return {
      orderList: [],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      url: 'https://localhost:5001/Media/Image/Default.png',
      type: String,
      itemKey: 0
    }
  },
  mounted() {
    this.type = 'UNPAID';
    this.getOrders();
  },
  setup() {
    let store = useStore()
    return {
      store
    }
  },
  methods: {
    getOrders() {
      console.log("Loading orders...");
      var axios = require('axios');
      var FormData = require('form-data');
      var data = new FormData();
      data.append('userId', '1850061');
      data.append('maxNumber', '5');
      data.append('pageNumber', '1');
      data.append('status', this.type);

      var config = {
        method: 'get',
        url: 'https://localhost:5001/api/order',
        data : data
      };

      axios(config)
      .then( (response) => {
        var orders = response.data.OrderList;
        console.log(orders);
        this.orderList = [];
        for(let i=0;i<orders.length;++i){
          if(orders[i].Status != this.type){
            continue;
          }
          var order = {};
          order.picture = orders[i].Cover;
          order.name = orders[i].CommodityName;
          order.price = orders[i].Price;
          order.count = orders[i].Count;
          order.totalPrice = orders.price*order.count;
          order.Id = orders[i].Id;
          this.orderList.push(order);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    cancelOrder(index){
      var axios = require('axios');
      var FormData = require('form-data');
      var data = new FormData();
      data.append('newStatus', 'CANCELLED');

      var config = {
        method: 'put',
        url: 'https://localhost:5001/api/order/' + this.orderList[index].Id,
        data : data
      };

      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.getOrders();
        this.itemKey = Math.random();
        // TODO: Tell user the order is cancelled.
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style>

</style>