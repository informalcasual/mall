<template>
  <div class='BgBanner' :style="{'backgroundImage' : 'url(' + bg + ')'}" />
</template>

<script>
export default {
  name: 'BgBanner',
  data: () => ({

  }),
  props: [
    'bg'
  ],
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

<style lang='scss' scoped>

.BgBanner {
  width: 100%;
  height: 610px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  background-position: center;
  background-size: cover;
}

</style>
