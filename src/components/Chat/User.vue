<template>
  <div class="rounded-lg bg-gray-100" :class="{'bg-blue-500': selected}">
    <p class="flex items-center text-black text-sm font-medium">
      <img
          :src="avatar ? avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
          alt=""
          class="w-16 h-16 rounded-full mr-2 bg-gray-100 rounded-full"
      >
      {{ name }}
    </p>
  </div>
</template>

<script>
import {api} from "@/request";

export default {
  name: "User",
  props: {
    userId: String,
    selected: Boolean,
    index: Number
  },
  data() {
    return {
      avatar: null,
      name: null,
      visible: true
    }
  },
  mounted() {
    api({
      method: "get",
      url: "user/" + this.userId,
    }).then(response => {
      console.log(response)
      if (response.data.Code === "200") {
        let user = response.data.User
        console.log(name)
        this.avatar = "https://139.196.20.137:5001/" + user.AvatarPath
        this.name = user.Nickname
      } else {
        this.visible = false
      }
    }, error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>