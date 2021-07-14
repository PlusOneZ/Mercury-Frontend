<template>
  <div class="content-center m-auto commodity-form" style="width: 100%">
    <div class="w-full m-auto content-center text-center">
      <div class="rounded-lg bg-blur">
        <CommodityForm></CommodityForm>
      </div>
    </div>
  </div>
</template>

<script>
import CommodityForm from "@/components/CommodityRelease/CommodityForm";

export default {
  name: "PublishCommodity",
  components: {CommodityForm}
}
</script>

<style scoped>

.commodity-form {
  height: 100%;
  background-image: linear-gradient(#5698c3, #d1c2d3);
  @apply p-10;
}

.bg-blur {
  @apply p-10;
  display: inline-block;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.4);
  margin: auto;
}

</style>