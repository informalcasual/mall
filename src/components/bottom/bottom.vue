<template>
  <div class="bottom">
    <div class="box bottom-box">
      <div class="info">
        <div class="tit">联系我们</div>
        <div class="tip">地址：江苏省无锡市滨湖区XXXXXXXXX</div>
        <div class="tip">电话：0510-89329849</div>
        <div class="tip">邮箱：8368457368@ipark.com</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bottom{
  padding: 36px 0 55px;
  background-color: #202730;
  color: #fff;
  width: 100%;
}
.bottom-box{
  position: flex;
  align-items: center;
  .info{
    flex-grow: 1;
    .tit{
      font-size:32px;
      color:rgba(255,255,255,1);
      line-height:38px;
      padding-bottom: 24px;
    }
    .tip{
      font-size:16px;
      line-height:19px;
      padding-bottom: 10px;
    }
  }
}
</style>
