<template>
  <div class="fiexd-pop" v-show="show" @click.stop="show = false">
    <div class="state-box" @click.stop="">
      <div class="state-tit">文化锡云---无锡文化贸易服务平台<br>免责声明</div>
      <div class="stat-cont">
        <p>1、凡本站涉及的商标、标识的商品/服务并非来源于本站，更非本站提供，与本站无关，系他人的商品或服务。本站对于该类商标、标识不拥有任何权利，也不作任何的保证或担保；</p>
        <p>2、凡本站注明”文章来源”的所有文章作品，均转载、编译或摘编自其它媒体，目的在于传递更多信息，并不代表本站赞同其观点和对其真实性负责。其他媒体、网站或个人转载使用时必须保留本站注明的文章来源，并自负法律责任。</p>
        <div class="state-btn pointer" @click.stop="show = false">我知道了</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false,
  }),
  methods: {
    openState(){
      this.$bus.on('statementShow',(val)=>{
        this.show = val
      })
    }
  },
  created(){
    this.openState()
  }
}
</script>
<style lang="scss" scoped>
.state-box {
  width:551px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  overflow: hidden;
  .state-tit{
    font-size:22px;
    font-weight:600;
    color:rgba(0,0,0,1);
    text-align: center;
    line-height:30px;
    padding: 26px 0 20px;
    border-bottom: 1px solid rgba(110, 43, 43, 0.1);
  }
  .stat-cont{
    font-size:12px;
    font-weight:300;
    color:rgba(0,0,0,1);
    line-height:17px;
    padding: 21px 34px 25px;
    p + p{
      padding-top: 20px;
    }
    .state-btn {
      width:205px;
      height:34px;
      background:rgba(110,43,43,1);
      border-radius:17px;
      font-size:14px;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:34px;
      text-align: center;
      margin: 24px auto 0;
    }
  }
}
</style>
