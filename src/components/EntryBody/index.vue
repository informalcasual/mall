<template>
  <div class='EntryBody'>
    <slot />
    <div class='contentWrap'>
      <tabs :tabsData='tabsData'  @switchTab="switchTab" />
      <div v-if='tab == 1'>
        <search :tab='tab' />
        <navWithIcon />
      </div>
      <div v-if='tab == 0'>
        <search />
        <imgShow />
      </div>
      <div v-if='tab == 2'>
        <consult />
      </div>
    </div>
  </div>
</template>

<script>
import tabsData from './data/topNav.js'
import tabs from './tabs.vue'
import search from './search.vue'
import navWithIcon from './navWithIcon.vue'
import imgShow from './imgShow.vue'
import consult from './consult.vue'

export default {
  name: 'EntryBody',
  data: () => ({
    tabsData,
    tab: 0
  }),
  methods: {
    switchTab(i) {
      this.tab = i
    }
  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  computed: {

  },
  components: {
    tabs,
    search,
    navWithIcon,
    imgShow,
    consult
  }
}
</script>

<style lang='scss' scoped>
.EntryBody {
  padding-top: 22px;
  position: relative;
  .contentWrap {
    width: 1200px;
    height: 560px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.06);
  }
}
</style>
