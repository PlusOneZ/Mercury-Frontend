<template>
  <div class="form-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="是否出租" prop="forRent">
        <el-switch
            style="display: block"
            v-model="ruleForm.forRent"
            inactive-color="#5698c3"
            active-color="#8b2671"
            inactive-text="售卖"
            active-text="出租"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="物品状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择活动区域">
          <el-option label="99新" value="99新"></el-option>
          <el-option label="9成新" value="9成新"></el-option>
          <el-option label="7成新" value="7成新"></el-option>
          <el-option label="5成新" value="5成新"></el-option>
          <el-option label="能用" value="能用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input-number
            v-model="ruleForm.price"
            :precision="2"
            :step="Math.ceil(ruleForm.price/10)"
            :max="9999"
            :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="商品简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CommodityForm",
  data() {
    return {
      ruleForm: {
        name: '',
        status: '',
        forRent: false,
        price: 9.9,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请填写商品简介', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
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


<style scoped>

.form-box {
  display: inline-block;
  width: 50vw;
  min-width: 420px;
  margin: auto;
  text-align: left;
}

</style>