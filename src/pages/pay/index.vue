<template>
  <div class="spread">
    <div class="min-box">
      <div class="title">订单结算</div>
      <div class="pay-box">
        <address />
        <div class="pay-detail">
          <div class="head">
            <div class="title1">商品详情</div>
            <div class="title2">商品单价</div>
            <div class="title2">数量</div>
            <div class="title2">小计</div>
          </div>
          <div class="product" v-for="(item, index) in carts" :key="index">
            <div class="detail">
              <div class="select pointer" @click.stop="select(index)" :class="{'selected': selectedList.includes(index)}"></div>
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
  </div>
</template>
<script>
import address from './component/address'
export default {
  data: ()=>({
    carts: [{
      name: 1
    }]
  }),
  components: {
    address
  }
}
</script>
<style lang="scss" scoped>
.pay-box{
   background-color: #fff;
}
.pay-detail{
  padding-bottom: 104px;
  .head{
    background-color: #fff;
    padding: 25px 25px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EDEDED;
    .title1, .title2{
      text-align: left;
      padding-left: 14px;
      font-size:14px;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .title1{
     flex-grow: 0;
     width: 345px;
     padding-left: 44px;
     padding-right: 10px;
    }
    .title2{
      width: 20%;
      flex-grow: 1;
    }
  }
  .product{
    background-color: #fff;
    border-bottom: 1px solid #EDEDED; 
    padding: 24px 25px;
    display: flex;
    align-items: center;
    .detail{
      flex-grow: 0;
      width: 379px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      .select{
        flex-grow: 0;
        width:19px;
        height:19px;
        border-radius:50%;
        border:1px solid rgba(151,151,151,1);
      }
      .selected{
        background-image: url('./img/right.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 12px;
        background-color: #702A2A;
        border-color: #702A2A;
      }
      .pro-img{
        flex-grow: 0;
        width: 80px;
        height: 80px;
        background-color: #eee; 
        border-radius:6px;
        display: block;
        margin-left: 24px;
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
      width: 20%;
      flex-grow: 1;
      font-size:14px;
      color:rgba(0,0,0,1);
      line-height:20px;
    }
    .num{
      flex-grow: 0;
      height: 26px;
      display: flex;
      align-items: center;
      img{
        height: 100%;
        cursor: pointer;
      }
      .number{
        width: 32px;
        display: inline-block;
        font-size:16px;
        color:rgba(0,0,0,1);
        line-height: 26px;
        text-align: center;
      }
    }
  }
}
</style>
