<template>
  <div class="p-64">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" prop="personal">
        <el-input v-model="ruleForm.personal"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-space :size="10" spacer="|">
            <router-link to="/me"><el-button type="primary" @click="submitForm()">提交修改</el-button></router-link>
            <el-button @click="resetForm('ruleForm')">重置修改</el-button>
          </el-space>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {api} from "@/request";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        personal:''
      },
      rules: {
        name: [
          { required: false, message: '请输入用户昵称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3？ 到 20 个字符', trigger: 'blur' }
        ],
        personal: [
          { required: false, message: '请输入个性签名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      let id = this.store.getters['user/userInfo'].id;

      let data = new FormData();
      data.append("Nickname",this.ruleForm.name);
      data.append("Brief",this.ruleForm.personal);

      api({
        url: "User/" + id,
        method: "PUT",
        data: data,
      }).then(
          (response) => {
            console.log(response);

            if (response.data['Code'] === '200') {
              ElMessage.success({
                message: "修改成功",
                type: "success",
              })
            }
            else{
              ElMessage.error({
                message: "修改失败",
                type: "error",
              })
            }
          }
      )
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  setup() {
    let store = useStore()
    return {
      store,
    }
  }
}
</script>

<style>

</style>