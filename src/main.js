import Vue from 'vue'
import store from './store/index.js'
import App from './app.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import VueScroller from 'vue-scroller'
import VueResource from 'vue-resource'
import axios from 'axios'
import moment from 'moment'
import socket from './socket.js'
import Vant from 'vant'

Vue.use(VueRouter)
Vue.use(Vant)
Vue.use(VueScroller)
Vue.use(VueResource)
Vue.prototype.socket = socket
Vue.prototype.$axios = axios
axios.defaults.headers.common['token'] = store.state.token
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common['token'] = store.state.token
    }
    return config
  })
axios.interceptors.response.use(
  res => {
    console.log(res)
    if (res.headers.newtoken) {
      store.commit('SET_TOKEN', res.headers.newtoken)
      console.log('set new token success')
    }
    return res
  },
  error => {
    console.log(error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // store.commit('SET_TOKEN', '')
          // console.log(store.state.token)
          // if (store.state.token) {
          //   console.log(store.state.token)
          // }
          // axios.post('/apis/refreshToken', {chat_id: store.state.id})
          //   .then((res) => {
          //     console.log('data', res.data)
          //     if (res.data.status === 'sucess') {
          //       console.log(res.data.token)
          //       store.commit('SET_TOKEN', res.data.token)
          //       router.go(0)
          //     } else {
          //       console.log('token刷新无效，请重新登录')
          //       store.commit('SET_TOKEN', '')
          //       router.push({
          //         path: '/login'
          //       })
          //     }
          //   })

          // 返回 401 清除token信息并跳转到登录页面
          console.log('token无效，请重新登录')
          store.commit('SET_TOKEN', '')
          router.push({
            path: '/login'
          })
          alert('token无效，请重新登录')
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/login') {
    next()
  } else {
    if (store.state.token) {
      next()
    } else {
      console.log('请先登录')
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
