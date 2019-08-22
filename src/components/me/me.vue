<template>
  <div class="me">
    <div class="app-header">
      <div class="title">微信</div>
      <router-link tag="div" class="search" to="/search">
        <img src="../../assets/搜索.png" height="20" width="20">
      </router-link>
      <div class="plus" >
        <img src="../../assets/加号.png" height="20" width="20">
      </div>
    </div>
    <div class="meContent">
      <div @click="gotoMyinfo" class="contentTop">
        <img class="mePhoto" :src="this.$store.state.imgurl" />
        <div>
          <p class="username">{{this.$store.state.name}}</p>
          <p class="userinfo">微信号：{{this.$store.state.id}}</p>
        </div>
      </div>

      <div class="list border-thick">
        <img class="findicon" src="../../assets/me/支付.png" />
        <span>支付</span>
      </div>
      <div class="list border-thin">
        <img class="findicon" src="../../assets/me/收藏.png" />
        <span>收藏</span>
      </div>
      <div class="list border-thin">
        <img class="findicon" src="../../assets/me/相册.png" />
        <span>相册</span>
      </div>
      <div class="list border-thin">
        <img class="findicon" src="../../assets/me/卡包.png" />
        <span>卡包</span>
      </div>
      <div class="list border-thick">
        <img class="findicon" src="../../assets/me/表情.png" />
        <span>表情</span>
      </div>
      <div class="list" @click="out">
        <img class="findicon" src="../../assets/me/设置.png" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>
<script>
import Myinfo from './myinfo.vue'
// import axios from 'axios'
export default {
  components: {
    Myinfo
  },
  // mounted () {
  //   axios.post('/apis/refreshToken', {chat_id: this.$store.state.id})
  //     .then((res) => {
  //       console.log('data', res.data)
  //       if (res.data.status === 'sucess') {
  //         console.log(res.data.token)
  //         this.$store.commit('SET_TOKEN', res.data.token)
  //         // router.go(0)
  //       }
  //     })
  // },
  methods: {
    gotoMyinfo () {
      this.$router.push({
        path: '/myinfo'
      })
      console.log('6')
    },
    out () {
      console.log('退出登录')
      this.$store.commit('SET_TOKEN', '')
      this.$store.commit('SET_NAME', '')
      this.$router.push({
        path: '/login'
      })
    }
  }

}
</script>
<style scoped>
.me{
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 0;
  right: 0;
  background-color: #ebebeb;
}
.meContent{
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
}
.meContent div{
  background-color: #fff;
  width: 100%;
}
.contentTop{
  margin: 0px;
  /* padding: 30px; */
  align-items: center;
  display: flex;
  border-bottom: 8px solid #ebebeb;
  }
.mePhoto{
  height: 70px;
  width: 70px;
  margin: 25px;
  border-radius: 6px;
  flex-shrink: 0;
}

.username{
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}
.userinfo{
  font-size: 15px;
  color: #91989e;
}
.findicon{
  margin-right: 20px;
  height: 20px;
  width: 20px;
}
.list{
  width: 100%;
  display: flex;
  padding: 10px 20px;
  align-items: center;
}
.border-thick{
  border-bottom: 8px solid #ebebeb;
}
.border-thin{
  border-bottom: 1px solid #ebebeb;
}

</style>
