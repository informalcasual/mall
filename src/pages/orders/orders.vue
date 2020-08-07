<template>
  <div class="order box spread">
    <div class="page-title">订单管理</div>
    <div class="order-box">
      <div class="order-top">
        <div class="selection pointer">
          <div class="tit" @click.stop="getInfo(0)" :class="{'act-tit': _index === 0}">全部订单</div>
          <div class="tit" @click.stop="getInfo(2)" :class="{'act-tit': _index === 2}">已支付</div>
          <div class="tit" @click.stop="getInfo(4)" :class="{'act-tit': _index === 4}">待收货</div>
          <div class="tit" @click.stop="getInfo(5)" :class="{'act-tit': _index === 5}">已完成</div>
          <div class="tit" @click.stop="getInfo(6)" :class="{'act-tit': _index === 6}">售后订单</div>
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
        <div class="order-item" v-for="(item, index) in lists" :key="index">
          <div class="order-num">{{item.createdAt}}<span>订单编号：{{item.sn}}</span></div>
          <div class="cont">
            <div class="detail-box"><div class="detail" v-for="(ele, i) in item.orderItemList" :key="i">
               <!-- <router-link class="link" :to="''+item" target="_self"> -->
                <div class="img" :style="{'background-image': `url(${ele.cover})`}">
                  
                </div>
               <!-- </router-link> -->
               <div class="pro-info">
                 <p class="title">{{ele.name}}</p>
                 <p class="type">{{ele.specs}}</p>
               </div>
            </div></div>
            
            <div class="address">
              <p>{{item.receiver}} <span class="phone">{{item.phone}}</span></p>
              <p>{{item.address}}</p>
            </div>
            <div class="total">
              <p>应付金额：¥{{item.amount}}</p>
              <p>实付金额：¥{{item.amount}}</p>
            </div>
            <div class="subtotal">
              <div class="status">{{item.status|status}}</div>
              <div class="btns">
                <div class="operation pointer"
                @click.stop="followUP(item)"
                 v-if="item.status != 5&&item.status != 2&& _index!=6"
                >
                  <span>{{item.status|status_btn}}</span>
                </div>
                <div 
                class="operation pointer"
                @click.stop="tofWindow(item.id)"
                v-if="_index===6">
                  查看进度
                </div>
                <div class="more pointer" v-if="_index !== 6" @click.stop="toWindow(item.id)">查看详情</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagintaion">
      <pagintaion  
        :page="page"
        :total="totalPage"
        @paginationToPage="toPage"
        style="float: right"
        />
    </div>
  </div>
</template>
<script>
import pagintaion from '@/components/pagination/index'
var that
export default {
  data: () => ({
    key: '',
    lists: [],
    page: 0,
    totalPage: 0,
    _index: 0,
  }),
  methods: {
    // 分页
    toPage(n){
      this.page = n
      this.getInfo(this.index)
    },
    toWindow(id){
      window.open(`/order_detail/${id}?category=${this._index}`,'_self')
    },
    tofWindow(id){
      window.open(`/order_detail/${id}?fedund=true&category=${this._index}`,'_self')
    },
    async getInfo(i){
      this.lists = []
      this._index = i
      let res = null
      if(i == 6){
        res = await this.$apiFactory.getOrdersApi().getRefunds()
      } else {
        res = await this.$apiFactory.getOrdersApi().getOrders({status: this._index, page: this.page})
      }
      history.pushState({}, '', `?category=${i}`)
      if(res.status == 200){
        res.data.content.forEach(ele => {
          if(i === 6) {
            ele.orderItemList = [ele.orderItem]
          }
          ele.createdAt = this.$utilHelper.specificTime(this.$utilHelper.safariTime(ele.createdAt))
        })
        this.lists = res.data.content
        this.page = res.data.number
        this.totalPage = res.data.totalPages
      }
    },
    async importkey() {
      this.page = 0
      this.lists = []
      this.totalPage = 0
      let res = await this.$apiFactory.getOrdersApi().getOrders({status:this._index,page: this.page, name: this.key})
      if(res.status == 200) {
        this.lists = res.data.content
        this.page = res.data.number
        this.totalPage = res.data.totalPages
      }
    },
    // 删除
    async cancleOrder(id){
      let res = await this.$apiFactory.getOrdersApi().cancleOrder(id)
      if(res.status == 200) {
        this.getInfo(this.index)
      }
    },
    // 确认
    async sureOrder(id){
      let res = await this.$apiFactory.getOrdersApi().sureOrder(id)
      if(res.status == 200) {
        this.getInfo(this.index)
      }
    },
    followUP(item){
      if(item.status == 1){
        this.toWindow(item.id)
      }
      if(item.status == 3) {
        this.cancleOrder(item.id)
      }
      if(item.status == 4) {
        this.sureOrder(item.id)
      }
    }
  },
  filters: {
    status(n){
      if(that._index === 6) {
        return n === 1 ? '处理中' : n === 2 ? '拒绝退款' :
               n === 3 ? '取消退款' : n === 4 ? '卖家同意退货' : '退款成功'
      }
      return n === 1 ? '待付款': 
             n === 2 ? '待发货':
             n === 3 ? '已关闭':  
             n === 4 ? '待收货': '已完成'
      
    },
    status_btn(n){
      return n === 1 ? '支付订单': 
             n === 2 ? '取消订单':
             n === 3 ? '已关闭':  
             n === 4 ? '确认收货': '申请售后'
    }
  },
  components: {
    pagintaion
  },
  created(){
    this._index = parseInt(this.$route.query.category || 0)
    this.getInfo(this._index)
  },
  beforeCreate(){
    that = this
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
      width: 526px;
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
    .detail,.detail-box{
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
    display: flex;
    align-items: center;
    .detail-box{
    
    }
    .detail{ 
      display: flex; 
      align-items: center;
      width: 100%;
      padding-bottom: 10px;
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
        padding-left: 25px;
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
  overflow: hidden;
  padding: 23px 64px;
}
</style>
