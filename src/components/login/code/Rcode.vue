<template>
  <div>
    <div id="qrcode"></div>
    <!-- 创建一个div，并设置id为qrcode -->
  </div>
</template>

<script>
import QRCode from 'qrcodejs2' // 引入qrcode
export default {
  data() {
    return {
      sceneId: 0,
      timer: null
    }
  },
  props: [
    'width'
  ],
  mounted() {
    this.getVX()
  },
  methods: {
    async getVX() {
      let res = await this.$apiFactory.getLoginApi().getVX()
      this.sceneId = res.data.sceneId
      let url = res.data.url
      this.qrcode(url)
    },
    // 生成二维码

    qrcode(code) {
      let width = 172
      if (this.width) {
        width = parseInt(this.width)
      }
      // eslint-disable-next-line no-unused-vars
      const qrcode = new QRCode('qrcode', {
        width: width,
        height: width,
        text: code, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
      this.scan(this.sceneId)
    },
    scan(id) {
      this.timer = setInterval(async () => {
        let res = await this.$apiFactory.getLoginApi().scanVX(id)
        if (res.status == 200) {
          this.clear()
          if (JSON.stringify(res.data) == '{}') {
            this.$emit('binding', id)
          } else {
            this.$store.dispatch('signin', res)
            this.$emit('binding', -1)
            this.$ga.event('button', 'click', 'signup-click', 2)
          }
        } else if (res.status == 406) {
          this.clear()
          this.getVX()
        }
      }, 1000)
    },
    clear() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  },
  destroyed() {
    this.clear()
  }
}
</script>
<style lang='scss'>
#qrcode {
  display: block;
  img {
    background-color: #fff;
    padding: 5px;
  }
}
</style>
