<template>
    <div class="address-detail">
        <div class="back">
            <div @click="back">
                <img src="../../assets/返回.png"/>
            </div>
        </div>
        <div class="content">
          <div class="content-name">
            <img class="userPhoto" :src="imgurl" height="60" width="60"/>
            <div>
                <p class="username">{{this.name}}</p>
                <p class="userinfo">微信号：{{this.chatid}}</p>
                <p class="userinfo">地区：上海 浦东</p>
            </div>
          </div>
          <div class="beizhu">设置备注和标签</div>
          <div class="content-album">
            <p>朋友圈</p>
            <img class="album" src="../../assets/相册1.png" height="40" width="40"/>
            <img class="album" src="../../assets/相册2.png" height="40" width="40"/>
            <img class="album" src="../../assets/相册3.png" height="40" width="40"/>
          </div>
          <div class="more">更多信息</div>
          <div class="sendmsg" @click="gotoChatroom">
            <img class="" src="../../assets/发消息.png" height="20" width="20"/>
            <p>发消息</p>
          </div>
          <div class="sendmsg">
            <img class="" src="../../assets/视频通话.png" height="30" width="30"/>
            <p>音视频通话</p>
          </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
export default {
  // props: {
  //   name: {
  //     type: String,
  //     default: ''
  //   },
  //   chatid: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data () {
    return {
      name: '',
      chatid: '',
      imgurl: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.setData())
  },

  methods: {
    setData () {
      this.name = this.$route.query.user.chatName
      this.chatid = this.$route.query.user.chatId
      this.imgurl = this.$route.query.user.imgurl
      console.log('1')
    },
    back () {
      this.$router.back() // 返回上一级
    },
    gotoChatroom: function () {
      // console.log(user.chatName)
      this.$router.push({
        path: '/chatroom', query: {user: this.$route.query.user}
      })
    },
    show () {
      console.log(this.$route.query)
    }
  },
  watch: {
    '$route': 'show'
  }

}
</script>

<style>

  .address-detail{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #ebebeb;
    /*border: 1px solid red;*/
  }
  .back{
      background: #1e2b39;
      height: 50px;
      color: #fff;
      position: fixed;
      width: 100%;
  }
  .back img{
    position: absolute;
    top: 15px;
    left: 15px;
  }
  .content{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .content div{
    width: 100%;
    background-color: #fff;
  }
  .content-name{
    margin-top: 0px;
    padding: 10px 10px;
    align-items: center;
    display: flex;
  }
  .username{
    font-size: 20px;
    padding-left: 20px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .userinfo{
    font-size: 15px;
    padding-left: 20px;
    color: #91989e;
  }
  .beizhu, .more {
    font-size: 16px;
    padding: 13px 10px;
    border-top: 1px solid #ebebeb;
    border-bottom: 5px solid #ebebeb;
  }
  .content-album{
    font-size: 16px;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  .album{
    margin-left: 20px;
  }
  .sendmsg{
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    font-size: 16px;
    font-weight: bold;
    color: #1256e9c2;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #ebebeb;
  }
  .sendmsg img{
    padding-right: 10px;
  }
</style>
