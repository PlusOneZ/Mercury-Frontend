<template>
  <el-container>
    <el-main class="bg-no-repeat bg-cover" style="background-image: url('https://img.tukuppt.com/bg_grid/00/19/83/O93nS0cqmF.jpg')">
      <center>
      <el-form ref="form" :model="form" label-width="80px" class="bg-white w-3/5 border-4 rounded-xl border-opacity-100 pt-6 pr-6">
        <el-form-item label="标题">
          <el-input v-model="form.name" placeholder="请输入标题" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入商品描述" maxlength="1000" show-word-limit rows="10"></el-input>
        </el-form-item>
        <el-form-item label="预期价格" class="w-1/4 float-left">
          <el-input v-model="form.price" placeholder="请输入预期价格" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="float-right" type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
      </el-form>
      </center>
    </el-main>
  </el-container>
</template>


<script>
import {api} from "../request";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

export default {
  name: "edit",
  data() {
    return {
      form: {
        name: '',
        desc: '',
        price: '',
      }
    }
  },
  methods: {
    onSubmit() {
      let id = this.store.getters['user/userInfo'].id;
      let data = new FormData();
      data.append("senderId",id);
      data.append("title",this.form.name);
      data.append("content",this.form.desc);
      data.append("price",this.form.price);

      api({
        url: "post",
        method: "POST",
        data: data,
      }).then(
          (response) => {
            console.log(response);

            if (response.data['Code'] === '201') {
              ElMessage.success({
                message: "创建成功",
                type: "success",
              })
            }
            else{
              ElMessage.error({
                message: "创建失败",
                type: "error",
              })
            }
          }
      )
    }
  },
  setup() {
    let store = useStore()
    return {
      store
    }
  }
}
</script>

<style scoped>

</style>