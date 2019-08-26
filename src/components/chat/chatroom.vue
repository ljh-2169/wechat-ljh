<template>
    <div class="chatroom">
      <div class="back">
          <div @click="back">
              <img src="../../assets/返回.png"/>
              <span>{{this.name}}</span>
          </div>
      </div>
      <div class="roomContent" @click="unshowMore">
        <div class="roomContentMain" id="scrollerToBottom">
          <div class="content-top">
            <p>————我们已经是好友了，开始聊天吧————</p>
          </div>
          <div class="content-talk" id="content-talk" style="{padding-bottom: 100px}">
            <ul class="">
              <li v-for="item in chatroom_list" :key="item.id" style="background-color: #ebebeb">
                <div :class="item.fromId===$store.state.id? 'mytalk' : 'yourtalk'">
                  <img class="userPhoto" :src="item.fromId===$store.state.id? $store.state.imgurl : imgurl" />
                  <span v-if="item.content">{{item.content}}</span>
                  <img :src="item.imgurl" v-if="item.imgurl" :class="item.imgtype">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="send">
          <div class="send-item">
            <img src="../../assets/chatroom/语音.png" height="30" width="30"/>
            <input class="inputbox" type="text" ref="sTest" @keyup.enter="send" v-model="msg"/>
            <img src="../../assets/chatroom/表情.png" height="26.5" width="26.5"/>
            <img src="../../assets/chatroom/添加.png" height="30" width="30" v-if="!msg" @click="showMore"/>
            <input class="sendButton" type="button" value="发送" @click="send" v-if="msg" :style="{background: msg == '' ? 'grey' : '#44be44' }"/>
          </div>
          <div class="send-add" ref="sendAdd" v-show="clickAdd">
            <div class="more">
              <div class="more-item" @click="fileClick">
                <img src="../../assets/chatroom/相册.png" height="30" width="30"/>
                <p>相册</p>
                <input id="input" type="file"  @change="getFile($event)"  accept="image/jpg,image/png,image/bmp,image/gif" style="display: none">
              </div>
              <div class="more-item">
                <img src="../../assets/chatroom/拍摄.png" class="more-2" />
                <p>拍摄</p>
              </div>
              <div class="more-item">
                <img src="../../assets/chatroom/视频通话.png" height="30" width="30" />
                <p>视频通话</p>
              </div>
              <div class="more-item">
                <img src="../../assets/chatroom/位置.png" height="30" width="30" />
                <p>位置</p>
              </div>
            </div>
            <div class="more">
              <div class="more-item">
                <img src="../../assets/chatroom/红包.png" class="more-5"/>
                <p>红包</p>
              </div>
              <div class="more-item">
                <img src="../../assets/chatroom/转账.png" height="30" width="30" />
                <p>转账</p>
              </div>
              <div class="more-item">
                <img src="../../assets/chatroom/语音输入.png" class="more-7"/>
                <p>语音</p>
              </div>
              <div class="more-item">
                <img src="../../assets/chatroom/我的收藏.png" class="more-7" />
                <p>我的收藏</p>
              </div>
            </div>
          </div>
      </div>
    </div>

</template>

