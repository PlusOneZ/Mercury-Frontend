<template>
  <div class="page">
    <el-container class="page">
      <el-header class="flex w-full" v-if="!$route.path.startsWith('/login')">
        <Header
            active="/"
        > </Header>
      </el-header>

      <router-view></router-view>

    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Public/Header";
export default {
  name: 'App',
  components: {Header},
}
</script>

<style>
.page {
  height: 100%;
}

.el-header {
  color: white;
  background: #0f1423;
  position: sticky !important;
  bottom: 0;
}
</style>
