<template>
  <div class="service">
    <div class="service-item" v-for="(item, index) in service" :key="index">
      <router-link to="/" target="_self">
        <div class="show" :style="{'background-image': `url('')`}"> <div class="item-title">3343434</div></div>
      </router-link>
      <div class="advisory pointer">立即咨询</div>
    </div>
  </div>
</template>
<script>
export default {
  data: ()=>({
    service: []
  }),
  methods: {
    async getProducts() {
      let res = await this.$apiFactory.getTrademarkApi().getService({
        page: 0,
        size: 30,
      })
      if(res.status == 200) {
        this.service = res.data.content
      }
    }
  },
  created(){
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.service{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .service-item{
    width: 277px;
    flex-grow: 0;
    margin-bottom: 50px;
    margin-left: 30px;
    .show{
      height: 216px;
      background-color: #000;
      position: relative;
      &:hover{
        opacity: 0.8;
      }
      .item-title{
        position: absolute;
        bottom: 15px;
        left: 21px;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:22px;
      }
    }
    .advisory{
      width:132px;
      height:44px;
      background:#f96925;
      border-radius:22px;
      margin: 32px auto 0;
      font-size:14px;
      font-weight:500;
      text-align: center;
      color:rgba(255,255,255,1);
      line-height:44px;
    }
  }
  .service-item:nth-child(4n+1){
    margin-left: 0px
  }
}
</style>
