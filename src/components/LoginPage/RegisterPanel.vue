<template>
  <el-form @submit.prevent="submitRegister" :model="form">
    <div class="middle" style="padding-bottom: 1rem !important;">
      <div class="text-center">
        <svg class="inline-block" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
          <path
              d="M1015.376 512c0 277.968-225.376 503.344-503.344 503.344C234.046 1015.344 8.704 789.968 8.704 512c0-277.984 225.344-503.328 503.328-503.328C790 8.672 1015.376 234.016 1015.376 512z"
              fill="#E5E8EC"></path>
          <path d="M280.656 206m-35.328 0a35.328 35.328 0 1 0 70.656 0 35.328 35.328 0 1 0-70.656 0Z"
                fill="#424953"></path>
          <path
              d="M506 256c0 32.032-25.968 58-58 58s-58-25.968-58-58 25.968-57.984 58-57.984 58 25.952 58 57.984zM791.312 213.328c0 32.032-25.938 58-58 58-32 0-58-25.968-58-58s26-57.984 58-57.984c32.064 0 58 25.952 58 57.984zM932.688 554.656c0 32.062-25.968 58-58 58s-58-25.938-58-58c0-32 25.968-57.968 58-57.968s58 25.968 58 57.968zM890 704c0 32.032-25.968 58-58 58s-58-25.968-58-58 25.968-57.968 58-57.968 58 25.936 58 57.968z"
              fill="#424953"></path>
          <path d="M554.688 797.344m-58 0a58 58 0 1 0 116 0 58 58 0 1 0-116 0Z" fill="#424953"></path>
          <path
              d="M442.016 810.656c0 32.062-25.968 58-58 58s-58-25.938-58-58c0-32 25.968-57.968 58-57.968s58 25.968 58 57.968zM271.344 512c0 32.032-25.968 58-58 58s-58-25.968-58-58 25.968-57.984 58-57.984 58 25.952 58 57.984z"
              fill="#424953"></path>
          <path
              d="M512 0C229.25 0 0 229.234 0 512c0 282.782 229.25 512 512 512 282.782 0 512-229.218 512-512C1024 229.234 794.782 0 512 0z m331.876 843.876c-43.126 43.126-93.312 76.968-149.188 100.594-57.844 24.468-119.312 36.876-182.688 36.876s-124.812-12.406-182.656-36.876c-55.906-23.626-106.094-57.468-149.218-100.594-43.094-43.094-76.938-93.312-100.594-149.188C55.062 636.844 42.688 575.406 42.688 512c0-63.376 12.376-124.828 36.844-182.672 23.656-55.876 57.5-106.078 100.594-149.188 43.126-43.126 93.312-76.968 149.218-100.61 57.844-24.454 119.282-36.86 182.656-36.86s124.844 12.406 182.688 36.86c55.876 23.64 106.062 57.484 149.188 100.61 43.126 43.11 76.968 93.312 100.594 149.188 24.468 57.844 36.876 119.296 36.876 182.672 0 63.406-12.406 124.844-36.876 182.688-23.626 55.874-57.47 106.094-100.594 149.188z"
              fill="" p-id="5044"></path>
          <path
              d="M618.688 896c-11.812 0-21.344 9.562-21.344 21.344s9.532 21.312 21.344 21.312c11.75 0 21.312-9.532 21.312-21.312S630.438 896 618.688 896zM298.688 661.344c0 11.782 9.532 21.312 21.312 21.312s21.344-9.532 21.344-21.312S331.782 640 320 640s-21.312 9.562-21.312 21.344zM106.688 512c-11.812 0-21.344 9.562-21.344 21.344s9.532 21.312 21.344 21.312c11.75 0 21.312-9.532 21.312-21.312S118.438 512 106.688 512zM426.688 149.344C438.438 149.344 448 139.782 448 128s-9.562-21.328-21.312-21.328c-11.812 0-21.344 9.546-21.344 21.328s9.532 21.344 21.344 21.344zM725.344 320c-11.782 0-21.344 9.562-21.344 21.344s9.562 21.328 21.344 21.328 21.344-9.546 21.344-21.328S737.126 320 725.344 320zM341.344 213.344c0-35.344-28.656-64-64-64s-64 28.656-64 64 28.656 64 64 64 64-28.656 64-64z m-64 21.328c-11.782 0-21.344-9.562-21.344-21.328S265.562 192 277.344 192c11.75 0 21.344 9.578 21.344 21.344s-9.594 21.328-21.344 21.328zM213.344 448c-35.344 0-64 28.656-64 64s28.656 64 64 64 64-28.656 64-64-28.656-64-64-64z m0 85.344C201.562 533.344 192 523.782 192 512c0-11.75 9.562-21.328 21.344-21.328 11.75 0 21.344 9.578 21.344 21.328 0 11.782-9.594 21.344-21.344 21.344zM618.688 797.344c0-35.344-28.656-64-64-64-35.376 0-64 28.656-64 64s28.626 64 64 64c35.344 0 64-28.656 64-64z m-64 21.312c-11.782 0-21.344-9.562-21.344-21.312S542.906 776 554.688 776c11.75 0 21.312 9.594 21.312 21.344s-9.562 21.312-21.312 21.312zM874.688 490.672c-35.376 0-64 28.656-64 63.984 0 35.376 28.626 64 64 64 35.312 0 64-28.626 64-64 0-35.328-28.688-63.984-64-63.984z m0 85.328c-11.782 0-21.344-9.562-21.344-21.344 0-11.75 9.562-21.312 21.344-21.312 11.75 0 21.312 9.562 21.312 21.312 0 11.782-9.562 21.344-21.312 21.344zM832 640c-35.344 0-64 28.656-64 64s28.656 64 64 64 64-28.656 64-64-28.656-64-64-64z m0 85.344c-11.75 0-21.312-9.562-21.312-21.344 0-11.75 9.562-21.344 21.312-21.344s21.344 9.594 21.344 21.344c0 11.782-9.594 21.344-21.344 21.344zM384 725.344c-47.126 0-85.312 38.188-85.312 85.312S336.876 896 384 896s85.344-38.218 85.344-85.344-38.218-85.312-85.344-85.312z m0 128c-23.532 0-42.656-19.126-42.656-42.688 0-23.5 19.126-42.656 42.656-42.656s42.688 19.156 42.688 42.656c0 23.562-19.156 42.688-42.688 42.688zM448 341.344c47.126 0 85.344-38.204 85.344-85.344 0-47.126-38.218-85.328-85.344-85.328S362.688 208.876 362.688 256c0 47.14 38.188 85.344 85.312 85.344z m0-128c23.532 0 42.688 19.14 42.688 42.656 0 23.532-19.156 42.672-42.688 42.672s-42.656-19.14-42.656-42.672c0-23.516 19.124-42.656 42.656-42.656zM810.688 213.344c0-47.126-38.218-85.344-85.344-85.344S640 166.218 640 213.344s38.218 85.328 85.344 85.328 85.344-38.204 85.344-85.328z m-128 0c0-23.532 19.126-42.672 42.656-42.672S768 189.812 768 213.344 748.876 256 725.344 256s-42.656-19.124-42.656-42.656z"
              fill="" p-id="5045"></path>
        </svg>
      </div>
      <div class="h-2"></div>
      <p class="py-4 pl-4 text-xl font-bold font-sans"> 注册新用户 </p>
    </div>

    <div class="input-box">
      <label for="Sid">学工号<b class="text-red-500">*</b></label>
      <input type="text" placeholder="不多于10位" id="Sid" v-model="form.SchoolId" @input="idChange">
      <span v-if="show.id">
        <i class="el-icon-success text-green-500 text-2xl pl-2" v-if="ok.id"></i>
        <i class="el-icon-error text-red-500 text-2xl pl-2" v-if="!ok.id"></i>
      </span>
    </div>

    <div class="input-box">
      <label for="name">真实姓名<b class="text-red-500">*</b></label>
      <input type="text" placeholder="用于实人认证" id="name" v-model="form.RealName" @input="nameChange">
      <span v-if="show.rm">
        <i class="el-icon-success text-green-500 text-2xl pl-2" v-if="ok.rm"></i>
        <i class="el-icon-error text-red-500 text-2xl pl-2" v-if="!ok.rm"></i>
      </span>
    </div>

    <div class="input-box">
      <label for="nick">昵称<b class="text-red-500">*</b></label>
      <input type="text" placeholder="4-12个字符" id="nick" v-model="form.Nickname" @input="nickChange">
      <span v-if="show.nm">
        <i class="el-icon-success text-green-500 text-2xl pl-2" v-if="ok.nm"></i>
        <i class="el-icon-error text-red-500 text-2xl pl-2" v-if="!ok.nm"></i>
      </span>
    </div>

    <div class="input-box">
      <label for="pw">密码<b class="text-red-500">*</b></label>
      <input type="password" placeholder="6-16位，包含数字和字母" id="pw" v-model="form.Password" @input="pwChange">
      <span v-if="show.pw">
        <i class="el-icon-success text-green-500 text-2xl pl-2" v-if="ok.pw"></i>
        <i class="el-icon-error text-red-500 text-2xl pl-2" v-if="!ok.pw"></i>
      </span>
    </div>

    <div class="input-box">
      <label for="checkPw">确认密码<b class="text-red-500">*</b></label>
      <input type="password" placeholder="与密码一致" id="checkPw" v-model="checkPass" @input="chpwChange">
      <span v-if="show.chpw">
        <i class="el-icon-success text-green-500 text-2xl pl-2" v-if="ok.chpw"></i>
        <i class="el-icon-error text-red-500 text-2xl pl-2" v-if="!ok.chpw"></i>
      </span>
    </div>

    <div class="input-box">
      <label for="phone">手机号<b class="text-red-500">*</b></label>
      <input type="tel" placeholder="11位手机号" id="phone" v-model="form.Phone" @input="phoneChange">
      <span v-if="show.phone">
        <i class="el-icon-success text-green-500 text-2xl pl-2" v-if="ok.phone"></i>
        <i class="el-icon-error text-red-500 text-2xl pl-2" v-if="!ok.phone"></i>
      </span>
    </div>

    <div class="input-box">
      <label for="ma">专业</label>
      <el-select v-model="form.Major" placeholder="选择专业" class="select" id="ma">
        <el-option
            v-for="item in majors"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="input-box">
      <label for="ma">年级</label>
      <el-select v-model="form.Grade" placeholder="选择年级" class="select" id="grade">
        <el-option
            v-for="item in grades"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

    <router-link to="/login/" style="float: right;" class="pb-4 pr-4 hover:text-blue-500"> 已有账号？去登陆</router-link>

    <button type="submit"
            class="h-12 bg-gradient-to-r from-blue-400 to-green-300 hover:from-green-200 hover:to-blue-300"> 注册
    </button>

  </el-form>
