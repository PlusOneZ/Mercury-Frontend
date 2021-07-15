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

      <div class="ml-32 rounded-lg border-gray-300 border ">

        <div>
          <el-carousel indicator-position="outside" :interval="4000" :autoplay=isAutoChange class="rounded-lg ">
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

        <br/>

        <div class="bg-blue-100 text-center grid justify-items-center items-center">
          <div class="mr-16 mt-6 flex items-center justify-start pl-16">
            <div><font class="mb-8 pl-16 ">价格：</font></div>
            <div>
              <font class="text-2xl font-bold mt-4 text-red-600 pr-16 ">
                ￥{{ price ? price : "9999" }}
              </font>
            </div>
          </div>

          <div class="mr-8 mt-6 flex items-center justify-start ">
            <div class="mb-4"><font class="mb-8 pl-16 ">商品标签：&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
            <div>
              <div v-show="tags.length===0" class="mr-8 mb-4">无</div>
              <div v-for="i in (Math.floor(tags.length/4) + 1)" :key=i class="mr-4">
                <el-tag v-for="(item, index) in tags.slice(4*(i-1),Math.min(4*(i-1)+4,tags.length))" :key=item
                        :type=tagTypes[((i-1)*4+index)%5] class="mr-4 mb-4">
                  {{ item }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="border-red-300 ml-12 grid justify-items-center ">

        <div class="mt-8">
          <p class="text-center px-3 py-3 text-3xl font-bold "> {{ name ? name : "超好用拖鞋寝室外出沙滩旅游打小孩居家必备" }} </p>
        </div>

        <div class="rounded-lg border-2 border-blue-200">
          <div class="grid grid-cols-2 pt-8 pr-8 pl-12 pr-12">
            <div>
              <user-and-avatar :is-owner-avatar-success="isOwnerAvatarSuccess"
                               :owner-avatar="ownerAvatar" :owner-name="ownerName"
                               class="flex items-center"></user-and-avatar>
            </div>
            <div class="ml-12 ">
              <Report class="ml-2"></Report>
            </div>

            <div class="mr-12 mt-6 flex items-center justify-start">
              <div><font class="mb-8  ">热度：&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
              <div>
                <font class="text-2xl font-bold mt-4 text-red-600 ">
                  {{ popularity ? popularity : "9999" }}
                </font>
              </div>
            </div>
            <div class="ml-12 mt-6 flex items-center justify-start ">
              <img v-show="isLike===true" @click="star()" src="https://img.icons8.com/android/24/000000/star.png"/>
              <img v-show="isLike===false" @click="star()"
                   src="https://img.icons8.com/material-rounded/24/000000/star--v1.png"/>
              <div><font class="mb-8 "> ：&nbsp;</font></div>
              <div>
                <font class="text-2xl font-bold mt-4 text-red-600 ">
                  {{ likes }}
                </font>
              </div>
            </div>
          </div>
        </div>

        <br/>

        <div>
          <el-tabs type="border-card" stretch="true" class="w-96 text-center ">
            <el-tab-pane label="商品状况">{{ status === '' ? '不详' : status }}</el-tab-pane>
            <el-tab-pane label="存货量">{{ stock === '' ? '不详' : stock }}</el-tab-pane>
            <el-tab-pane label="是否为出租物">{{ for_rent === true ? '是' : '否' }}</el-tab-pane>
          </el-tabs>
        </div>

        <div class="flex justify-around mt-8">
          <div class="mr-8 ml-8" v-if="for_rent===true">
            <rent-commodity :buyer="userName" :commodity-name="name" :price="price"
                            :for_rent="for_rent" :commodity-id="String(commodityId)"
                            :seller-id="String(ownerId)" :stock="stock"></rent-commodity>
          </div>

          <div class="mr-8 ml-8" v-else>
            <buy-commodity :buyer="userName" :commodity-name="name" :price="price"
                           :for_rent="for_rent" :commodity-id="String(commodityId)"
                           :seller-id="String(ownerId)" :stock="stock"></buy-commodity>
          </div>

          <div></div>

          <div class="mr-8 ml-8">
            <el-button type="danger" @click="addShoppingCart()">加入购物车</el-button>
          </div>
        </div>
      </div>

      <div class="border-green-300 col-span-2 ml-32 mr-16 mt-12 w-2/3 justify-self-center">
        <el-tabs type="border-card" class="rounded-lg" @tab-click="handleClick">
          <el-tab-pane @click="canLoad=false" label="商品描述" class="ml-4 mr-2">{{ description }}</el-tab-pane>
          <el-tab-pane @click="canLoad=true" label="用户评论">
            <CommodityCommentList :comments="comments" :can-load="canLoad"></CommodityCommentList>
          </el-tab-pane>
        </el-tabs>
      </div>
      <br/>
      <br/>
    </div>
  </div>
</template>

<script>
import Report from "@/components/Public/Report";
import {ElMessage} from "element-plus";
import BuyCommodity from "@/components/CommodityDetail/BuyCommodity";
import RentCommodity from "@/components/CommodityDetail/RentCommodity";
import UserAndAvatar from "@/components/Public/UserAndAvatar";
import CommodityCommentList from "@/components/Public/CommodityCommentList";
import {api} from "@/request";
import {useStore} from "vuex";


export default {
  name: "CommodityDetail",
  components: {
    Report,
    BuyCommodity,
    RentCommodity,
    UserAndAvatar,
    CommodityCommentList,
  },
  props: {
    commodityId: String,
  },
  data: function () {
    return {
      status404: false,

      userId: '1850061',
      userName: 'rzc',
      ownerId: '1850061',
      ownerName: 'rzc',
      ownerAvatar: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png",
      name: "自动编程机",
      former_price: 100,
      price: 66.66,
      likes: 1,
      description: '  ' + '自动编程机，只要点击就可以通过你的意念进行编程。如果你不会编程也没事，你可以通过' +
          '意念来指定编程目标，然后该机器就会自动帮你生成代码。有了它，后端开发无需为调不来数据库而烦恼，前端不必为' +
          '网格对其而烦心',
      stock: 12,
      isAutoChange: true,
      for_rent: false,
      images: [
        "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png",
        "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
      ],
      video: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
      status: "九成新",
      popularity: 55,
      clicks: 666,
      tags: [
        "好用", "牛逼", '我是你爹', '你是我儿', '写网页好累', '啦啦啦'
      ],
      comments: [{
        userName: 'rzc', userImage: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
        , userId: 0, comment: 'rnm,退钱', rating: 3
      },
        {
          userName: '猴哥', userImage: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
          , userId: 0, comment: 'nmsl，完全不靠谱', rating: 5
        },
        {
          userName: 'ysj', userImage: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
          , userId: 0, comment: '很好的商品呢，已经把来买的同学记录下来了呢，亲', rating: 9
        }, {
          userName: 'rzc', userImage: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
          , userId: 0, comment: 'rnm,退钱', rating: 3
        },
        {
          userName: '猴哥', userImage: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
          , userId: 0, comment: 'nmsl，完全不靠谱', rating: 5
        },
        {
          userName: 'ysj', userImage: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
          , userId: 0, comment: '很好的商品呢，已经把来买的同学记录下来了呢，亲', rating: 9
        },],
      category: "课程用品",
      isLike: true,
      isOwnerAvatarSuccess: true,
      dialogFormVisible: false,
      isAlert: true,
      tagTypes: ['success', '', 'info', 'warning', 'danger'],
      canLoad: false

    }
  },
  mounted() {
    this.$nextTick(() => {

      let FormData = require('form-data');
      let data = new FormData();
      const that = this
      data.append('id', this.commodityId);
      console.log('commodityId:' + data.get('id'))
      api({
        url: 'commodity',
        method: 'get',
        data: data,
      }).then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.Code !== '200') {
              this.status404 = true
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      var data2 = new FormData();
      data2.append('userId', this.userId);
      data2.append('commodityId', this.commodityId);

      api({
        url: 'Likes/2',
        method: 'post',
        data: data2,
      })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            that.isLike = response.data["Result"]
            if(that.isLike === 'True')
            {
              that.isLike = true
            }
            else
            {
              that.isLike = false
            }
            that.isLike = !that.isLike
            console.log(that.isLike)
          })
          .catch(function (error) {
            console.log(error);
          });


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
    handleClick: function (tab) {
      this.canLoad = tab['props']['label'] !== '商品描述';
    },
    clickVideo: function () {
      this.isAutoChange = !this.isAutoChange
    },
    star: function () {
      this.isLike = !this.isLike
      if (this.isLike === true) {
        this.likes -= 1
      } else {
        this.likes += 1
      }

      var FormData = require('form-data');
      var data = new FormData();
      data.append('userId', this.userId);
      data.append('commodityId', this.commodityId);
      console.log(data.get('userId'))
      console.log(data.get('commodityId'))
      api({
        url: 'Likes',
        method: 'post',
        data: data
      })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log('success')
          })
          .catch(function (error) {
            console.log(error);
            ElMessage.error({
              message: '服务器在开小差...',
              type: 'error'
            })
          });
      //发送请求
    },
    addShoppingCart: function () {
      //发送请求
      let i = 1
      if (i === 1) {
        ElMessage.success({
          message: '加入购物车成功',
          type: 'success'
        });
      } else {
        ElMessage.error('加入购物车失败');
      }
    },
    setup() {
      let store = useStore()
      return {
        store
      }
    }

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