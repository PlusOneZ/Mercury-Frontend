<template>
  <div class="rounded-xl border-2 mx-3 bg-white divide-y divide-gray-200 hover:shadow-xl" style="width: 40vw">
    <div>
      <p class="text-left px-3 py-3 text-l font-bold "> {{ title ? title : "急需四六级英语听力收音机一台" }} </p>
    </div>
    <div class="px-3">
      <p class="text-left text-2x text-gray-400 italic">
        {{intro ? intro : "本人周六下午要进行英语六级的考试，现急需收音机一台，要信号好的，价格好商量"}}
      </p>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex pl-3 pt-1 pb-2 rounded-xl rounded-t-none">
        <img
            class="w-7 h-7 rounded-full"
            :src="avatar ? avatar : 'https://i.loli.net/2021/05/18/vWptQgAlsTqdxrK.png'"
        >
        <p class="pl-2 text-sm leading-7"> {{ user ? user : "我是ljs" }} </p>
      </div>
      <div class="pr-6">
        <el-button type="primary" class="float-right" @click="viewDetail">查看详情</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostThumbnail",
  props: {
    post: Object,
  },
  data() {
    return {
      id: "",
      title: "",
      intro: "",
      user: "",
      avatar: ""
    }
  },
  methods: {
    viewDetail() {
      this.$router.push("/postDetail/"+this.id);
    }
  },
  mounted() {
    this.id = this.post.PostId;
    this.title = this.post.Title;
    this.intro = this.post.Content;
    this.user = this.post.Name;
    this.avatar = "https://139.196.20.137:5001/"+this.post.AvatarPath;
  }
}
</script>

<style scoped>

</style>