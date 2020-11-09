<template>
  <div class="ban">
    <div class="banner"  
     :style="[{'background-image': `url(${item.url})`},{'opacity': actIndex == index ? 1 : 0}]"
     v-for="(item, index) in banner"
     :key="index"
    ></div>
  </div>
</template>
<script>
export default {
  data: ()=>({
    banner: [],
    actIndex: 0,
    interval: null
  }),
  methods:{
    async getBanner() {
      this.banner = []
      let res = await this.$apiFactory.getpageModel().getBanner()
      if(res.status == 200) {
        this.banner = res.data
        this.setTime()
      }
    },
    setTime(){
      this.interval = setInterval(()=>{
        let index = this.actIndex
        if(++index == this.banner.length) {
          this.actIndex = 0
        } else {
          this.actIndex++
        }
      }, 3000)
    }

  },
  created(){
    this.getBanner()
  },
  beforeDestroy(){
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
.ban{
  width: 100%;
  height: 35.4vw;
  position: relative;
}
.banner{
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: 1s all ease-in-out;
}
</style>
