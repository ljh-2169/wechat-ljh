<template>
  <div class="find">
    <div class="app-header">
      <div class="title">微信</div>
      <router-link tag="div" class="search" to="/search">
        <img src="../../assets/搜索.png" height="20" width="20">
      </router-link>
      <div class="plus" >
        <img src="../../assets/加号.png" height="20" width="20">
      </div>
    </div>
    <div class="findContent">
      <div @click="gotoMoments" class="border-thick weizhi" >
        <div class="list">
          <img class="findicon" src="../../assets/find/朋友圈.png" />
          <span>朋友圈</span>
        </div>
        <img class="momentsicon" src="../../assets/chat/小马佩德罗.png" />
      </div>
      <div class="list border-thin">
        <img class="findicon" src="../../assets/find/扫一扫.png" />
        <span>扫一扫</span>
      </div>
      <div class="list border-thick">
        <img class="findicon" src="../../assets/find/摇一摇.png" />
        <span>摇一摇</span>
      </div>
      <div class="list border-thin">
        <img class="findicon" src="../../assets/find/看一看.png" />
        <span>看一看</span>
      </div>
      <div class="list border-thick">
        <img class="findicon" src="../../assets/find/搜一搜.png" />
        <span>搜一搜</span>
      </div>
      <div class="list border-thick">
        <img class="findicon" src="../../assets/find/附近的人.png" />
        <span>附近的人</span>
      </div>
      <div class="list border-thin">
        <img class="findicon" src="../../assets/find/购物.png" />
        <span>购物</span>
      </div>
      <div class="list border-thick">
        <img class="findicon" src="../../assets/find/游戏.png" />
        <span>游戏</span>
      </div>
      <div class="list">
        <img class="findicon" src="../../assets/find/小程序.png" />
        <span>小程序</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    gotoMoments () {
      this.$router.push({
        path: '/moments'
      })
    }
  }

}
</script>
<style>
.find{
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 0;
  right: 0;
  background-color: #ebebeb;
}
.findContent{
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
}
.findContent div{
  background-color: #fff;
  width: 100%;
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
.weizhi{
  display: flex;
  justify-content: space-between;
}
.momentsicon{
  height: 30px;
  width: 30px;
  padding: 10px 20px;
  flex-shrink: 0;
}

</style>
