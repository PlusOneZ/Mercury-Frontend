<template>

  <el-main>
    <div class="flex">
      <div class="slide-window pr-8">
        <SlideWindow></SlideWindow>
      </div>
      <PostListThumbnail></PostListThumbnail>
    </div>
    <div>
      <Heated></Heated>

      <!--        <div class="grid-cols-6 grid">-->
      <!--          <CommodityThumbnail-->
      <!--              v-for="i in 100"-->
      <!--              :key="i"-->
      <!--          ></CommodityThumbnail>-->
      <!--        </div>-->
      <CategoryView> </CategoryView>
    </div>
  </el-main>
</template>

<script>
import SlideWindow from "@/components/HomePage/SlideWindow";
import PostListThumbnail from "@/components/HomePage/PostListThumbnail";
import Heated from "@/components/HomePage/Heated";
import CategoryView from "@/components/HomePage/CategoryView";

export default {
  name: "Home",
  components: {
    CategoryView,
    Heated,
    PostListThumbnail,
    SlideWindow
  }
}
</script>

<style scoped>

.el-main {
  background: -webkit-linear-gradient(left top, #2f90b9 2.5%, #1781b5 7.5%, #93b5cf 20%, #d8e3e7 50%, #93b5cf 70%, #1781b5 92.5%, #2f90b9 97.5%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, #000, #fff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, #000, #fff); /* Firefox 3.6 - 15 */
//background-image: repeating-linear-gradient(#2f90b9 15%, #d8e3e7 15%); /* 标准的语法 */
  background-image: linear-gradient(#5698c3, #d1c2d3);
  height: 100%
}

.slide-window {
  @apply text-center justify-center;
  width: 80%;
}

.page {
  height: 100%
}

</style>