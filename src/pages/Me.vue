<!-- @author: 黄开宇-->
<template>
  <div>
    <el-row class="p-14">
      <el-col :span="5" :offset="1">
        <el-card class="avatar-card" :body-style="{ padding: '35px' }">
          <div id="wrap">
            <div id="box"><img id="circleImg" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>用户信息</span>
              <router-link to="/editInfo"><el-button class="button" type="text">修改信息</el-button></router-link>
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
      <el-col :span="5" :offset="1">
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
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-tabs type="border-card">
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-s-goods"></i> 我购买的</span>
          </template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-document"></i> 未完成</span>
              </template>
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-document-checked"></i> 已完成</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-date"></i> 我发布的</span>
          </template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-document"></i> 未完成</span>
              </template>
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-document-checked"></i> 已完成</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data () {
    return {
      activeName: 'second',
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down']
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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

.avatar-card{
  min-height:300px;
}

.box-card{
  min-height:300px;
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
  border-radius:50%;
}

#circleImg{
  width: 100%;
}

</style>