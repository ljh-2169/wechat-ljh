<template>
    <div id="app">
      <div>
        <!-- <div class="app-header">
            <div class="title">微信</div>
            <router-link tag="div" class="search" to="/search">
                <img src="./assets/搜索.png" height="20" width="20">
            </router-link>
            <div class="plus" @click="logClick">
                <img src="./assets/加号.png" height="20" width="20">
            </div>
        </div> -->

        <div class="newMsg" v-if="userNummber(newMsg)>0" v-show="showNewMsg">
          <ul>
            <li @click="gotoChatroom(newMsg)" v-for="(user,index) in newMsg" :key="index" v-show="index+1===newMsg.length">
              <div class="newMsgTop">
                <img src="/static/微信.png" height="20" width="20" style="padding-right:10px">
                <span>微信 刚刚</span>
              </div>
              <div v-show="userNummber(newMsg)>1">
                <p>{{userNummber(newMsg)}}个联系人发来{{newMsg.length}}条消息</p>
              </div>
              <div class="newMsgContent" v-show="userNummber(newMsg)===1">
                <div style="font-size:14px">
                  <p style="padding-bottom:4px">{{user.chatName}}</p>
                  <span >[{{newMsg.length}}条]{{user.chatName}}: </span>
                  <span class="userinfo" v-show="user.content">{{user.content}}</span>
                  <span class="userinfo" v-show="user.type==='img'">[图片]</span>
                </div>
                <img :src="user.imgurl" height="40" width="40" >
              </div>
            </li>
          </ul>
        </div>

        <div class="mainshow">

          <!-- <keep-alive> -->
              <router-view></router-view>
          <!-- </keep-alive> -->
        </div>

        <div class="tab">
            <router-link tag="div" class="tab-item" to="/chat">
                <div class="tab-link tab-link-1">
                    <span class="tab-link-text">微信</span>
                </div>
            </router-link>

            <router-link tag="div" class="tab-item" to="/address">
                <div class="tab-link tab-link-2">
                    <span class="tab-link-text">通讯录</span>
                </div>
            </router-link>

            <router-link tag="div" class="tab-item" to="/find">
                <div class="tab-link tab-link-3">
                    <span class="tab-link-text">发现</span>
                </div>
            </router-link>

            <router-link tag="div" class="tab-item" to="/me">
                <div class="tab-link tab-link-4">
                    <span class="tab-link-text">我</span>
                </div>
            </router-link>
        </div>
      </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.gotoWebSocket()
  },
  data () {
    return {
      newMsg: [],
      showNewMsg: ''
    }
  },
  provide () {
    return {
      wsOnMessage: this.wsOnMessage,
      closeWebSocket: this.closeWebSocket
    }
  },
  methods: {
    wsOnMessage: function (event) {
      console.log('收到服务器内容', event)
      var a = JSON.parse(event.data)
      axios.get('/apis/newMsg', {params: {chat_id: a.fromId}})
        .then((res) => {
          console.log(res.data)
          this.newMsg.push({
            chatId: a.fromId,
            chatName: res.data.data.chatName,
            imgurl: res.data.data.imgurl,
            type: a.type,
            content: a.content
          })
          this.showNewMsg = 1
          if (this.showNewMsg) {
            console.log('setTimeout', this.showNewMsg)
            setTimeout(() => {
              this.showNewMsg = 0
            }, 5000)
            // setTimeout(function () {
            //   this.showNewMsg = 0
            // }, 5000)
          }
          console.log('newMsg: ', this.newMsg)
        })
    },
    userNummber: function (data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        var a = data[i].chatId
        if (!result.includes(a)) {
          result.push(a)
        }
      }
      return result.length
    },
    gotoChatroom: function (newMsg) {
      this.newMsg = []
      if (this.userNummber(newMsg) === 1) {
        let user = newMsg[0]
        this.$router.push({
          path: '/chatroom', query: {user: user}
        })
      } else {
        this.showNewMsg = ''
        this.$router.push({
          path: '/chat'
        })
      }
    },
    gotoWebSocket () {
      let that = this
      if ('WebSocket' in window) {
        // console.log('您的浏览器支持 WebSocket!')
        if (this.$store.state.token) {
          that.ws = new WebSocket('ws://localhost:8080/webSocket/' + this.$store.state.id)
          that.socket.setWs(that.ws)
          that.ws.onopen = function () {
            console.log('WebSocket连接成功，状态码：' + that.ws.readyState)
          }
          that.ws.onclose = function () {
            console.log('连接已关闭...')
            setTimeout(() => {
              that.gotoWebSocket()
            }, 2000)
          }
          that.ws.onmessage = this.wsOnMessage
        } else {
          // console.log('当前无用户')
          setTimeout(() => {
            that.gotoWebSocket()
          }, 2000)
        }
      } else {
        console.log('您的浏览器不支持 WebSocket!')
      }
    }
  }
}
</script>

