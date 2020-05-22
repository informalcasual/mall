<template>
  <div class="project-slot"
    :style="{ borderColor: baseColor }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    baseColor: {
      type: String,
      default: ''
    }
  },
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
.project-slot {
  width: 100%;
  height: 100%;
  background: #fff;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  box-sizing: border-box;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-top: 2px solid;
}
</style>
