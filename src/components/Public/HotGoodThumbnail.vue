<template>
  <router-link :to="'/commodityDetail/' + (commodity.Id ? commodity.Id : '')">
    <div class="rounded-xl mx-3 my-3 bg-white divide-y divide-gray-200 bg-opacity-50 bg-blur hover:shadow-xl">
      <el-container>
        <el-main>
          <img
              class="w-44 h-44 rounded-b-none rounded-xl image"
              :src="commodity.Cover ? 'https://139.196.20.137:5001/' + commodity.Cover : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
          >
        </el-main>
        <el-aside width="200px" class="">
          <p class="text-left px-3 py-3 text-l font-bold h-22 mt-4 text-center ">
            {{ commodity.Name ? commodity.Name : "超好用拖鞋寝室外出沙滩旅游打小孩居家必备" }} </p>

          <p class="text-2xl mt-4 text-center ">
            <span class="text-sm">¥</span>{{ commodity['Price'] ? commodity['Price'] : "9999" }}
          </p>
          <p class="text-3xl font-bold mt-4 text-center text-red-600 ">
            热度：{{ calculateBooksMessage() }}
          </p>

        </el-aside>
      </el-container>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "HotGoodThumbnail",
  props: {
    commodity: Object,
    id: String
  },
  methods: {
    calculateBooksMessage() {
      console.log(this.commodity.Likes)
      return (this.commodity.Likes * 10 + this.commodity.Clicks * 3 + 3)
    }
  }

}
</script>

<style scoped>
.bg-blur {
  backdrop-filter: blur(10px) !important;
}
</style>