</template>

<script>

import { toRaw } from '@vue/reactivity'
import {api} from "@/request";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
import {CookieManager} from "@/cookie";
import {staticData} from "@/assets/js/static"

export default {
  name: "RegisterPanel",
  data() {
    return {
      show: {
        id: false,
        rm: false,
        nm: false,
        pw: false,
        chpw: false,
        phone: false
      },

      ok: {
        id: false,
        rm: false,
        nm: false,
        pw: false,
        chpw: false,
        phone: false
      },

      grade: "",
      major: "",
      form: {
        SchoolId: "",
        RealName: "",
        Nickname: "",
        Phone: "",
        Password: "",
        Major: "",
        Grade: ""
      },
      checkPass: "",
    }
  },
  methods: {
    submitRegister() {
      console.log(this.form)
      if (this.ableToSubmit) {
        console.log("youre able to submit")
        let data = toRaw(this.form)
        api({
          method: "POST",
          url: "user/register",
          data: data,
        }).then((response) => {
          console.log(response)
          if (response.data["Code"] === '200') {
            this.store.commit("user/userLogin", data)
            if (response.data.token) {
              CookieManager.set("token", response.data.Token)
            }
            ElMessage.success({
              message: "注册成功！"
            })
            this.$router.push("/")
          } else {
            ElMessage.error({
              message: "失败原因: " + response.data["Description"]
            })
          }
        }, (error) => {
          console.log(error)
          ElMessage.error({
            message: "出了点问题...一会儿再试吧"
          })
        })
      }
    },

    idChange() {
      this.show.id = true
      this.ok.id = this.form.SchoolId.length >= 4 && this.form.SchoolId.length <= 10;
    },

    nameChange() {
      let p = /([^a-zA-Z0-9\u4e00-\u9fa5 ])/
      this.show.rm = true
      this.ok.rm = (this.form.RealName.length >= 2 && this.form.RealName.length <= 15) && !p.test(this.form.RealName);
    },

    nickChange() {
      let p = /([\s])/
      this.show.nm = true
      this.ok.nm = (this.form.Nickname.length >= 4 && this.form.Nickname.length <= 12) && !p.test(this.form.Nickname);
    },

    pwChange() {
      this.show.pw = true
      this.ok.pw = this.isPasswordLegal(this.form.Password)
    },

    chpwChange() {
      this.show.chpw = true
      this.ok.chpw = (this.ok.pw && this.form.Password === this.checkPass)
    },

    phoneChange() {
      this.show.phone = true
      this.ok.phone = this.form.Phone.length === 11
    },

    isPasswordLegal(pw) {
      if (pw.length > 16 && pw. length < 6) {
        return false
      }
      let p = /([^A-Za-z0-9@#$%^&*\-=+])/
      return !p.test(pw);
    }
  },
  computed: {
    ableToSubmit() {
      return (this.ok.id && this.ok.rm && this.ok.nm && this.ok.pw && this.ok.chpw && this.ok.phone)
    }
  },
  setup() {
    const store = useStore()
    const grades = staticData.grades
    const majors = staticData.majors
    return {
      store,
      grades,
      majors
    }
  }
}
</script>

<style scoped>

i {
  transition: ease .4s;
}

form {
  width: 31vw;
  min-width: 330px;
  position: relative;
  z-index: 3;
  background-color: rgba(255, 255, 255, .1);
  padding: 35px 30px;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
  border: 1px solid rgba(255, 255, 255, .2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  backdrop-filter: blur(20px);
}

input {
//width: 80%; height: 50px; width: 20vw; border-radius: 8px; background-color: transparent;
  border: 1px solid rgba(255, 255, 255, .5);
  min-width: 200px;
  transition: ease .4s;
  margin-bottom: 15px;
  padding-left: 15px;
  color: #fff;
  outline: none;
}

.select {
  width: 20vw;
  min-width: 200px;
  background-color: transparent;
  height: 55px;
}

/deep/ .el-select,
/deep/ .el-input,
/deep/ .el-input__inner {
  background-color: transparent;
  color: #fff;
}

/deep/ input::-webkit-input-placeholder {
  color: #fff;
}

/deep/ input::-ms-input-placeholder {
  color: #fff;
}

.input-box {
  width: 100%;
}

.input-box > label {
  @apply truncate;
  width: 5vw;
  text-align: right;
}

input::placeholder {
  color: #fff;
}

input:focus {
  border: 1px solid rgba(255, 255, 255, .2);
}

input:focus::placeholder {
  color: lightgray;
}

label {
  @apply pr-1;
  float: left;
  display: inline-block;
  color: white;
  line-height: 50px;
}

button {
  width: 100%;
  background-size: 200% auto;
  border-radius: 8px;
  color: #fff;
  outline: none;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
  transition: ease .4s;
}

button:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.middle {
  text-align: center;
  align-content: center;
}

.pb-4 {
  padding-bottom: 1rem !important;
}

</style>