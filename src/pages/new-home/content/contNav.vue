<template>
  <div class="topNav">
    <div class="title">{{title}}</div>
    <div class="tips flex">
      <div 
      v-for="(item, index) in tipList"
      :key="index"
      :class="{'act': item.id == actId}" 
      @click.stop="changeType(item.id)"
      class="tip-box pointer">
       {{item.name}}{{item.id}}
      </div>
    </div>
    <div class="more pointer" @click.stop="toLink(url)">{{btnTitle}}</div>
  </div>
</template>
<script>
export default {
  props:{
    title: {
      type: String,
    },
    btnTitle: {
      type: String
    },
    url: {
      type: String
    },
    tipList: {
      type: Array
    },
    actid: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    actId: 0,
  }),
  methods: {
    toLink(url){
      this.$router.push(url)
    },
    changeType(id){
      this.actId = id
      this.$emit('typeSeach', id)
    }
  },
  created(){
    
  },
  watch:{
    actid(m){
      this.actId = m
    }
  }
}
</script>
<style lang="scss" scoped>
.topNav{
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 22px;
  .title{
    flex-grow: 0;
    font-size:24px;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:33px;
  }
  .tips{
    flex-grow: 1;
    width: 40%;
    padding-left: 29px;
    .tip-box{
      padding: 0 10px;
      margin: 12px 11px 0;
      font-size:16px;
      color:rgba(0,0,0,1);
      line-height:22px;
    }
    .act{
      color: #702A2A;
    }
  }
  .more{
    flex-grow: 0;
    width:130px;
    height:42px;
    border-radius:4px;
    border:1px solid rgba(0,0,0,1);
    font-size:14px;
    font-weight:500;
    text-align: center;
    color:rgba(0,0,0,1);
    line-height:42px
  }
}
</style>
