<template>
 <div class="content">
   <div class="imag-wrapper">
     <a :href="carouselItem.url" target='_blank'>
      <img :src="carouselItem.imageUrl" alt="背景图片" width="100%" height="100%">
     </a>
   </div>
   <!-- <h2 class="name">{{ carouselItem.name }}</h2>
   <p class="description">{{ carouselItem.description }}</p> -->
 </div>
</template>

<script>
export default {
  props: {
    carouselItem: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  color: rgba(255, 255, 255, 1);
  .imag-wrapper {
    height: 100%;
    img {
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .name {
    position: absolute;
    left: 30px;
    bottom: 38px;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
  }
  .description {
    position: absolute;
    left: 30px;
    bottom: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
