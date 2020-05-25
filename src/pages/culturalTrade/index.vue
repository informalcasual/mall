<template>
  <div class="box spread">
    <div class="top" :style="{'background-image': `url(${require('./img/topBanner.png')})`}">
       <div class="title">
         无锡文化出口基地
         <p>吴文化江南文化</p>
       </div>
    </div>
    <crumbs :titleList="crumbsList"/>
    <div class="selected">
      <div class="product pointer" @click.stop="chagePage('culturalproduct')" :class="{'main-brown': $route.name==='culturalproduct'}">文化产品</div><!--
   --><div class="service pointer" @click.stop="chagePage('culturalservice')" :class="{'main-brown': $route.name==='culturalservice'}">文化服务</div>
    </div>
    <router-view />
  </div>
</template>
<script>
import crumbs from '@/components/crumbs/index'
export default {
  data: () => ({
    crumbsList: [{
      name: '文化贸易',
      url: ''
    },{
      name: '文化产品',
      url: ''
    }]
  }),
  methods:{
    chagePage(name){
      this.$router.push({
        name: name
      })
    },
    async getProduct(){
      let res = await this.$apiFactory.getTrademarkApi().getProduct({
        page: 0,
        size: 8,
      })
      if(res.status == 200) {
        this.products = res.data.content
      }
    },
  },
  components: {
    crumbs
  }
}
</script>

<style lang="scss" scoped>
.top{
  margin-top: 36px;
  width: 100%;
  height: 128px;
  background-position: center;
  background-size: cover;
  .title{
    padding-top: 28px;
    text-align: center;
    font-size:30px;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:42px;
    p{
      font-size:20px;
      font-weight:600;
      line-height:28px;
      padding-top: 7px;
    }
  }
}
.selected{
  font-size:14px;
  font-weight:500;
  color: #702A2A;
  margin-bottom: 20px;
  .product {
    width:130px;
    height:42px;
    display: inline-block;
    line-height:42px;
    text-align: center;
    border-radius: 0;
    border:1px solid rgba(112,42,42,1);
  }
  .service {
    display: inline-block;
    width:130px;
    height:42px;
    line-height:42px;
    text-align: center;
    border-radius: 0;
    border:1px solid rgba(112,42,42,1);
  }
}
</style>
