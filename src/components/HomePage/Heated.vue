<template>
  <div class="rounded-lg bg-green-200 bg-opacity-10 flex pl-10 py-5">
    <HeatedThumbnail
        v-for="i in 6"
        :key="i"
    >
    </HeatedThumbnail>
  </div>
</template>

<script>
import HeatedThumbnail from "@/components/HomePage/HeatedThumbnail";
export default {
  name: "Heated",
  components: {HeatedThumbnail}
}
</script>

<style scoped>

</style>