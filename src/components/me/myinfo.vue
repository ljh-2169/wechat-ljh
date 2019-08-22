<template>
  <div class="myinfo">
    <div class="back">
      <div @click="back">
        <img src="../../assets/返回.png"/>
        <span>个人信息</span>
      </div>
    </div>
    <div class="myinfoContent">
      <div class="photo" @click="gotoAlterPhoto">
        <p>头像</p>
        <img :src="this.$store.state.imgurl" />
      </div>
      <div class="nicheng" @click="gotoAlterName">
        <p>昵称</p>
        <p class="namecolor">{{this.$store.state.name}} ></p>
      </div>
      <div class="nicheng">
        <p>微信号</p>
        <p class="namecolor">{{this.$store.state.id}}</p>
      </div>
      <div class="nicheng">
        <p>二维码名片</p>
        <p class="namecolor">></p>
      </div>
      <div class="nicheng">
        <p>更多</p>
        <p class="namecolor">></p>
      </div>
      <div class="dizhi">
        <p>我的地址</p>
        <p class="namecolor">></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.push({path: '/me'})
    },
    gotoAlterName () {
      this.$router.push({
        path: '/alterName'
      })
    },
    gotoAlterPhoto () {
      console.log('修改头像')
      this.$router.push({
        path: '/alterPhoto'
      })
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   next(window.location.reload())
  // }
  // reload () {
  //   this.isRouterAlive = false
  //   this.$nextTick(function () {
  //     this.isRouterAlive = true
  //     console.log('reload')
  //   })
  // }
}
</script>
<style>
.myinfo{
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ebebeb;
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
  top: 20px;
  left: 15px;
}
.back span{
  position: absolute;
  font-size: 18px;
  top: 15px;
  left: 50px;
}
.myinfoContent{
  position: fixed;
  top: 50px;
  width: 100%;
}
.myinfoContent div{
  width: 100%;
  background-color: #fff;
}
.photo{
  padding: 10px 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ebebeb;
}
.photo img{
  height: 60px;
  width: 60px;
  padding-right: 40px;
  flex-wrap: wrap;
}
.photo span{
  font-size: 16px;
}
.nicheng{
  padding: 10px 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ebebeb;
}
.namecolor{
  color: #91989e;
  padding-right: 40px;
}
.dizhi{
  padding: 10px 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-top: 8px solid #ebebeb;
}
</style>
