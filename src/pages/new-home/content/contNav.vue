<template>
  <div class="topNav">
    <div class="title">{{title}}</div>
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
    }
  },
  methods: {
    toLink(url){
      this.$router.push(url)
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
    flex-grow: 1;
    font-size:24px;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:33px;
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
