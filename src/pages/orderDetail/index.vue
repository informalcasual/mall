<template>
  <div class="box spread">
    <div class="page-title">订单详情</div>
    <div class="detail">
      <div class="top-bar">
        <div class="status">订单状态：<span>已支付</span></div>
        <div class="btns">
          <div class="btn pointer main-brown">取消订单</div>
          <div class="btn pointer grey-btn">取消订单</div>
        </div>
      </div>
      <div class="detail-order">
        <div class="order-number">订单编号：</div>
        <div class="order-item">
          <router-link class="link" to="/" target="_self">
            <div class="img" :style="{'background-img': `url()`}"></div>
          </router-link>
          <div class="oreder-detail">
            <div class="name">纯手工艺品无锡惠山泥人</div>
            <div class="type">龙凤款礼盒装</div>
          </div>
          <div class="nmuber">x1</div>
          <div class="total">¥28.9</div>
        </div>
      </div>
      <div class="user-info">
        <div class="user">
          <div class="info-tit">收货人信息</div>
          <div class="info-detail">姓名：王亮亮</div>
          <div class="info-detail">联系方式：18609920392</div>
          <div class="info-detail">收货地址：无锡市滨湖区金融一街XXXXXXX</div>
        </div>
        <div class="user">
          <div class="info-tit">付款信息：</div>
          <div class="info-detail">支付方式：微信支付</div>
          <div class="info-detail">付款时间：2020-02-12 12:23:23</div>
        </div>
        <div class="user">
          <div class="info-tit">物流信息：</div>
          <div class="info-detail"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
 .detail{
    padding: 64px 50px;
    background-color: #fff;
    .top-bar {
      display: flex;
      align-items: center;
      .status {
        width: 50%;
        flex-grow: 1;
        font-size:14px;
        color:rgba(102,102,102,1);
        line-height:20px;
        span{
          font-size:22px;
          font-weight:500;
          color:rgba(0,0,0,1);
          line-height:30px;
          padding-left: 4px;
        }
      }
      .btns{
        flex-grow: 0;
        .btn{
          width:124px;
          height:38px;
          border-radius:4px;
          font-size:12px;
          font-weight:500;
          text-align: center;
          line-height:38px;
          display: inline-block;
        }
        .grey-btn {
          color:rgba(102,102,102,1);
          background:rgba(238,238,238,1);
        }
        .btn + .btn{
          margin-left: 10px;
        }
      }
    }
 }
 .detail-order{
   margin-top: 40px;
   .order-number{
    font-size:14px;
    color:rgba(153,153,153,1);
    line-height:20px;
   }
   border-bottom: 1px solid #EDEDED;
   border-top: 1px solid #EDEDED;
   padding: 22px 26px 40px;
 }
 .order-item{
   display: flex;
   align-items: center;
   padding-top: 20px;
   .link{
     flex-grow: 0;
     width:80px;
     height:80px;
     border-radius:6px;
     overflow: hidden;
     display: block;
     .img{
       width: 100%;
       height: 100%;
       background-position: center;
       background-size: cover;
       background-color: #f7f7f7;
     }
   }
   .oreder-detail{
     padding-left: 21px;
     flex-grow: 3;
     width: 40%;
     .name{
      font-size:16px;
      color:rgba(0,0,0,1);
      line-height:22px;
      padding-bottom:9px; 
     }
     .type{
      font-size:14px;
      color:rgba(153,153,153,1);
      line-height:20px;
     }
   }
   .nmuber,.total{
     flex-grow: 1;
     width: 20%;
     font-size:14px;
     color:rgba(0,0,0,1);
     line-height:20px;
   }
 }
 .user-info{
   margin-top: 37px;
   .user{
     display: inline-block;
     width: 30.5%;
     padding-left: 26px;
     vertical-align: text-top;
   }
   .info-tit{
     font-size:14px;
     color:rgba(102,102,102,1);
     line-height:20px;
     padding-bottom: 17px;
   }
   .info-detail{
     padding-bottom: 10px;
     font-size:14px;
     color:rgba(0,0,0,1);
     line-height:20px;
   }
 }
</style>
