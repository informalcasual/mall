<template>
  <div class="product min-box">
    <div class="title-tip "><router-link to="/culturalTrade/product" class="tip-link pointer" target="_blank">{{ifEn ? 'Cultural Trade' : '文化贸易'}}</router-link>>{{ifEn ? 'Cultural products' : '文化产品'}}</div>
    <div class="product-show">
      <div class="img" :style="{'background-image': `url(${img})`}"></div>
      <div class="select-buy">
        <div class="title">{{product.name}}</div>
        <div class="peice">{{ifEn ? 'Price' : '售价'}}:<span>￥{{price.toFixed(2)}}</span></div>
        <div class="chose">
          <div 
          class="chose-item pointer"
          v-for="(item, index) in priceList"
          :key="index"
          :class="{'act': actIndex === index}"
          @click.stop="selectType(index)"
          >{{item.specs}}</div>
        </div>
        <div class="number">
          <div class="num-chose">{{ifEn ? 'Number' : '数量'}}:</div>
          <div class="chose">
            <img  @click.stop="choseNum(-1)" :src="require('./img/reduce.svg')" alt="">
            <div   class="num">{{num}}</div>
            <img  @click.stop="choseNum(1)" :src="require('./img/plus.svg')" alt="">
          </div>
          <div class="tip">{{ifEn ? 'No reason to return within 7 days' : '7天无理由退货'}}</div>
        </div>
        <div class="btns">
          <div class="buy pointer" @click.stop="toBuy()">{{ifEn ? 'Buy Now' : '立即购买'}}</div><!-- 
          --><div @click.stop="addCart()" class="addCart pointer">{{ifEn ? 'Add to Cart' : '加入购物车'}}</div>
        </div>
      </div>
    </div>
    <div class="product-info min-box">
      <div class="compony-info">
        <div class="title">{{company.name}}</div>
        <div class="phone">{{ifEn ? 'Phone' : '电话'}}：{{company.phone}}</div>
        <div class="detail"><p>{{ifEn ? 'Address' : '地址'}}：</p><p class="address">{{company.address}}</p>
         </div>
        <!-- <div class="advisory pointer">
          <img :src="require('./img/advisory.svg')"  wisth="18" alt="">
          咨询客服
        </div> -->
      </div>
      <div class="product-box">
        <div class="title">{{ifEn ? 'Commodity details' : '商品详情'}}</div>
        <div v-html="product.detail" id="product-box"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    price: 0,
    num: 1,
    img: '',
    total: 1,
    actIndex: 0,
    product: {},
    priceList: [],
    company: {
      name: '',
      phone: '',
      address: ''
    }
  }),
  methods:{
    // 数量
    choseNum(num) {
      if(num > 0 && this.num < this.total) {
        this.num++
      } else if(num < 0 && this.num > 1){
        this.num--
      }
    },
    // 加入购物车
    async addCart() {
        if(!this.loginUser.id){
          this.$bus.emit('showLogin', true)
          return
        }
        let res = await this.$apiFactory.getOrderApi().addCart({
          count: this.num,
          productSkuId: this.priceList.length > 0 ? this.priceList[this.actIndex].id : this.product.id
        })
        return this.$notify({
          title: '提示',
          message: res.status == 200 ? '已加入购物车' : '添加失败，请重新添加',
          type: 'succes'
        })
    },
    // 选择样式
    selectType(i){
      this.actIndex = i
      this.price = this.priceList[i].price
      this.img = this.priceList[i].pic
      this.total = this.priceList[i].stock
      this.num = 1
    },
    // 买
    async toBuy(){
      if(!this.loginUser.id){
        this.$bus.emit('showLogin', true)
        return
      }
      window.open('/pay?pcn='+ this.product.id + ',' + this.actIndex + ','+this.num, '_self')
  
      // let res = await this.$apiFactory.getOrderApi().addCart({
      //   count: this.num,
      //   productSkuId: this.priceList[this.actIndex].id
      // })
    },
    async getDetail(){
     let productId = this.$route.params.id
     let res = await this.$apiFactory.getTrademarkApi().ProductDetail(productId)
     if(res.status == 200) {
       this.product.id = res.data.product.id
       this.product.detail = res.data.product.detail
       this.product.name = res.data.product.name
       this.company = res.data.shop ? res.data.shop : this.company
       this.priceList = res.data.productSku
       this.price = this.priceList.length > 0 ? this.priceList[0].price : res.data.product.sale
       this.img = this.priceList.length > 0 ? this.priceList[0].pic : res.data.productResource[0].url
       this.total = this.priceList.length > 0 ? this.priceList[0].stock : 1000
     }
    }
  },
  created(){
    this.getDetail()//商品详情
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn,
      loginUser: state => state.user.loginUser
    }),
  },
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
    background-size: contain;
  }
  .select-buy{
    padding-left: 31px;
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
    padding-left: 14px;
  }
  .peice{
    padding: 19px 14px 29px;
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height:20px;
    span{
      font-size:20px;
      color:rgba(230,7,7,1);
      line-height:28px;
    } 
  }
  .chose{
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    .chose-item{
      padding: 12px 34px;
      border-radius:4px;
      margin-bottom: 19px;
      border:1px solid rgba(169,169,169,1);
      font-size:14px;
      color:rgba(0,0,0,1);
      line-height:20px;
      margin-left: 14px;
    }
    .act{
      border-color: #702A2A;
      box-shadow: inset 0px 0px 0px 1px #702a2a;
      color: #702A2A;
    }
  }
  .number{
    display: flex;
    padding-left: 14px;
    align-items: center;
    .num-chose{
      flex-grow: 0;
      // width:42px;
      padding-right: 15px;
      font-size:14px;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .chose{
      flex-grow: 0;
      height: 26px;
      
      img{
        height: 100%;
        cursor: pointer;
      }
      .num{
        width: 32px;
        font-size:16px;
        color:rgba(0,0,0,1);
        line-height: 26px;
        text-align: center;
      }
    }
    .tip{
      flex-grow: 1;
      text-align: right;
      font-size:14px;
      color:rgba(167,167,167,1);
      line-height:20px;
    }
  }
  .btns{
    padding-left: 14px;
    margin-top: 35px;
    .buy,.addCart{
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
    .buy{
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
    padding: 42px 28px 15px;
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
    .advisory{
      width: 224px;
      margin: 30px auto 0;
      padding: 17px 0 15px; 
      font-size:14px;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:20px;
      background-color:#fff;
      border-radius:4px;
      text-align: center;
      img{
        padding: 1px 7px 1px 0;
        vertical-align: middle;
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
<style lang="scss">
#product-box{
  font-size:16px;
  color:rgba(51,51,51,1);
  line-height:30px;
  p{
    padding-bottom: 20px;
  }
  img{
    display: block;
    width: 460px;
    margin: 0 auto;
  }
}
</style>