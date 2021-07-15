<template>
  <center>
    <el-tabs type="border-card" class="w-3/5">
      <el-tab-pane class="order-box">
        <template #label>
          <span><i class="el-icon-s-goods"></i>我发布的商品</span>
        </template>
        <div>
          <el-table
              :data="commodities">
            <el-table-column
                prop="Name"
                label="商品名称"
                class="w-1/3">
            </el-table-column>
            <el-table-column
                prop="Price"
                label="商品价格"
                class="w-1/3">
            </el-table-column>
            <el-table-column
                label="操作"
                class="w-1/3">
              <template #default="scope">
                <el-button type="text" @click="viewCommodityDetail(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane class="order-box">
        <template #label>
          <span><i class="el-icon-date"></i>我发布的求物帖</span>
        </template>
        <div>
          <el-table
          :data="posts">
            <el-table-column
                prop="Title"
                label="标题"
                class="w-1/4">
            </el-table-column>
            <el-table-column
                prop="Content"
                label="内容"
                class="w-2/4">
            </el-table-column>
            <el-table-column
                label="操作"
                class="w-1/4">
              <template #default="scope">
               <el-button type="text" @click="viewPostDetail(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </center>
</template>

<script>
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {api} from "@/request";

export default {
  name: "MyCommodityAndPost",
  data() {
    return {
      commodities: undefined,
      posts: undefined,
      postNumber: 0,
    }
  },
  methods: {
    viewPostDetail(index) {
      this.$router.push("/postDetail/"+this.posts[index].PostId);
    },
    viewCommodityDetail(index) {
      this.$router.push("/commodityDetail/"+this.commodities[index].Id);
    }
  },
  mounted() {
    let id = this.store.getters['user/userInfo'].id;

    api({
      url:"commodity",
      method: "GET",
      params: {
        userId: id,
      }
    }).then(
        (response) => {
          console.log(response);

          if(response.data["Code"] === "200"){
            this.commodities=response.data["commodityList"];
          }
        }
    )

    api({
      url: "post/postNumber",
      method: "GET",
      params: {
        userId: id,
      }
    }).then(
        (response) => {
          console.log(response);

          if(response.data["Code"] === "200") {
            this.postNumber = response.data["PostNumber"];

            api({
              url: "post",
              method: "GET",
              params: {
                userId: id,
                maxNumber: this.postNumber,
              }
            }).then(
                (response) => {
                  console.log(response);

                  if(response.data["Code"] === "200") {
                    this.posts = response.data["PostList"];
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
    )
  },
  setup() {
    let store = useStore();

    return {
      store,
    }
  }
}
</script>

<style scoped>

</style>