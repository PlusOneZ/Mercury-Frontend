<template>
  <div class="p-14">
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          fixed
          prop="picture"
          label="商品图片"
          width="240">
        <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :fit="fit"></el-image>
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品名称"
          width="200">
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品价格"
          width="120">
      </el-table-column>
      <el-table-column
          prop="click"
          label="点击量"
          width="120">
      </el-table-column>
      <el-table-column
          prop="star"
          label="收藏量"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="240">
        <template #default="scope">
          <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
            修改信息
          </el-button>
          <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
            删除商品
          </el-button>
          <el-button
              @click.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
            联系买家
          </el-button>
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
    }
  },
  data() {
    return {
      tableData: [{
        picture: '2016-05-03',
        name: '哈哈哈哈哈',
        price: '999',
        click: '0',
        star: '0'
      }],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style>

</style>