<template>
  <div class="content-body">
    <banner/>
    <div class="display">
      <div class="display-cont box">
        <div
         class="display-item"
         v-for="(item, index) in ifVhang"
         :key="index"
        >
          <img :src="require(`./img/display/icon${index+1}.svg`)" alt="">
          <img class="logo" :src="require(`./img/display/logo${ ifEn ? index + 5 : index+1}.svg`)" alt="">
          <p class="title">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="service">
      <div class="box">
        <contNav :title="ifEn ? 'PROFUCT' : '文化产品'" :actid="productTipsId" 
          :btnTitle="ifEn ? 'more' : '更多产品'" :tipList="productTips" :url="'/culturaltrade/product'"
          @typeSeach="getSearchsP"
          />
        <div class="service-box">
        <!-- <div 
        class="pro-item"
        v-for="(item, index) in products"
        :key="index"
        >
          <router-link :to='`/product/${item.id}`' target="_blank">
            <img :src="item.cover" class="pro-img" alt="">
          </router-link>
          <div class="pro-info">
            <div class="price-box">
              <div class="title">{{item.name}}</div>
              <div class="price">售价：<span>￥{{item.price.toFixed(2)}}</span></div> 
            </div>
            <div class="pro-btn pointer" @click.stop="toBuy(item.id)">查看详情</div>
          </div>
        </div> -->
        <div class="service-item" v-for="(item, index) in products" :key="index">
          <router-link :to='`/product/${item.id}`' target="_blank">
            <div class="show" :style="{'background-image': `url(${item.cover})`}">
              <div class="item-title">{{item.name}}</div>
            </div>
          </router-link>
          <div class="advisory pointer" @click.stop="toBuy(item.id)">
            <span v-if="!ifEn">查看详情 </span>
            <span v-else>view details</span>
            </div>
        </div>
        <div v-if="products.length < 1" style="width: 100%;height: 100%">
          <loading :loading="p_loading" :List="products"/>
        </div>
        </div>
      </div>
    </div>
    <div class="service">
      <div class="box">
        <contNav 
        @typeSeach="getSearchsS"
        :title="ifEn ? 'SERVICE' : '文化服务'" :actid="serviceTipsId" 
          :btnTitle="ifEn ? 'more' : '更多服务'"  :tipList="serviceTips" :url="'/culturaltrade/service'"></contNav>
        <div class="service-box">
          <div class="service-item" v-for="(item, index) in service" :key="index">
            <router-link :to='`/serviceDetail/${item.id}`' target="_blank">
              <div class="show" :style="{'background-image': `url(${item.cover})`}">
                <div class="item-title">{{item.name}}</div>
              </div>
            </router-link>
            <div class="advisory pointer" @click.stop="toService(item.id)" >立即咨询</div>
          </div>
          <div v-if="service.length < 1" style="width: 100%;height: 100%">
            <loading :loading="s_loading" :List="service"/>
          </div>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="box about-instr">
        <div class="instroduct">
          <div class="title">{{ifEn ? 'ABOUT US' : '关于我们'}} <span>ABOUT US</span></div>
          <div class="info">
            <span v-if="!ifEn">文化锡云---无锡文化贸易服务平台是依托于无锡国家文化出口基地的全国文化产品跨境电商综合平台。
            全力打造文化产品展示交易、文化服务定制开发、文化政策法规宣传、文化跨界发展升级的融合性平台  
            致力于成为个多样化、便利化、全球化的创新型文化产品跨境电子商务平台                
            满足国内外众多文化企业、艺术家及消费者的文化需求
            助力本土文化产业高质量发展，让世界了解无锡，将中国文化产品推向世界</span>
            <span v-else>Cultural Xiyun---Wuxi Cultural Trade Service Platform is a comprehensive cross-border e-commerce platform for national cultural products based on Wuxi National Cultural Export Base.
           Efforts to build an integrated platform for cultural product display and transaction, cultural service customization development, cultural policy and regulation promotion, and cultural cross-border development and upgrading
           Committed to becoming a diversified, convenient and globalized cross-border e-commerce platform for innovative cultural products
           Meet the cultural needs of many domestic and foreign cultural enterprises, artists and consumers
           Assist the high-quality development of the local cultural industry, let the world know Wuxi, and promote Chinese cultural products to the world</span>
            </div>
        </div>
        <img :src="require('./img/about.png')" width="558" class="about-img" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import contNav from './content/contNav'
