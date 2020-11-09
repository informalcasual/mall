<template>
  <div class="fiexd-pop" v-if="show">
    <div class="box-pop">
      <div class="pop-close">
        <img class="pointer"  @click.stop="close()" :src="require('@/assets/img/pop-close.svg')" width="23" alt="">
      </div>
      <div class="pop-title">{{ifEn ? 'Add shipping address' : '新增收货地址'}}</div>
      <div class="pop-box">
        <div class="address-item">
          <p class="tit">{{ifEn ? 'addressee' : '收件人'}}</p>
          <div class="add-input" :class="{'errorHover': iferror == 1}" >
            <input type="text" v-model="name" name="" :placeholder="ifEn ? 'Please enter the name of the recipient' : '请输入收件人姓名'">
          </div>
        </div>
        <div class="address-item">
          <p class="tit">{{ifEn ? 'province and city' : '省市区'}}</p>
          <div class="add-input" style="border: none;padding: 0;" >
            <v-distpicker  @selected="onSelected"></v-distpicker>
          </div>
        </div>
        <div class="address-item">
          <p class="tit">{{ifEn ? 'contact number' : '联系电话'}}</p>
          <div class="add-input" :class="{'errorHover': iferror == 2}">
            <input type="text" v-model="phone" name="" :placeholder="ifEn ? 'Please enter the contact number' : '请输入联系电话'">
          </div>
        </div>
        <div class="address-item">
          <p class="tit">{{ifEn ? 'detailed address' : '详细地址'}}</p>
          <div class="add-input" :class="{'errorHover': iferror == 3}">
            <textarea  v-model="address" :placeholder="ifEn ? 'Please enter the detailed address' : '请输入详细地址'"></textarea>
          </div>
        </div>
        <div class="address-item">
          <p class="tit"></p>
          <div @click.stop="getAddress()" class="add-btn main-brown pointer">{{ifEn ? 'sure' : '确定'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import VDistpicker from 'v-distpicker'
export default {
  data: () => ({
    show: false,
    phone:'',
    name: '',
    address: '',
    province: '',
    district: '',
    city: '',
    iferror: 0,
  }),
  methods: {
    ifShow() {
      this.$bus.on('showAddress', val => {
        this.show = val
      })
    },
    close(){
      this.show = false
    },
    onSelected(data){
      this.province = data.province.value
      this.district = data.area.value
      this.city = data.city.value
    },
    async getAddress() {
      
      this.iferror = !this.name ? 1 : !this.phone ? 2 : !this.address ? 3 : !this.province && this.province !='省' ? 4 :
                     !this.city && this.city != "市" ? 5 : !this.district && this.district !="区" ? 6 : 0
      if(this.iferror !== 0) {
        return
      }
      let data = {
        address: this.address,
        phone: this.phone,
        province: this.province,
        city: this.city,
        district: this.district,
        name: this.name,
      }
      let res = await this.$apiFactory.getaddressApi().addAddress(data)
      if(res.status == 200) {
        this.$emit('getAddress',{
          name: this.name,
          phone: this.phone,
          address: this.address,
          province: this.province,
          city: this.city,
          district: this.district,
          id: res.data.id
        })
        this.close()
      }
      
    }
  },
  components: { 
    VDistpicker 
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    })
  },
  created(){
    this.ifShow()
  },
  beforeDestory(){
    this.$bus.off('showAddress')
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
    border:1px solid rgba(0,0,0,0.15);
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
.errorHover{
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #fe2d44;
  }
  
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fe2d44;
  }
  
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #fe2d44;
  }   
}
</style>
<style lang="scss">
.distpicker-address-wrapper{
  display: flex;
  select{
    width: 100%;
    padding: 8px 2px;
    overflow: hidden;
  }
}

  label{
    flex-grow: 1;
    width: 20%;
    overflow: hidden;

  }
  label + label{
    margin-left: 10px;
  }
</style>
