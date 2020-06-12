<template>
  <div class="address">
    <div class="no-address pointer" :class="{'hover-left': ifHave}" @click.stop="addAddress()">
      <img :src="require('@/assets/img/plus.svg')"  width="26" alt="">
      <span class="text">新增收货地址</span>
    </div>
    <div class="have-address" v-if="ifHave" :class="{'limit-height': !show}">
        <div class="address-title">收货人信息</div>

        <div class="address-info flex" v-for="(item, index) in addressList" :key="index">
          <span class="select pointer" @click.stop="changeAddress(index, item.id)" :class="{'act': actindex == index}"></span>
          <span>{{item.name}}</span><span>{{item.phone}}</span><span>{{item.address}}</span>
          <span v-if="index == 0" class="pointer pulldown" @click.stop="show = !show">更多地址<img :src="require('../img/download.svg')" width="10" alt="">
          </span>
        </div>
    </div>
    <ADDaddress @getAddress="getAddress"/>
  </div>
</template>
<script>
import ADDaddress from './add-dress'
export default {
  data: ()=>({
    show: false,
    actindex: 0,
  }),
  props: {
    ifHave: {
      type: Boolean,
      default: false,
    },
    addressList: {
      type: Array,
    }
  },
  methods: {
    changeAddress(index, id){
      this.actindex = index
      this.$emit('selectAddress', id)
    },
    addAddress(){
      this.$bus.emit('showAddress', true)
    },
    getAddress(item){
      this.addressList.splice(0, 0, item)
      this.changeAddress(0, item.id)
    },
  },
  components: {
    ADDaddress
  }
}
</script>

<style lang="scss" scoped>
.address{
  padding: 22px 65px 30px;
  text-align: center;
  min-height: 62px;
  position: relative;
  .no-address{
    margin-top: 25px;
    position: absolute;
    left: 50%;
    margin-left: -62px;
    width: 126px;
    img{
      vertical-align: middle;
    }
    .text{
      font-size:14px;
      color:rgba(112,42,42,1);
      line-height:20px;
      vertical-align: middle;
      padding-left: 10px;
    }
  }
  .have-address{
    text-align: left;
    overflow: hidden;
  }
  .limit-height{
    height: 62px;
  }
  .address-title{
    font-size:14px;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:20px;
  }
  .address-info{
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    padding-top: 20px;
    span+span{
      padding-left: 30px;
    }
  }
  .pulldown{
    padding-left: 63px!important;
    font-size:14px;
    color:rgba(112,42,42,1);
    line-height:20px;
    img{
      padding: 0 3px;
      vertical-align: middle;
    }
  }
  .select{
    width: 18px;
    height: 18px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #702A2A;
    margin-right: 14px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 14px;
  }
  .act{
    background-image: url('../img/right.svg')
  }
  .hover-left{
    top: -6px;
    transform: translateX(316%)
  }
}
</style>
