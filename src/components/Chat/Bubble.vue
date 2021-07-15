<template>
  <li :class="{'other': !me, 'self': me}">
    <div class="avatar"><img :src="aPath ? 'https://139.196.20.137:5001/' + aPath : 'https://139.196.20.137:5001/Media/Image/Default.png'" alt=""></div>
    <div class="msg">
      <p>
        {{ data.Content }}
      </p>
      <time>{{ Date(data.Time) }}</time>
    </div>
  </li>
</template>

<script>
export default {
  name: "Bubble",
  props: {
    me: Boolean,
    data: Object,
    aPath: String
  }
}
</script>

<style scoped>
li {
  padding: 0.5rem;
  overflow: hidden;
  display: flex;
}

.avatar {
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

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

.day {
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


</style>