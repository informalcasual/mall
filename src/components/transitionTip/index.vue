<template>
  <div class="load">
    <load  v-show="loading"/>
    <div 
    class="nothing"
    :style="{'background-image': `url(${require('./img/nothing.png')})`}"
    v-show="!loading && List.length < 1"
    >
    </div>
  </div>
</template>
<script>
import load from './load'
export default {
  components: {
    load,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    List: {
      type: Array,
      default: []
    }
  }
}
</script>
<style lang="scss" scoped>
.load{
  width: 100%;
  height: 100%;
}
.nothing{
  width: 287px;
  height: 200px;
  margin: 20px auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

