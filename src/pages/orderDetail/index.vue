<template>
  <div class="box spread">
    <div class="page-title">订单详情</div>
    <div class="detail">
      <div class="top-bar">
        <div class="status">订单状态：<span>{{content.status|status}}</span></div>
        <div class="btns">
          <div class="btn pointer main-brown" v-if="content.status !== 5 && content.status !== 7" @click.stop="openrefund(content.status, true)">
            {{content.status|btnName}}
          </div>
          <div class="btn pointer grey-btn" v-if="content.status == 1" @click.stop="cancleOrder()">取消订单</div>
          <!-- <div class="btn pointer grey-btn" @click.stop="showsale()" v-if="content.status == 5 || content.status == 7 || content.status == 4">售后服务</div> -->
        </div>
      </div>
      <div class="detail-order">
        <div class="order-number">订单编号：{{content.sn}}</div>
        <div class="order-item" v-for="(item, index) in content.orderItemList" :key="index">
          <router-link class="link" :to="'/product/'+item.productId"  target="_blank">
            <div class="img" :style="{'background-image': `url(${item.cover})`}"></div>
          </router-link>
          <div class="oreder-detail">
            <div class="name">{{item.name}}</div>
            <div class="type">{{item.specs}}</div>
          </div>
          <div class="nmuber">x{{item.count}}</div>
          <div class="total">¥{{(item.count*item.price).toFixed(2)}}</div>
          <div class="refund-btn pointer" v-if="item.status !== 1 && item.status !== 3 && item.status !== 5 && item.status !== 7" @click.stop="openrefund(item.status, false);itemId = item.id">{{item.status|itemBtn}}</div>
        </div>
      </div>
      <div class="user-info">
        <div class="user">
          <div class="info-tit">收货人信息</div>
          <div class="info-detail">姓名：{{content.receiver}}</div>
          <div class="info-detail">联系方式：{{content.phone}}</div>
          <div class="info-detail">收货地址：{{content.address}}</div>
        </div>
        <div class="user" v-if="paidAt">
          <div class="info-tit">付款信息：</div>
          <div class="info-detail">支付方式：{{content.outTradeNo|TradeNo}}支付</div>
          <div class="info-detail">付款时间：{{paidAt}}</div>
        </div>
      </div>
    </div>
    <refund @refund="refund"/>
    <afterSale v-if="after_sale" :phone="content.shop.phone" @showSale="showsale()"/>
    <pay />
  </div>
</template>
<script>
import afterSale from '@/components/successTip/afterSale'
import refund from './components/refund'
import pay from '@/pages/pay/component/pay'
export default {
  data: ()=> ({
    orderId: 0,
    content: {},
    paidAt: null,
    allrefund: false,
    itemId: 0,
    after_sale: false,
  }),
  methods: {
    async getInfo(){
      this.orderId = this.$route.params.orederId
      let res = await this.$apiFactory.getOrdersApi().orderDetail(this.orderId)
      if(res.status == 200) {
        this.content = res.data
        this.paidAt = res.data.paidAt? this.$utilHelper.specificTime(this.$utilHelper.safariTime(res.data.paidAt)) : null
     }
    },
    // 退款
    openrefund(status,bol){
      this.allrefund = bol
      if(status == 6 && !bol){
        return this.cancleRefund()
      } else if(status == 2 || (status == 4 && !bol)) {
        this.$bus.emit('showrefund', true)
      } else if(status == 4){
        this.sureOrder()
      } else if (status == 3) {
        this.cancleOrder()
      } else if(status == 5){
        this.after_sale = true
      } else if (status == 1 && bol) {
        this.payOrder()
      }
      
    },
    // 取消退款 
    async cancleRefund() {
      let id = this.orderItemId
      let res = await this.$apiFactory.getOrdersApi().getRefunds()
      if(res.status == 200) {
        for(let ele of res.data.content) {
          if(ele.orderItemList[0].orderId == this.$route.params.orederId && ele.orderItemList[0].id == id) {
            let url = await this.$apiFactory.getOrdersApi().unrefundOrder(ele.id)
            if(url.status == 200) {
              this.getInfo()
            } 
             break
          }
        }
      }
      
    },
    // t退款
    async refund(data){
      if(!this.allrefund) {
        data.orderItemId = this.itemId
        let res = await this.$apiFactory.getOrdersApi().refundOrder(data)
        if(res.status == 409){
          return this.$store.dispatch('toast', {
            type: 'warn',
            time: 1500,
            msg: '已超过退款时间，无法退款，请联系商家'
          })
        }
        
      } else {
        this.content.orderItemList.forEach(async element => {
          data.orderItemId = element.itemId
          let res = await this.$apiFactory.getOrdersApi().refundOrder(data)
        });
        if(res.status == 409){
          return this.$store.dispatch('toast', {
            type: 'warn',
            time: 1500,
            msg: '已超过退款时间，无法退款，请联系商家'
          })
        }
      }
    
      this.getInfo()
    },
    // 确认收货
    async sureOrder(){
      let res = await this.$apiFactory.getOrdersApi().sureOrder(this.orderId)
      if(res.status == 200){
        this.getInfo()
      }
    },
    // 删除订单
    async cancleOrder(){
      let res = await this.$apiFactory.getOrdersApi().cancleOrder(this.orderId)
      if(res.status == 200){
        this.$router.push('/orders')
      }
    },
    // 支付订单
    payOrder(){
      return this.$bus.emit('showPayCode', {
          show: true,
          orderId: [parseInt(this.orderId)]
      })
    },
    showsale() {
      this.after_sale = !this.after_sale
    }
  },
  filters: {
    TradeNo(n){
      if(n.includes('WP')){
        return '微信'
      } else {
        return '支付宝'
      }
    },
    status(m){
      return m == 1 ? '待付款' :
             m == 2 ? '待发货' :
             m == 3 ? '已关闭' :
             m == 4 ? '待收货' : 
             m == 6 ? '待退款' : '已完成'
    },
    btnName(m) {
      return m == 1 ? '订单支付' :
             m == 2 ? '申请退款' :
             m == 3 ? '删除订单' : '确认收货' 
    },
    itemBtn(m) {
      //  1待付款 2待发货 3已关闭 4待收货 5已完成 6退款相关 7结束退款（无论成功或拒绝）
      if(m==2||m==4) {
        return '退款'
      } else if(m==6){
        return '退款中'
      } 
      if(m == 5){
        return '申请售后'
      }
    }
  },
  components: {
    refund,
    pay,
    afterSale
  },
  created(){
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
 .detail{
    padding: 64px 50px;
    background-color: #fff;
    margin-bottom: 48px;
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
     overflow: hidden;
     display: block;
     .img{
       width:80px;
       height:80px;
       border-radius:6px;
       background-position: center;
       background-size: cover;
       background-color: #f7f7f7;
     }
   }
   .oreder-detail{
     padding-left: 21px;
     flex-grow: 3;
     width: 30%;
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
   .refund-btn{
     padding: 8px 12px;
     border: 1px solid #eee;
     border-radius: 4px;
     color: #666;
     font-size: 14px;
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
