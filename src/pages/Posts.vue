<template>
  <el-container>
    <el-main class="flex">
      <div class="rounded-2xl border-4 bg-blue-100 divide-y-4 divide-gray-400 divide-dashed">
        <div class="bg-no-repeat bg-center h-60 pl-32 pt-12" style="background-image: url('https://tb1.bdstatic.com/tb/cms/frs/bg/default_head20141014.jpg')">
          <div>
            <img class="border-4 border-white" src="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=a9542ebdb5f7427bc196056dcad83b40&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Ff11f3a292df5e0fefedd8c465d6034a85fdf72ab.jpg">
          </div>
        </div>
        <div class="grid grid-cols-2 h-16 pr-24 pt-2">
          <p>亲~有什么需要的吗？在这里发帖哦！</p>
          <div>
<<<<<<< HEAD
            <el-button class="float-right" type="primary">发布求物帖</el-button>
=======
            <el-button class="float-right" type="primary" @click="createPost">发布求物帖</el-button>
>>>>>>> 6f99e3675a0115c76d46a1e8f27279adc5059574
          </div>
        </div>
      </div>
      <div class="rounded-2xl grid grid-flow-col justify-items-center border-4">
        <div class="rounded-xl bg-blue-200 h-full w-full"></div>
        <div>
          <PostThumbnail
              v-for="i in 20"
              :key="i">
          </PostThumbnail>
          <center><el-pagination layout="prev,pager,next" :total="20">
          </el-pagination></center>
        </div>
        <div class="rounded-xl bg-blue-200 h-full w-full float-right"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import PostThumbnail from "../components/Public/PostThumbnail";
export default {
  name: "Posts",
<<<<<<< HEAD
  components: {PostThumbnail}
=======
  components: {PostThumbnail},
  methods: {
    createPost() {
      this.$router.push("/postEdit")
    }
  }
>>>>>>> 6f99e3675a0115c76d46a1e8f27279adc5059574
}
</script>

<style scoped>

</style>