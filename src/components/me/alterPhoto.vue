<template>
  <div class="alterPhoto">
    <div class="back">
      <div @click="back">
        <img src="../../assets/返回.png"/>
        <span>更改头像</span>
      </div>
    </div>
    <div class="alterContent">
      <div class="img_box">
          <div class="img_size" v-for="(item,index) in imgShow" :key="index">
            <img :src="item.src" alt="">
            <div class="remove_logo" @click="fileDel">×</div>
          </div>
          <div class="addImg" @click="fileClick" v-if="imgArr.length<1">
            <span>+</span>
            <p class="add" style="font-size: 20px">上传图片</p>
            <input id="input" type="file"  @change="getFile($event)"  accept="image/jpg,image/png,image/bmp,image/gif" style="display: none">
          </div>
      </div>
      <div class="save">
        <input class="saveButton" type="button" value="保存" @click="save" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgArr: [],
      imgShow: []
    }
  },
  methods: {
    back () {
      this.$router.back() // 返回上一级
    },
    fileClick () {
      document.getElementById('input').click()
    },
    getFile (event) {
      var file = event.target.files[0]
      let that = this
      var imgName = file.name
      console.log(imgName)
      var idx = imgName.lastIndexOf('.')
      if (idx !== -1) {
        var ext = imgName.substr(idx + 1).toUpperCase()
        ext = ext.toLowerCase()
        if (ext !== 'jpg' && ext !== 'png' && ext !== 'bmp' && ext !== 'gif') {

        } else {
          this.imgArr.push(file)
          console.log(this.imgArr)
        }
      } else {

      }
      // 展示上传的图片
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        file.src = this.result
        that.imgShow.push(file)
        console.log(that.imgShow)
      }
    },
    fileDel (index) {
      this.imgArr.splice(index, 1)
      this.imgShow.splice(index, 1)
    },
    save () {
      if (this.imgArr[0]) {
        console.log('修改成功')
        this.$store.commit('ALTER_PHOTO', this.imgArr[0])
        this.$router.push({path: '/myinfo'})
      }
    }
  // },
  // destroyed () {
  //   window.location.reload()
  }
}
</script>

<style scoped>
.alterPhoto{
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #f5f4f4;
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
.alterContent{
  position: fixed;
  top: 80px;
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
}
.img_box{
  width: 80%;
  /* padding-bottom: 60%; */
  display: flex;
  justify-content:center;
  align-items: center;
  background-color: rgb(255, 255, 255);
}
/* .img_size {
  width: 100%;
} */
.img_size img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 0px;
}
.remove_logo {
  color: #777777;
  position: relative;
  text-align: center;
  vertical-align: center;
  width: 40px;
  height: 40px;
  font-size: 28px;
  top: -220px;
  left: 200px;
  background: rgb(185, 185, 185);
  border-radius: 25px;
}
/* .remove_logo {
  color: #777777;
  position: absolute;
  text-align: center;
  vertical-align: center;
  width: 40px;
  height: 40px;
  font-size: 28px;
  top: 10px;
  right: 50px;
  background: rgb(185, 185, 185);
  border-radius: 25px;
} */
.addImg {
  margin: 20px;
  text-align: center;
  vertical-align: center;
  font-size: 120px;
  color: #777777;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 200px;
  height: 200px;
}

.save{
  width: 80%;
  padding-top: 30px;
}
.saveButton{
  height: 40px;
  width: 100%;
  color: white;
  font-size: 16px;
  background-color: #44be44;
  outline:none;
  border-style: none;
  border-radius: 4px;
 /* margin: 20px; */
}
</style>
