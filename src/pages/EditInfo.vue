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
            <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置修改</el-button>
          </el-space>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<!--TODO:合法长度-->
<script>
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
          { min: 3, max: 5, message: '长度在 ？ 到 ？ 个字符', trigger: 'blur' }
        ],
        personal: [
          { required: false, message: '请输入个性签名', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 ？ 到 ？ 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('修改成功！');
        } else {
          console.log('修改失败!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>

</style>