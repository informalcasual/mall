<template>
  <div class="setting">
    <tabline :title="items" :index="current" @clickItem="changeList" :hover="false" />
    <router-view></router-view>
  </div>
</template>
<script>
import Tabline from '@/components/tabLine/index.vue'
export default {
  name: 'collect',
  data: () => ({
    items: [
      {
        message: '基础信息',
        group: 'one'
      },
      {
        message: '企业信息',
        group: 'two'
      },
      {
        message: '密码设置',
        group: 'three'
      }
    ]
  }),
  components: {
    Tabline
  },
  created() {

  },
  computed: {
    current() {
      let c
      switch (this.$route.name) {
        case 'person':
          c = 0
          break
        case 'company':
          c = 1
          break
        case 'safety':
          c = 2
          break
      }
      return c
    }
  },
  watch: {

  },
  methods: {
    changeList(index) {
      switch (index) {
        case 0:
          this.$router.push({ path: 'person' })
          break
        case 1:
          this.$router.push({ path: 'company' })
          break
        case 2:
          this.$router.push({ path: 'safety' })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.collect {
  margin: 0 auto;
}
</style>
