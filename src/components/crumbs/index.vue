<template>
  <div class="crumbs">
    当前位置：
    <span 
    class="pointer"
    :class="{'act-item': item.url}"
    v-for="(item,index) in titleList"
    :key="index"
    @click.stop="toLink(item.url)"
    >{{item.name}}</span>
  </div>
</template>
<script>
export default {
  props: {
    titleList: {
      type: Array,
    }
  },
  methods:{
    toLink(url){
      if(url){
        window.open(url, '_self')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.crumbs{
  padding: 20px 0 15px;
  font-size:14px;
  color:rgba(102,102,102,1);
  line-height:20px;
  text-align: left;
  .pointer{
    margin-right: 15px;
    position: relative;
  }
  .pointer + .pointer{
    &::before{
      content: '>';
      top: 0;
      left: -13px;
      position: absolute;
    }
  }
  .act-item{
    &:hover{
      color: #65b2e8;
    }
  }
}
</style>
