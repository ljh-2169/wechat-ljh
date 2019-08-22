<template>
  <div class="login">
    <div class="bg"  style="background-image: url(../../static/登陆背景.png);">
      <div class="loginContent">
        <div class="Username">
          <span>账号</span>
          <input type="text" ref="Username" >
        </div>
        <div class="Password">
          <span>密码</span>
          <input type="password" ref="Password">
        </div>
        <div class="loginBotton">
          <input type="button" value="登录" @click="gotoWeChat">
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'

export default {
  methods: {
    gotoWeChat () {
      console.log(this.$refs.Username.value)
      axios.post('/apis/log', {chat_id: this.$refs.Username.value, password: this.$refs.Password.value})
        .then((res) => {
          console.log('data', res.data)
          if (res.data.status === 'sucess') {
            console.log(res.data.token)
            this.$store.commit('SET_TOKEN', res.data.token)
            this.$store.commit('SET_ID', this.$refs.Username.value)
            this.$store.commit('SET_NAME', res.data.chat_name)
            this.$store.commit('SET_IMGURL', res.data.imgurl)
            this.$router.push({path: '/chat'})
          }
        })
      // if (this.$refs.Username.value === this.Username && this.$refs.Password.value === this.Password) {
      //   console.log('登录成功')
      //   this.$store.commit('SET_TOKEN', true)
      //   this.$router.push({path: '/chat'})
      // }
    }
  },
  data () {
    return {
      Username: this.$store.state.name,
      Password: '123'
    }
  }
}
</script>

<style scoped>
.login{
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: #fff;
}
.bg{
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  /* min-width: 1000px; */
  z-index:-1;
  /* zoom: 1; */
  /* filter: blur(2px); */
  opacity: 9;
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-size: 100% 100%;
  /* -webkit-background-size: cover; */
  /* -o-background-size: cover; */
  justify-items: center;
}
.loginContent{
  position: fixed;
  top: 0px;
  bottom: 0px;
  width:100%;
  height:100%;
  background-color: rgba(255, 255, 255, 0.158);
  font-size: 20px;
  color:#fff;
}
.Username{
  width:100%;
  position: fixed;
  top: 200px;
  padding: 10px 0px;
  text-align: center;
}
.Username input{
  width:70%;
  background: none;
  outline:none;
  border-style: none;
  color:#fff;
  font-size: 19px;
  border-bottom: 2px solid #44be44;
}
.Password{
  position: fixed;
  top: 250px;
  padding: 10px 0px;
  width:100%;
  /* display: flex; */
  text-align: center;
}
.Password input{
  width:70%;
  background: none;
  outline:none;
  border-style: none;
  color:#fff;
  font-size: 19px;
  border-bottom: 2px solid #44be44;
}
.loginBotton{
  position: fixed;
  top: 300px;
  padding: 10px 0px;
  width: 100%;
  text-align: center;
}
.loginBotton input{
  outline:none;
  border-style: none;
  background-color: #44be44;
  color:#fff;
  font-size: 18px;
  padding: 5px 10px;
  width: 70%;
  border-radius: 4px;
}
</style>
