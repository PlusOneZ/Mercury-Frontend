
<template>


<div id="app">


  <el-table
    :data="tableData"
    border
    height="700"
    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px; ">
    
    
    <el-table-column
     prop="commodity"
     label="商品">
      <img
            class="w-44 h-44 rounded-b-none rounded-xl image"
            :src="img ? img : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
        ><span>{{ title ? title : "超好用拖鞋寝室外出沙滩旅游打小孩居家必备" }}</span>
    </el-table-column>
    <el-table-column
      prop="amount1"
      label="单价">
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template #default="scope">
        <el-button
          @click.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
        <router-link to="/OrderDetermine"><el-button
         
          type="text"
          size="small">
          结算
        </el-button>
        </router-link>
       
      </template>
    </el-table-column>
  </el-table>
</div>
    
</template>
<script>
export default {
  name: "ShoppingCart",
  props: {
    title: String,
    img: String,
  },
 data() {
      return {
        tableData: [{
          commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
          amount1: '234',
         

        }, {
         commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
          amount1: '165',
        

        }, {
         commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
          amount1: '324',
        
        }, {
         commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
          amount1: '621',
         

        }, {
         commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
          amount1: '539',
          

        }],
       
      };
    },
    methods: {
      
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
      
    }
}
</script>

    
       
    
<style scoped>
@import url("//unpkg.com/element-plus/lib/theme-chalk/index.css");


</style>