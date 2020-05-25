<template>
  <div class="topBar">
    <div class="topBox box">
      <div class="logo">
        <span class="logo-tip pointer">
          <router-link to="/" target="_self">无锡文化贸易服务平台</router-link>
        </span>
      </div>
      <div class="itemNav">
        <div 
        class="item pointer"
        v-for="(item, index) in itemList"
        :key="index"
        @click.stop="toLiink(item.link)"
        >
        {{item.title}}
        </div>
        <div 
          class="shopCart pointer"
          @click.stop="toCart()"
        >
          <img :src="require('./imgs/cart.svg')" alt="">
        </div>
        <div class="userItem"
           v-if="loginUser.id" 
           @mouseenter.stop="showNav = true"
           @mouseleave.stop="showNav = false">
          <img class="avatar pointer" 
          
           :src="loginUser.avatar || require('./imgs/avatar.svg')" 
           alt="">
          <userNav v-show="showNav" />
        </div>
        <div class="userItem" v-else>        
           <div class="register" ><span @click.stop="register">注册</span>/<span  @click.stop="login">登录</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userNav from './userNav/index.vue'
import { mapState } from 'vuex'
export default {
  data: () => ({
    itemList: [{
     link: '/',
     title: '首页', 
    },{
     link: '/news',
     title: '最新动态', 
    },{
     link: '/culturalTrade/product',
     title: '文化贸易', 
    },{
     link: '/placeWindow',
     title: '地方之窗', 
    },{
     link: '/statistics',
     title: '统计查询', 
    }],
    showNav: false,
  }),
  methods: {
    toLiink(url){
       this.$router.push(url)
    },
    toCart(){
      window.open('/shopCart', '_blank')
    }
  },
  computed: {
    ...mapState({
      loginUser: state => state.user.loginUser,
      loginStatus: state => state.user.loginStatus,
    }),
  },
  components:{
    userNav
  }
}
</script>
<style lang="scss" scoped>
.topBar{
  width: 100%;
  height: 66px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
}
.topBox{
  height: 100%;
  display: flex;
  align-items: center;
}
.logo{
  flex-grow: 1;
  .logo-tip{
    font-size:20px;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:28px;
  }
}
.itemNav{
  flex-grow: 0;
  display: flex;
  align-items: center;
  .item{
    margin: 0 20px;
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    &:hover{
      color: #666;
    }
  }
  .shopCart{
    margin: 0 40px 0 23px;
  }
}
.register {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  height:34px;
  border-radius:19px;
  font-size:15px;
  color:#666;
  line-height: 34px;
  span{
    padding: 0 5px;
    &:hover{
      color:rgba(254,41,63,1);
    }
  }
  
}
.userItem{
  position: relative;
}
.avatar{
  width: 34px;
  border-radius: 50%;
}
</style>

