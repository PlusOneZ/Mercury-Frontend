<template>
  <div>
    <el-tooltip class="item" effect="dark" content="举报" placement="top">
      <el-button type="text" circle @click="dialogFormVisible = true" size="mini">
        <img src="https://img.icons8.com/material-outlined/24/000000/error--v1.png" alt=""/>
      </el-button>
    </el-tooltip>

    <el-dialog title="举报信息" v-model="dialogFormVisible">

      <el-form :model="form" ref="reportForm" :rules="rules">
        <el-form-item prop="reason" label="请填写举报理由" :label-width="formLabelWidth">
          <el-input v-model="form.reason"></el-input>
        </el-form-item>

        <el-form-item prop="selectReason" label="请选择举报原因" :label-width="formLabelWidth">
          <el-select v-model="form.selectReason" placeholder="请选择举报原因">
            <el-option label="涉黄" value="涉黄"></el-option>
            <el-option label="暴力" value="暴力"></el-option>
            <el-option label="反动" value="反动"></el-option>
            <el-option label="政治敏感" value="政治敏感"></el-option>
            <el-option label="人身攻击" value="人身攻击"></el-option>
            <el-option label="赌博诈骗" value="赌博诈骗"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消 举 报</el-button>
                  <el-button type="primary" @click="report('reportForm')">确 定 举 报</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "report",
  data: function () {
    return {
      form: {
        reason: '',
        selectReason: '',
      },
      formLabelWidth: '150px',
      dialogFormVisible: false,
      rules: {
        reason: [{required: true, message: '请填写举报理由', trigger: 'change'}],
        selectReason: [{required: true, message: '请选择举报原因', trigger: 'change'}]
      }
    }
  },
  methods: {

    report: function (formName) {
      let isValid = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          isValid = true
        } else {
          console.log('error submit!!');
          isValid = false
          return false;
        }
      });
      if(isValid === false)
      {
        return
      }
      //发送举报请求
      this.dialogFormVisible = false
      ElMessage.success({
        message: '举报成功',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>

</style>