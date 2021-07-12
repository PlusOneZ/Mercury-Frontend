<template>
  <el-main>
    <p class="font-black text-2xl flex justify-start">订单信息</p>
    <div class=" border border-black mt-4 space-y-8">
      <div class="divide-y divide-black space-y-8">
        <div class="flex flex-nowrap">
          <p class="font-black text-xl">收货地址：</p>
          <p class="text-1xl py-1">同济大学嘉定校区19/20号楼</p>
        </div>
        <div>
          <p class="font-black text-xl flex justify-start">卖家信息</p>
          <div class="grid grid-cols-3 grid-rows-2 gap-3">
            <p class="text-1xl row-start-1 col-start-1">昵称：</p>
            <p class="text-1xl row-start-1 col-start-2">真实姓名：</p>
            <p class="text-1xl row-start-2 col-start-1">电话：</p>
            <p class="text-1xl row-start-2 col-start-2">邮件：</p>
          </div>
        </div>
        <div>
          <p class="font-black text-xl flex justify-start">订单信息</p>
          <div class="grid grid-cols-3 grid-rows-2 gap-3">
            <p class="text-1xl row-start-1 col-start-1">订单编号：</p>
            <p class="text-1xl row-start-1 col-start-2">创建时间：</p>
            <p class="text-1xl row-start-2 col-start-1">付款时间：</p>
            <p class="text-1xl row-start-2 col-start-2">成交时间：</p>
          </div>
        </div>
      </div>
      <table class="border-collapse border border-black w-full table-fixed">
        <thead>
        <tr>
          <th class="w=1/6  bg-blue-100">商品</th>
          <th class="w-1/6 bg-blue-100">属性</th>
          <th class="w=1/6 bg-blue-100">状态</th>
          <th class="w=1/6 bg-blue-100">单价</th>
          <th class="w=1/6 bg-blue-100">数量</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="flex flex-nowrap justify-center border-t border-black">
            <img class="float-left w-10 h-10"
                 src="https://th.bing.com/th/id/R.a5ba9fe54864d03a2ae5538bdccaece3?rik=N8zPqAhnrleFNw&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi4%2fi4%2fT1XppsFqxeXXXXXXXX_!!0-item_pic.jpg&ehk=P0j81PHKHHe2lMmM914hjAZCqdOusdm6DDcv2YWQBpo%3d&risl=&pid=ImgRaw">
            <a class="text-1xl flex-wrap">C语言程序设计 第5五版 谭浩强 清华大学 C语言程序设计第5版教材加辅导</a>
          </td>
          <td class="border border-black">教辅资料</td>
          <td class="border border-black">已确认收货</td>
          <td class="border border-black">￥10.00</td>
          <td class="border border-black">1</td>
        </tr>
        </tbody>
      </table>
      <div class=" mt-6">
        <p class="flex justify-end text-1xl">商品总价 :￥10.00</p>
        <p class="flex justify-end text-1xl">运费 :￥1.00</p>
        <div class="flex flex-nowrap justify-end">
          <p class="text-xl">实付 :</p>
          <p class="text-xl text-red-700">￥11.00</p>
        </div>
      </div>
    </div>
    <div class="flex justify-center space-x-96 mb-6 mt-6">
      <el-button type="primary" icon="el-icon-s-comment">评价</el-button>
      <el-button type="primary" icon="el-icon-chat-dot-square">联系卖家</el-button>
    </div>

  </el-main>
</template>

<script>
export default {
  name: "OrderDetail"
}
</script>

<style scoped>
.el-header {
  background: #0f1423;
}
</style>