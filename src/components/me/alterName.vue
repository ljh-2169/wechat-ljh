<template>
  <div class="alterName">
    <div class="back">
      <div @click="back">
        <img src="../../assets/返回.png"/>
        <span>更改名字</span>
      </div>
    </div>
    <div class="alterContent">
      <div class="main">
        <input class="input" type="text" :value=this.$store.state.name ref="sName" />
      </div>
      <div class="main" >
        <span class="tishi">好的名字可以让你的朋友更容易记住你。</span>
        <input class="saveButton" type="button" value="保存" @click="save" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
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
.alterName{
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
.alterContent{
  position: fixed;
  top: 80px;
  width: 100%;
}
.main{
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input{
  background: #ebebeb;
  padding-left: 10px;
  height: 30px;
  width: 100%;
  border-style: none;
  border-bottom: 2px solid #44be44;
  outline:none;
  font-size: 16px;
}
.tishi{
  font-size: 13px;
  color: #91989e;
}
.saveButton{
  height: 30px;
  width: 60px;
  color: white;
  font-size: 16px;
  background-color: #44be44;
  outline:none;
  border-style: none;
  border-radius: 4px;

}
</style>
