<template>
  <div class="fiexd-pop" v-if="show">
    <div class="box-pop">
      <div class="pop-close">
        <img class="pointer"  @click.stop="close()" :src="require('@/assets/img/pop-close.svg')" width="23" alt="">
      </div>
      <template v-if="!success">
        <div class="pop-title">请留下您的信息</div>
        <div class="pop-box">
          <div class="address-item">
            <p class="tit">姓名</p>
            <div class="add-input">
              <input type="text"  v-model="name" name="" placeholder="请输入您的姓名">
            </div>
          </div>
          <div class="address-item">
            <p class="tit">联系电话</p>
            <div class="add-input">
              <input type="text" v-model="phone" name="" placeholder="请输入联系电话">
            </div>
          </div>
          <div class="address-item">
            <p class="tit">需求详情</p>
            <div class="add-input">
              <textarea  v-model="request" placeholder="请输入详细需求，我们将第一时间联系你"></textarea>
            </div>
          </div>
          <div class="address-item">
            <p class="tit"></p>
            <div @click.stop="getInfo()" class="add-btn main-brown pointer">确定</div>
          </div>
        </div>
      </template>
      <template v-else>
        <tip :title="'填写成功'" :info="'我们将在第一时间联系您，为您服务'"  />
       </template>
      
    </div>
  </div>
</template>
<script>
import tip from '@/components/successTip/tip1';
export default {
  data: () => ({
    show: false,
    phone:'',
    name: '',
    request: '',
    success: false
  }),
  methods: {
    ifShow() {
      this.$bus.on('showAdvisory', val => {
        this.show = val
      })
    },
    async getInfo(){
      let data = {
        serviceId: parseInt(this.$route.params.id),
        name: this.name,
        request: this.request,
        phone: this.phone
      }
      let falg = true
      for(let ele in data){
        if(!data[ele]){
          falg = false
          this.$message.error("请完整填写信息");
          break;
        }
      }
      if(!falg){
        return
      }
      let res = await this.$apiFactory.getTrademarkApi().putServiceContant(data)
      if(res.status == 200) {
        this.success = true
      }
      
    },
    close(){
      this.show = false
    },
  },
  created(){
    this.ifShow()
  },
  components:{
    tip
  },
  beforeDestory(){
    this.$bus.off('showAdvisory')
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
