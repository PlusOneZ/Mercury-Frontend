<template>
  <div class="mt-2">
    <div class="flex justify-between items-center ml-8" >
      <user-and-avatar :owner-name="ownerName" :is-owner-avatar-success="isOwnerAvatarSuccess"
                       :owner-avatar="ownerAvatar"></user-and-avatar>
      <div class="flex justify-center items-center" v-if='rating >= 0'>
        <div>评分：</div>
        <el-rate
            v-model="rating"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            :max="total">

        </el-rate>
      </div>
      <div></div>
    </div>
    <br/>
    <div class="ml-8">{{comment}}</div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import UserAndAvatar from "@/components/Public/UserAndAvatar";

export default {
  name: "CommodityComment",
  components: {
    UserAndAvatar
  },
  props: {
    ownerAvatar: String,
    isOwnerAvatarSuccess: Boolean,
    ownerName: String,
    comment: String,
    rating: String
  },
  data: function () {
    return {
      total: 10
    }
  }
}
</script>

<style scoped>

</style>