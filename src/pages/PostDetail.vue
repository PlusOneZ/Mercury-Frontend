<template>
    <el-main class="bg-gradient-to-r from-blue-200 to-blue-400 bg-opacity-100">
      <div class=" rounded-2xl bg-white border-black divide-y divide-black" >
        <div class="flex flex-row space-x-8">
          <div class="container w-1/4 h-1/2">    
            <el-carousel  indicator-position="outside" :interval="4000" :autoplay=false class="rounded-lg " height="250px"> 
              <el-carousel-item v-for="item in ImageCount" :key="item">
                <!-- <img class="window-img" :src = item>  -->
                <img class="window-img" src= "https://th.bing.com/th/id/R.8a19d856f3b226a07d7d0cc840df15b5?rik=psWeyn%2fsD2BPMg&riu=http%3a%2f%2fpics.latexstudio.net%2farticle%2f2018%2f1029%2fa2842882fc5228a.png&ehk=QSyUQlp266xvBnGyp6rPNHjFqxflbcRESOvVA%2b0BO6c%3d&risl=&pid=ImgRaw">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="container w-3/5 space-y-8 mt-4">
            <div class="flex flex-row">
              <div class="flex  justify-start flex-row space-x-2 ">
                <el-avatar class="" src="https://inews.gtimg.com/newsapp_bt/0/13217980331/1000"></el-avatar>
                <!-- <el-avatar :src="AvatarPath"></el-avatar> -->
                <p class="text-xl py-2">{{SenderName}}</p>               
              </div>
              <div class="ml-20 flex justify-start row-start-1 col-start-2">
                <report ></report>
              </div>
            </div>
            <p class="font-black text-2xl flex justify-start mt-4">{{Title}}</p>
            <div class="flex flex-nowrap justify-start text-1xl">
                <p>发布时间：</p> 
                <p >{{Time}}</p>
            </div>
            <div class="flex justify-start space-x-16 mb-6 mt-6">
              <el-button type="primary" icon="el-icon-chat-dot-square" round>联系买家</el-button>
              <comment :isRating="F" :userId="SenderId" :sender="Sender" ></comment>
            </div>
          </div>
        </div> 
        <div>
          <el-tabs type="border-card" class="rounded-lg" @tab-click="handleClick">
            <el-tab-pane @click="canLoad=false" label="商品描述" class="ml-4 mr-2">{{ Content }}</el-tab-pane>
            <el-tab-pane @click="canLoad=true" label="用户评论">
              <CommodityCommentList :comments="comments" :can-load="true"></CommodityCommentList>
            </el-tab-pane>
          </el-tabs>
        </div> 
      </div>
    </el-main>

</template>

<script>
import report from "@/components/Public/report";
import comment from "@/components/Public/comment";
import CommodityCommentList from "@/components/Public/CommodityCommentList";
import {api} from "@/request";

export default {
  name: "PostDetail",
  components: {
    report,CommodityCommentList,comment
  },
  data() {
    return {
      comments: [{
        userName: 'rzc', userImage: "https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png"
        , userId: 0, comment: 'rnm,退钱', rating: 0
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
      rating:0
    }
  },
  methods:{
    handleClick: function (tab) {
      this.canLoad = tab['props']['label'] !== '商品描述';
    },
    getData(){
      api({
          url: "post/"+this.ID,
          method: "get"
        }).then(
            (res) => {
              console.log(res.data)
              this.Images = res.data.Post.Images
              this.SenderName = res.data.Post.SenderName
              this.AvatarPath = res.data.Post.AvatarPath
              this.Content = res.data.Post.Content
              this.SenderId = res.data.Post.SenderId
              this.Time = res.data.Post.Time
              this.Time=this.Time.replace("T"," ");
              this.Title = res.data.Post.Title
              this.Sender = res.data.Post.Sender
              this.PostComments = res.data.Post.PostComments
              this.Status = res.data.Status
              this.ImageCount = this.Images.length
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
        this.ID = "930674631177"
      }
      console.log(this.ID)
      this.getData()
    })

  }
}
</script>

<style scoped>
.el-header{
   background: #0f1423;
}
</style>