<template>
  <div class='partner'>
    <slot/>
    <img :src="require('@/assets/img/partner.jpg')" alt="">
  </div>
</template>

<script>
export default {
  name: 'partner',
  data: () => ({

  }),
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

.partner {
  padding-bottom: 60px;
  img {
    display: block;
    margin: 0 auto;
    width: 1050px;
  }
}

</style>
