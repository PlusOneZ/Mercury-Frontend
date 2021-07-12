<template>
  <div class="rounded-xl w-48 mx-3 my-3 divide-y divide-gray-200 bg-blur hover:shadow-2xl">
    <img
        class="w-48 rounded-b-none rounded-xl image"
        :src="img ? img : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
    >
    <div>
      <p class="text-left px-3 py-3 text-l font-bold "> {{ title ? title : "超好用拖鞋寝室外出沙滩旅游打小孩居家必备" }} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeatedThumbnail",
  props: {
    title: String,
    img: String,
  }
}
</script>

<style scoped>
.bg-blur {
  border: none;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(5px) !important;
}
</style>