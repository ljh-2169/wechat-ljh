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
                  <span class="userinfo" v-show="user.content" v-html="user.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></span>
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
      <!-- <toast v-model="toaststatus" type="text" :time="1500" is-show-mask :text="toastmsg" position="top"></toast> -->
      <!-- <toast is-show-mask v-model="toaststatus" type="text" :time="1500" is-show-mask :text="toastText" :position="position"></toast> -->

    </div>
</template>

<script >
import axios from 'axios'
// import {Toast} from 'vux'
// import { Toast } from 'vant'
export default {
  // components: { Toast },
  created () {
    this.gotoWebSocket()
  },
  data () {
    return {
      timeoutObj: null,
      timeoutReconnect: null,
      newMsg: [],
      showNewMsg: '',
      toaststatus: false,
      tosatmsg: '你好!'
    }
  },
  provide () {
    return {
      wsOnMessage: this.wsOnMessage,
      closeWebSocket: this.closeWebSocket,
      emotion: this.emotion,
      resetTimers: this.resetTimers
    }
  },
  methods: {
    // 将表情字符匹配结果替换表情图片
    emotion (res) {
      let word = res.replace(/#|;/gi, '')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      let index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="center" height="22" width="22">`
    },
    startTimers: function () {
      var self = this
      this.timeoutObj = setTimeout(function () {
        self.socket.ws.send('HeartBeat')
      }, 2000)
    },
    resetTimers: function () {
      clearTimeout(this.timeoutObj)
      this.startTimers()
    },
    openWebSocket () {
      console.log('WebSocket连接成功，状态码：' + this.ws.readyState)
      this.resetTimers()
    },
    closeWebSocket () {
      this.socket.ws.close()
    },
    oncloseWebSocket () {
      // Toast('WebSocket连接关闭')
      console.log('连接已关闭...')
      this.toaststatus = true
      this.toastmsg = '读取数据失败,请检查您的网络！'
      this.timeoutReconnect = setTimeout(function () {
        this.gotoWebSocket()
      }, 2000)
    },
    wsOnMessage: function (event) {
      this.resetTimers()
      if (event.data === 'HeartBeat received.') {
        console.log('===== HeartBeat received. ====== bom,bom,bom!')
      } else {
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
      }
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
        console.log('您的浏览器支持 WebSocket!')
        // Toast({
        //   message: '今日签到+3'
        // })
        // Toast('您的浏览器支持 WebSocket!')
        if (this.$store.state.token) {
          that.ws = new WebSocket('ws://localhost:8080/webSocket/' + this.$store.state.id)
          that.socket.setWs(that.ws)
          that.ws.onopen = this.openWebSocket
          that.ws.onclose = this.oncloseWebSocket
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

<style >
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
