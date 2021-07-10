<template>

  <div class="common-layout">
    <el-container class="page">
      <el-header class="flex">Header</el-header>
      <el-container class="h-24 flex justify-around items-center ">
        <div class="font-bold text-blue-600 ">Mercy</div>
        <div class="flex justify-center">
          <div class="w-20 bg-yellow-400 font-bold text-white text-center rounded-md flex justify-around items-center ">
            宝贝
          </div>
          <div>&nbsp;&nbsp;</div>
          <input v-model="input" placeholder="请输入要搜索的宝贝" class="rounded-md w-96 border-solid border-2 "/>
          <div>&nbsp;&nbsp;</div>
          <el-button size="medium">搜索</el-button>
        </div>
        <div></div>
      </el-container>
      <el-container>
        <el-main>
          <div>
            <div class="w-20 bg-yellow-400 font-bold text-white text-center rounded-md ">
              所有宝贝
            </div>
            <div class="main border-solid border-2 border-yellow-300 ...">
              <div class="h-96 ..."></div>
            </div>
          </div>
        </el-main>
        <el-aside width="400px">
          <br/>
          <div>
            <div class="w-20 bg-blue-300 font-bold text-white text-center rounded-md ">
              热卖商品
            </div>
            <div class="bg-yellow-200 ">
              d
            </div>
          </div>
        </el-aside>
      </el-container>
      <el-footer class="flex justify-center ">
        <el-pagination
            background
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>

</template>

<script>

export default {
  name: "CommoditySearch",
  components: {},
  data: function () {
    return {
      input: ''
    };
  }
}
</script>

<style scoped>
.el-header {
  background: #0f1423;
}

.main {
  background: -webkit-linear-gradient(left top, #2f90b9 2.5%, #1781b5 7.5%, #93b5cf 20%, #d8e3e7 50%, #93b5cf 70%, #1781b5 92.5%, #2f90b9 97.5%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #000, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #000, #fff); /* Firefox 3.6 - 15 */
//background-image: repeating-linear-gradient(#2f90b9 15 %, #d8e3e7 15 %); /* 标准的语法 */
  background-image: linear-gradient(to top, #2f90b9, #1781b5, #93b5cf, #93b5cf);
  height: 100%
}

.page {
  height: 100%
}

</style>