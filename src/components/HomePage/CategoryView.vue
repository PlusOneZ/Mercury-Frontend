<template>
  <div class="mx-5 my-7">

    <el-container>
      <el-aside width="15vw">
        <div class="text-center text-white"><h2> 分类 </h2></div>
        <!--        TODO: Stick this to top -->
        <el-menu
            :uniqueOpened="true"
            :default-active="defaultActive"
            class="rounded-xl"
            background-color="rgba(255,255,255,0.3)"
            text-color="#000"
            active-color="#fff"
            style="width: 15vw"
            @select="handleSelect"
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
            <i :class="cat[2]"></i>{{ cat[0] }}
          </el-menu-item>

        </el-menu>
      </el-aside>

      <el-main class="col-span-3">
        <div class="category-window grid md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-6 lg:grid-cols-5">
          <CommodityThumbnail
              v-for="i in commodities"
              :key="i.Id"
              :commodity="i"
          >
          </CommodityThumbnail>

        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import CommodityThumbnail from "@/components/Public/CommodityThumbnail";
import {api} from "@/request";
import {ElMessage} from "element-plus";
import {staticData} from "@/assets/js/static";

export default {
  name: "CategoryView",
  components: {CommodityThumbnail},
  data() {
    return {
      list: [],
      defaultActive: '0',
      commodities: []
    }
  },
  methods: {
    handleSelect(key) {
      console.log("select ", key)
      console.log("haha", this.categories[key][1])
      let cat = this.categories[key][1]
      api({
        method: "GET",
        url: "commodity/?classification=" + cat,
      }).then( (response) => {
        console.log(response)
        if (response.data.Code === "200") {
          this.commodities = response.data["commodityList"]
        }
      }, (error) => {
        ElMessage.error({
          message: "服务器似乎在开小差..."
        })
        console.log(error)
      })
    }
  },
  mounted() {
    // let defaultCat = this.categories[this.defaultActive][1]
    api({
      method: "GET",
      url: "commodity/?classification=1",
    }).then( (response) => {
      console.log(response)
      if (response.data.Code === "200") {
        this.commodities = response.data["commodityList"]
      }
    }, (error) => {
      ElMessage.error({
        message: "服务器似乎在开小差..."
      })
      console.log(error)
    })
  },
  setup() {
    let categories = staticData.categories
    return {
      categories
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
  padding: 1rem;
}


.el-aside {
  position: sticky !important;
  top: 0;
}


</style>