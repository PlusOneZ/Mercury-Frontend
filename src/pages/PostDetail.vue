<template>

    <el-main >
      <div class="bg-white  justify-center divide-y divide-black">
        <div class="flex flex-row space-x-8">
          <div class="container w-1/3 space-y-6">    
            <el-carousel :autoplay	= "false" indicator-position = "outside"> 
              <el-carousel-item v-for="item in 5" :key="item">
                <img class="window-img" src="https://th.bing.com/th/id/R.a5ba9fe54864d03a2ae5538bdccaece3?rik=N8zPqAhnrleFNw&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi4%2fi4%2fT1XppsFqxeXXXXXXXX_!!0-item_pic.jpg&ehk=P0j81PHKHHe2lMmM914hjAZCqdOusdm6DDcv2YWQBpo%3d&risl=&pid=ImgRaw">
              </el-carousel-item>
            </el-carousel>
            <div class="grid grid-rows-2 grid-flow-col gap-x-4 gap-y-2">
              <div class="flex flex-row space-x-2 m-auto row-start-1 col-start-1">
                <el-avatar src="https://inews.gtimg.com/newsapp_bt/0/13217980331/1000"></el-avatar>
                <p class="text-xl py-2">用户名</p>
              </div>
              <div class="text-xl row-start-1 col-start-2 py-2">
                <a href="" class="text-blue-500">举报</a>
              </div>
              <div class="text-xl row-start-2 col-start-1">
                浏览：12
              </div>
              <div class="text-xl row-start-2 col-start-2">
                收藏：2
              </div>
            </div>
          </div>
          <div class="container w-3/5">
              <p class="font-black text-xl flex justify-start mt-4">C语言程序设计 第5五版 谭浩强 清华大学 C语言程序设计第5版教材加辅导</p>
              <div class="space-y-8">
                <div class="flex flex-nowrap mt-8">
                    <p class=" text-3xl">预期价格 </p>
                    <p class="text-red-700 text-3xl"> ￥100.00</p>
                </div>
                <div class="flex flex-nowrap justify-start text-2xl">
                    <p>交易地点：</p> 
                    <p >嘉定校区20号楼宿舍</p>
                </div>
                <div class="text-xl">
                  <div class="rounded-md bg-gray-200 max-w-max flex justify-start space-x-12 w-auto"> 商品标签：
                    <a class= "rounded-md border-2 border-black" href="">C语言</a>
                    <a class= "rounded-md border-2 border-black" href="">谭浩强</a>
                    <a class= "rounded-md border-2 border-black" href="">教辅</a>
                  </div>
                </div>
                <p class="text-2xl flex justify-start">商品数量：1 </p>           
                <div class="flex justify-start space-x-16 mb-6 mt-6">
                    <el-button type="primary" icon="el-icon-star-off" width = "100px" >收藏</el-button>
                    <el-button type="primary" icon="el-icon-chat-dot-square">联系买家</el-button>          
                </div>
              </div>
          </div>
        </div> 
        <div>
          <p class="text-xl flex justify-center font-black border-r border-l border-black max-w-max">求物详情</p>
          <div class=" border border-black w-auto h-40">
            <p class="text-xl  text-left" >
                
            </p>
          </div>
        </div>  
      </div>
    </el-main>

</template>

<script>
export default {
  name: "PostDetail"
}
</script>

<style scoped>
.el-header{
   background: #0f1423;
}
</style>