<template>
  <div class="box spread">
    <div class="top" :style="{'background-image': `url(${require('./img/topBanner.png')})`}">
       <div class="title">
         {{ifEn ? 'Wuxi Cultural Export Base' : '无锡文化出口基地'}}
         <p>{{ifEn ? 'Wu Culture Jiangnan Culture' : '吴文化江南文化'}}</p>
       </div>
    </div>
    <crumbs :titleList="crumbsList"/>
    <div class="selected">
      <div class="product pointer" @click.stop="chagePage('culturalproduct')" :class="{'main-brown': $route.name==='culturalproduct'}">{{ifEn ? 'PRODUCT' : '文化产品'}}</div><!--
   --><div class="service pointer" @click.stop="chagePage('culturalservice')" :class="{'main-brown': $route.name==='culturalservice'}">{{ifEn ? 'SERVICE' : '文化服务'}}</div>
    </div>
    <div class="select-box pointer">
      <!-- <p @click.stop="changeAttr(0)" :class="{'act-p': select_index === 0}" >全部</p> -->
      <p @click.stop="changeAttr(index+1)" :class="{'act-p': select_index === index+1}"  v-for="(item, index) in select_list" :key="index">
        {{item.name}}
      </p>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import crumbs from '@/components/crumbs/index'
export default {
  data: () => ({
    crumbsList: [],
    select_list: [],
    product: [],
    service: [],
    select_name: '全部',
    select_index: 0,
  }),
  methods:{
    chagePage(name){
      this.$router.push({
        name: name,
        query: { 
          path: name === 'culturalproduct' ? this.product[0].id : this.service[0].id,
          page: 0
        }
       
      })
      this.show = false
    },
    async getCategory() {
      let res = await this.$apiFactory.getTrademarkApi().getCategoray(1)
      if(res.status == 200){
        this.product = res.data
      }
      let _res = await this.$apiFactory.getTrademarkApi().getCategoray(2)
      if(_res.status == 200){
        this.service = _res.data
      }
      this.changeType()
    },
    changeType (){
      if(this.$route.name == 'culturalproduct') {
        this.select_list = this.product
        this.crumbsList = [{
          name: '文化贸易',
          e_name: 'Cultural Trade',
          url: ''
        },{
          name: '文化产品',
          e_name: 'PRODUCT',          
          url: ''
        }]
      } else {
        this.select_list = this.service
        this.crumbsList = [{
          name: '文化贸易',
          e_name: 'Cultural Trade',          
          url: ''
        },{
          name: '文化服务',
          e_name: 'SERVICE',          
          url: ''
        }]
      }
      this.changeAttr(1)
      this.select_name = '全部'
    },
    changeAttr(type){
      if(type == this.select_index){
        this.show = false
        return
      }
      this.show = false
      let name = ''
      this.select_index = type == 0 ? 0 : type
      if(this.$route.name == 'culturalproduct') {
        name = 'culturalproduct'
      } else {
        name = 'culturalservice'
      }

      this.select_name = this.select_index == 0 ? '全部' : this.select_list[this.select_index-1].name
     
      if(type == 0) {
        this.$router.push({
          name: name
        })
        return
      }
      this.$router.push({
        name: name,
        query: {
          page: 0,
          path: this.select_list[this.select_index-1].id
        }
      })
    }
  },
  components: {
    crumbs
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    }),
  },
  watch:{
    '$route.name'(){
      this.changeType()
    }
  },
  created(){
    this.getCategory()
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
  .select-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      color: #666666;
      margin: 0 25px;
      position: relative;
    }   
    .act-p {
      font-weight: 600 !important;
      color: #333333;
    }
    p + p{
      &::before{
        content: '/';
        font-weight: 700;
        color: #c0c4cc;
        position: absolute;
        top: 0;
        left: -30px;
      }
    }
  }
</style>
