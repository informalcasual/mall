<template>
  <div class="shop">
  <div class="min-box">
    <div class="title">{{ifEn ? 'shopping cart' : '购物车'}}</div>
    <div class="shop-cart">
      <div class="head">
        <div class="title1">{{ifEn ? 'Commodity details' : '商品详情'}}</div>
        <div class="title2">{{ifEn ? 'item pricing' : '商品单价'}}</div>
        <div class="title2">{{ifEn ? 'number' : '数量'}}</div>
        <div class="title2">{{ifEn ? 'Subtotal' : '小计'}}</div>
      </div>
      <div class="carts-empty" v-if="carts.length <= 0" >
        <p> 
          <img :src="require('@/assets/img/cart_empty.svg')" width="50" alt="">购物车空空如也~
        </p>
      </div>
      <div  v-else class="product" v-for="(item, index) in carts" :key="index">
        <div class="detail">
          <div class="select pointer" @click.stop="select(index)" :class="{'selected': selectedList.includes(index)}"></div>
          <router-link  :to="{path: `/product/${item.productSku.productId}`}"  target="_blank" 
          class="pro-img"
          :style="{'background-image': `url(${ item.productSku ? item.productSku.pic : './img/pic.svg'})`}"
          ></router-link>
          <div class="pro-info">
            <div class="name">{{item.name}}</div>
            <div class="type">{{item.specs}}</div>
          </div>
        </div>
        <div class="price">￥{{item.productSku.price}}</div>
        <div class="num">
          <img  @click.stop="choseNum(index, -1)" :src="require('@/assets/img/reduce.svg')" alt="">
          <div   class="number">{{item.count}}</div>
          <img  @click.stop="choseNum(index, 1)" :src="require('@/assets/img/plus.svg')" alt="">
        </div>
        <div class="total">￥{{(item.count*item.productSku.price).toFixed(2)}}</div>
      </div>
    </div>
  </div>
 
  <div class="pay-box" :style="{'position':  scroll+totalHeight >= windowHeight || totalHeight - 240 >= windowHeight ? 'absolute' : 'fixed' }">
    <div class="min-box pay">
      <div class="selected-all">
        <div class="select-all pointer" @click.stop="selectAll()">
          <div class="select" :class="{'selected': selectedAll}"></div>
          {{ifEn ? 'selected all' : '全选'}}
        </div>
        <div class="cancle pointer" @click.stop="cancle()">{{ifEn ? 'Delete selected product' : '删除选种商品'}}</div>
      </div>
      <div class="bill">
        <div class="bill-num">{{ifEn ? 'selected' : '已选'}}<span>{{selectedList.length}}</span>{{ifEn ? 'products' : '个商品'}}</div>
        <div class="bill-total"><span>{{ifEn ? 'total' : '总价'}}：</span>
          <span class="total">￥{{total.toFixed(2)}}</span></div>
        <div class="carts pointer main-brown" @click.stop="toBuy()">{{ifEn ? 'buy now' : '立即下单'}}</div>
      </div>
    </div>
  </div>
  </div>

