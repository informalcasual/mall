<template>
  <div>
    <transition name="fade-in-right">
      <div class="contact" v-show="isShow">
        <corner/>

        <cart/>

        <qr-code/>

        <backTop/>
      </div>
    </transition>
  </div>
</template>
<script>
import corner from './corner.vue'
import cart from './cornerCart.vue'
import qrCode from './qrCode.vue'
import backTop from '@/components/BackTop/index.vue'
export default {
  data: () => ({
    isShow: false
  }),
  mounted() {
    window.onscroll = () => {
      this.isShow = window.scrollY > 700
    }
  },
  components: {
    corner,
    backTop,
    qrCode,
    cart
  }
}
</script>
<style lang="scss" scoped>
.contact{
  position: fixed;
  top: 30%;
  right: 15px;
  z-index: 650;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fade-in-right-enter-active,
.fade-in-right-leave-active {
  opacity: 1;
  transform: translateX(0) cubic-bezier(.23, 1, .32, 1);
   transition: .5s;
}

.fade-in-right-enter,
.fade-in-right-leave-active {
  opacity: 0;
  transform: translateX(100px);
}
</style>
