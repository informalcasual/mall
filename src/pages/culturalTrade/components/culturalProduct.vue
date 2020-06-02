<template>
  <div class="product">
    <div 
    class="pro-item"
    v-for="(item, index) in products"
    :key="index"
    >
      <img :src="item.cover" class="pro-img" alt="">
      <div class="pro-info">
        <div class="price-box">
          <div class="title">{{item.name}}</div>
          <div class="price">售价：<span>￥{{item.price}}</span></div>
        </div>
        <div class="pro-btn pointer" @click.stop="toDetail(item.id)">购买</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
  products: []
  }),
  methods:{
    toDetail(id){
       window.open(`/product/${id}`, '_blank')
    },
    async getProducts() {
      let res = await this.$apiFactory.getTrademarkApi().getProduct({
        page: 0,
        size: 30,
      })
      if(res.status == 200) {
        this.products = res.data.content
      }
    }
  },
  created(){
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.product{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .pro-item{
    width: 23%;
    margin-left: 30px;
    margin-bottom: 38px;
    &:nth-child(4n+1){
      margin-left: 0px;
    }
    .pro-img{
      width: 100%;
      height: 225px;
      background-color: #eee;
      display: block;
    }
    .pro-info{
      display: flex;
      align-items: center;
      padding-top: 15px;
      .price-box{
        flex-grow: 1;
        .title{
          font-size:16px;
          color:rgba(0,0,0,1);
          line-height:22px;
          padding-bottom: 6px;
        }
        .price{
          font-size:14px;
          color:rgba(102,102,102,1);
          line-height:25px;
          span{
            font-size:18px;
            font-weight:500;
            color:rgba(230,7,7,1);
          }
        }
      }
      .pro-btn{
        flex-grow: 0;
        width:78px;
        height:44px;
        background:rgba(112,42,42,1);
        border-radius:22px;
        font-size:14px;
        font-weight:500;
        text-align: center;
        color:rgba(255,255,255,1);
        line-height:44px;
      }
    }

  }
}
</style>
