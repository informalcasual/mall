<template>
  <div class="order box spread">
    <div class="page-title">订单管理</div>
    <div class="order-box">
      <div class="order-top">
        <div class="selection pointer">
          <div class="tit" :class="{'act-tit': index === 0}">全部订单</div>
          <div class="tit" :class="{'act-tit': index === 1}">已支付</div>
          <div class="tit" :class="{'act-tit': index === 2}">待收货</div>
          <div class="tit" :class="{'act-tit': index === 3}">已完成</div>
        </div>
        <div class="search">
          <input type="text" @keyup.enter="importkey()" v-model="key" placeholder="请输入您要搜索的商品">
          <img :src="require('@/assets/img/search.svg')" 
          class="search-btn pointer" 
          width="14" 
          @click.stop="importkey()"
          alt="">
        </div>
      </div>
      <div class="order-cont">
        <div class="head cont">
          <div class="detail">商品详情</div>
          <div class="address">收货人信息</div>
          <div class="total">金额</div>
          <div class="subtotal">小计</div>
        </div>
        <div class="order-item">
          <div class="order-num"><span>订单编号：</span></div>
          <div class="cont">
            <div class="detail">
               <router-link class="link" to="/" target="_self">
                <div class="img" :style="{'background-img': `url()`}">
                  
                </div>
               </router-link>
               <div class="pro-info">
                 <p class="title">纯手工艺品无锡惠山泥人</p>
                 <p class="type">龙凤款礼盒装</p>
               </div>
            </div>
            <div class="address">
              <p>王亮亮 <span class="phone">18832983920</span></p>
              <p>无锡市滨湖区金融一街xxxxxx</p>
            </div>
            <div class="total">
              <p>应付金额：¥28.9</p>
              <p>实付金额：¥28.9</p>
            </div>
            <div class="subtotal">
              <div class="status">已支付</div>
              <div class="btns">
                <div class="operation pointer">
                  <span></span>
                </div>
                <div class="more pointer">查看详情</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagintaion">
      <pagintaion  
        :page="1"
        :total="2"
        @paginationToPage="toPage"
        style="float: right"
        />
    </div>
  </div>
</template>
<script>
import pagintaion from '@/components/pagination/index'
export default {
  data: () => ({
    index: 0,
    key: '',
  }),
  methods: {
    toPage(){

    }
  },
  components: {
    pagintaion
  }
}
</script>
<style lang="scss" scoped>
.order-box{
  padding: 39px 50px 30px;
  background-color: #fff;
  .order-top{
    position: relative;
    .selection{
      display: flex;
      align-items: center;
      border-radius: 6px;
      width: 528px;
      overflow: hidden;
      border:1px solid rgba(112,42,42,1);
      .tit{
        flex-grow: 1;
        width: 25%;
        text-align: center;
        font-size:14px;
        font-weight:500;
        color:#702A2A;
        line-height:20px;
        line-height: 44px;
      }
      .act-tit {
        background-color:rgba(112,42,42,1);
        color: #fff;
      }
      .tit + .tit{
        border-left: 1px solid #702A2A;
      }
    }
    .search{
      width:319px;
      height:44px;
      position: absolute;
      right: 0;
      top: 0;
      background:rgba(255,255,255,1);
      border-radius:6px;
      border:1px solid rgba(208,208,208,1);
      overflow: hidden;
      float: right;
      input{
        font-size:14px;
        color:rgba(153,153,153,1);
        line-height:20px;
        padding: 12px 60px 12px 15px;
        width: calc(100% - 75px);
      }
      .search-btn{
        position: absolute;
        top: 0;
        right: 21px;
        padding: 15px 0;
      }
    }
  }
}
.order-cont{
  margin-top: 37px;
  .cont{
    border-bottom: 1px solid #EDEDED; 
    .detail{
      padding-right: 10px;
      width: calc(38% - 10px);
      display: inline-block;
      vertical-align: top;
    }
    .address{
      width: calc(26% - 10px);
      padding-right: 10px;
      display: inline-block;
      vertical-align: top;
    }
    .total{
      width: calc(14% - 10px);
      padding-right: 10px;
      display: inline-block;
      vertical-align: top;
    }
    .subtotal{
      width: calc(20% - 10px);
      padding-right: 10px;
      display: inline-block;
      vertical-align: top;
    }
  }
  .head{
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height:20px;
    padding: 15px 10px 15px 26px;
  }
  .order-item{
    padding: 25px 0 0;
    .order-num{
      font-size:14px;
      color:rgba(153,153,153,1);
      line-height:20px;
      padding-bottom: 20px;
      padding-left: 26px;
      span{
        padding-left: 32px;
      }
    }
  }
}
.order-item{
  .cont {
    padding: 0 10px 24px 26px;
    .detail{
      display: inline-flex;
      align-items: center;
      .link{
        margin-right: 25px;
        flex-grow: 0;
      }
      .img{
        width: 80px;
        height: 80px;
        background-position: center;
        background-size: cover;
        background-color: #f7f7f7;
      }
      .pro-info{
        flex-grow: 1;
        overflow: hidden;
        .title{
          font-size:16px;
          color:rgba(0,0,0,1);
          line-height:22px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-bottom: 9px;
        }
        .type{
          font-size:14px;
          color:rgba(153,153,153,1);
          line-height:20px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .address, .total{
      font-size:14px;
      color:rgba(0,0,0,1);
      line-height:20px;
      p+p{
        padding-top: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .phone{
        padding-left: 20px;
      }
    }
    .status{
      font-size:14px;
      font-weight:600;
      color:rgba(0,0,0,1);
      line-height:20px;
      padding: 0 0 14px 23px;
    }
    .btns{
      div{
        display: inline-block;
        width:88px;
        height:38px;
        font-size:12px;
        font-weight:500;
        vertical-align: middle;
        line-height:38px;
        text-align: center;
        border-radius:4px;
      }
      .operation{
        color: #fff;
        background-color: #702A2A;
      }
      .more{
        color:rgba(102,102,102,1);
        margin-left: 12px;
        background:rgba(238,238,238,1);
      }
    }
  }
 
}
.pagintaion{
  padding: 23px 64px;
}
</style>
