<template>
  <div class="product">
    <div 
    class="pro-item"
    v-for="(item, index) in products"
    :key="index"
    >
      <router-link :to="'/product/'+item.id" target="_blank">
        <img :src="item.cover" class="pro-img" alt="">
      </router-link>
      <div class="pro-info">
        <div class="price-box">
          <div class="title">{{item.name}}</div>
          <div class="price">售价：<span>￥{{item.price}}</span></div>
        </div>
        <div class="pro-btn pointer" @click.stop="toDetail(item.id)">购买</div>
      </div>
    </div>
    <pagintaion  
    :page="page"
    :total="pages"
    @paginationToPage="toPage"
    style="margin: 0 auto;"
    v-if="pages > 1"
    />   
     
  </div>
</template>
<script>
import pagintaion from '@/components/pagination/index'
export default {
  data: () => ({
    products: [],
    pages: 0,
    page: 0,
    loading: false,
    categoryId: 0,
  }),
  methods:{
    toDetail(id){
       window.open(`/product/${id}`, '_blank')
    },
    async getProducts() {
      let res = await this.$apiFactory.getTrademarkApi().getProduct({
        page: this.page,
        size: 30,
      })
      if(res.status == 200) {
        this.products = res.data.content
        this.page = res.data.number
        this.pages = res.data.totalPages
      }
    },
    async getSearchs(){
      let res = await this.$apiFactory.getTrademarkApi().getProductType({
        categoryId: this.categoryId, 
        page: this.page,
        size: 30,
      })
      if(res.status == 200) {
        this.products = res.data.content
        this.pages = res.data.totalPages
      }
    },
    toPage(m){
      this.page = m
      this.$router.push(`/culturaltrade/product?page=${m}`)
      this.transfer()
    },
    transfer() {
      if(this.categoryId){
        this.getSearchs()
      } else {
        this.getProducts()
      }
    }
  },
  created(){
    this.categoryId = this.$route.query.path ? parseInt(this.$route.query.path) : 0
    this.page = this.$route.query.page || 0
    this.transfer()
  },
  components: {
    pagintaion
  },
  watch:{
    $route: {
      handler(b) {
        this.categoryId = b.query.path ? parseInt(b.query.path) : 0
        this.page = b.query.page || 0
        this.transfer()//深度监听，同时也可监听到param参数变化
      },
      deep: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.product{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 30px;
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
