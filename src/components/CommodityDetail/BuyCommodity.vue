<template>
  <div>
    <el-button type="danger" plain v-show="for_rent===false" @click="dialogFormVisible = true">
      {{ for_rent === false ? '立即购买' : '商品不可购买' }}
    </el-button>

    <el-dialog title="购买信息" v-model="dialogFormVisible">
      <el-form :model="form" :inline="true" :disabled="false">
        <el-form-item label="&nbsp;&nbsp;&nbsp;购买者:">
          <el-input v-model="buyer" placeholder="软院之光" :disabled="true"></el-input>
        </el-form-item>
        &nbsp;&nbsp;&nbsp;
        <el-form-item label="购买商品:">
          <el-input v-model="commodityName" placeholder="自动编程机" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <el-form :model="form" ref="buyForm" :rules="rules">
        <div class="flex  justify-between items-end">
          <el-form-item label="购买数量:" prop="commodityNumber">
            <el-input-number v-model="form.commodityNumber" controls-position="right" :min="1"
                             :max="10000"></el-input-number>
          </el-form-item>

          <el-form-item label="总金额:" class=" flex items-center justify-start ">
            <font class="text-2xl font-bold text-red-600 ">
              ￥{{ price ? (price * form.commodityNumber).toFixed(2) : "9999" }}
            </font>
          </el-form-item>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>

        <el-form-item class="w-5/6" label="交易地点:" prop="locationSelect">
          <el-input prop="location"
                    placeholder="请输入内容"
                    v-model="form.location"
                    class="input-with-select"
          >
            <template #prepend>
              <el-select v-model="form.locationSelect" placeholder="请选择" class="w-32">
                <el-option v-for="item in locationSelect" :key=item :label=item :value=item></el-option>
              </el-select>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消 购 买</el-button>
                  <el-button type="primary" @click="buy('buyForm')">确 定 购 买</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "BuyCommodity",
  props: {
    buyer: String,
    commodityName: String,
    price: Number,
    for_rent: Boolean
  },
  data: function () {
    return {
      form: {
        commodityNumber: 1,
        moneyAll: 0,
        location: '',
        locationSelect: ''
      },
      formLabelWidth: '160px',
      dialogFormVisible: false,
      locationSelect: ['四平路校区', '嘉定校区', '彰武路校区'],
      rules: {
        commodityNumber: [{required: true, message: '请填写购买数量', trigger: 'change'}],
        location: [{required: true, message: '请填写具体地址', trigger: 'change'}],
        locationSelect: [{required: true, message: '请填写校区', trigger: 'change'}]
      }
    }
  },
  methods: {
    buy: function (formName) {
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
      if (isValid === false) {
        return
      }
      //发送购买请求
      this.dialogFormVisible = false
      ElMessage.success({
        message: '举报成功',
        type: 'success'
      });
    },
  }
}
</script>

<style scoped>

</style>