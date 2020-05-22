<template>
    <div class="corner_container">
      <img class="image" src="./img/qrCode.svg" alt="">
      <div class="qr-wrapper">
          <div class="qr-box">
            <div class="arrow">
                  <div class="inner"></div>
            </div>
            <img src="./img/bgCode.svg" alt="">
            <p>
              扫面拍信二维码 <br> 领取丰厚礼品
            </p>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'backTop',
  data: () => ({}),
  methods: {
  },
  watch: {
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
.corner_container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  position: relative;
  margin: 10px 0;
  cursor: pointer;
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.09);
  border:1px solid #d4d4d4;
  .image{
    position: absolute;
    width: 65%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .qr-wrapper{
    position: absolute;
    left: -10px;
    top: -10px;
    width: 10px;
    height: 50px;
  }
  .qr-box{
    display: none;
    position: absolute;
    width:130px;
    height:161px;
    left: -150px;
    top: -105px;
    background:#e51429;
    box-shadow:0px 2px 18px 0px rgba(151,151,151,0.5);
    border-radius:6px;
    border:9px solid #c41072;
    .arrow{
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 20px 0 20px 20px;
      border-color: transparent transparent transparent #c41072;
      position: absolute;
      right: -20px;
      bottom: 10px;
      z-index: 400;
      .inner{
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 0 10px 10px;
        border-color: transparent transparent transparent #e51429;
        position: absolute;
        right: 10px;
        bottom: -10px;
        z-index: 500;
      }
    }
    img{
      display: block;
      margin: 15px auto;
    }
    p{
      text-align: center;
      font-size: 10px;
      line-height: 14px;
      color: white;
    }
  }
  &:hover{
    .qr-box{
      display: block;
    }
  }
}
</style>
