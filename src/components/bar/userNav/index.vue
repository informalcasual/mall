<template>
  <div class="userNav pointer">
    <div class="navBox">
      <div class="nav" @click.stop="toOrders()">{{ifEn ? 'ORDERS' : '订单管理'}}</div>
      <div class="nav" @click.stop="loginOut()">{{ifEn ? 'EXIT' : '退出'}}</div>
    </div>
 
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  methods:{
    toOrders(){
      window.open('/orders','_blank')
    },
    loginOut(){
      this.$store.dispatch('signout')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    })
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
  .navBox{
    padding: 10px 5px;    
    background-color: #fff;
    box-shadow: 1px 1px 4px 0px #e0e0e0;
  }
  .nav{
    padding: 10px 8px;
    text-align: right;
    &:hover{
      color: #702A2A;
    }
  }
}
</style>
