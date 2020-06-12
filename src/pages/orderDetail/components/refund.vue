<template>
  <div class="fiexd-pop" v-if="show">
    <div class="box-pop">
      <div class="pop-close">
        <img class="pointer"  @click.stop="close()" :src="require('@/assets/img/pop-close.svg')" width="23" alt="">
      </div>

        <div class="pop-title">申请退款</div>
        <div class="pop-box">
          <div class="address-item">
            <p class="tit">退款理由：</p>
            <div 
            class="add-input"
            :class="{'red-box': !ifFull}"
            >
              <textarea @click.stop="ifFull=true" v-model="reason" placeholder="请输入退款理由"></textarea>
            </div>
          </div>
          <div class="address-item">
            <p class="tit">退款方式：</p>
            <div class="add-audio">
              <label class="pointer" ><input type="radio" name="refundtype" value="1" v-model="retype"/>仅退款</label>
              <label class="pointer" style="margin-left:20px;"><input type="radio" name="refundtype" value="2" v-model="retype"/>退货退款</label>
            </div>
          </div>
          <div class="address-item">
            <p class="tit"></p>
            <div @click.stop="refund()" class="add-btn main-brown pointer">确定</div>
          </div>
        </div>
      
    </div>
  </div>
</template>
<script>
import tip from '@/components/successTip/tip1';
export default {
  data: () => ({
    show: false,
    retype: 1,
    ifFull: true,
    reason: ''
  }),
  methods: {
    ifShow() {
      this.$bus.on('showrefund', val => {
        this.show = val
      })
    },
    refund(){
      if(!this.reason){
        return this.ifFull = false
      } 
      this.$emit('refund', {remark: this.reason, type: this.retype})
      this.show = false
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
  align-items: flex-start;
  margin-bottom: 15px;
  .tit{
    width: 75px;
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
  .red-box {
    border-color: #f00;
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
