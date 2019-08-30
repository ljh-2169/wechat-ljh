<template>
  <div class="chat">
    <div class="app-header">
      <div class="title">微信</div>
      <router-link tag="div" class="search" to="/search">
        <img src="../../assets/搜索.png" height="20" width="20">
      </router-link>
      <div class="plus" @click="setShowmore">
        <img src="../../assets/加号.png" height="20" width="20">
      </div>
    </div>
    <div class="showmore" v-show="showmore">
      <div class="list">
        <img class="findicon" src="../../assets/chat/发起群聊.png" />
        <span>发起群聊</span>
      </div>
      <div class="list" @click="gotoAddFriends">
        <img class="findicon" src="../../assets/chat/添加好友.png" />
        <span>添加朋友</span>
      </div>
      <div class="list">
        <img class="findicon" src="../../assets/chat/扫一扫.png" />
        <span>扫一扫</span>
      </div>
      <div class="list">
        <img class="findicon" src="../../assets/chat/收付款.png" />
        <span>收付款</span>
      </div>
      <div class="list">
        <img class="findicon" src="../../assets/chat/反馈.png" />
        <span>帮助与反馈</span>
      </div>
    </div>
    <ul>
      <li @click="gotoChatroom(user)" v-for="user in chat_list" :key="user.id">
        <div class="chatlist" >
          <div class="userPhoto">
            <img :src="user.imgurl" height="40" width="40" />
            <span class="unread" v-html="user.unread" v-show="user.unread"></span>
          </div>
          <div>
            <div class="username">
              <span >{{user.chatName}}</span>
              <span class="chatTime">{{user.time|dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <!-- <p class="username">{{user.chatName}}</p> -->
            <p class="userinfo" v-if="user.content" v-html="user.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></p>
            <p class="userinfo" v-show="user.type==='img'">[图片]</p>
          </div>
        </div>
      </li>
    </ul>
    <input type="text" @focus="showSendBottom" @blur="unshowSendButton" style="display: none"/>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  inject: ['emotion'],
  mounted () {
    axios.get('/apis/chat_list', {params: {chat_id: this.$store.state.id}})
      .then((res) => {
        console.log(res.data.data)
        for (let i = 0; i < res.data.data.length; i++) {
          this.chat_list.push(res.data.data[i])
        }
      })
  },
  methods: {
    setShowmore () {
      if (this.showmore === 0) {
        this.showmore = 1
      } else {
        this.showmore = 0
      }
    },
    showSendBottom () {
      console.log('onfocus')
      document.getElementsByTagName('input')[0].style.background = 'yellow'
    },
    unshowSendButton () {
      console.log('onfocus')
      document.getElementsByTagName('input')[0].style.background = 'white'
    },
    gotoAddFriends () {
      this.$router.push({
        path: '/addFriends'
      })
    },
    gotoChatroom: function (user) {
      console.log(user.chatName)
      this.$router.push({
        path: '/chatroom', query: {user: user}
      })
    }
  },
  data () {
    return {
      chat_list: [],
      showmore: 0
    }
  }
}
</script>

<style scoped>
  .chat{
    position: absolute;
    /*border: 1px solid red;*/
    /*width: 100%;*/
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    margin-bottom: 0;
    background-color: #ebebeb;
  }
  .showmore{
    position: fixed;
    top: 55px;
    right: 8px;
    width: 150px;
    background-color: rgb(63, 63, 63);
    border-radius: 6px;
    z-index: 10;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.76);
  }
  .findicon{
    margin-right: 20px;
    height: 20px;
    width: 20px;
  }
  .list{
    width: 100%;
    display: flex;
    padding: 10px 18px;
    align-items: center;
    border-bottom: 0.003mm solid #ebebeb;
  }
  .chatlist{
    height: 44px;
    margin-top: 0px;
    padding: 10px 10px;
    align-items: center;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
  }
  .username{
    font-size: 16px;
    padding-left: 20px;
    margin-bottom: 3px;
    font-weight: normal;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
  }
  .userinfo{
    font-size: 14px;
    padding-left: 20px;
    color: #91989e;
    max-width: 200px;
    /* height: 20px; */
    white-space: nowrap;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
  }
  .chatTime{
    position: fixed;
    font-size: 12px;
    right: 20px;
    color: #91989e;

  }
  .userPhoto{
    position: relative;
  }
  .userPhoto img{
    border-radius: 4px;
  }
  .unread{
    position: absolute;
    top: -2px;
    right: -2px;
    font-size: 12px;
    line-height: 14px;
    color: #fff;
    height: 14px;
    width: 14px;
    text-align: center;
    vertical-align: middle;
    background-color: red;
    border: 1px solid red;
    border-radius: 50%;
  }
</style>
