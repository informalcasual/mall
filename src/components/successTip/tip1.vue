<template>
    <div class="box-pop1">
      <div class="pop-title1">
        <img :src="require('@/assets/img/success.svg')" width="32" alt="">
        {{title}}
      </div>
      <div class="pop-info1">{{info}}</div>
      <div class="pop-btn">{{btn.tit}}</div>
    </div>
</template>
<script>
export default {
  data: () => ({
  }),
  props: {
    title: {
      type: String,
    },
    info: {
      type: String,
    },
    btn: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.box-pop{
  width:430px;
}
.pop-box{
  padding-right: 25px;
}
.address-item{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .tit{
    width: 60px;
    padding-right: 22px;
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    text-align: right;
    flex-grow: 0; 
  }
  .add-input{
    padding:15px 20px;
    flex-grow: 1;
    width: 20%;
    border-radius:4px;
    border:1px solid rgba(151,151,151,1);
    input{
      width: 100%;
      font-size:14px;
      color:rgba(0,0,0,0.9);
      line-height:20px;
    }
    textarea{
      font-size:14px;
      color:rgba(0,0,0,0.9);
      line-height:20px;
      border: none;
      width: 100%!important;
      height: 85px!important;
      resize: none;
    }
  }
  .add-btn{
    font-size:14px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
    flex-grow: 1;
    width: 50%;
    text-align: center;
    margin-top: 15px;
  }
}
</style>
