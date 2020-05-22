<template>
  <div class='imgShow'>
    <div class='list'>
      <div class='img' v-for='(item, i) in list' :key="i">
        <a :href="item.url" target='_blank'>
          <div :style="{'backgroundImage': 'url(' + item.img + ')'}" />
        </a>
      </div>
    </div>
    <a :href="big.url" target='_blank'>
      <div class='main' :style="{'backgroundImage': 'url(' + big.img + ')'}" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'imgShow',
  data: () => ({
    list: [
      {
        img: require('./img/1.jpg'),
        url: 'https://v.paixin.com/mediapack/208/1'
      }, {
        img: require('./img/2.jpg'),
        url: 'http://www.paixin.com/mediapack/188/1'
      }, {
        img: require('./img/3.jpg'),
        url: 'http://www.paixin.com/mediapack/162/1'
      }, {
        img: require('./img/4.jpg'),
        url: 'http://www.paixin.com/mediapack/79/1'
      }, {
        img: require('./img/5.jpg'),
        url: 'http://www.paixin.com/mediapack/21/1'
      }, {
        img: require('./img/6.jpg'),
        url: 'http://www.paixin.com/mediapack/209/1'
      }
    ],
    big: {
      img: require('./img/54.png'),
      url: 'https://v.paixin.com/packagestore'
    }
  }),

  methods: {

  },

  created() {

  },

  mounted() {

  },

  watch: {

  },

  computed: {

  },

  components: {

  }
}

</script>

<style lang='scss' scoped>
.imgShow {
  height: 290px;
  width: 1050px;
  margin: 0 auto;
  .list {
    width: 58%;
    height: calc(100% + 2px);
    float: left;
    .img {
      width: 33.33%;
      height: 50%;
      padding-right: 2px;
      padding-bottom: 2px;
      box-sizing: border-box;
      float: left;
      background: rgba(0, 0, 0, 0.04);
      div {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
      }
    }
  }
  .main {
    width: 42%;
    height: 100%;
    float: left;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.04);
  }
}
</style>
