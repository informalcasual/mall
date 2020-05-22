<template>
    <div class="back-top_container" @click="backToTop()">
        <div class="arrow arrow-left"></div>
        <div class="arrow arrow-right"></div>
    </div>
</template>
<script>
export default {
  name: 'backTop',
  data() {
    return {

    }
  },
  methods: {
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  watch: {

  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
.back-top_container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  position: relative;
  margin: 10px 0;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 0, 100, 0.1);
  border: 1px solid #d4d4d4;
}

.arrow {
  width: 16px;
  height: 3px;
  background: #000;
  border-radius: 20px;
  position: absolute;
  top: 38%;
  left: 50%;
  transition: all 0.3s;
}

.arrow-left {
  transform: translate(-16px, 0) rotate(-45deg);
  transform-origin: right top;
}

.arrow-right {
  transform: translate(1px, 0) rotate(45deg);
  transform-origin: left top;
}

.back-top_container:hover {
  .arrow-left {
    transform: translate(-17px, 0) rotate(-58deg);
    transform-origin: right top;
  }

  .arrow-right {
    transform: translate(1.5px, 0) rotate(58deg);
    transform-origin: left top;
  }
}

</style>
