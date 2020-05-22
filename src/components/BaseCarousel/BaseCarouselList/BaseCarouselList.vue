<template>
  <el-row class="carouse-list" :gutter="option.rowGutter">
    <el-col class="carouse-item" v-for="(item, index) in slides" :key="index" :span="option.colSpan">
      <div class="carouse-item-innner rel">
        <BaseCarouselListItem :carouselItem="carousel[index]"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import BaseCarouselListItem from '../BaseCarouselListItem/BaseCarouselListItem'

export default {
  props: {
    option: {
      type: Object
    },
    carousel: {
      type: Array
    },
    // 每组轮播包含三个子项
    slides: {
      type: Number,
      default: 3
    }
  },
  components: {
    BaseCarouselListItem
  }
}
</script>

<style lang="scss">
.carouse-list {
  height: 100%;
  .carouse-item {
    height: 100%;
  }
  .carouse-item-innner {
    width: 100%;
    height: 100%;
  }
}
</style>
