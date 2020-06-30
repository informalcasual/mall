<template>
  <div class="fiexd-pop">
    <div class="box-pop">
      <div class="pop-close">
        <img class="pointer"  @click.stop="close()" :src="require('@/assets/img/pop-close.svg')" width="23" alt="">
      </div>
      <div class="box-pop2">
        <template v-if="!success">
          <div class="pop-title">申请售后原因</div>
          <div class="pop-box2">
            <div class="address-item">
              <div class="add-input">
                <label for="type1">
                  <div class="select" :class="{'select-act': reason== 1}"></div>
                  <input type="radio" value="1" id="type1" v-model="reason" > 不想要了
                </label>
                <label for="type2">
                  <div class="select"  :class="{'select-act': reason==2}"></div>
                  <input type="radio" value="2" id="type2" v-model="reason" > 多拍/拍错
                </label>
                <label for="type3">
                  <div class="select"  :class="{'select-act': reason==3}"></div>
                  <input type="radio" value="3" id="type3" v-model="reason" > 商品存在质量问题
                </label>
                <label for="type4">
                  <div class="select" :class="{'select-act': reason==4}"></div>
                  <input type="radio" value="4" id="type4" v-model="reason" > 其他原因
                </label>
              </div>
            </div>
            <div class="address-item">
              <textarea  v-model="remark" placeholder="补充"></textarea>
            </div>
            <div class="address-item btn">
              <div @click.stop="refund()" class="add-btn main-brown">立即申请</div>
            </div>
          </div>
        </template>
        <template v-else>
          <tip :title="'申请成功'" :info="'我们将在第一时间联系您，为您服务'" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import tip from '@/components/successTip/tip1'
export default {
  data: () => ({
    reason: 1,
    remark: '',
    success: false,
  }),
  methods: {
    async refund() {
      let data = {
        reason: parseInt(this.reason),
        remark: this.remark,
        orderItemId: this.itemId
      }
      let url = await this.$apiFactory.getOrdersApi().refundOrder(data)
      if(url.status == 200) {
        this.close()
      }
    },
    close(){
      this.$emit('showSale')
    }
  },
  props: {
    itemId: {
      type: Number,
    }
  },
  components: {
    tip
  },
  created(){
    this.itemId = val.itemId
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
.box-pop2{
  text-align: center;
  .pop-title{
    font-size:16px;
    color:rgba(0,0,0,1);
    line-height:22px;
    padding: 0;
  }
  .pop-box2{
    padding-top: 30px;
  }
}
.address-item{
  width: 266px;
  margin: 0 auto;
  textarea{
    width:260px;
    height:103px;
    border-radius:4px;
  }
  .add-btn{
    width:160px;
    height:50px;
    margin: 20px auto 0;
    border-radius:4px;
    font-size:14px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:50px;
  }
}
.add-input{
  text-align: left;
  label{
    margin:14px 0;
    display: block;
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    input{
      display: none;
    }
    .select{
      width:20px;
      height:20px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(151,151,151,1);
      display: inline-block;
      margin-right: 11px;
      border-radius: 50%; 
      vertical-align: middle;
    }
    .select-act{
      background-image: url('./img/select.svg');
      background-position: center;
      background-size: cover;
      border-color: #702A2A;
    }
  }
}
</style>
