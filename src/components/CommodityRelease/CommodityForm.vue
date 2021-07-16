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
        <el-select v-model="ruleForm.status" placeholder="请选择物品状态">
          <el-option label="99新" value="99新"></el-option>
          <el-option label="9成新" value="9成新"></el-option>
          <el-option label="7成新" value="7成新"></el-option>
          <el-option label="5成新" value="5成新"></el-option>
          <el-option label="能用" value="能用"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择物品分类">
          <el-option
              v-for="cat in categories"
              :key="cat[0]"
              :label="cat[0]"
              :value="cat[1]"
          >
          </el-option>
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

      <el-form-item label="添加标签">
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
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
import {staticData} from "@/assets/js/static";

export default {
  name: "CommodityForm",
  data() {
    return {
      ruleForm: {
        name: '',
        status: '',
        category: '',
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
          {required: true, message: '请输入商品名', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '请选择分类', trigger: 'blur'}
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
      disabled: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',

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
          formData.append("Description", this.ruleForm.desc)
          for (let i = 0; i < this.photoList.length; i++) {
            console.log("file", this.photoList[i])
            formData.append("Files", this.photoList[i].raw)
          }
          formData.append("Classification", this.ruleForm.category)
          for (let i = 0; i < this.dynamicTags.length; i++) {
            console.log(this.dynamicTags[i])
            formData.append("Tags", this.dynamicTags[i])
          }

          api({
            method: "post",
            data: formData,
            url: 'commodity'
          }).then(response => {
            console.log(response)
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

    handleClose(tag) {
      console.log("tags", this.dynamicTags)
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        console.log(_)
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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
    let categories = staticData.categories
    return {
      store,
      categories
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

.input-new-tag {
  max-width: 4rem;
  width: 9vw;
}

</style>