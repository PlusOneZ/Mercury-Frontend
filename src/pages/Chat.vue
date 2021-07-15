<template>
  <el-main class="bg-white">
    <ol class="chat">

    </ol>
    <input class="textarea" type="text" placeholder="Type here!">
    <div class="emojis"></div>
    <el-button type="primary" round class="flex justify-end ">发送</el-button>
  </el-main>
</template>

<script>
export default {
  name: "Chat"
}
</script>

<style>
.el-header {
  background: #0f1423;
}

.chat {
  list-style: none;
  background: none;
  margin: 0;
  padding: 0 0 50px 0;
  margin-top: 60px;
  margin-bottom: 10px;
}

input.textarea {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 50px;
  z-index: 99;
  background: #fafafa;
  border: none;
  outline: none;
  padding-left: 55px;
  padding-right: 55px;
  color: #666;
  font-weight: 400;
}

.el-button {
  position: fixed;
  bottom: 4px;
  right: 0px;
  z-index: 100;
}

.el-button:active, .el-button:focus:not(.el-button:hover) {
  background: #409eff;
}

.emojis {
  position: fixed;
  display: block;
  bottom: 8px;
  left: 7px;
  width: 34px;
  height: 34px;
  background-image: url(http://i.imgur.com/5WUpcPZ.png);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
  cursor: pointer;
}

.emojis:active {
  opacity: 1;
}

.emojis:hover:not(.emojis:active) {
  opacity: 0.5;
}
</style>