</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    selectedList: [],
    selectedAll: false,
    carts:[],
    total: 0,
    windowHeight: 0,
    totalHeight: 0
  }),
  methods: {
    async getList() {
      let res = await this.$apiFactory.getOrderApi().cartShop()
      if(res.status == 200) {
        this.carts = res.data.content
        this.totalHeight = document.body.clientHeight
        this.windowHeight = document.getElementsByClassName('shop')[0].clientHeight + 66
      }
    },
    //修改数量
    async choseNum(index, num){
      if(num > 0) {
        this.carts[index].count++
      } else if(num < 0 && this.carts[index].count > 1){
        this.carts[index].count--
      }
      let count = this.carts[index].count,
          id = this.carts[index].id
      let res = await this.$apiFactory.getOrderApi().changeNum({count: count, id: id})
    },
    // 全选
    selectAll(){
      this.selectedList = []
      this.total = 0
      if(this.selectedAll){
        this.selectedAll = false
      } else {
        this.selectedAll = true
        this.carts.forEach((element,index) => {
          this.selectedList.push(index)
          this.total += element.num* element.productSku.price
        });
      }
      this.totalNum()
    },
    // 结算总价
    totalNum(){
      this.total = 0
      this.selectedList.forEach(ele=>{
        this.total += this.carts[ele].count * this.carts[ele].productSku.price
      })
    },
    // 选择
    select(index){
      let length = this.selectedList.length
      let flag = true
      for(let i = 0; i < length; i++){
        if(this.selectedList[i] === index){
          this.selectedAll = false
          this.selectedList.splice(i, 1)
          flag = false
          break;
        } 
      }
      if(flag){
        this.selectedList.push(index)
      }
      this.totalNum()
    },
    // 删除
    async cancle(){
      let cartsIds = []
      for(let item in this.selectedList){
        cartsIds.push(this.carts[item].id)
      }
      let res = await this.$apiFactory.getOrderApi().cancleCart({cartIds: cartsIds})
      if(res.status == 200) {
        this.selectedList = []
        this.total = 0
        this.selectedAll = false,
        this.getList()
      }
    },
    // 结算
    toBuy(){
      let cartsIds = []
      for(let item of this.selectedList){

        cartsIds.push(this.carts[item].id)
      }
      if(cartsIds.length <= 0) {
        return this.$notify({
          title: '提示',
          message: '您没选中任何产品',
          type: 'succes'
        })
      }
      window.open('/pay?pcn=-1,0,0&carts='+cartsIds.toString(), '_self')
    }
  },
  created(){
    this.getList()
  },
  mounted(){
    this.totalHeight = document.body.clientHeight
    setTimeout(() => {this.windowHeight = document.getElementsByClassName('shop')[0].clientHeight + 66}, 500)
    
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
.shop{
  min-height: calc(100% - 306px);
  position: relative;
}
.title{
  padding: 21px 0 16px;
}
.shop-cart{
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
  .carts-empty{
    p{
      padding-top: 98px;
      font-size: 24px;
      font-weight: 600;
      line-height: 50px;
      color: #dbdbdb;
      text-align: center;
      img{
        vertical-align: middle;
        padding-right: 10px;
      }
    }
  }
}
.pay-box{
  width: 100%;
  height: 80px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  .pay{
    height: 100%;
    display: flex;
    align-items: center;
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    .selected-all{
      flex-grow: 0;
      width: 225px;
      padding-left: 25px;
      .select-all{
        vertical-align: middle;
        display: inline-block;
        height: 20px;
        &:hover{
          color: #1694ff;
          .select{
            border-color: #1694ff;
          }
        }
        .select{
          display: inline-block;
          width:17px;
          height:17px;
          border-radius:50%;
          border:1px solid rgba(151,151,151,1);
          vertical-align: middle;
          margin-right: 12px;
        }
        .selected{
          background-image: url('./img/right.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: 10px;
          background-color: #702A2A;
          border-color: #702A2A;
        }
      }
      .cancle{
        display: inline-block;
        margin-left: 31px;
        vertical-align: middle;
        &:hover{
          color:#f73f3f;
        }
      }
    }
    .bill{
      flex-grow: 1;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .bill-num{
        span{
          font-weight: 600;
          padding: 0 5px;
        }
      }
      .bill-total{
        padding: 0 41px 1px 47px;
        span{
          vertical-align: middle;
        }
        .total{
          font-size:24px;
          font-weight:600;
          line-height:33px;
          color:rgba(230,7,7,1);
        }
      }
      .carts{
        width:208px;
        height:50px;
        background:rgba(112,42,42,1);
        border-radius:4px;
        font-size:14px;
        font-weight:500;
        text-align: center;
        color:rgba(255,255,255,1);
        line-height:50px;
      }
    }
  }
  
}
</style>
