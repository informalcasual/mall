<template>
  <div class="float-bottom" :style="{ 'background': `transparent url(${require('./festival-bottom.svg')}) no-repeat center` }" v-if="show">
    <div class="float-container">
      <div class="float-box base-width">
        <div class="btn" @click="to(pic)">图库有惊喜</div>
        <div class="btn" @click="to(bucket)">知产有惊喜</div>
        <div class="qq" @click="QQ">联系客服有礼物</div>
      </div>
      <div class="bottom-closed" :style="{ 'backgroundImage': `url(${require('./close-btn.svg')})` }" @click="closed"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'floatBottom',
  data: () => ({
    show: true,
    pic: 'https://v.paixin.com/',
    bucket: 'https://z.paixin.com/'
  }),
  methods: {
    to(path) {
      window.open(path)
    },
    QQ() {
      window.open('https://q.url.cn/CD7a0H?_type=wpa&qidian=true', '_blank')
    },
    closed() {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.float-bottom{
  position: fixed;
  bottom: 0;
  z-index: 500;
  width: 100%;
  .float-container{
    position: relative;
    height: 143px;
    .float-box{
      margin: 0 auto;
      display: flex;
      box-sizing: border-box;
      justify-content: flex-end;
      align-items: center;
      padding: 70px 105px 0;
      .btn{
        width:120px;
        height:43px;
        text-align: center;
        line-height: 43px;
        background:rgba(221,13,49,1);
        color: white;
        border-radius:22px;
        border:2px solid rgba(255,255,255,1);
        margin: 0 6px;
        font-size: 14px;
        cursor: pointer;
      }
      .qq{
        width:120px;
        height:43px;
        text-align: center;
        line-height: 43px;
        background:rgba(255,255,255,1);
        border-radius:22px;
        color: rgba(221,13,49,1);
        margin: 0 6px;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .bottom-closed{
      width: 25px;
      height: 25px;
      background-size: cover;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
}
</style>
