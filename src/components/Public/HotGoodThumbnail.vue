<template>
  <router-link :to="'/commodityDetail/' + id">
    <div class="rounded-xl mx-3 my-3 bg-white divide-y divide-gray-200 bg-opacity-50 bg-blur hover:shadow-xl">
      <el-container>
        <el-main>
          <img
              class="w-44 h-44 rounded-b-none rounded-xl image"
              :src="img ? img : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
          >
        </el-main>
        <el-aside width="200px">
          <p class="text-left px-3 py-3 text-l font-bold h-22 mt-4 "> {{ title ? title : "超好用拖鞋寝室外出沙滩旅游打小孩居家必备" }} </p>

          <p class="text-2xl mt-4 text-center ">
            <span class="text-sm">¥</span>{{ price ? price : "9999" }}
          </p>
          <p class="text-3xl font-bold mt-4 text-center text-red-600 ">
            热度：{{ popularity ? popularity : "9999" }}
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
    title: String,
    popularity: Number,
    price: Number,
    img: String,
    id: String
  }
}
</script>

<style scoped>
.bg-blur {
  backdrop-filter: blur(10px) !important;
}
</style>