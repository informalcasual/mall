<template>
  <div class="spread">
    <div class="min-box mb92">
      <div class="page-title">{{ifEn ? 'Order Settlement' : '订单结算'}}</div>
      <div class="pay-box">
        <selfaddress @originAddress="originAddress"  @selectAddress="selectAddress" :addressList="addressList" :ifHave="ifaddress"></selfaddress>
        <div class="pay-detail">
          <div class="head">
            <div class="title1">{{ifEn ? 'Commodity Details' : '商品详情'}}</div>
            <div class="title2">{{ifEn ? 'Item Pricing' : '商品单价'}}</div>
            <div class="title2">{{ifEn ? 'Number' : '数量'}}</div>
            <div class="title2">{{ifEn ? 'Subtotal' : '小计'}}</div>
          </div>
          <div class="product" v-for="(item, index) in carts" :key="index">
            <div class="detail">
              <div
              class="pro-img"
              :style="{'background-image': `url(${item.productSku.pic})`}"
              ></div>
              <div class="pro-info">
                <div class="name">{{item.name}}</div>
                <div class="type">{{item.specs}}</div>
              </div>
            </div>
            <div class="price">￥{{item.productSku.price}}</div>
            <div class="num">
              x{{item.count}}
            </div>
            <div class="total">￥{{(item.count*item.productSku.price).toFixed(2)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-line" :class="{'fixed': totalHeight - scroll < 240}">
      <div class="min-box"> 
         <div class="state">
           <input id="take-sure" type="checkbox" v-model="ifsure"><label class="pointer" for="take-sure"></label>
           {{ifEn ? 'I read and agree' : '我已阅读并同意'}}<span class="pointer" @click.stop="openState()">《{{ifEn ? 'Cultural tin cloud —— Platform Disclaimer' : '文化锡云---无锡文化贸易服务平台免责声明'}}》</span>
         </div>
         <div class="product-num">{{ifEn ? 'total' : '共'}}<span>{{totalCount}}</span>{{ifEn ? '' : '个商品'}}</div>
         <div class="total">{{ifEn ? 'price' : '总价'}}：<span>￥{{totalPrice.toFixed(2)}}</span></div>
         <div class="pay-btn pointer" @click.stop="BuyNow()">{{ifEn ? 'Buy Now' : '立即付款'}}</div>
      </div>
    </div>
    <pay />
  </div>
</template>
<script>
import selfaddress from './component/address'
import pay from './component/pay'
import { mapState } from 'vuex'
export default {
  data: ()=>({
    carts: [],
    addressList: [],
    addressId: -1,
    ifaddress: false,
    totalCount: 0,
    totalPrice: 0,
    orderId: null,
    flag: false,
    ifsure: false,
    totalHeight: document.body.scrollHeight || document.documentElement.scrollHeight,
    windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
  }),
  methods: {
    // 获取商品信息
    async getinfo() {
      this.carts = []
      let res = null
      let pcn = this.$route.query.pcn.split(',') //[productid, productType ,productNumber]
      let cartsIds = pcn[0] == -1 ? this.$route.query.carts.split(',') : null //[cartsIds]
      if(pcn[0] == -1){
        res = await this.$apiFactory.getOrderApi().previewCart({cartIds: cartsIds})
        if(res.status == 200) {
          this.carts = res.data
        }
      } else {
        res = await this.$apiFactory.getTrademarkApi().ProductDetail(pcn[0])
        if(res.status == 200) {
          let data = {
            productSku:{
            }
          }
          data.name = res.data.product.name
          data.id = res.data.productSku[pcn[1]].id
          data.specs = res.data.productSku[pcn[1]].specs
          data.productSku.price = res.data.productSku[pcn[1]].price
          data.count = pcn[2]
          data.productSku.pic = res.data.productSku[pcn[1]].pic
          this.carts.push(data)
        }
      }
      this.totalCount = 0
      this.totalPrice = 0
      this.carts.forEach(ele => {
        this.totalCount += parseInt(ele.count) 
        this.totalPrice += parseFloat((ele.productSku.price*ele.count))
      });
    },
    selectAddress(id){
      this.addressId = id
      this.ifaddress = true
    },
    // 获取已有地址
    async originAddress() {
      let res = await this.$apiFactory.getaddressApi().getAddress()
      this.addressList = []
      if(res.status == 200 && res.data.content.length >= 1) {
        this.ifaddress = true
        let _first = {}
        res.data.content.forEach(ele => {
          if(ele.default){
            _first = ele
          } else {
            this.addressList.push(ele)
          }
        })
        if(_first.id){
          this.addressList.splice(0, 0, _first)
        }
        this.addressId = _first.id ? _first.id : res.data.content[0].id
      } 
    },
    // 下单
    async BuyNow(){
      if(!this.ifsure) {
        return this.$notify({
          title: '提示',
          message: '您还没有勾选同意本平台的免责声明',
          type: 'succes'
        })
      }
      if(this.addressId <= 0) {
        return this.$notify({
          title: '提示',
          message: '请选择收货地址',
          type: 'warn'
        })
      }
      if(this.flag && this.orderId){
        return this.$bus.emit('showPayCode', {
          show: true,
          orderId: this.orderId
        })
      }
      let res = null
      let pcn = this.$route.query.pcn.split(',')
      if(pcn[0] == -1) {
        let cartIds = []
        this.carts.forEach(ele => {
          cartIds.push(ele.id)
        })
        res = await this.$apiFactory.getpayApi().payCart({
          cartIds: cartIds,
          addressId: this.addressId
        })
      } else {
        let data = {
          count: this.totalCount,
          productSkuId: this.carts[0].id,
          addressId: this.addressId
        }
        res = await this.$apiFactory.getpayApi().payOrder(data)
      }
      if(res.status == 200) {
        this.flag = true
        this.orderId = []
        if(pcn[0] == -1){
          res.data.forEach(ele => {
            this.orderId.push(ele.id)
          })
        } else {
          this.orderId.push(res.data.id)
        }
        
        return this.$bus.emit('showPayCode', {
          show: true,
          orderId: this.orderId
        })
      }
    },
    openState() {
      this.$bus.emit('statementShow', true)
    }
  },
  created() {
    this.originAddress()
    this.getinfo()
  },
  components: {
    selfaddress,
    pay
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn,
      scroll: state => state.scrolltop.scroll_top_score
    }),
  },
}
</script>
<style lang="scss" scoped>
.spread{
  position: relative;
}
.mb92{
  margin-bottom: 92px;
}
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
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
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
.fixed{
  position: fixed!important;
}
.pay-line{
  width: 100%;
  height:80px;
  position: absolute;
  bottom: 0;
  left: 0;
  background:rgba(255,255,255,1);
  .min-box{
    height: 100%;;
    display: flex;
    align-items: center;
    // justify-content: flex-end;
  }
  .state{
    flex-grow: 1;
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    input[type="checkbox"]{
      display: none;
    }
    
    #take-sure +label{
      display: inline-block;
      width:16px;
      height:16px;
      background:rgba(255,255,255,1);
      border-radius:3px;
      border:1px solid rgba(74,74,74,1);
      vertical-align: middle;
      margin-right: 9px;
      margin-bottom: 1px;
      position: relative;
    }
    #take-sure:checked +label::before{
      content: ' ';
      position: absolute;
      left: 2px;
      top: 3px;
      display: block;
      width: 12px;
      height: 12px;
      background-image: url('./img/sure.svg');
      background-position: center;
      background-size: 12px;
      background-repeat: no-repeat;
    }
    span{
      color: #702A2A;
    }
  }
  .product-num{
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    flex-grow: 0;
    span{
      font-weight: 500;
      padding: 0 3px;
    }
    margin-right: 61px;
  }
  .total{
    height: 33px;
    flex-grow: 0;
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
    flex-grow: 0;
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
