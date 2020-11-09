<template>
  <div class="bottom">
    <div class="box bottom-box">
      <div class="info">
        <div class="tit">{{ifEn ? 'CONTACT US' : '联系我们'}}</div>
        <div class="info-box flex">
          <div class="tip"><img :src="require('./img/phone.svg')" width="52" alt=""><p class="tip-tit">{{ifEn ? 'PHONE' : '电话'}}<br/>0510-81823031</p></div>
          <div class="tip"><img :src="require('./img/email.svg')" width="52" alt=""><p class="tip-tit">{{ifEn ? 'EMAIL' : '邮箱'}}<br/>wxgjwhckjd@163.com</p></div>
          <div class="tip"><img :src="require('./img/location.svg')" width="52" alt=""><p class="tip-tit">{{ifEn ? 'ADDRESS' : '地址'}}<br/>
          {{ifEn ? 'Building 5, Civic Center, No. 1 Xinjingui Road' : '新金匮路1号市民中心5号楼'}}
          </p></div>
        </div>
      </div>
      <div class="img">
        <div class="code-box">
          <img :src="require('./img/logo.png')" style="padding-bottom: 3px;" width="125" alt="">
        </div>
        <p>{{ifEn ? 'Xiyun Culture' : '锡云文化'}}</p>
      </div>
      <div class="img">
        <div class="code-box">
          <img :src="require('@/assets/img/code.jpg')" width="121" alt="">
        </div>
        <p>{{ifEn ? 'Official account' : '官方公众号'}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    }),
  },
}
</script>

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
