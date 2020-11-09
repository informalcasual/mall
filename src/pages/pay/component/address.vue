<template>
  <div class="address">
    <div class="no-address pointer" :class="{'hover-left': ifHave}" @click.stop="addAddress()">
      <img :src="require('@/assets/img/plus.svg')"  width="26" alt="">
      <span class="text">{{ifEn ? 'Add New Address' : '新增收货地址'}}</span>
    </div>
    <div class="have-address" v-if="ifHave" :class="{'limit-height': !show}">
        <div class="address-title">{{ifEn ? 'Consignee information' : '收货人信息'}}</div>

        <div class="address-info flex" v-for="(item, index) in addressList" :key="index">
          <span class="select pointer" @click.stop="changeAddress(index, item.id)" :class="{'act': actindex == index}"></span>
          <span>{{item.name}}</span><span>{{item.phone}}</span><span>{{item.province}} {{item.city}} {{item.district}} {{item.address}}</span>
          <div class="btns pointer" @click.stop="defaultAddress(item.default, item.id, index)">
            <div class="if-default" title="选为默认地址"><div class="de_select pointer"  :class="{'act_def': item.default}"></div>
            <span v-if="item.default">(默认地址)</span> 
            <span v-else>{{ifEn ? 'Set as default' : '设为默认'}}</span>
            </div>
            <!-- <div class="default_change pointer" :style="{'background-image': `url(${require('../img/delete.svg')})`}"></div> -->
            <div class="default_del pointer" @click.stop="deleteAddress(item.id)"  :style="{'background-image': `url(${require('../img/delete.svg')})`}"></div>
          </div>
          <span v-if="index == 0 && addressList.length > 1" class="pointer pulldown" @click.stop="show = !show">{{ifEn ? 'more address' : '更多地址'}}<img :src="require('../img/download.svg')" width="10" alt="">
          </span>
        </div>
    </div>
    <ADDaddress @getAddress="getAddress"/>
  </div>
</template>
<script>
import ADDaddress from './add-dress'
import { mapState } from 'vuex'
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
    // 设为默认地址
    async defaultAddress(_default, id, i){
      if(_default) return
      let res = await this.$apiFactory.getaddressApi().firstAddress(id)
      this.addressList.forEach(ele => {
        ele.default = null
      })
      this.addressList[i].default = true
    },
    // 删除地址
    async deleteAddress(id){
      let res = await this.$apiFactory.getaddressApi().cancleAddress(id)
      if(res.status == 200){
        this.$emit('originAddress')
      }
    },
    getAddress(item){
      this.addressList.splice(0, 0, item)
      this.changeAddress(0, item.id)
    },
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    })
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
.btns{
  display: inline-block;
  display: flex;
  align-items: center;
  padding-left: 20px;
  .if-default{
    .de_select{
      width: 12px;
      height: 12px;
      border: 1px solid #e4e4e4;
      position: relative;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
    }
    span{
      color: #51c3ff;
      font-size: 12px;
      line-height: 18px;
    }
    .act_def{
      &:before{
        content: ' ';
        width: 8px;
        height: 8px;
        background-color: #4fbef4;
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 50%;
      }
    }
  }
  .default_del{
    width: 18px;
    height: 18px;
    background-position: center;
    background-size: cover;
    margin-left: 15px;
  }
}
</style>
