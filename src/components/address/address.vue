<template>
  <div class="address">
    <div class="app-header">
      <div class="title">微信</div>
      <router-link tag="div" class="search" to="/search">
        <img src="../../assets/搜索.png" height="20" width="20">
      </router-link>
      <div class="plus" >
        <img src="../../assets/加号.png" height="20" width="20">
      </div>
    </div>
    <div class="address-wrapper">

      <div class="top">
        <div class="top-cell">
            <div class="new-friend" @click="newFriend">
                <img src="../../assets/address/新的朋友.png" />
                <span>新的朋友</span>
            </div>
            <div class="new-friend" @click="warn">
                <img src="../../assets/address/群聊.png" />
                <span>群聊</span>
            </div>
            <div class="new-friend" @click="warn">
                <img src="../../assets/address/标签.png" />
                <span>标签</span>
            </div>
            <div class="new-friend" @click="warn">
                <img src="../../assets/address/公众号.png" />
                <span>公众号</span>
            </div>
        </div>
      </div>

      <div id="list">
        <ul class="list_user" ref="listUser">
          <li v-for="item in userIndex" :key="item.id">
            <p>{{item}}</p>
            <ul>
              <li @click="gotoDetail(user)" v-for="user in address_list" :key="user.id" v-show="user.index===item">
                <div class="addressUser" >
                  <img class="userPhoto" :src="user.imgurl" height="30" width="30"/>
                  <span>{{user.chatName}}</span>
                </div>
              </li>
            </ul>
          </li>
          <div class="address_number">{{this.address_number}}位联系人</div>
        </ul>
      </div>

      <div class="content_right">
        <ul class="list_index" ref="listIndex">
          <li  @touchstart="setScroll" v-for="item in userIndex" :key="item.id">{{item}}</li>
        </ul>
      </div>

    </div>

  </div>

</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import AddressDetail from './address-detail.vue'
export default {
  mounted () {
    axios.get('/apis/address', {params: {chat_id: this.$store.state.id}})
      .then((res) => {
        console.log(res)
        for (let i = 0; i < res.data.data.length; i++) {
          this.address_list.push(res.data.data[i])
        }
        this.address_number = res.data.data.length
        console.log(this.address_list)
      })
  },
  components: {
    AddressDetail
  },
  methods: {
    newFriend () {
    },
    warn () {
      console.log('3')
    },
    gotoDetail: function (user) {
      console.log(user.name)
      this.$router.push({
        path: '/addressDetail', query: {user: user}
      })
      // this.setAddress(user)
      console.log(user.chat_id)
    },
    filterIndex: function (data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        var a = data[i].index
        if (!result.includes(a)) {
          result.push(a)
        }
      }
      return result
    },
    // setListIndexPosition: function () {
    //   var iH = this.$refs.listIndex.offsetHeight
    //   this.$refs.listIndex.style.marginTop = -iH / 2 + 'px'
    //   console.log(iH)
    // },
    setScroll: function (ev) {
      var aP = this.$refs.listUser.getElementsByTagName('p')
      for (var i = 0; i < aP.length; i++) {
        if (aP[i].innerHTML === ev.target.innerHTML) {
          document.documentElement.scrollTop = aP[i].offsetTop
          console.log(i)
        }
      }
    }
  },
  computed: {
    userIndex: function () {
      return this.filterIndex(this.address_list)
    }
  },
  data () {
    return {
      address_number: '',
      address_list: []
    }
  }
}
</script>

<style scoped>

  .address{
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;

  }
  .top{
    height: 148px;
  }
  .top-cell{
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
  }
  .new-friend{
    display: flex;
    left: 0;
    height: 20px;
    border-bottom: 1px solid #ebebeb;
    padding: 8px 10px;
    align-items: center;
  }
  .new-friend img{
    margin-right: 20px;
    height: 20px;
    width: 20px;
  }

  #list{
    position: relative;
    top: 0px;
    bottom: 50px;
    overflow: hidden;
    margin-bottom:50px;

  }
  .list_user p{
    background: #ebebeb;
    padding: 2px 10px;
    font-size: 13px;
  }
  .list_user ul li{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px #ebebeb solid;
  }
  .content_right{
    position: fixed;
    top: 50px;
    bottom: 50px;
    display: flex;
    align-items: center;
  }
  .list_index{
    position: fixed;
    right: 10px;
    /* top: 50%; */
    font-size: 15px;
  }
  .list_index li{
    margin: 5px 0;
  }
  .addressUser{
    display: flex;
  }
  .addressUser img{
    border-radius: 4px;
  }
  .userPhoto{
    margin: 10px;
    border-radius: 4px;
  }
  .address_number{
    background: #ebebeb;
    font-size: 14px;
    text-align: center;
    padding: 8px;
  }

</style>
