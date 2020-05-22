<template>
  <div class="float-a" :style="position" v-if="show">
    <img :src="item.url" alt="" class="ad-img" @click="to(item.path)">
    <div class="a-closed" :style="{'backgroundImage': `url(${require('./close-btn.svg')})`}" @click="closed"></div>
  </div>
</template>
<script>
export default {
  name: 'floatAd',
  data: () => ({
    show: true
  }),
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    position() {
      let style
      switch (this.item.style) {
        case 'left':
          style = {'letf': '0px', 'top': '25%'}
          break
        case 'right':
          style = {'right': '0px', 'top': '25%'}
          break
      }
      return style
    }
  },
  methods: {
    to(path) {
      window.open(path)
    },
    closed() {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.float-a{
  position: fixed;
  z-index: 500;
  img{
    box-shadow:0px 2px 15px 0px rgba(0,0,0,0.3);
    margin-bottom: 10px;
    cursor: pointer;
    width: 114px;
  }
  .a-closed{
    width: 25px;
    height: 25px;
    background-size: contain;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
