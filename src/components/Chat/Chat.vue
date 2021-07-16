<template>
    <div class="chat-box">
      <ol class="chat">
        <Bubble
            v-for="c in record"
            :data="c"
            :key="c.Time"
            :me="c.SenderId === me"
            :a-path="c.SenderId === me ? meAvatar : otherAvatar"
        ></Bubble>
      </ol>
      <input class="textarea" type="text" placeholder="Type here!" v-model="content">
      <el-button type="primary" round class="flex justify-end " @click="send">发送</el-button>
    </div>
</template>

<script>
import Bubble from "@/components/Chat/Bubble";
import {ElMessage} from "element-plus";
import {api} from "@/request";
export default {
  name: "Chat",
  data() {
    return {
      content: "",
      meAvatar: "",
      otherAvatar: ""
    }
  },
  props: {
    other: String,
    me: String,
    record: Array
  },
  components: {Bubble},
  methods: {
    send() {
      if (this.content === '') {
        ElMessage.error({
          message: "内容不能为空"
        })
      } else {
        let fd = new FormData()
        fd.append("senderId", this.me)
        fd.append("receiverId", this.other)
        fd.append("content", this.content)
        api({
          method: "POST",
          url: "chat",
          data: fd
        }).then( response => {
          if (response.data.Code === '200') {
            console.log("send success")
            this.content = ""
          } else {
            console.log(response)
            ElMessage.error("没发成")
          }
        })
      }
    }
  },
  mounted() {
    api({
      method: "get",
      url: 'user/' + this.me,
    }).then( response => {
      if (response.data.Code === '200') {
        this.meAvatar = response.data.User.AvatarPath
      }
    })

    api({
      method: "get",
      url: 'user/' + this.other,
    }).then( response => {
      if (response.data.Code === '200') {
        this.otherAvatar = response.data.User.AvatarPath
      }
    })
  }
}
</script>

<style scoped>
.el-header {
  background: #0f1423;
}

.chat {
  list-style: none;
  background: none;
  margin: 0;
  padding: 0 0 50px 0;
  margin-top: 60px;
  margin-bottom: 10px;
}

input.textarea {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 80vw;
  height: 50px;
  z-index: 99;
  background: #fafafa;
  border: none;
  outline: none;
  padding-left: 55px;
  padding-right: 55px;
  color: #666;
  font-weight: 400;
}

.el-button {
  position: fixed;
  bottom: 4px;
  right: 0px;
  z-index: 100;
}

.el-button:active, .el-button:focus:not(.el-button:hover) {
  background: #409eff;
}

</style>

