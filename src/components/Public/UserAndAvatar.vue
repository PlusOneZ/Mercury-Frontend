<template>
  <div class="mr-12 flex justify-start ">
    <el-avatar :src=ownerAvatar @error="errorHandler" :size="40">
      <img :src=ownerAvatar v-if="isOwnerAvatarSuccess===true" alt=""/>
      <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt=""/>
    </el-avatar>
    <div class="ml-8 flex justify-around items-center ">{{ ownerName }}</div>
  </div>
</template>

<script>
export default {
  name: "UserAndAvatar",
  props: {
    ownerAvatar: String,
    isOwnerAvatarSuccess: Boolean,
    ownerName: String
  },
  methods:{
    errorHandler: function () {
      this.isOwnerAvatarSuccess = false
    }
  }
}
</script>

<style scoped>

</style>