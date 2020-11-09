<template>
  <div class="box spread">
    <div class="page-title">{{ifEn ? 'Order details' : '订单详情'}}<div class="back pointer" @click.stop="goBack()">{{ifEn ? 'Back to previous page' : '返回上一页'}}</div></div>
    <div class="detail">
      <div class="top-bar">
        <div class="status">{{ifEn ? 'Order status' : '订单状态'}}：<span>{{content.status|status}}</span><span v-if="refusedReason">({{refusedReason}})</span></div>
        <div class="btns">
          <div class="btn pointer main-brown" v-if="!ifrefund && content.status !== 2 && content.status !== 5 && content.status !== 7" @click.stop="openrefund(content.status, true)">
            {{content.status|btnName}}
          </div>
          <div class="btn pointer grey-btn" v-if="!ifrefund && content.status == 1" @click.stop="cancleOrder()">{{ifEn ? 'cancle' : '取消订单'}}</div>
          <!-- <div class="btn pointer grey-btn" @click.stop="showsale()" v-if="content.status == 5 || content.status == 7 || content.status == 4">售后服务</div> -->
        </div>
      </div>
      <div class="detail-order">
        <div class="order-number">{{ifEn ? 'Order Id' : '订单编号'}}：{{content.sn}}</div>
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
          <div class="refund-btn pointer" v-if="item.status !== 1 && item.status !== 3 && item.status !== 7" @click.stop="openrefund(item.status, false);itemId = item.id">{{item.status|itemBtn}}</div>
        </div>
      </div>
      <div class="user-info">
        <div class="user">
          <div class="info-tit">{{ifEn ? 'Consignee Information' : '收货人信息'}}</div>
          <div class="info-detail">{{ifEn ? 'name' : '姓名'}}：{{receiver}}</div>
          <div class="info-detail">{{ifEn ? 'contact information' : '联系方式'}}：{{phone}}</div>
          <div class="info-detail">{{ifEn ? 'Shipping address' : '收货地址'}}：{{address}}</div>
        </div>
        <div class="user" v-if="paidAt">
          <div class="info-tit">{{ifEn ? 'Payment information' : '付款信息'}}：</div>
          <div class="info-detail">{{ifEn ? 'Payment method' : '支付方式'}}：{{outTradeNo|TradeNo}}{{ifEn ? 'Payment' : '支付'}}</div>
          <div class="info-detail">{{ifEn ? 'Payment time' : '付款时间'}}：{{paidAt}}</div>
        </div>
      </div>
    </div>
    <refund @refund="refund"/>
    <afterSale v-if="after_sale" :itemId="itemId" @showSale="showsale()"/>
    <!-- v-if="after_sale" -->
    <pay />
  </div>
</template>
<script>
// 子订单 1待付款 2待发货 3已关闭 4待收货 5已完成 6退款相关 7结束退款（无论成功或拒绝）
import afterSale from '@/components/successTip/afterSale'
import refund from './components/refund'
import pay from '@/pages/pay/component/pay'
import { mapState } from 'vuex'
var that
export default {
  data: ()=> ({
    orderId: 0,
    content: {},
    receiver: '',
    phone: '',
    address: '',
    outTradeNo: '',
    paidAt: null,
    allrefund: false,
    itemId: 0,
    after_sale: false,
    ifrefund: false,
    refusedReason: null,
  }),
  methods: {
    async getInfo(){
      this.orderId = this.$route.params.orederId
      this.ifrefund = JSON.parse(this.$route.query.fedund||false)
      let res = !this.ifrefund ? await this.$apiFactory.getOrdersApi().orderDetail(this.orderId) :
                                await this.$apiFactory.getOrdersApi().refundInfo(this.orderId)
      if(res.status == 200) {
        this.ifrefund ? res.data.orderItemList = [res.data.orderItem] : null
        this.content = res.data
        this.outTradeNo = this.ifrefund ? res.data.order.outTradeNo : res.data.outTradeNo
        let paidAt = !this.ifrefund ? res.data.paidAt : res.data.order.paidAt
        this.receiver = this.ifrefund ? this.content.order.receiver : this.content.receiver
        this.phone = this.ifrefund ? this.content.order.phone : this.content.phone
        this.address = this.ifrefund ? this.content.order.address : this.content.address
        this.paidAt = paidAt ? this.$utilHelper.specificTime(this.$utilHelper.safariTime(paidAt)) : null
        this.refusedReason = this.ifrefund && res.data.refusedReason ?  res.data.refusedReason : null
      }
    },
    // 退款
    openrefund(status){
     
      if(status == 6 && !bol){
        // return this.cancleRefund()
      } else if(status == 2 || (status == 4 && !bol)) {
        this.$bus.emit('showrefund', true)
      } else if(status == 4){
        this.sureOrder()
      } else if (status == 3) {
        this.cancleOrder()
      } else if(status == 5){
        this.after_sale = true
      } else if (status == 1) {
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
        data.orderItemId = this.itemId
        let res = await this.$apiFactory.getOrdersApi().refundOrder(data)
        if(res.status == 409){
          return this.$store.dispatch('toast', {
            type: 'warn',
            time: 1500,
            msg: '已超过退款时间，无法退款，请联系商家'
          })
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
    // 售后
    showsale() {
      this.after_sale = !this.after_sale
    },
    goBack(){
      if(this.$route.query.category){
        this.$router.push('/orders?category='+this.$route.query.category)
      } else {
        history.go(-1)
      }

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
      if(that && that.ifrefund) {
        return m == 1 ? that.ifEn ? 'processing' : '处理中' :
               m == 2 ? that.ifEn ? 'no refund' : '拒绝退款' :
               m == 3 ? that.ifEn ? 'Cancel refund' : '取消退款' :
               m == 4 ? that.ifEn ? 'seller agrees to return' : '卖家同意退货' : 
                        that.ifEn ? 'refund succeeded ' : '退款成功'
      }
      return m == 1 ? that.ifEn ? 'To be paid' : '待付款' :
             m == 2 ? that.ifEn ? 'To be delivered' : '待发货' :
             m == 3 ? that.ifEn ? 'Closed' : '已关闭' :
             m == 4 ? that.ifEn ? 'to be received' : '待收货' : 
             m == 6 ? that.ifEn ? 'To be refunded' : '待退款' : 
                      that.ifEn ? 'Completed' : '已完成'
    },
    btnName(m) {
      return m == 1 ? that.ifEn ? 'Order payment' : '订单支付' :
             m == 3 ? that.ifEn ? 'Delete order' : '删除订单' : 
                      that.ifEn ? 'Confirm receipt' : '确认收货' 
    },
    itemBtn(m) {
      //  1待付款 2待发货 3已关闭 4待收货 5已完成 6退款相关 7结束退款（无论成功或拒绝）
      if(m==2||m==4) {
        return that.ifEn ? 'refund' : '退款'
      } else if(m==6){
        return that.ifEn ? 'Refund in progress' : '退款中'
      } 
      if(m == 5){
        return that.ifEn ? 'Apply for after sale' : '申请售后'
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
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    }),
  },
  mounted(){
    that = this
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
 .page-title{
   position: relative;
   .back{
     position: absolute;
     right: 0;
     top: 21px;
     color: #666666;
     font-size: 14px;
     line-height: 20px;
     &:hover{
       color: #702a2a;
       text-decoration: underline;
     }
   }
 }
</style>
