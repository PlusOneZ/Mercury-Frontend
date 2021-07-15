<template>
  <el-container>
    <el-main class="flex bg-repeat" style="background-image: url('https://img.tukuppt.com/bg_grid/00/12/50/WRuekkPYAY.jpg')">
      <center>
      <div class="rounded-tl-2xl rounded-tr-2xl w-3/4 border-4 bg-blue-100 divide-y-4 divide-gray-400 divide-dashed">
        <div class="bg-no-repeat bg-center bg-cover rounded-tl-xl rounded-tr-xl h-60 pt-12" style="background-image: url('https://img.tukuppt.com/bg_grid/00/03/29/4oXYBULioJ.jpg')">
          <div class="w-1/2 float-left">
            <img class="border-4 border-white" src="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=a9542ebdb5f7427bc196056dcad83b40&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Ff11f3a292df5e0fefedd8c465d6034a85fdf72ab.jpg">
          </div>
        </div>
        <div class="grid grid-cols-2 h-16 pt-2">
          <p>亲~有什么需要的吗？在这里发帖哦！</p>
          <div class="w-3/4">
            <el-button class="float-right" type="primary" @click="createPost">发布求物帖</el-button>
          </div>
        </div>
      </div>
      </center>
      <center>
      <div class="py-6 rounded-bl-2xl rounded-br-2xl w-3/4 bg-gradient-to-r from-blue-200 to-blue-400 bg-opacity-100 grid grid-cols-1 justify-items-center border-4">
        <div>
          <PostThumbnail
              v-for="item in postList"
              :key="item"
              :post="item">
          </PostThumbnail>
          <center>
            <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" layout="prev,pager,next" :current-page="currentPage" :page-size="pageSize" :total="totalPage"></el-pagination>
          </center>
        </div>
      </div>
      </center>
    </el-main>
  </el-container>
</template>

<script>
import PostThumbnail from "../components/Public/PostThumbnail";
import {api} from "@/request";
import {ElMessage} from "element-plus";

export default {
  name: "Posts",
  components: {PostThumbnail},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      postList: undefined,
      totalPage: undefined,
    }
  },
  methods: {
    createPost() {
      this.$router.push("/postEdit")
    },
    pageSizeChange(val) {
      this.pageSize = val;
    },
    currentPageChange(val) {
      this.currentPage = val;

      api({
        url: "post",
        method: "GET",
        params: {
          "maxNumber": this.pageSize,
          "pageNumber": this.currentPage,
        },
      }).then(
          (response) => {
            console.log(response);

            if(response.data["Code"] === "200") {
              this.postList = response.data["PostList"];
            }
          },

          (error) => {
            console.log(error)
            ElMessage.error({
              message: '服务器在开小差...',
              type: 'error'
            })
          }
      )
    }
  },
  mounted() {
    api({
      url: "post/postNumber",
      method: "GET",
    }).then(
        (response) => {
          console.log(response);

          if(response.data["Code"] === "200") {
            this.totalPage = response.data["PostNumber"];
          }
        },
    )

    this.currentPageChange(this.currentPage);
  }
}
</script>

<style scoped>

</style>