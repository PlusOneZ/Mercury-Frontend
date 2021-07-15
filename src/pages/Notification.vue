<template>
  <el-container>
    <el-aside class="bg-gray-200">
      <div class="h-2"></div>
      <User
          v-for="(id, count) in userList"
          :selected="selectedChat[count]"
          :index="count"
          :user-id="id"
          :key="id"
          @click="select(count)"
      >
      </User>

    </el-aside>
    <el-main>
      <Chat v-if="selected"
            :other="userId"
            :record="currentHistory"
            :me="meId"
      >

      </Chat>
      <div v-if="!selected" class="text-gray-400 self-center m-auto w-full text-center"> 还没有打开的聊天框</div>
    </el-main>
  </el-container>
</template>

<script>
import Chat from "@/components/Chat/Chat";
import User from "@/components/Chat/User";
import {useStore} from "vuex";
import {api} from "@/request";

export default {
  name: "Notification",
  components: {User, Chat},
  data() {
    return {
      selected: false,
      selectedChat: [],
      userList: [],
      meId: "",
      userId: "",

      currentHistory: []
    }
  },
  methods: {
    select(index) {
      this.resetList()
      this.selectedChat[index] = true

      this.userId = this.userList[index]
      let meChat = []
      let otherChat = []
      api({
        method: "get",
        url: "chat/" + this.meId + '/' + this.userId,
      }).then( response => {
        console.log("chat", response)
        if (response.data.Code == '200') {
          meChat = response.data.ChatRecord
          api({
            method: "get",
            url: "chat/" + this.userId + '/' + this.meId ,
          }).then( res => {
            console.log(res)
            if (res.data.Code == '200') {
              this.selected = true
              otherChat = res.data.ChatRecord
              this.currentHistory = meChat.concat(otherChat).sort((ob1, ob2) => { return (ob1.Time > ob2.Time) ? 1 : -1 })
              console.log("chats", this.currentHistory)
            } else {
              console.log("me chat error", response)
            }
          }, error => {
            console.log(error)
          })
        } else {
          console.log("me chat error", response)
        }
      }, error => {
        console.log(error)
      })
    },

    resetList() {
      for (let i = 0; i < this.selectedChat.length; i++) {
        this.selectedChat[i] = false
      }
    }
  },
  mounted() {
    let me = this.store.getters['user/userInfo']
    this.meId = me.id
    api({
      method: 'get',
      url: 'chat/' + this.meId,
    }).then( response => {
      if (response.data.Code == '200') {
        for (let i = 0; i < response.data.ChatList.length; i++) {
          this.userList.push(response.data.ChatList[i])
        }
        console.log(this.userList)
      } else {
        console.log(response)
      }
    }, error => {
      console.log(error)
    })
  },
  setup() {
    let store = useStore()
    return {
      store
    }
  }
}
</script>

<style scoped>

.el-aside {
  width: 20vw;
}

.el-main {
  background-image: linear-gradient(#5698c3, #d1c2d3);
}

</style>