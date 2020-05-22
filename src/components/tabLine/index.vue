<template>
  <div>
      <div class="tab-content">
        <div class="tab-item"
            v-for="(t, i) in title"
            :style="{'min-width': tabWidth, 'color': i == index ? '#e51429' : ''}"
            :key="i"
            @mouseenter='hover ? hoverIt(i) : null'
            @mouseleave='hover ? outIt(i) : null'
            @click='clickItem(i)'>
            {{t.message}}
        </div>
      </div>
      <div class="tab-line">
        <div class="tab-active"
          :style="{'width': tabWidth,'transform': 'translateX('+ tabPosition +')'}">
          <!-- <div class="tab-point"></div> -->
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'tabLine',
  data: () => ({
    hoverData: {}
  }),
  props: {
    index: {
      type: Number,
      required: true
    },
    title: {
      type: Array,
      required: true
    },
    hover: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tabWidth() {
      let sich = this
      let width = 1 / sich.title.length * 100 + '%'
      return width
    },
    tabPosition() {
      let sich = this
      let left = 100 * sich.index + '%'
      return left
    }
  },
  methods: {
    clickItem(index) {
      this.$emit('clickItem', index)
    },
    initHover() {
      this.hoverData = {
        hoverId: 0,
        hoverList: []
      }
      this.hoverData.hoverList.length = this.title.length
      this.hoverData.hoverList.fill(false)
    },
    hoverIt(i) {
      this.hoverData.hoverId = i
      this.hoverData.hoverList[i] = true
      setTimeout(() => {
        if (this.hoverData.hoverList[i]) {
          this.clickItem(i)
        }
      }, 100)
    },
    outIt(i) {
      this.hoverData.hoverList[i] = false
    }
  },
  created() {
    this.initHover()
  }
}
</script>
<style lang="scss" scoped>
.tab-content {
  display: flex;
  justify-content: space-between;
  .tab-item {
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    cursor: pointer;
  }
}
.tab-line {
  margin: 15px 0;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
  .tab-active {
    position: absolute;
    top: -2px;
    height: 3px;
    background: #e51429;
    // border-radius: 2px;
    box-sizing: border-box;
    transition: all 0.3s;
    .tab-point {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      left: 48%;
      top: -6px;
      background: #e51429;
    }
  }
}
</style>
