<template>
  <div class="product min-box">
    <div class="title-tip "><router-link to="/product" class="tip-link pointer" target="_blank">文化贸易</router-link>>文化产品</div>
    <div class="product-show">
      <div class="img"></div>
      <div class="select-buy">
        <div class="title">sd</div>
        <div class="service-tip">服务类别：<span></span></div>
        <div class="service-tip">所在区域：<span></span></div>
        <div class="service-tip">服务时间：<span></span></div>
        <div class="service-tip">详细地址：<span></span></div>
        <div class="btns">
          <div class="advisory pointer">
            <img :src="require('./img/advisory.svg')"  wisth="18" alt="">
          咨询客服</div>
          <div @click.stop="addCart()" class="addCart pointer">加入购物车</div>
        </div>
      </div>
    </div>
    <div class="product-info min-box">
      <div class="compony-info">
        <div class="title">sdf</div>
        <div class="phone">电话：0510-29383849</div>
        <div class="detail"><p>地址：</p><p class="address">江苏省无锡市宜兴市金融一街
         紫砂壶二厂</p>
         </div>
      </div>
      <div class="product-box">
        <div class="title">商品详情</div>
        <img src="" class="info" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    price: 289,
    num: 1,
    actIndex: 0,
    priceList: ['套餐一：龙凤款红礼盒','套餐一：龙凤款红礼盒','套餐一：龙凤款红礼盒','套餐一：龙凤款红礼盒']
  }),
  methods:{
    choseNum(num) {
      if(num > 0) {
        this.num++
      } else if(num > 1){
        this.num--
      }
    },
    addCart() {
        return this.$notify({
          title: '提示',
          message: '已加入购物车',
          type: 'succes'
        })
    },
    selectType(i){
      this.actIndex = i
    }
  }
}
</script>

<style lang="scss" scoped>
.title-tip{
  padding: 21px 16px;
  font-size:14px;
  color:rgba(102,102,102,1);
  line-height:20px;
  .tip-link{
    color:rgba(102,102,102,1);
    &:hover{
      color: #599cb5;
    }
  }
}
.product-show{
  padding: 40px 44px 66px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .img{
    width: 400px;
    height: 400px;
    flex-grow: 0;
    background-color: #eee;
    background-position: center;
    background-repeat: no-repeat;
  }
  .select-buy{
    padding-left: 45px;
    padding-right: 33px;
    width: 50%;
  }
}
.select-buy{
  flex-grow: 1;
  .title{
    font-size:26px;
    color:rgba(0,0,0,1);
    line-height:37px;
    margin-bottom: 25px;
  }
  .service-tip{
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height:20px;
    padding-bottom: 15px;
    span{
      padding-left: 6px;
      color: #000000;
    }
  }
  .btns{
    margin-top: 43px;
    .advisory,.addCart{
      width:208px;
      height:50px;
      border-radius:4px;
      font-size:14px;
      font-weight:500;
      text-align: center;
      color:rgba(255,255,255,1);
      line-height:50px;
      display: inline-block;
    }
    .advisory{
      background-color: #702A2A;
    }
    .addCart{
      margin-left: 18px;
      background-color: #F96925;
    }
  }
}
.product-info{
  margin-top: 16px;
  padding-bottom: 23px;
  display: flex;
  .compony-info{
    flex-grow: 0;
    width: 221px;
    padding: 42px 28px 0;
    background-color: #fff;
    .title{
      font-size:16px;
      font-weight:500;
      color:rgba(0,0,0,1);
      line-height:22px;
      padding-bottom: 17px;
    }
    .phone,.detail{
      font-size:14px;
      color:rgba(0,0,0,1);
      line-height:20px;
      padding-bottom: 12px;
      p{
        display: inline-block;
      }
      .address{
        vertical-align: top;
        width: calc(100% - 42px)
      }
    }
  }
  .product-box{
    width: 50%;
    flex-grow: 1;
    margin-left: 20px;
    padding: 36px 52px;
    background-color: #fff;
    .title{
      font-size:22px;
      color:rgba(0,0,0,1);
      line-height:30px;
    }
    .info{
      background-color: #eee;
      width: 100%;
    }
  }
}
</style>