<style>
ul, li, p, div{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

ol, ul {
  list-style: none;
}

#app{
  height: 100%;
  width: 100%;
}
.newMsg{
  position: fixed;
  top: 0px;
  left: 5px;
  right: 5px;
  z-index: 200;
  background-color: rgb(250, 250, 250);
  padding: 20px;
  border: 1px solid rgba(153,153,153,0.4);
  border-radius: 10px;
}
.newMsgTop{
  display: flex;
  align-items: center;
  padding-bottom: 6px;
  font-size: 14px;
}
.newMsgContent{
  display: flex;
  justify-content: space-between;
}
.app-header{
  top: 0px;
  left: 0;
  right: 0;
  background-color: #1e2b39;
  height: 50px;
  color: #fff;
  position: fixed;
  width: 100%;
  z-index: 1;
}
.title{
  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;
}
.search img{
  position: absolute;
  top: 14px;
  right: 80px;
}
.plus img{
  position: absolute;
  top: 14px;
  right: 24px;
}

.tab{
  border-top: 1px solid rgba(153,153,153,0.4);
  display: flex;
  position: fixed;
  height: 50px;
  line-height: 44px;
  font-size: 14px;
  bottom: 0px;
  left: 0;
  right: 0;
  /*z-index: 9;*/
  background-color: #fff;
}
.tab-item{
  flex: 1;
  text-align: center;
}
.tab-link{
  position: relative;
  color: #999999;
  height: 50px;
}
.tab-link span{
  position: absolute;
  font-size: 14px;
  line-height: 14px;
  height: 14px;
  width: 100%;
  bottom: 6px;
  left: 0px;
}
.tab-link-1{
  background: url('./assets/tab/微信.png') no-repeat center 6px;
  background-size: 20px 20px;
}
.tab-link-2{
  background: url('./assets/tab/通讯录.png') no-repeat center 6px;
  background-size: 20px 20px;
}
.tab-link-3{
  background: url('./assets/tab/发现.png') no-repeat center 8px;
  background-size: 16px 16px;
}
.tab-link-4{
  background: url('./assets/tab/我.png') no-repeat center 8px;
  background-size: 16px 16px;
}
.router-link-active .tab-link{
  color: #09BB07;
}
.router-link-active .tab-link-1{
  background: url('./assets/tab/微信1.png') no-repeat center 6px;
  background-size: 20px 20px;
}
.router-link-active .tab-link-2{
  background: url('./assets/tab/通讯录1.png') no-repeat center 6px;
  background-size: 20px 20px;
}
.router-link-active .tab-link-3{
  background: url('./assets/tab/发现1.png') no-repeat center 8px;
  background-size: 16px 16px;
}
.router-link-active .tab-link-4{
  background: url('./assets/tab/我1.png') no-repeat center 8px;
  background-size: 16px 16px;
}

</style>
