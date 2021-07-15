<template>
  <div>
    <ul class="infinite-list" v-infinite-scroll="load">
      <li v-for="i in count" :key=i class="infinite-list-item">
        <commodity-comment :owner-name="comments[i-1].userName"
                           :is-owner-avatar-success= true
                           :owner-avatar="comments[i-1].userImage" :comment="comments[i-1].comment"
                           :rating="comments[i-1].rating"></commodity-comment>
      </li>
    </ul>
  </div>
</template>

<script>
import CommodityComment from "@/components/Public/CommodityComment";

export default {
  name: "CommodityCommentList",
  components: {
    CommodityComment,
  },
  data: function () {
    return {
      count: 6
    }
  },
  props: {
    comments: Array,
    canLoad: Boolean
  },
  created() {
    this.count = Math.min(6, this.comments.length)
  },
  methods: {
    load: function () {
      if (this.canLoad) {
        let marginBot = 0;
        if (document.documentElement.scrollTop) {
          marginBot = document.documentElement.scrollHeight -
              (document.documentElement.scrollTop + document.body.scrollTop) -
              document.documentElement.clientHeight;
        } else {
          marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;
        }
        console.log(marginBot)
        if (marginBot <= 0.4) {
          if (this.count < this.comments.length) {
            this.count = Math.min(this.count + 3, this.comments.length)
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>