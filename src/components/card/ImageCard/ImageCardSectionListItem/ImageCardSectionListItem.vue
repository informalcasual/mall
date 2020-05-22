<template>
 <div class="image-card">
   <div class="image-card-cover">
     <img :src="options.imageUrl" alt="It's an image">
   </div>
   <slot></slot>
 </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.image-card-cover {
  width: 100%;
  height: 250px;
  > img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    object-fit: cover;
  }
}
</style>
