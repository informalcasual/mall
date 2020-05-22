<template>
  <div
    id="contact_z_corner"
    class="corner-contact"
    :style="{'backgroundColor': $route.name=='promote' ? '#e51429' : ''}"
    onclick="qimoChatClick()"
  >
    <img src="./img/service.png" alt />
    <div class="tip">咨询客服</div>
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

  },
  watch: {

  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
.corner-contact {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #e51429;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 0, 100, 0.1);
  margin: 20px 0;
  img {
    position: absolute;
    width: 90%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .tip {
    width: 55px;
    height: 18px;
    background: #e51429;
    border-radius: 19px;
    font-size: 8px;
    padding: 2px;
    text-align: center;
    color: white;
    line-height: 18px;
    position: absolute;
    bottom: -13%;
    left: 8%;
  }
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
