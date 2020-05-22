<template>
 <section class="base-carouse tc">
   <slot></slot>

   <div class="base-width auto">
     <el-carousel indicator-position="outside" :height="option.height">
      <el-carousel-item v-for="(set, index) in sets" :key="set">
        <CarouselList :carousel="carousel[index]" :option="option" />
      </el-carousel-item>
    </el-carousel>
   </div>
 </section>
</template>

<script>
import CarouselList from './BaseCarouselList/BaseCarouselList.vue'

export default {
  props: {
    // 配置参数
    option: {
      type: Object
    },
    // 轮播的组数
    sets: {
      type: Number,
      default: 1
    },
    // 轮播的数据内容
    carousel: {
      type: Array
    }
  },
  components: {
    CarouselList
  }
}
</script>

<style lang="scss" scoped>
.base-carouse {
  h2 {
    margin-top: 40px;
    margin-bottom: 22px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 40px;
  }
  .el-carousel {
    overflow: hidden;
  }
}
</style>
