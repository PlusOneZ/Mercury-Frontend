<template>
  <div>
    <h1>Hello Home!</h1>
    <p class="text-xl"> Hi! </p>
    <router-link to="/login">Go to Login</router-link>
    <router-link to="/about">Go to About</router-link>
    <div class="flex" style="background-image: repeating-linear-gradient(red, yellow 10%, blue 20%);">
      <CommodityThumbnail

      ></CommodityThumbnail>
    </div>
  </div>
</template>

<script>
import CommodityThumbnail from "@/components/Public/CommodityThumbnail";

export default {
  name: "Com",
  components: {
    CommodityThumbnail
  }
}
</script>

<style scoped>
.bg-blur {
  backdrop-filter: blur(5px) !important;
}
</style>