<template>
  <div class='BgBanner' :style="{'backgroundImage' : 'url(' + bg + ')'}">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'BgBanner',
  data: () => ({}),
  props: {
    bg: {
      type: String,
      required: true
    }
  },
  methods: {

  },
  created() {

  },
  mounted () {

  },
  watch: {

  },
  computed: {

  },
  components: {

  }
}
</script>
<style lang="scss" scoped>
.BgBanner {
  width: 100%;
  height: 370px;
  padding-top: 120px;
  box-sizing: border-box;
  position: absolute;
  top: 46px;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.1);
  background-position: center;
  background-size: cover;
}
</style>
