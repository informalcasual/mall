<template>
  <div class="fiexd-pop">
    <div class="box-pop">
      <div class="pop-close">
        <img class="pointer"  @click.stop="close()" :src="require('@/assets/img/pop-close.svg')" width="23" alt="">
      </div>
      <div class="box-pop1">
        <div class="pop-info1">如产品出现产品质量问题，请致电厂家</br>厂家电话：{{phone}}</div>
        <div class="pop-btn pointer"  @click.stop="close()">我已知晓</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    close(){
      this.$emit('showSale')
    }
  },
  props: {
    phone: {
      type: String,
    }
  },
}
</script>

<style lang="scss" scoped>
.box-pop{
  width:430px;
}
.pop-box{
  padding-right: 25px;
}
.pop-info1{
  line-height: 35px;
  padding-top: 0;
  padding-bottom: 38px;
}
</style>
