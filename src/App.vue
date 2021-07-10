<template>
  <div class="page">
    <el-container class="page">
      <el-header class="flex w-full">
        <router-link to="/about"> about </router-link>
      </el-header>

      <router-view></router-view>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.page {
  height: 100%;
}

.el-header {
  text-align: center;
  align-content: center;
  color: white;
  background: #0f1423;
}
</style>

