<template>
  <div class="moments">
    <div class="back">
      <div @click="back">
        <img src="../../assets/返回.png"/>
        <span>朋友圈</span>
      </div>
    </div>
    <div class="momentsContent">
      <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" :noDataText="'--我也是有底线的--'" ref="my_scroller" >

        <ul>
          <li>
            <div>
              <img class="cover" src="../../../static/朋友圈封面.png">
            </div>
            <div class="myphoto">
              <span>{{this.$store.state.name}}</span>
              <img class="myphoto" src="../../../static/小猪佩奇.png" height="70" width="70">
            </div>

            <ul>
              <li class="momentsList" v-for="(item,index) in momentsList" :key="index">
                <div class="listContent">
                  <img :src='"../../../static/"+item.name+".png"' height="40" width="40">
                  <div class="text">
                    <p class="listName">{{item.name}}</p>
                    <p class="listMsg">{{item.message}}</p>
                    <div class="textBottom">
                      <p class="listTime"> 10分钟前</p>
                      <div class="dianzan">
                        <img src="../../../static/两点.png" height="15" width="30">
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      momentsList: [],
      overFlag: true,
      bottom: -1
    }
  },
  // created: function () {
  //   this.$http.get('api/momentsList')
  //     .then((data) => {
  //       this.momentsList = data.data.data
  //     }, (err) => {
  //       console.log(err)
  //     })
  // },
  mounted () {
    this.$http.get('/api/momentsList')
      .then((data) => {
        for (let i = 0; i < 5; i++) {
          this.momentsList.push(data.data.data[i])
        }
        this.bottom = 4
      })
  },
  methods: {
    back () {
      this.$router.back() // 返回上一级
    },
    refresh (done) {
      console.log('refresh')
    },
    infinite (done) {
      console.log('infinite')
      console.log('bottom:' + this.bottom)
      if (this.bottom >= 14) {
        setTimeout(() => {
          done(true)
        }, 500)
        return
      }
      setTimeout(() => {
        this.getIssues()
        done()
      }, 1000)
    },

    getIssues () {
      console.log('1')
      this.$http.get('/api/momentsList')
        .then((res) => {
          console.log(res.data.data)
          let start = this.bottom + 1
          // console.log(start)
          // console.log(this.bottom)
          for (let i = start; i < start + 5; i++) {
            console.log(i)
            this.momentsList.push(res.data.data[i])
            // this.momentsList[i] = data.data.data[i]
          }
          this.bottom = this.bottom + 5
        }, (err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.moments{
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
}
.back{
  background: #1e2b39;
  height: 50px;
  color: #fff;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 110;
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
.momentsContent{
  /* position: relative; */
  top: 50px;
  z-index: 9;
  overflow: hidden;
  background-color: #fff;
}
.scroller{
  /* position: relative; */
  padding: 0px 0px;
  top: 50px;
  bottom: 0;
  left: 0;
  right:0;
  overflow: hidden;
  z-index: 19;
}
.cover{
  width: 100%;
}
.myphoto{
  position: relative;
  top: -25px;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
}
.myphoto span{
  font-size: 17px;
  font-weight: 600;
  padding-right: 10px;
  color:white;
  position: relative;
  top: -10px;
}
.momentsList{
  position: relative;
  top: -50px;
  bottom: 0px;
}
.listContent{
  display: flex;
  padding: 10px;
  border-bottom: 0.9px solid #ebebeb;
}
.text{
  padding-left: 10px;
  width: 100%;
}
.listName{
  font-weight: 600;
  color: rgb(30, 60, 116);
  padding-bottom: 5px;
}
.textBottom{
  padding-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #91989e;
}
.dianzan{
  height: 17px;
  background-color:  #ebebeb;
  align-items: center;
}
</style>
