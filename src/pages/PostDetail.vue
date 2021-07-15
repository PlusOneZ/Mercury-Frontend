<template>

    <el-main class="bg-gradient-to-r from-blue-200 to-blue-400 bg-opacity-100">
      <div class=" rounded-2xl bg-white border-black divide-y divide-black ml-8  mr-8" >
        <div class="flex flex-row space-x-8">
          <div class="container w-1/6 h-1/2">    
            <el-carousel  v-if="ImageCount!==0" indicator-position="outside" :interval="4000" :autoplay=false class="rounded-lg " height="250px"> 
              <el-carousel-item  v-for="item in ImageCount" :key="item">
                <img class="window-img" :src = item> 
              </el-carousel-item>
            </el-carousel>
            <div v-else class="mt-8 w-full ">
              <img class="window-img" src= "https://th.bing.com/th/id/R.6a56fe9aa650a9ee6d0a47e289f9b1d2?rik=SmTCJTUafE08ug&riu=http%3a%2f%2fwww.zjmzzs.com%2fApp%2fTpl%2fHome%2fUploads%2fim_5b70eecb7c7e7.png&ehk=0XLqbMvt0yPS5x5I3l3zLCqvsjzPKP1AMyebryW1BPo%3d&risl=&pid=ImgRaw">
            </div>
          </div>
          <div class="container w-3/5 space-y-8 mt-4">
            <div class="flex flex-row">
              <div class="flex  justify-start flex-row space-x-2 ">
                <!-- <el-avatar class="" src="https://inews.gtimg.com/newsapp_bt/0/13217980331/1000"></el-avatar> -->
                <el-avatar :src="AvatarPath"></el-avatar>
                <p class="py-2 text-xl md:text-2xl">{{SenderName}}</p>               
              </div>
              <div class="ml-20 flex justify-start row-start-1 col-start-2">
                <report ></report>
              </div>
            </div>
            <p class="font-black flex justify-start mt-4 text-xl md:text-2xl">{{Title}}</p>
            <div class="flex flex-nowrap justify-start text-1xl">
                <p>发布时间：</p> 
                <p >{{Time}}</p>
            </div>
            <div class="flex justify-center space-x-20 md:space-x-96">
              <el-button type="primary" icon="el-icon-chat-dot-square" round>联系买家</el-button>
              <comment :isRating="F" :userId="simpleUserId" :id="ID" ></comment>
            </div>

          </div>
        </div> 
        <div>
          <el-tabs type="border-card" class="rounded-lg" @tab-click="handleClick">
            <el-tab-pane @click="canLoad=false" label="商品描述" class="ml-4 mr-2">{{ Content }}</el-tab-pane>
            <el-tab-pane @click="canLoad=true" label="用户评论">
              <CommodityCommentList v-if="flag" :comments="comments" :can-load="true" ></CommodityCommentList>
            </el-tab-pane>
          </el-tabs>
        </div> 
      </div>
    </el-main>

</template>

<script>

import report from "@/components/Public/Report";
import comment from "@/components/Public/comment";
import CommodityCommentList from "@/components/Public/CommodityCommentList";
import {api} from "@/request";
import { toRaw } from '@vue/reactivity';
import {useStore} from "vuex";



export default {
  name: "PostDetail",
  components: {
    report,CommodityCommentList,comment
  },
  data() {
    return {
      ImagePaths :[],
      Content :"",
      SenderId :"",
      Time :"",
      Title :"",
      Sender: "",
      PostComments:[],
      Status :"",
      ID : "",
      AvatarPath:"",
      SenderName:"",
      ImageCount:0,
      F: false,
      rating:0,
      flag :false,
      simpleUserId :'' 
    }
  },
  methods:{
    handleClick: function (tab) {
      this.canLoad = tab['props']['label'] !== '商品描述';
    },
  
    getData(){
      let simpleUser = this.store.getters['user/userInfo']
      if (!simpleUser.loggedIn) {
        this.$router.push("/login")
        return
      }
      this.simpleUserId = simpleUser.id
      api({
          url: "post/"+this.ID,
          method: "get"
        }).then(
            (res) => {
              console.log(res.data)
              var data = res.data.Post
              this.Images = data.Images
              this.SenderName = data.SenderName
              this.SenderId = data.SenderId
              this.AvatarPath = data.AvatarPath
              this.Content = data.Content
              this.Time = data.Time
              this.Time=this.Time.replace("T"," ").substr(0,19);
              this.Title = data.Title
              this.PostComments = data.PostComments
              this.ImageCount = this.Images.length
              let t = []
              data.Comments.forEach(element => {
                let temp={
                  userName: element.SenderName, 
                  userImage: element.AvatarPath,
                  userId: element.SenderId,
                  comment: element.Content, 
                  rating: -1
                }
                t.push(temp)
              });
              this.comments = toRaw(t)
              this.flag = true
            },
            (error) => {
              console.log(error)
            })    
            }
  },
  created: function() {
    this.firstPlayFlag = false
    this.$nextTick(() => {
      console.log(this.$route.params)
      let temp = this.$route.params
      console.log(temp['ID'])
      if (temp['ID'] !== undefined) {
        this.ID = temp['ID']
      } else {
        this.ID = "946710726649"
      }
      this.getData()
    })

  },
  setup(){
    let store = useStore()
    return{
      store
    }

  },
}
</script>

<style scoped>
.el-header{
   background: #0f1423;
}
</style>