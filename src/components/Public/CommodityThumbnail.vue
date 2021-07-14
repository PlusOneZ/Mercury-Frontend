<template>
  <router-link :to="'/commodityDetail/' + commodity.Id ? commodity.Id : ''">
    <div class="rounded-xl comm mx-3 my-3 bg-white divide-y divide-gray-200 bg-opacity-50 bg-blur hover:shadow-xl">
      <img
          class="w-56 rounded-b-none rounded-xl image"
          :src="img ? img : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
      >
      <div>
        <p class="text-left px-3 py-3 text-l font-bold "> {{ commodity.Name ? commodity.Name : "未命名商品" }} </p>
        <div class="flex px-4">
          <div
              class="rounded-full bg-blue-300 inline-flex px-2 mr-1 bg-opacity-50"
              v-for="(count, item) in commodity.CommodityTag"
              :key="count"
          >
            <p class="text-sm"> {{ item }} </p>
          </div>
          <div class="rounded-full bg-green-300 inline-flex px-2 mr-1 bg-opacity-50"><p class="text-sm"> 生活用品 </p></div>
        </div>
        <div class="text-left pl-5 pt-2">
          <p class="text-3xl font-bold">
            <span class="text-sm">¥</span>{{ commodity.Price ? commodity.Price : "null" }}
<!--            <s class="text-lg text-gray-500"> 159 </s>-->
          </p>
        </div>
      </div>
      <div class="flex pl-3 pt-1 pb-2 rounded-xl rounded-t-none ">
        <img
            class="w-7 h-7 rounded-full"
            :src="commodity.SellerAvatar ? commodity.SellerAvatar : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
        >
        <p class="pl-2 text-sm leading-7"> {{ commodity.Seller ? commodity.Seller : "神秘人" }} </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CommodityThumbnail",
  props: {
    commodity: Object,
    id: String
  },
  mounted() {

  }
}
</script>

<style scoped>
.bg-blur {
  backdrop-filter: blur(10px) !important;
}

.comm {
  width: 11rem;
}
</style>