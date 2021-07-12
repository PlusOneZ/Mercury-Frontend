<template>
  <el-container class="page">
    <el-main class="mx-36">
      <el-form ref="form" :model="form" label-width="80px" class="mx-36 border-4 rounded-xl border-opacity-100 pt-6 pr-6">
        <el-form-item label="标题">
          <el-input v-model="form.name" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入商品描述" maxlength="1000" show-word-limit rows="10"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="float-right" type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>


<script>
export default {
  name: "edit",
  data() {
    return {
      form: {
        name: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>

</style>