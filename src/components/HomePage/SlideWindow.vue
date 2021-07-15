<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in urls" :key="item">
      <img class="window-img" :src="item">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "SlideWindow",
  setup() {
    return {
      urls: [
        'https://i.loli.net/2021/07/16/rogqKDI5cje61G9.jpg',
        'https://i.loli.net/2021/07/16/uXqSM8hLipg4VJc.jpg',
        'https://i.loli.net/2021/07/16/XEstVhdWxqPf8Mg.jpg'
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel {
  text-align: center;
  align-content: center;
  height: 100%;
}

.window {
  text-align: center;
  align-content: center;
  justify-content: center;
}

.window-img {
  position: relative;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>