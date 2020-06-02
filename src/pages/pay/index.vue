<template>
  <div class="spread">
    <div class="min-box mb92">
      <div class="page-title">订单结算</div>
      <div class="pay-box">
        <selfaddress @addAddress="addAddress" :phone="phone" :address="address" :name="name" :ifHave="ifaddress"></selfaddress>
        <div class="pay-detail">
          <div class="head">
            <div class="title1">商品详情</div>
            <div class="title2">商品单价</div>
            <div class="title2">数量</div>
            <div class="title2">小计</div>
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
         <div class="product-num">共<span>{{totalCount}}</span>个商品</div>
         <div class="total">总价：<span>￥{{totalPrice.toFixed(2)}}</span></div>
         <div class="pay-btn pointer" @click.stop="BuyNow()">立即付款</div>
      </div>
     
    </div>
    <ADDaddress @getAddress="getAddress"/>
    <pay />
  </div>
</template>
<script>
import selfaddress from './component/address'
import ADDaddress from './component/add-dress'
import pay from './component/pay'
import { mapState } from 'vuex'
export default {
  data: ()=>({
    carts: [],
    name: '',
    phone: '',
    address: '',
    addressId: -1,
    ifaddress: false,
    totalCount: 0,
    totalPrice: 0,
    orderId: 0,
    flag: false,
    totalHeight: document.body.scrollHeight || document.documentElement.scrollHeight,
    windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
  }),
  methods: {
    // 获取商品信息
    async getinfo() {
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
    addAddress(){
      this.$bus.emit('showAddress', true)
    },
    getAddress(item){
      this.name = item.name
      this.phone = item.phone
      this.address = item.address
      this.ifaddress = true
      this.addressId = item.addressId
    },
    // 获取已有地址
    async originAddress() {
      let res = await this.$apiFactory.getaddressApi().getAddress()
      if(res.status == 200 && res.data.content.length >= 1) {
        this.ifaddress = true
         this.name = res.data.content[0].name
         this.phone = res.data.content[0].phone
         this.address = res.data.content[0].address
         this.addressId = res.data.content[0].id
      } 
    },
    // 下单
    async BuyNow(){
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
        this.orderId = res.data.id
        return this.$bus.emit('showPayCode', {
          show: true,
          orderId: this.orderId
        })
      }
    }
  },
  created() {
    this.originAddress()
    this.getinfo()
  },
  components: {
    selfaddress,
    ADDaddress,
    pay
  },
  computed: {
    ...mapState({
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
