<!-- @author: 黄开宇-->
<template>
  <div>
    <el-row class="p-14">
      <el-col :span="5" :offset="1">
        <el-card class="avatar-card" :body-style="{ padding: '35px' }">

          <el-upload
              class="avatar-uploader"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false"
          >
            <div id="wrap">
              <div id="box">
                <img v-if="imageUrl" :src="'https://139.196.20.137:5001/' + imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </div>
          </el-upload>

        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>用户信息</span>
              <router-link to="/editInfo">
                <el-button class="button" type="text">修改信息</el-button>
              </router-link>
            </div>
          </template>
          <div class="text item">
            用户昵称：{{ user.Nickname }}
          </div>
          <div class="text item">
            真实姓名：{{ user.RealName }}
          </div>
          <div class="text item">
            专业：{{
              majors.find((i) => {
                return i.value === user.Major
              }).label
            }} <span class="w-4"></span> 年级：{{
              grades.find((i) => {
                return i.value === String(user.Grade)
              }).label
            }}
          </div>
          <div class="text item">
            用户信用值：{{ user.Credit }}
          </div>
          <div class="text item">
            用户个性签名：{{ user.Brief }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>订单信息</span>
              <el-button class="button" type="text"></el-button>
            </div>
          </template>
          <div class="text item">
            {{ '待支付订单数量：0' }}
          </div>
          <div class="text item">
            {{ '待交易订单数量：0' }}
          </div>
          <div class="text item">
            {{ '已发布订单数量：0' }}
          </div>
          <div class="text item">
            {{ '收藏夹商品数量：0' }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg pb-20" justify="space-around">
      <el-tabs type="border-card">
        <el-tab-pane class="order-box" >
          <template #label>
            <span><i class="el-icon-s-goods"></i>订单管理</span>
          </template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="second">
              <template #label>
                <span><i class="el-icon-document"></i>进行中</span>
              </template>
              <MyOrders
                  :type="'UNPAID'"
              >

              </MyOrders>
            </el-tab-pane>
            <el-tab-pane name="first">
              <template #label>
                <span><i class="el-icon-document-checked"></i>已完成</span>
              </template>
              <MyOrders
                  :type="'PAID'"
              >

              </MyOrders>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

      </el-tabs>
    </el-row>
    <MyCommodityAndPost :isMe=true :id=id></MyCommodityAndPost>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {api} from "@/request"
import {ElMessage} from "element-plus";
import {staticData} from "@/assets/js/static";
import MyOrders from "@/pages/MyOrders";
import MyCommodityAndPost from "../components/Public/MyCommodityAndPost";

export default {
  name: "Home",
  components: {MyCommodityAndPost, MyOrders},
  data() {
    return {
      activeName: 'second',
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      user: {
        "SchoolId": "null",
        "Nickname": "null",
        "RealName": "null",
        "Phone": "0000000000",
        "Major": "OT",
        "Credit": 0,
        "Role": "null",
        "Grade": 1,
        "Brief": "null",
        "AvatarPath": "null"
      },
      simpleUser: undefined,
      imageUrl: '',
      file: undefined,
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    beforeAvatarUpload(file) {
      console.log("file", file)
      let formData = new FormData()
      this.file = file
      formData.append("Avatar", this.file)
      api({
        method: "put",
        url: "user/" + this.id,
        data: formData
      }).then(response => {
        console.log(response)
        if (response.data.Code === '200') {
          ElMessage.success("上传成功！")
          api({
            method: "get",
            url: "user/" + this.id,
          }).then(res => {
            if (response.data.Code === '200') {
              this.imageUrl = res.data.User.AvatarPath
              this.store.commit("user/uerAvatarChange", this.imageUrl)
            }
          })
        }
      })
    },

  },
  mounted() {
    this.simpleUser = this.store.getters['user/userInfo']
    if (!this.simpleUser.loggedIn) {
      this.$router.push("/login")
      return
    }
    api({
      method: "GET",
      url: "user/" + this.id,
    }).then(response => {
      console.log(response)
      if (response.data.Code === '200') {
        this.user = response.data.User
        this.imageUrl = this.user.AvatarPath
      } else {
        ElMessage.error({
          message: "出了点小问题..." + (response.data.Description ? response.data.Description : "")
        })
        this.$router.push("/")
      }
    }, error => {
      console.log(error)
      ElMessage.error({
        message: "出了点小问题..."
      })
      this.$router.push("/")
    })
  },
  setup() {
    let store = useStore()
    let id = store.getters['user/userInfo'].id
    const grades = staticData.grades
    const majors = staticData.majors
    console.log("in Me setup")
    return {
      grades,
      majors,
      store,
      id,
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-plus/lib/theme-chalk/index.css");

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.avatar-card {
  min-height: 300px;
}

.box-card {
  min-height: 300px;
}

.avatar {
  min-height: 15vw;
}

#wrap {
  width: 100%;
  height: 100%;
}

#box {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  border-radius: 50%;
}

#circleImg {
  width: 100%;
}

.order-box {
  width: 70vw;
  min-width: 600px;
  height: 50vh;
  min-height: 400px;
  overflow: scroll;
}

</style>