<template>
  <div class="service">
    <div class="service-item" v-for="(item, index) in service" :key="index">
      <router-link :to="'/serviceDetail/'+item.id" target="_self">
        <div class="show" :style="{'background-image': `url(${item.cover})`}"> <div class="item-title">{{item.name}}</div></div>
        <div class="advisory pointer">{{ifEn ? 'Get It' : '立即了解'}}</div>
      </router-link>
    </div>
    <loading :List="service"/>
    <pagintaion  
    :page="page"
    :total="pages"
    @paginationToPage="toPage"
    style="margin: 0 auto"
    v-if="pages > 1"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import pagintaion from '@/components/pagination/index'
import loading from '@/components/transitionTip/index'
export default {
  data: ()=>({
    service: [],
    pages: 0,
    page: 0,
    loading: false,
    categoryId: 0,
  }),
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    }),
  },
  methods: {
    // 全部
    // async getProducts() {
    //   let res = await this.$apiFactory.getTrademarkApi().getService({
    //     page: this.page,
    //     size: 30,
    //   })
    //   if(res.status == 200) {
    //     this.service = res.data.content
    //     this.pages = res.data.totalPages
    //   }
    // },
    // 分类
    async getSearchs(){
      let res = await this.$apiFactory.getTrademarkApi().getServiceType({
        categoryId: this.categoryId, 
        page: this.page,
        size: 30,
      })
      if(res.status == 200) {
        this.service = res.data.content
        this.pages = res.data.totalPages
      }
    },
    toPage(m){
      this.$router.push(`/culturaltrade/service?page=${m}`)
      this.page = m
      this.transfer()
    },
    // 区别是否有分类
    transfer() {
      this.getSearchs()
    }
  },
  created(){
    this.categoryId = this.$route.query.path ? parseInt(this.$route.query.path) : 0
    this.page = this.$route.query.page || 0
    this.transfer()
  },
  components: {
    pagintaion,
    loading
  },
  watch:{
    $route: {
      handler(b) {
        this.categoryId = b.query.path ? parseInt(b.query.path) : 0
        this.page = b.query.page || 0
        this.transfer()
         //深度监听，同时也可监听到param参数变化
      },
      deep: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.service{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 30px;
  .service-item{
    width: 277px;
    flex-grow: 0;
    margin-bottom: 50px;
    margin-left: 30px;
    .show{
      height: 216px;
      background-color: #000;
      position: relative;
      background-position: center;
      background-size: cover;
      &:hover{
        opacity: 0.8;
      }
      .item-title{
        position: absolute;
        bottom: 0px;
        left: 0px;
        font-size:16px;
        font-weight:400;
        padding: 0 21px;
        width: calc(100% - 42px); 
        color:rgba(255,255,255,1);
        line-height:37px;
        background-color: rgba(0,0,0,0.3);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
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
