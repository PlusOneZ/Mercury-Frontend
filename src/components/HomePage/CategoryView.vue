<template>
  <div class="mx-5 my-7">

    <el-container>
      <el-aside width="15vw">
        <div class="text-center text-white"><h2> 分类 </h2></div>
        <!--        TODO: Stick this to top -->
        <el-menu
            :uniqueOpened="true"
            default-active="0"
            class="rounded-xl"
            background-color="rgba(255,255,255,0.3)"
            text-color="#000"
            active-color="#fff"
            style="width: 15vw"
        >

          <el-menu-item
              :class="{
                'rounded-xl': (count === 0 || count === categories.length-1),
                'rounded-b-none': (count === 0),
                'rounded-t-none' : (count === categories.length-1)
              }"
              v-for="(cat, count) in categories"
              :key="count"
              :index="String(count)"
          >
            <i class="el-icon-camera-solid"></i>{{ cat }}
          </el-menu-item>

        </el-menu>
      </el-aside>

      <el-main>
        <div class="category-window col-span-3">
          <div
              class="inline-flex"
              v-for="i in 15"
              :key="i"
          >
            <CommodityThumbnail>
            </CommodityThumbnail>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import CommodityThumbnail from "@/components/Public/CommodityThumbnail";

export default {
  name: "CategoryView",
  components: {CommodityThumbnail},
  data() {
    return {
      categories: [
        "书籍",
        "教材",
        "课程用具",
        "电器",
        "日用品",
        "食物",
      ]
    }
  }
}
</script>

<style scoped>
.el-menu-item.is-active {
  color: #5dbe8a !important;
  background: white !important;
}

.category-window {
  @apply rounded-xl;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
}


.el-aside {
  position: sticky !important;
  top: 0;
}

</style>