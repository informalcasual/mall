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
      <div class="select-box pointer" @click.stop="show = !show">
         {{select_name}}
        <div class="pointer-box" v-show="show">
          <p @click.stop="changeAttr(0)" >全部</p>
          <p @click.stop="changeAttr(index+1)"  v-for="(item, index) in select_list" :key="index">
            {{item.name}}
          </p>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import crumbs from '@/components/crumbs/index'
export default {
  data: () => ({
    crumbsList: [],
    select_list: [],
    product: [],
    service: [],
    select_name: '全部',
    show: false,
    select_index: 0,
  }),
  methods:{
    chagePage(name){
      this.$router.push({
        name: name
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
          url: ''
        },{
          name: '文化产品',
          url: ''
        }]
      } else {
        this.select_list = this.service
        this.crumbsList = [{
          name: '文化贸易',
          url: ''
        },{
          name: '文化服务',
          url: ''
        }]
      }
      this.select_index = 0
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
  .select-box{
    width:130px;
    height:42px;
    border-radius:4px;
    border:1px solid rgba(0,0,0,1);
    font-size:14px;
    font-weight:500;
    color:rgba(0,0,0,1);
    text-align: center;
    line-height:42px;
    display: inline-block;
    float: right;
    position: relative;
    .pointer-box{
      position: absolute;
      padding: 12px 10px;
      top: 48px;
      left: -1px;
      background-color: #f4f6f9;
      width: calc(100% - 20px);
      border: 1px solid;
      border-radius: 4px;
      p{
        &:hover{
          background-color: #e9f0fc;
          color: #82adf6;
        }
      }
    }
  }
}
</style>