import banner from './content/banner'
import loading from '@/components/transitionTip/index'
import { mapState } from 'vuex'
export default {
  data: () => ({
    products: [],
    service: [],
    productTips: [],
    serviceTips: [],
    productTipsId: 0,
    serviceTipsId: 0,
    p_loading: false,
    s_loading: false,
    En_display: ['Focus on industrial development','Promote industry','Enhance influence and cohesion','Push Chinese culture to the world'],
    display: ['着重文化产业创新发展', '推动文化产业综合实力', '提升国际影响力和聚合力', '将中国文化产品推向世界']
  }),
  methods: {
    async getProduct(){
      this.p_loading = true
      let _res = await this.$apiFactory.getTrademarkApi().getCategoray(1)
      if(_res.status == 200){
        this.productTips = _res.data
        if(this.productTips.length > 0){
          this.productTipsId = this.productTips[0].id
          this.getSearchsP(this.productTipsId)
        }
        this.p_loading = false
      }
    },
    async getService(){
      this.s_loading = true
      let _res = await this.$apiFactory.getTrademarkApi().getCategoray(2)
      if(_res.status == 200){
        this.serviceTips = _res.data
        if(this.serviceTips.length > 0){
          this.serviceTipsId = this.serviceTips[0].id
          this.getSearchsS(this.serviceTipsId)
        }
        this.s_loading = false
      }
    },
    async getSearchsP(id){
      let res = await this.$apiFactory.getTrademarkApi().getProductType({
        categoryId: id, 
        page: 0,
        size: 8,
      })
      if(res.status == 200) {
        this.products = res.data.content
      }
    },
    async getSearchsS(id){
      let res = await this.$apiFactory.getTrademarkApi().getServiceType({
        categoryId: id, 
        page: 0,
        size: 4,
      })
      if(res.status == 200) {
        this.service = res.data.content
      }
    },
    toBuy(id){
      window.open(`/product/${id}`, '_blank')
    },
    toService(id){
      window.open(`/serviceDetail/${id}`, '_blank')
    }
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    }),
    ifVhang() {
      return this.ifEn ? this.En_display : this.display 
    }
  },
  created(){
    this.getProduct()//产品
    this.getService()//文化
  },
  components: {
    banner,
    contNav,
    loading
  }
}
</script>
<style lang='scss' scoped>

.display{
  width: 100%;
  .display-cont{
    height:200px;
    background:rgba(255,255,255,1);
    box-shadow:0px 5px 8px 0px rgba(236,236,236,0.5);
    border-radius:8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transform: translateY(-64px);
    .display-item{
      text-align: center;
      img{
        display: block;
        margin: 0 auto;
      }
      .logo{
        padding: 12px 0 9px;
      }
      .title{
        font-size:14px;
        color:rgba(102,102,102,1);
        line-height:20px;
      }
    }
  }
}
.product{
  margin: 0 auto;
  width: 1200px;
  .product-box{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 37px;
    .pro-item{
      width: 23%;
      margin-bottom: 38px;
      margin-left: 30px;
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
          width: 20%;
          .title{
            font-size:16px;
            color:rgba(0,0,0,1);
            line-height:22px;
            padding-bottom: 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
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
}
.service{
  width: 100%;
  padding: 52px 0 65px;
  background-color: #fff;
  .service-box{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .service-item{
    // width: 270px;
    width: 23.5%;
    flex-grow: 0;
    margin-left: 2%;
    margin-bottom: 20px;
    .show{
      height: 216px;
      background-color: #000;
      background-position: center;
      background-size: cover;
      position: relative;
      &:hover{
        opacity: 0.8;
      }
      .item-title{
        position: absolute;
        width: calc(100% - 21px);
        height: 37px;
        bottom: 0px;
        left: 0px;
        padding: 0 0 0 21px;
        font-size:16px;
        font-weight:400;
        color: #fff;
        background-color:rgba(0,0,0,0.3);
        line-height:37px;
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
    &:nth-child(4n+1) {
      margin-left: 0px;
    }
  }
}
.about{
  width: 100%;
  background-color: #F4F2EE;
  padding: 41px 0 59px;
  .about-instr{
    display: flex;
    align-items: center;
  }
  .instroduct{
    flex-grow: 1;
    margin-right: 94px; 
    .title{
      font-size:28px;
      font-weight:500;
      color:rgba(0,0,0,1);
      line-height:40px;
      padding-bottom: 46px;
      span{
        padding-left: 12px;
        font-size:14px;
        color:rgba(104,104,104,1);
        line-height:20px;
      }
    }
    .info{
      font-size:16px;
      color:rgba(47,46,46,1);
      line-height:30px;
    }
  }
  .about-img{
    flex-grow: 0;
  }
}

</style>
