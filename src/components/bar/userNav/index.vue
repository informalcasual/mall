<template>
  <div class="userNav">
    <div class="nav" @click.stop="toOrders()">订单管理</div>
    <div class="nav" @click.stop="loginOut()">退出</div>
  </div>
</template>
<script>
export default {
  methods:{
    toOrders(){
      window.open('/orders','_blank')
    },
    loginOut(){
      this.$store.dispatch('signout')
    }
  }
}
</script>

<style lang="scss" scoped>
.userNav{
    position: absolute;
    padding-top: 41px;
    width: 100px;
    top: 22px;
    right: 0;
    &::before{
      position: absolute;
      content: ' ';
      border: 15px solid transparent;
      border-bottom-color: #fff;
      top: 15px;
      right: 0;
    }
  .nav{
    padding: 10px 8px;
    background-color: #fff;
    box-shadow: 1px 1px 4px 0px #e0e0e0;
  }
}
</style>
