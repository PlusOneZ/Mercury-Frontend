<template>
  <div>
    <el-button type="danger" plain v-show="for_rent==false" @click="dialogFormVisible = true"
               :disabled="stock===0">
      {{ stock === 0 ? '商品已售罄' : '立即购买' }}
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
                             :max="stock"></el-input-number>
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
import {useStore} from "vuex";
import {api} from "@/request";
import {CookieManager} from "../../cookie";

export default {
  name: "BuyCommodity",
  props: {
    buyer: String,
    commodityName: String,
    sellerId: String,
    commodityId: String,
    price: Number,
    for_rent: Boolean,
    stock: Number
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
      let user = this.store.getters['user/userInfo']
      let userId = user.id

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
      let token = CookieManager.get("token")
      let FormData = require('form-data');
      let data = new FormData();
      console.log(this.form.locationSelect + this.form.location)
      data.append('buyerId', userId);
      data.append('sellerId', String(this.sellerId));
      data.append('commodityId', String(this.commodityId));
      data.append('count', this.form.commodityNumber);
      data.append('location', this.form.locationSelect + this.form.location);
      data.append('token', token);
      console.log('-------------------------------------------------------')
      console.log(data.get('token'))
      console.log('-------------------------------------------------------')
      //data.append('returnTime', null);
      //data.append('returnLocation', null);


      api({
        url: "order",
        method: "POST",
        data: data
      }).then(
          // Valid response
          (response) => {
            if(String(response.data["Code"]) === '403')
            {
              ElMessage.error({
                message: '登入已过期，请重新登入',
                type: 'error'
              })
            }
            else {
              let orderId = JSON.stringify(response.data["OrderId"]);
              console.log(orderId)
              this.dialogFormVisible = !this.dialogFormVisible
              this.$router.push({
                path: '/OrderDetermine',
                name: 'OrderDetermine',
                params: {
                  orderId: orderId
                }
              });
            }
          },

          // No response
          (error) => {
            console.log('-------------------------------------------------------')
            console.log('error')
            console.log(error)
            ElMessage.error({
              message: '服务器在开小差...',
              type: 'error'
            })
          })

    },
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