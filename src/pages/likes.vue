
<template>


<div id="app">


  <el-table
    :data="commodities"
    border
    height="700"
    
    style="width: 100%; margin-top: 20px; ">
    
    
    <el-table-column
     label="商品">
      <template #default="scope">
        <div class="grid grid-cols-1">
          <el-image
              style="width: 100px; height: 100px"
              :src='"https://139.196.20.137:5001/api"+commodities[scope.$index].CommodityCover'></el-image>
          <span>{{commodities[scope.$index].CommodityName}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="CommodityPrice"
      label="单价">
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template #default="scope">
        <el-button
          type="text"
          size="small">
          移除
        </el-button>
        <el-button
          type="text"
          size="small"
          @click="viewDetail(scope.$index)">
          商品详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
    
</template>
<script>
import {useStore} from "vuex";
import {api} from "../request";

export default {
  name: "HeatedThumbnail",
  props: {
    title: String,
    img: String,
  },

 data() {
      return {
        commodities: undefined,
      };
    },
  methods: {
      viewDetail(index) {
        this.$router.push("/commodityDetail/"+this.commodities[index].CommodityId);
      }
    },
  mounted() {
    let id = this.store.getters['user/userInfo'].id;

    api({
      url: "likes/"+id,
      method: "GET",
    }).then(
        (response) => {
          console.log(response);

          if(response.data["Code"] === "200"){
            this.commodities=response.data["ItemList"];
          }
        }
    )
  },
  setup() {
    let store = useStore()
    return {
      store,
    }
  }
}
</script>

    
       
    
<style scoped>
@import url("//unpkg.com/element-plus/lib/theme-chalk/index.css");


</style>