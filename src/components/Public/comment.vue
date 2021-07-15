<template>
  <div>
    <el-button type="primary" icon="el-icon-s-comment" round @click="dialogFormVisible = true" >评论</el-button>

    <el-dialog v-model="dialogFormVisible">
      <el-form :model="form">
       <div class="block" v-if="isRating">
        <span class="demonstration">请为商品评分</span>
        <el-slider
          v-model="form.rating"
          max = 10
          show-input
          show-stops>
        </el-slider>
      </div>
        <el-form-item >
          <p>请填写评论内容</p>
          <el-input v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
  
      <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="comment()">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import {ElMessage} from "element-plus";
import {api} from "@/request";

export default {
  name: "PostComment",
  props:{
    isRating :Boolean,
    userId :String,
    id :String,

  },
  data: function () {
    return {
      form: {
        content: '',rating :Number
      },
      dialogFormVisible: false,
    }
  },
  methods: {
    comment: function () {
      if(this.form.content){      
        this.dialogFormVisible = false

        if(this.isRating){
          var url="order/"+this.id+"/rating"
          let data = new FormData()
          data.append("userId", this.userId)
          data.append("comment", this.form.content)
          data.append("rate", this.form.rating)
          data.append("isBuyer", true)
          api({
          method: "POST",
          url: url,
          data: data,
        }).then((res) => {
          console.log(res)
          if (res.data["Code"] === '201'||res.data["Code"] === '200') {
            console.log(res)
            ElMessage.success({
              message: "评论成功！"
            })}else{
              console.log(res.data["Description"])
              ElMessage.error({
              message: "失败原因: " + res.data["Description"]
            })
            }
        }, (error) => {
          console.log(error)
          ElMessage.error({
            message: "出了点问题...一会儿再试吧"
          })
        })

        }else{
          url="post/"+this.id+"/comment/"
          console.log(url)
          let data = new FormData()
          data.append("SenderId", this.userId)
          data.append("content", this.form.content)
          data.append("Sender",this.id)
          api({
            method: "POST",
            url: url,

            data: data,
          }).then((res) => {
            console.log(res)
            if (res.data["Code"] === '201'||res.data["Code"] === '200') {
              console.log(res)
              ElMessage.success({
                message: "评论成功！"
              })}else{
                console.log(res.data["Description"])

                ElMessage.error({
                message: "失败原因: " + res.data["Description"]
              })
              }
          }, (error) => {
            console.log(error)
            ElMessage.error({
              message: "出了点问题...一会儿再试吧"
            })
          })
        }
        this.form.content=""
        this.form.rating =0

      }else{
          ElMessage.error({
            message: '评论内容不可为空',
            type: 'error'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>