<script scroped>
import axios from 'axios'
export default {
  inject: ['wsOnMessage'],
  data () {
    return {
      clickAdd: '',
      msg: '',
      name: '',
      chatid: '',
      imgurl: '',
      chatroom_list: [],
      wsData: '',
      websocket: null,
      fromRouter: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData()
      vm.fromRouter = from.path
    })
  },
  beforeDestroy () {
    this.socket.ws.onmessage = this.wsOnMessage
  },

  mounted () {
    this.scrollToBottom()
    let that = this
    that.socket.ws.onmessage = function (res) {
      console.log('收到服务器内容', res)
      var a = JSON.parse(res.data)
      if (a.fromId === that.chatid) {
        that.chatroom_list.push({
          fromId: a.fromId,
          toId: a.toId,
          type: a.type,
          content: a.content,
          imgurl: a.imgurl,
          imgtype: a.imgtype
        })
        console.log('that.chatroom_list', that.chatroom_list[that.chatroom_list.length - 1])
      } else {
        console.log('a.fromId: ', a.fromId)
        console.log('this.chatid:', that.chatid)
        console.log('a.fromId != this.chatid')
      }
    }
  },
  watch: {
    'chatroom_list': 'scrollToBottom'
  },

  methods: {
    handdleMsg (msg) {
      let that = this
      console.log(that.socket.ws)
      if (that.socket.ws && that.socket.ws.readyState === 1) {
        console.log('发送信息', msg)
        that.socket.ws.send(msg)
      }
    },
    fileClick () {
      document.getElementById('input').click()
    },
    getFile (event) {
      var file = event.target.files[0]
      var imgName = file.name
      console.log(imgName)
      let formData = new FormData()
      formData.append('fromId', this.$store.state.id)
      formData.append('toId', this.chatid)
      formData.append('file', file)
      formData.append('path', 'E:\\shixi\\Front-end\\test3\\static\\messageImg\\')
      console.log(formData)
      axios.post('/apis/sendMessage', formData, {headers: {'Content-type': 'multipart/form-data'}})
        .then((res) => {
          console.log('filePath', res.data.filePath)
          var img = new Image()
          var type = ''
          img.src = res.data.filePath
          if (img.width < img.height) {
            type = 'zhai'
          } else if (img.width === img.height) {
            type = 'zheng'
          } else {
            type = 'kuan'
          }
          console.log(type)

          this.chatroom_list.push({
            fromId: this.$store.state.id,
            toId: this.chatid,
            type: 'img',
            imgurl: res.data.filePath,
            imgtype: type
          })
          var messageObj = {fromId: this.$store.state.id,
            toId: this.chatid,
            type: 'img',
            imgurl: res.data.filePath,
            imgtype: type}
          var messageJson = JSON.stringify(messageObj)
          // this.websocket.send(messageJson)
          this.handdleMsg(messageJson)
        })
      document.getElementById('input').value = null
    },
    showMore () {
      this.clickAdd = 1
      // let height = this.$refs.sendAdd.offsetHeight
      // console.log(height)
      document.getElementById('content-talk').style.paddingBottom = '250px'
      this.scrollToBottom()
    },
    unshowMore () {
      this.clickAdd = 0
      console.log('unshowMore')
      document.getElementById('content-talk').style.paddingBottom = '100px'
    },
    getData () {
      this.name = this.$route.query.user.chatName
      this.chatid = this.$route.query.user.chatId
      this.imgurl = this.$route.query.user.imgurl

      axios.post('/apis/chatroom', {user_id: this.$store.state.id, friend_id: this.chatid})
        .then((res) => {
          console.log(res.data)
          this.chatroom_list = []
          for (let i = 0; i < res.data.data.length; i++) {
            this.chatroom_list.push(res.data.data[i])
            if (this.chatroom_list[i].imgurl != null) {
              var img = new Image()
              img.src = this.chatroom_list[i].imgurl
              if (img.width < img.height) {
                this.chatroom_list[i].imgtype = 'zhai'
              } else if (img.width === img.height) {
                this.chatroom_list[i].imgtype = 'zheng'
              } else {
                this.chatroom_list[i].imgtype = 'kuan'
              }
              console.log(this.chatroom_list[i].imgtype)
            }
          }
        })
    },
    scrollToBottom () {
      this.$nextTick(() => {
        var msg = document.getElementById('scrollerToBottom') // 获取对象
        document.documentElement.scrollTop = msg.scrollHeight // 滚动高度
        // console.log(msg.scrollHeight)
        // console.log(document.documentElement.scrollTop)
      })
    },
    back () {
      axios.post('/apis/setunread', {user_id: this.$store.state.id, friend_id: this.chatid})
        .then((res) => {
          console.log(res.data)
          if (this.fromRouter === '/addressDetail') {
            this.$router.push({
              path: '/addressDetail', query: {user: this.$route.query.user}
            })
          } else {
            this.$router.push({
              path: '/chat'
            })
          }
        })
    },
    send () {
      this.text = this.$refs.sTest.value
      if (this.text !== '') {
        axios.get('/apis/chatroom', {
          params: {
            fromId: this.$store.state.id,
            toId: this.chatid,
            type: 'text',
            content: this.text}
        }).then((res) => {
          console.log('ok')
          this.chatroom_list.push({
            fromId: this.$store.state.id,
            toId: this.chatid,
            type: 'text',
            content: this.text
          })
        })
        var messageObj = {fromId: this.$store.state.id,
          toId: this.chatid,
          type: 'text',
          content: this.text}
        var messageJson = JSON.stringify(messageObj)
        // this.websocket.send(messageJson)
        this.handdleMsg(messageJson)
        this.msg = ''
      }
      this.scrollToBottom()
    }
  }
}
</script>

