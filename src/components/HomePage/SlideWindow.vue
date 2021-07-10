<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in 6" :key="item">
      <img class="window-img" src="https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "SlideWindow"
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