<template>
  <el-row type="flex" class="row-bg topNav" justify="space-around">
    <el-col v-for='(tab, i) in tabsData' :key="tab.title" :span="6">
      <div @mouseenter='hoverIt(i)' @mouseleave='outIt(i)' class="grid-content" :class="[nowTab == i ? 'activeTab' : '']">
        <div v-if='tab.tip' class='tip'>
          {{ tab.tip }}
        </div>
        <div class='title'>
          {{ tab.title }}
        </div>
        <div class='subtitle'>
          {{ tab.subtitle }}
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'tabs',
  data: () => ({
    nowTab: 0,
    hover: {}
  }),
  props: [
    'tabsData'
  ],
  methods: {
    initHover() {
      this.hover = {
        hoverId: 0,
        hoverList: []
      }
      this.hover.hoverList.length = this.tabsData.length
      this.hover.hoverList.fill(false)
    },
    switchTab(i) {
      this.nowTab = i
      this.$emit('switchTab', i)
    },
    hoverIt(i) {
      this.hover.hoverId = i
      this.hover.hoverList[i] = true
      setTimeout(() => {
        if (this.hover.hoverList[i]) {
          this.switchTab(i)
        }
      }, 100)
    },
    outIt(i) {
      this.hover.hoverList[i] = false
    }
  },
  created() {
  },
  mounted() {
    this.initHover()
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
.topNav {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  .grid-content {
    text-align: center;
    height: 76px;
    width: 140px;
    margin: 0 auto;
    cursor: pointer;
    position: relative;
    .tip {
      background: #e51429;
      color: #fff;
      position: absolute;
      font-size: 0.8rem;
      padding: 3px;
      border-radius: 4px;
      right: -4px;
      top: 21px;
    }
    .title {
      font-size: 1.3rem;
      padding-top: 20px;
      margin-bottom: 8px;
      font-weight: 800;
    }
    .subtitle {
      font-size: 0.8rem;
      opacity: 0.6;
    }
  }
  .activeTab {
    border-bottom: 3px solid #e51429;
    color: #e51429 !important;
  }
}
</style>
