import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: window.sessionStorage.getItem('id'),
    name: window.sessionStorage.getItem('name'),
    imgurl: window.sessionStorage.getItem('imgurl'),
    // photo: window.sessionStorage.getItem('photo'),
    token: window.sessionStorage.getItem('token'),
    address: window.sessionStorage.getItem('address'),
    newMsg: window.sessionStorage.getItem('newMsg')
  },
  mutations: {
    SET_NEWMSG: (state, data) => {
      state.newMsg = data
      window.sessionStorage.setItem('newMsg', data)
    },
    SET_TOKEN: (state, data) => {
      state.token = data
      window.sessionStorage.setItem('token', data)
    },
    SET_ID: (state, data) => {
      state.id = data
      window.sessionStorage.setItem('id', data)
    },
    SET_NAME: (state, data) => {
      state.name = data
      window.sessionStorage.setItem('name', data)
    },
    SET_IMGURL: (state, data) => {
      state.imgurl = data
      window.sessionStorage.setItem('imgurl', data)
    },
    SET_ADDRESS: (state, data) => {
      state.address = data
      window.sessionStorage.setItem('address', data)
    },
    ALTER_NAME: (state, data) => {
      axios.post('/apis/alterName', {chat_id: state.id, newname: data})
        .then((res) => {
          console.log('status', res.data)
          if (res.data.status === 'sucess') {
            console.log('修改用户名成功')
          }
        })
      state.name = data
      window.sessionStorage.setItem('name', data)
    },
    ALTER_PHOTO: (state, data) => {
      let formData = new FormData()
      formData.append('file', data)
      formData.append('chat_id', state.id)
      formData.append('path', 'E:\\shixi\\Front-end\\test3\\static\\')
      axios.post('/apis/alterPhoto', formData, {headers: {'Content-type': 'multipart/form-data'}})
        .then((res) => {
          console.log('filePath', res.data.filePath)
          if (res.data.status === 'success') {
            console.log('修改头像成功')
            state.imgurl = res.data.filePath
            window.sessionStorage.setItem('imgurl', res.data.filePath)
            console.log('state.imgurl', state.imgurl)
          }
        })
    }
  }
})
