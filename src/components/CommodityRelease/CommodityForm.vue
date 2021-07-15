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
            @change="forRentChange"
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

      <el-form-item label="单位" prop="unit">
        <el-input v-model="ruleForm.unit" placeholder="输入单位" style="width: 200px">
          <template #prepend>每</template>
        </el-input>
      </el-form-item>

      <el-form-item label="商品库存" prop="stock">
        <el-input-number
            v-model="ruleForm.stock"
            :precision="0"
            :step="1"
            :max="100"
            :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="商品简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="images">
        <el-upload
            list-type="picture-card"
            :auto-upload="false"
            v-model="photoList"
            accept=".jpg,.jpeg,.png"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :limit="5"
        >
          <template #default>
            <i class="el-icon-plus"></i>
          </template>
          <template #file="{file}">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
              <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img :src="dialogImageUrl" alt="opps">
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {api} from "@/request";
import {ElMessage} from "element-plus";

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
        desc: '',
        unit: '件',
        stock: 1
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
        ],
        images: [
          {required: false, message: '至少上传一张商品图片', trigger: 'blur'}
        ],
        unit: [
          {required: true, message: '请填写单位', trigger: 'blur'}
        ],
        stock: [
          {required: true, message: '请填写库存', trigger: 'blur'}
        ]
      },
      photoList: [],


      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let id = this.store.getters['user/userInfo'].id

          let formData = new FormData()
          formData.append("Name", this.ruleForm.name)
          formData.append("OwnerId", id)
          formData.append("Condition", this.ruleForm.status)
          formData.append("Price", this.ruleForm.price)
          formData.append("Stock", this.ruleForm.stock)
          formData.append("ForRent", this.ruleForm.forRent)
          formData.append("Unit", this.ruleForm.unit)
          formData.append("Cover", this.photoList[0])

          api({
            method: "post",
            data: formData,
            url: 'commodity'
          }).then(response => {
            if (response.data.Code === '201') {
              ElMessage.success({
                message: "上传成功"
              })
              this.$router.push('/me')
            } else {
              ElMessage.error({
                message: "上传失败，请检查数据"
              })
            }
          }, error => {
            console.log(error)
            ElMessage.error({
              message: "服务器错误..."
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    forRentChange(c) {
      if (c) {
        this.ruleForm.unit = "一天"
      } else {
        this.ruleForm.unit = "件"
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleRemove(file) {
      console.log(file)
    },

    handleChange(file, list) {
      for (let i = 0; i < list.length; i++) {
        this.photoList.push(list[i])
      }
      console.log(this.photoList)
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

.form-box {
  display: inline-block;
  width: 50vw;
  min-width: 420px;
  margin: auto;
  text-align: left;
}

</style>