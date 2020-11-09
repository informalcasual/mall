<template>
  <div class="product min-box">
    <div class="title-tip "><router-link to="/culturaltrade/service" class="tip-link pointer" target="_blank">{{ifEn ? 'Cultural trade' : '文化贸易'}}</router-link>
    >{{ifEn ? 'Cultural products' : '文化产品'}}</div>
    <div class="product-show">
      <div class="img" :style="{'background-image': `url(${serviceDetail.cover})`}"></div>
      <div class="select-buy">
        <div class="title">{{serviceDetail.name}}</div>
        <div class="service-tip">{{ifEn ? 'Category' : '服务类别'}}：<span>{{serviceDetail.categories}}</span></div>
        <div class="service-tip">{{ifEn ? 'Area' : '所在区域'}}：<span>{{serviceDetail.location|location}}</span></div>
        <div class="service-tip">{{ifEn ? 'Service Time' : '服务时间'}}：<span>{{serviceDetail.time}}</span></div>
        <div class="service-tip">{{ifEn ? 'Detail Adress' : '详细地址'}}：<span>{{serviceDetail.address}}</span></div>
        <div class="btns">
          <div class="advisory pointer" @click.stop="">
            <img :src="require('./img/advisory.svg')"  wisth="18" alt="">
          {{ifEn ? 'Consulting customer service' : '咨询客服'}}</div>
          <div @click.stop="addAdvisory()" class="addCart pointer">{{ifEn ? 'Leave contact information' : '留下联系方式'}}</div>
        </div>
      </div>
    </div>
    <div class="product-info min-box">
      <div class="compony-info" v-if="compay">
        <div class="title">{{compay.name}}</div>
        <div class="phone">{{ifEn ? 'phone' : '电话'}}：{{compay.phone}}</div>
        <div class="detail"><p>{{ifEn ? 'address' : '地址'}}：</p><p class="address">{{compay.address}}</p>
         </div>
      </div>
      <div class="product-box">
        <div class="title">{{ifEn ? 'Service details' : '商品详情'}}</div>
        <div v-html="serviceDetail.detail" id="product-box"></div>
      </div>
    </div>
  </div>
</template>
<script>
var that
import { mapState } from 'vuex'
export default {
  data: () => ({
    price: 289,
    num: 1,
    productId: 0,
    serviceDetail: {},
    compay: {},
  }),
  methods:{
    addAdvisory(){
      if(!this.loginUser.id){
          this.$bus.emit('showLogin', true)
          return
      }
      this.$bus.emit('showAdvisory', true)
    },
    async getDetail(){
     let productId = this.$route.params.id
     let res = await this.$apiFactory.getTrademarkApi().ServiceDetail(productId)
     if(res.status == 200) {
       this.serviceDetail = res.data.service
       this.serviceDetail.categories = res.data.categories.toString()
       this.compay = res.data.shop
     }
    }
  },
  created(){
    this.getDetail() // 商品详情
  },
  mounted() {
    that = this
    window.scrollTo(0, 0)
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn,
      loginUser: state => state.user.loginUser
    })
  },
  filters: {
    location(m) {
        return m === 1 ?  that.ifEn ? 'Liangxi District' : '梁溪区' : 
               m === 2 ?  that.ifEn ? 'Lake District' : '滨湖区' : 
               m === 3 ?  that.ifEn ? 'Xinwu District' : '新吴区' :
               m === 4 ?  that.ifEn ? 'Huishan District' : '惠山区' :
               m === 5 ?  that.ifEn ? 'Xishan District' : '锡山区' :
               m === 6 ?  that.ifEn ? 'Jiangyin City' : '江阴市' : 
                          that.ifEn ? 'Yixing City' : '宜兴市'
    }
  }
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
    background-size: cover;
    background-repeat: no-repeat;
  }
  .select-buy{
    padding-left: 45px;
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
    margin-bottom: 25px;
  }
  .service-tip{
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height:20px;
    padding-bottom: 15px;
    span{
      padding-left: 6px;
      color: #000000;
    }
  }
  .btns{
    margin-top: 43px;
    .advisory,.addCart{
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
    .advisory{
      img{
        vertical-align: middle;
      }
      background-color: #fff;
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
    padding: 42px 28px 0;
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
    width: 80%;
    margin: 0 auto;
    display: block;
  }
}
</style>