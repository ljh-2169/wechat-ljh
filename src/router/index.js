import Vue from 'vue'
import VueRouter from 'vue-router'
import Find from '../components/find/find.vue'
import Moments from '../components/find/moments.vue'
import Me from '../components/me/me.vue'
import Myinfo from '../components/me/myinfo.vue'
import AlterName from '../components/me/alterName.vue'
import AlterPhoto from '../components/me/alterPhoto.vue'
import Address from '../components/address/address.vue'
import AddressDetail from '../components/address/address-detail.vue'
import Chat from '../components/chat/chat.vue'
import Chatroom from '../components/chat/chatroom.vue'
import Login from '../components/login.vue'

import Search from '../components/search.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/moments',
      component: Moments
    },
    {
      path: '/chat',
      component: Chat
    },
    {
      path: '/chatroom',
      component: Chatroom
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/addressDetail',
      component: AddressDetail
    },
    {
      path: '/me',
      component: Me
    },
    {
      path: '/myinfo',
      component: Myinfo
    },
    {
      path: '/alterName',
      component: AlterName
    },
    {
      path: '/alterPhoto',
      component: AlterPhoto
    },
    {
      path: '/address',
      component: Address,
      children: [{
        path: ': id', // 传入不同的id,就可以跳转到不同的子路由
        component: AddressDetail
      }]
    }
  ],
  mode: 'history'
})
