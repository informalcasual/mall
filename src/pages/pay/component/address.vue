<template>
  <div class="address">
    <div class="no-address pointer" :class="{'hover-left': ifHave}" @click.stop="addAddress()">
      <img :src="require('@/assets/img/plus.svg')"  width="26" alt="">
      <span class="text">新增收货地址</span>
    </div>
    <div class="have-address" v-if="ifHave">
      <div class="address-title">收货人信息</div>
      <div class="address-info"><span>{{name}}</span><span>{{phone}}</span><span>{{address}}</span></div>
    </div>
  </div>
</template>
<script>
export default {
  data: ()=>({
  }),
  props: {
    ifHave: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    }
  },
  methods: {
    addAddress() {
      this.$emit('addAddress')
    }
  }
}
</script>

<style lang="scss" scoped>
.address{
  padding: 22px 65px 30px;
  text-align: center;
  height: 62px;
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
  .hover-left{
    top: -6px;
    transform: translateX(316%)
  }
}
</style>
