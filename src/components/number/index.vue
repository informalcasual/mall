<template>
  <div class="number base-width">
    <div class="item" v-for="(s, i) in list" :key="i">
      <p>{{s.num}}</p>
      <span>{{s.desc}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'number',
  data: () => ({}),
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.number{
  margin: 20px auto 60px;
  display: flex;
  justify-content: space-around;
  .item{
    min-width: 20%;
    text-align: center;
    p{
      font-size: 64px;
      line-height: 90px;
      color: #e51429;
    }
    span{
      font-size: 18px;
      line-height: 25px;
      color: #000000;
    }
  }
}
</style>
