<template>
  <div>
    <div class="qrcode" :id="id"></div>
    <!-- 创建一个div，并设置id为qrcode -->
  </div>
</template>

<script>
import QRCode from 'qrcodejs2' // 引入qrcode
export default {
  data() {
    return {
    }
  },
  props: [
    'id',
    'orderId'
  ],
  mounted() {
    this.getVX()
  },
  methods: {
    async getVX() {
      let res
      if(this.id == 'ali'){
        res = await this.$apiFactory.getpayApi().aliBuy({id: this.orderId})
      } else {
        res = await this.$apiFactory.getpayApi().VXBuy({id: this.orderId})
      }
      let url = res.data.codeUrl
      this.qrcode(url)
    },
    // 生成二维码
    qrcode(code) {
      let width = 138
      if (this.width) {
        width = parseInt(this.width)
      }
      // eslint-disable-next-line no-unused-vars
      const qrcode = new QRCode(this.id, {
        width: width,
        height: width,
        text: code, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
      this.scan()
    },
    scan() {
      this.$emit('scan', true)
    },
  },

}
</script>
<style lang='scss'>
.qrcode {
  display: block; 
  padding: 11px;
  img {
    background-color: #fff;
   
  }
}
</style>
