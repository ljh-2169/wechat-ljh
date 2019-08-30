<template>
  <div class="addFriends">
    <div class="back">
      <div @click="back">
        <img src="../../assets/返回.png"/>
        <span>添加朋友</span>
      </div>
    </div>
    <div class="addContent">
      <div class="searchFriends" style="height:50px">
          <img src="../../assets/address/搜索.png" width="20" height="20"/>
          <input class="search_input" type="text" placeholder="微信号/手机号" v-model="searchMsg"/>
          <input class="searchButton" type="button" value="搜索" @click="searchFriend" v-if="searchMsg"/>
      </div>
      <div class="searchFriends" style="height:30px">
          <img src="../../assets/address/电话.png" width="24" height="24"  style="padding-right:20px"/>
          <span>添加手机联系人</span>
      </div>
      <div class="nf" v-if="newFriends_list[0]">新的朋友</div>
      <ul>
        <li v-for="item in newFriends_list" :key="item.id">
          <div class="newFriends" >
            <div class="userPhoto">
              <img :src="item.imgurl" height="40" width="40" style="padding-right:15px"/>
            </div>
            <div style="flex: 1">
              <p class="username">{{item.chatName}}</p>
              <p class="userid">微信号：{{item.chatId}}</p>
            </div>
            <input class="searchButton" type="button" value="接受" />
          </div>
        </li>
      </ul>
      <div class="noNewFriends" v-if="!newFriends_list[0]">暂无新的朋友</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      searchMsg: '',
      newFriends_list: [{chatId: 'mama', chatName: '妈妈', imgurl: '/static/妈妈.png'},
        {chatId: 'xiaoyangsuxi', chatName: '小羊苏西', imgurl: '/static/小羊苏西.png'}]
    }
  },
  methods: {
    searchFriend () {
      if (this.searchMsg === this.$store.state.id) {
        alert('用户为自己')
        this.searchMsg = ''
      } else {
        var a = JSON.parse(this.$store.state.address)
        var exit = 0
        console.log('address:', a)
        for (var i = 0; i < a.length; i++) {
          if (a[i].chatId === this.searchMsg) {
            exit = 1
            alert('用户已在通讯录')
            this.$router.push({
              path: '/addressDetail', query: {user: a[i]}
            })
          }
        }
        if (!exit) {
          axios.get('/apis/searchUser', {params: {newFriend_id: this.searchMsg}})
            .then((res) => {
              if (res.data.status === 'exit') {
                this.$router.push({
                  path: '/addressDetail', query: {user: res.data.data}
                })
              } else {
                alert('用户不存在')
                this.searchMsg = ''
              }
            })
        }
      }
    },
    back () {
      this.$router.back() // 返回上一级
    },
    save () {
      this.text = this.$refs.sName.value
      if (this.text !== '') {
        console.log('修改成功')
        this.$store.commit('ALTER_NAME', this.text)
        this.$router.back()
      }
    }
  }
}
</script>

<style scoped>
.addFriends{
  position: fixed;
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
.addContent{
  position: fixed;
  top: 50px;
  width: 100%;
}
.nf{
  padding: 10px;
  font-size: 16px;
  color: #91989e;
}
.searchFriends{
  background-color: #fff;
  /* height: 50px; */
  display: flex;
  padding: 10px 20px;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}
.search_input{
  flex: 1;
  /* background: #ebebeb; */
  padding-left: 10px;
  height: 30px;
  border-style: none;
  outline:none;
  font-size: 16px;
}
.searchButton{
  height: 30px;
  width: 60px;
  color: white;
  font-size: 16px;
  background-color: #44be44;
  outline:none;
  border-style: none;
  border-radius: 4px;
}
.newFriends{
  background-color: #fff;
  /* height: 50px; */
  display: flex;
  padding: 10px 20px;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}
.userid{
  font-size: 14px;
  color: #91989e;
  padding-top: 3px;
}
.noNewFriends{
  padding: 20px;
  font-size: 16px;
  color: #91989e;
  text-align: center;
}
</style>
