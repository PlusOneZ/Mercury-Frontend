<template>
  <div>
    <el-table
        :data="commodityList"
        style="width: 100%">
      <el-table-column
          fixed
          prop="picture"
          label="商品图片"
          width="160"
          align="center">
        <template #default="scope">        
          <el-image
              style="width: 100px; height: 100px"
              :src="'https://139.196.20.137:5001/'+commodityList[scope.$index].picture"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品名称"
          width="160"
          align="center">
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品价格"
          width="80"
          align="center">
      </el-table-column>
      <el-table-column
          prop="count"
          label="数量"
          width="60"
          align="center">
      </el-table-column>
      <el-table-column
          prop="click"
          label="点击量"
          width="80"
          align="center">
      </el-table-column>
      <el-table-column
          prop="like"
          label="收藏量"
          width="80"
          align="center">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="180"
          align="center">
        <template #default="scope">
          <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="primary"
              size="small">
            查看商品
          </el-button>
          <!-- <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="primary"
              size="small">
            修改信息
          </el-button> -->
          <!-- <el-button
              @click.prevent="deleteCommodity(scope.$index)"
              type="primary"
              size="small">
            删除商品
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getCommodity(){
      var axios = require('axios');
      var FormData = require('form-data');
      var data = new FormData();
      data.append('userId', '1850061');

      var config = {
        method: 'get',
        url: 'https://139.196.20.137:5001/api/commodity',
        data : data
      };

      axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        var commodities = response.data.commodityList;
        for(let i=0;i<commodities.length;++i){
          var commodity={};
          commodity.picture=commodities[i].Cover;
          commodity.name=commodities[i].Name;
          commodity.price=commodities[i].Price;
          commodity.count=1;
          commodity.click=1;
          commodity.like=commodities[i].Likes;
          commodity.id=commodities[i].Id;
          this.commodityList.push(commodity);
        }
        console.log(this.commodityList);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteCommodity(index){
      let commodityId = this.commodityList[index].id;
      console.log(commodityId);

    }
  },
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      commodityList: []
    }
  },
  mounted() {
    this.getCommodity();
  }
}
</script>

<style>

</style>