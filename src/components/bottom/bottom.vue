<template>
  <div class="bottom">
    <div class="box bottom-box">
      <div class="info">
        <div class="tit">联系我们</div>
        <div class="info-box flex">
          <div class="tip"><img :src="require('./img/phone.svg')" width="52" alt=""><p class="tip-tit">电话<br/>0510-89329849</p></div>
          <div class="tip"><img :src="require('./img/email.svg')" width="52" alt=""><p class="tip-tit">邮箱<br/>8368457368@ipark.com</p></div>
          <div class="tip"><img :src="require('./img/location.svg')" width="52" alt=""><p class="tip-tit">地址<br/>江苏省无锡市滨湖区XXXXXXXXX</p></div>
        </div>
      </div>
      <div class="img">
        <div class="code-box">
          <img :src="require('@/assets/img/code.jpg')" width="121" alt="">
        </div>
        <p>官方公众号</p>
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
  display: flex;
  align-items: center;
  .info{
    flex-grow: 1;
    .info-box {
      .tip{
        img{
          padding-right: 14px; 
          vertical-align: middle;
        }
        .tip-tit{
          display: inline-block;
          font-size:16px;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:26px;
          vertical-align: middle;
        }
      }
      .tip + .tip{
        padding-left: 70px;
      }
    }
    .tit{
      font-size:32px;
      color:rgba(255,255,255,1);
      line-height:38px;
      padding-bottom: 41px;
    }
  }
  .img{
    flex-grow: 0;
    text-align: center;
    padding: 10px 10px 0 10px;
    .code-box{
      padding: 10px;
      background-color: #2C353F;
    }
    p{
      padding-top: 10px;
      font-size:14px;
      color:rgba(255,255,255,1);
      line-height:17px;
    }
  }
}
</style>
