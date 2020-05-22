<template>
  <div class="programme">
    <slot/>
    <div class="programme-title" v-if="title">{{title}}</div>
    <div class="programme-box" :style="bg">
      <div class="programme-content base-width">
      <div class="programme-top">
        <img :src="programme" alt="">
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'programme',
  data: () => ({}),
  computed: {},
  props: {
    programme: {
      type: String
    },
    title: {
      type: String
    },
    bg: {
      type: Object
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.programme{
  margin: 0 auto 50px;
  .programme-title{
    font-size: 2.2rem;
    line-height: 50px;
    color: #303234;
    margin: 25px auto 50px;
    text-align: center;
  }
  .programme-content{
    margin: 0 auto;
    .programme-top, .programme-unter{
      display: flex;
      justify-content: center;
    }
  }
}
</style>
