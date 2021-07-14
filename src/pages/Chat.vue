<template>
  <el-main class="bg-white">
    <ol class="chat">
      <li class="other">
        <div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
        <div class="msg">
          <p>你好
            <emoji class="pizza"/>
          </p>
          <time>20:17</time>
        </div>
      </li>
      <li class="self">
        <div class="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
        <div class="msg">
          <p>你好</p>
          <time>20:18</time>
        </div>
      </li>
      <div class="day">2021/07/11</div>
      <li class="self">
        <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
        <div class="msg">
          <p>我想买这本书</p>
          <img
              src="https://th.bing.com/th/id/R.a5ba9fe54864d03a2ae5538bdccaece3?rik=N8zPqAhnrleFNw&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi4%2fi4%2fT1XppsFqxeXXXXXXXX_!!0-item_pic.jpg&ehk=P0j81PHKHHe2lMmM914hjAZCqdOusdm6DDcv2YWQBpo%3d&risl=&pid=ImgRaw"/>
          <time>18:03</time>
        </div>
      </li>
      <li class="other">
        <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
        <div class="msg">
          <p>不卖
            <emoji class="lmao"/>
          </p>
          <time>18:07</time>
        </div>
      </li>
    </ol>
    <input class="textarea" type="text" placeholder="Type here!"/>
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

.chat li {
  padding: 0.5rem;
  overflow: hidden;
  display: flex;
}

.chat .avatar {
  width: 40px;
  height: 40px;
  position: relative;
  display: block;
  z-index: 2;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

.chat .avatar img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

.chat .day {
  position: relative;
  display: block;
  text-align: center;
  color: #a7a4a4;
  height: 20px;
  line-height: 38px;
  margin-top: 5px;
  margin-bottom: 20px;
  cursor: default;
}

.other .msg {
  order: 1;
  border-top-left-radius: 0px;
  box-shadow: -1px 2px 0px #D4D4D4;
}

.self {
  justify-content: flex-end;
  align-items: flex-end;
}

.self .msg {
  order: 1;
  border-bottom-right-radius: 0px;
  box-shadow: 1px 2px 0px #D4D4D4;
}

.self .avatar {
  order: 2;
}

.msg {
  background: white;
  min-width: 50px;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
}

.msg p {
  font-size: 0.8rem;
  margin: 0 0 0.2rem 0;
  color: black;
}

.msg img {
  position: relative;
  display: block;
  width: 300px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px #eee;
  transition: all .4s cubic-bezier(0.565, -0.260, 0.255, 1.410);
  cursor: default;
}

.msg time {
  font-size: 0.7rem;
  color: #ccc;
  margin-top: 3px;
  float: right;
  cursor: default;
}

emoji {
  display: inline-block;
  height: 18px;
  width: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: -7px;
  margin-right: 2px;
  transform: translate3d(0px, 3px, 0px);
}

emoji.please {
  background-image: url(http://imgur.com/ftowh0s.png);
}

emoji.lmao {
  background-image: url(http://i.imgur.com/MllSy5N.png);
}

emoji.happy {
  background-image: url(http://imgur.com/5WUpcPZ.png);
}

emoji.pizza {
  background-image: url(http://imgur.com/voEvJld.png);
}

emoji.cryalot {
  background-image: url(http://i.imgur.com/UUrRRo6.png);
}

emoji.books {
  background-image: url(http://i.imgur.com/UjZLf1R.png);
}

emoji.moai {
  background-image: url(http://imgur.com/uSpaYy8.png);
}

emoji.suffocated {
  background-image: url(http://i.imgur.com/jfTyB5F.png);
}

emoji.scream {
  background-image: url(http://i.imgur.com/tOLNJgg.png);
}

emoji.hearth_blue {
  background-image: url(http://i.imgur.com/gR9juts.png);
}

emoji.funny {
  background-image: url(http://i.imgur.com/qKia58V.png);
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

