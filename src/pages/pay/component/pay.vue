<template>
  <div class="fiexd-pop" v-if="show">
    <div class="box-pop" v-if="!ifpay">
      <div class="pop-close">
        <img class="pointer"  @click.stop="close()" :src="require('@/assets/img/pop-close.svg')" width="23" alt="">
      </div>
      <div class="pop-title">打开微信或支付宝扫一扫付款</div>
      <div class="pop-info">
        <div class="api-box" :style="{'background-image': `url(${require('../img/apiBG.svg')})`}">
         <Qcode :id="'wx'" style="height:100%;" :orderId='orderid' @scan="scan"/>
         <p> <img :src="require('../img/wx.svg')" width="17" alt="">微信支付</p>
        </div>
        <div class="api-box" :style="{'background-image': `url(${require('../img/apiBG.svg')})`}">
           <Qcode :id="'ali'" style="height:100%;" :orderId="orderid" @scan="scan"/>
           <p><img :src="require('../img/ali.svg')" width="17" alt="">支付宝支付</p>
        </div>
      </div>
    </div>
    <div class="box-pop"  v-else>
      <div class="pop-close">
        <img class="pointer"  @click.stop="close()" :src="require('@/assets/img/pop-close.svg')" width="23" alt="">
      </div>
      <div class="box-pop1">
        <div class="pop-title1">
          <img :src="require('@/assets/img/success.svg')" width="32" alt="">
         支付成功
        </div>
        <div class="pop-info1">我们将在第一时间为您安排发货</div>
        <div class="pop-btn pointer" @click.stop="toDetail()">查看订单详情</div>
      </div>
     </div>

  </div>
</template>
<script>
import Qcode from "./qrcode";
export default {
  data:() => ({
    show: false,
    orderid: null,
    flag: false,
    timer: null,
    ifpay: false
  }),
  methods: {
    createdPay(){
      this.$bus.on('showPayCode', val => {
        this.show = val.show,
        this.orderid = val.orderId
      })
    },
    close(){
      if(this.ifpay && this.$route.name !== 'productDetail'){
        this.$router.push('/orders')
      }
      if(this.timer){
       clearInterval(this.timer)
      }
      this.flag = false
      this.show = false
    },
    toDetail(){
      this.show = false
      if(typeof(this.orderid ) === 'number') {
        this.$router.push(`/order_detail/${this.orderid}`)
      } else {
        this.$router.push(`/orders`)
      }
      
    },
    scan(Iflag){
      if(Iflag && !this.flag){
        this.flag = true
        this.timer = setInterval(async()=>{
          let res = await this.$apiFactory.getpayApi().checkBuy({ids: this.orderid})
          if(res.status > 0 && res.data[0].paidAt) {
            clearInterval(this.timer)
            this.ifpay = true
          }
        },1000)
      }
    }
  },
  components:{
    Qcode
  },
  created(){
    this.createdPay()
  },
  beforeDestory(){
    if(this.timer){
      clearInterval(this.timer)
    }
     
  }
}
</script>

<style lang="scss" scoped>
.pop-info{
  width: 380px;
  .api-box{
    display: inline-block;
    width:162px;
    height:162px;
    background-position: center;
    background-size: cover;
    p{
      padding-top: 27px;
      font-size:14px;
      color:rgba(0,0,0,1);
      line-height:20px;
      text-align: center;
      img{
        padding-right: 6px;
        vertical-align: middle;
      }
    }
  }
  .api-box + .api-box{
   margin-left: 50px;
  }
}
.box-pop1{
  width: 445px;
}


</style>