<style scoped>

  .chatroom{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: #ebebeb;
  }
  .back{
      background: #1e2b39;
      height: 50px;
      color: #fff;
      position: fixed;
      width: 100%;
      z-index: 10;
  }
  .back img{
    position: absolute;
    top: 15px;
    left: 15px;
  }
  .back span{
    position: absolute;
    font-size: 18px;
    top: 12px;
    left: 50px;
}
  .roomContent{
    /* position: absolute; */
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: hidden;
    background-color: none;
    /* margin-bottom:50px; */
  }
  .roomContentMain{
    /* position: relative; */
    width: 100%;
  }
  .content-top{
    position: relative;
    padding-top: 30px;
    top: 50px;
    padding-bottom: 30px;
    font-size: 14px;
    color:  #91989e;
    text-align: center;
  }
  .content-talk{
    position: relative;
    top: 50px;
    /* bottom: 50px; */
    padding-bottom: 100px;
  }
  .mytalk{
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 10px;
    /* background-color: #ebebeb; */
  }
  .mytalk span{
    padding: 10px;
    max-width: 182px;
    background: #5feb5f;
    border-radius: 4px;
  }
  .yourtalk{
    display: flex;
    padding-bottom: 10px;
    /* background-color: #ebebeb; */
  }
  .yourtalk span{
    padding: 10px;
    max-width: 182px;
    background: white;
    vertical-align:bottom;
    border-radius: 4px;
  }
  .userPhoto{
    margin: 0px 10px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }

  .send{
    border-top: 1px solid rgba(153,153,153,0.4);
    position: fixed;
    /* height: 50px; */
    font-size: 14px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: rgb(245, 245, 245);
  }
  .send-item{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }
  .inputbox{
    background: #fff;
    height: 30px;
    width: 80%;
    align-items: center;
    border-style: none;
    outline:none;
    font-size: 16px;
  }
  .sendButton{
    height: 30px;
    width: 60px;
    margin-left: 5px;
    color: white;
    font-size: 16px;
    /* background-color: #44be44; */
    outline:none;
    border-style: none;
    border-radius: 4px;
  }
  .send-add{
    height: 150px;
    /* position: fixed;
    bottom: 0; */
  }
  .more{
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }
  .more-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .more-item p{
    font-size: 12px;
  }
  .more-2{
    width: 26px;
    height: 22px;
    margin-top: 3px;
    margin-bottom : 5px;
  }
  .more-5{
    width: 26px;
    height: 26px;
    margin-bottom : 4px;
  }
  .more-7{
    width: 26px;
    height: 26px;
    margin-bottom : 4px;
  }
  .kuan{
    width: 150px;
    border-radius: 6px;
  }
  .zheng{
    width: 120px;
    border-radius: 6px;
  }
  .zhai{
    height: 150px;
    border-radius: 6px;
  }
</style>
