<template>
    <div class="corner-cart" @click="toCart()">
      <img src="./img/cart.svg" alt="">
    </div>
</template>
<script>
export default {
  name: 'backTop',
  data() {
    return {

    }
  },
  methods: {
    toCart() {
      if (!this.loginStatus) {
        window.location.href = 'https://v.paixin.com/login'
        return
      }

      window.open('https://www.paixin.com/user/service', '_block')
    }
  },
  watch: {

  },
  computed: {
    loginStatus() {
      return this.$store.state.user.loginStatus
    }
  }
}
</script>
<style lang="scss" scoped>
.corner-cart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  position: relative;
  margin: 10px 0;
  cursor: pointer;
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.09);
  border:1px solid #d4d4d4;
  img {
    position: absolute;
    width: 60%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -56%);
  }
}
</style>
