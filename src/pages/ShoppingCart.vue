<template>

    <div>
    <el-table
        :data="tableData"
        height="700"
        show-summary
        :summary-method="getSummaries"
        stripe="true"
        style="width: 100%" class="col-span-7 mt-16 rounded-lg border border-grey-200">


      <el-table-column
          prop="commodity"
          label="商品图片" width="275" align="center">
        <center><img
            class="w-44 h-44 rounded-b-none rounded-xl image"
            :src="img ? img : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
        ></center>
      </el-table-column>

      <el-table-column
          prop="commodity"
          label="商品名" width="225" align="center">
        <span class="text-xl font-semibold ">{{ title ? title : "超好用拖鞋寝室外出沙滩旅游打小孩居家必备" }}</span>
      </el-table-column>

      <el-table-column
          prop="price"
          label="单价" width="150" class="col-span-1" align="center">
      </el-table-column>

      <el-table-column
          prop="count"
          label="购物车中数量" width="150" class="col-span-1" align="center">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          class="col-span-3" align="center">
        <template #default="scope">
          <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="primary" class="mr-8">
            移除
          </el-button>

          <el-button type="primary" class="ml-8"
                     @click.prevent="buyCommodity(scope.$index, tableData)">
            结算
          </el-button>


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
        price: '234', count: 3
      }, {
        commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
        price: '165', count: 1
      }, {
        commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
        price: '324', count: 4
      }, {
        commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
        price: '621', count: 9
      }, {
        commodity: '超好用拖鞋寝室外出沙滩旅游打小孩居家必备',
        price: '539', count: 3
      }],
    };
  },
  methods: {

    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    buyCommodity(index, rows) {
      console.log(rows[index]);
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      console.log(data)
      console.log(data[3])
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        if (index === 3) {
          sums[index] = 0
          for (let i = 0; i < this.tableData.length; i++) {
            sums[index] += Number(data[i]["price"]) * Number(data[i]["count"])
          }
          sums[index] += ' 元';
        }
      });
      console.log(sums)
      return sums;
    }

  }
}
</script>


<style scoped>

</style>