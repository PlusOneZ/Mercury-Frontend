<template>
  <div>
    <el-row class="p-14">
      <el-col :span="5" :offset="1">
        <el-card :body-style="{ padding: '35px' }">
          <div class="demo-basic--circle">
            <div class="block"><el-avatar :size="200" :src="circleUrl"></el-avatar></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>用户信息</span>
              
            </div>
          </template>
          <div class="text item">
            {{'用户昵称：橘黄黄黄'}}
          </div>
          <div class="text item">
            {{'专业：软件工程&emsp;年级：大二'}}
          </div>
          <div class="text item">
            {{'用户信用值：666'}}
          </div>
          <div class="text item">
            {{'用户个性签名：稳的一批'}}
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="5" :offset="1">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>订单信息</span>
              <el-button class="button" type="text"></el-button>
            </div>
          </template>
          <div class="text item">
            {{'待支付订单数量：0'}}
          </div>
          <div class="text item">
            {{'待交易订单数量：0'}}
          </div>
          <div class="text item">
            {{'已发布订单数量：0'}}
          </div>
          <div class="text item">
            {{'收藏夹商品数量：0'}}
          </div>
        </el-card>
      </el-col> -->
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-space :size="100" spacer="|">
      <!-- <el-button size="medium" type="primary" icon="el-icon-star-on">收藏夹</el-button> -->
      <!-- <el-button size="medium" type="primary" icon="el-icon-shopping-cart-2">购物车</el-button>
      <el-button size="medium" type="primary" icon="el-icon-s-goods">我的订单</el-button> -->
      <el-button size="medium" type="primary" icon="el-icon-date">发布历史</el-button>
      </el-space>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
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
</style>