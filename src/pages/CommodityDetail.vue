<template>
  <div>
    <el-container class="h-24 flex justify-around items-center ">
      <div class="font-bold text-blue-600 ">Mercury</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </el-container>
    <div class="grid grid-cols-2 ">
      <div class="ml-32">
        <div>
          <el-carousel indicator-position="outside" :interval="4000" :autoplay=isAutoChange>
            <el-carousel-item>
              <video controls="controls" @click="clickVideo()">
                <source :src=video type="video/mp4"/>
              </video>
            </el-carousel-item>
            <el-carousel-item v-for="url in images" :key="url">
              <img class="window-img" :src="url">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="grid grid-cols-2 mt-12 ml-24 ">
          <div class="mr-12 flex justify-start ">
            <el-avatar :src=ownerAvatar @error="errorHandler" :size="40">
              <img :src=ownerAvatar v-if="isOwnerAvatarSuccess===true" alt=""/>
              <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt=""/>
            </el-avatar>
            <div class="ml-8 flex justify-around items-center ">{{ ownerName }}</div>
          </div>
          <div class="ml-12 ">
            <report ></report>
          </div>
          <div class="mr-12 mt-6 ">人气按键</div>
          <div class="ml-12 mt-6 ">收藏按键</div>
        </div>
      </div>

      <div class="border-red-300 ml-12 ">购买区</div>

      <div class="border-green-300 col-span-2 ml-32 mt-12 ">评论区</div>
    </div>
  </div>
</template>

<script>
import report from "@/components/Public/report";

export default {
  name: "CommodityDetail",
  components: {
    report
  },
  data: function () {
    return {
      commodityId: 0,
      ownerId: 0,
      ownerName: 'rzc',
      ownerAvatar: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png",
      name: "高性能拖把",
      former_price: 100,
      price: 66.66,
      likes: 134,
      stock: 12,
      isAutoChange: true,
      images: [
        "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png",
        "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
      ],
      video: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
      liked: 999,
      status: "九成新",
      popularity: 55,
      clicks: 666,
      tags: [
        "好用"
      ],
      category: "课程用品",
      isLike: true,
      isOwnerAvatarSuccess: true,
      dialogFormVisible: false,
      isAlert: true,

    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$route.params)
      let temp = this.$route.params;
      if (temp['commodityId'] !== undefined) {
        this.commodityId = temp['commodityId']
      } else {
        this.commodityId = 123456789098
      }
    })
  },
  methods: {
    getCommodityDetail: function () {
      if (this.commodityId !== undefined) {
        let i = 0;
        i++;
        return i
      }
    },
    clickVideo: function () {
      this.isAutoChange = !this.isAutoChange
    },
    errorHandler: function () {
      this.isOwnerAvatarSuccess = false
    },

  }
}
</script>

<style scoped>
.el-carousel__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
}

</style>