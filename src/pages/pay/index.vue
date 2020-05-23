<template>
  <div class="spread">
    <div class="min-box">
      <div class="page-title">订单结算</div>
      <div class="pay-box">
        <selfaddress @addAddress="addAddress" :phone="phone" address="address" :name="name" :ifHave="ifaddress"></selfaddress>
        <div class="pay-detail">
          <div class="head">
            <div class="title1">商品详情</div>
            <div class="title2">商品单价</div>
            <div class="title2">数量</div>
            <div class="title2">小计</div>
          </div>
          <div class="product" v-for="(item, index) in carts" :key="index">
            <div class="detail">
              <router-link to="/" target="_blank" 
              class="pro-img"
              :style="{'background-color': `url()`}"
              ></router-link>
              <div class="pro-info">
                <div class="name">纯手工艺品无锡惠山泥人</div>
                <div class="type">龙凤款礼盒装</div>
              </div>
            </div>
            <div class="price">￥1255</div>
            <div class="num">
              x1
            </div>
            <div class="total">￥129</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-line" :style="{'bottom':  windowHeight - scroll > 240 ? '240px' : '0px'}">
      <div class="min-box">
         <div class="product-num">共<span>4</span>个商品</div>
         <div class="total">总价：<span>￥1255</span></div>
         <div class="pay-btn">立即付款</div>
      </div>
     
    </div>
    <ADDaddress @getAddress="getAddress"/>
  </div>
</template>
<script>
import selfaddress from './component/address'
import ADDaddress from './component/add-dress'
import { mapState } from 'vuex'
export default {
  data: ()=>({
    carts: [{
      name: 1,
    }],
    name: '',
    phone: '',
    address: '',
    ifaddress: false,
    windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
  }),
  methods: {
    addAddress(){
      this.$bus.emit('showAddress', true)
    },
    getAddress(item){
      this.name = item.name
      this.phone = item.phone
      this.address = item.address
      this.ifaddress = true
    }
  },
  components: {
    selfaddress,
    ADDaddress
  },
  computed: {
    ...mapState({
      scroll: state => state.scrolltop.scroll_top_score
    }),
  },
}
</script>
<style lang="scss" scoped>
.pay-box{
   background-color: #fff;
}
.pay-detail{
  padding: 31px 69px 73px;
  border-top: 1px solid #EDEDED;
  .head{
    background-color: #fff;
    display: flex;
    align-items: center;
    padding-bottom: 25px;
    .title1, .title2{
      text-align: left;
      padding-right: 14px;
      font-size:14px;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .title1{
     flex-grow: 0;
     width: 379px;
     padding-right: 10px;
    }
    .title2{
      width: 100px;
      flex-grow: 1;
    }
  }
  .product{
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    .detail{
      flex-grow: 0;
      width: 379px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      .pro-img{
        flex-grow: 0;
        width: 80px;
        height: 80px;
        background-color: #eee; 
        border-radius:6px;
        display: block;
      }
      .pro-info{
        margin-left: 18px;
        flex-grow: 1;
        width: 20px;
        overflow: hidden;
        .name{
          font-size:16px;
          color:rgba(0,0,0,1);
          line-height:22px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .type{
          font-size:14px;
          color:rgba(153,153,153,1);
          line-height:20px;
          padding-top: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
    .price, .num, .total{
      width: 100px;
      flex-grow: 1;
      font-size:14px;
      color:rgba(0,0,0,1);
      line-height:20px;
      padding-right: 14px;
      padding-bottom: 35px;
    }
    .num{
      font-size:16px;
      color:rgba(0,0,0,1);
      line-height: 26px;
    }
  }
}
.pay-line{
  width: 100%;
  height:80px;
  position: fixed;
  left: 0;
  background:rgba(255,255,255,1);
  .min-box{
    height: 100%;;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .product-num{
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    span{
      font-weight: 500;
      padding: 0 3px;
    }
    margin-right: 61px;
  }
  .total{
    height: 33px;
    span{
      font-size:24px;
      font-weight:600;
      color:rgba(230,7,7,1);
      line-height:33px;
      vertical-align: top;
    }
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:33px;
  }
  .pay-btn{
    width:208px;
    height:50px;
    background:rgba(112,42,42,1);
    text-align: center;
    font-size:14px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    border-radius: 4px;
    margin-left: 41px;
  }
}
</style>
