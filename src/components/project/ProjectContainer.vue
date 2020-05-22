<template>
  <div class="project-container base-width">
    <el-container>
      <el-header>
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
        <div class="end">
          <div class="instruction" v-if="isShowInstructions && carouselNum > 1">
            <div class="previous"
              :disabled="carouselIndex == 0"
              @click="onPrviousClicked"
              :style="{
                cursor: carouselIndex == 0 ? 'not-allowed' : 'pointer'
              }">
              <div :style="{ borderColor: carouselIndex == 0 ? '#e8e8e8' : '#999' }"></div>
            </div>

            <div class="next"
              :disabled="carouselIndex == carouselNum"
              @click="onNextClicked"
              :style="{
                cursor: carouselIndex == carouselNum - 1 ? 'not-allowed' : 'pointer'
              }">
              <div :style="{ borderColor: carouselIndex == carouselNum - 1 ? '#e8e8e8' : '#999' }"></div>
            </div>
          </div>

          <div  class="all" @click="onAllClicked">
            查看全部
            <div class="all-icon"><div></div></div>
          </div>
        </div>
      </el-header>

      <el-container>
        <el-aside :style="{ backgroundImage: 'url(' + asideImage + ')' }">
          <div class="aside-title">{{ title }}</div>
          <div class="aside-subtitle">{{ subtitleEn }}</div>
          <div class="option-container"
            v-for="(option, index) in options" :key="index"
            @mouseenter="onOptionClicked(option, index)">
            <div class="option-selected" :style="{ background: selectedIndex == index ? selectedColor : 'transparent' }">
            </div>
            <div :style="{ backgroundColor: selectedIndex == index ? selectedColor : 'transparent' }"
              :class="{ 'option-selected-radius': selectedIndex == index }"></div>
            <span>{{ option.label }}</span>
          </div>
        </el-aside>
        <el-main :style="{ border: '2px solid ' + 'transparent' }">
          <slot/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ProjectContainer',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    subtitleEn: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    selectedColor: {
      type: String,
      default: 'rgba(255,255,255,.36)'
    },
    isShowInstructions: {
      type: Boolean,
      default: false
    },
    asideImage: {
      type: String,
      default: ''
    },
    carouselNum: {
      type: Number,
      default: 0
    },
    carouselIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedIndex: 0
    }
  },
  methods: {
    onAllClicked() {
      this.$emit('onAllClicked')
    },
    onPrviousClicked() {
      this.$emit('onPrviousClicked')
    },
    onNextClicked() {
      this.$emit('onNextClicked')
    },
    onOptionClicked(option, index) {
      this.selectedIndex = index

      this.$emit('onOptionClicked', option, index)
    }
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
.project-container {
  min-height: 400px;
  margin: 40px auto 16px auto;
}

.title {
  color: #000;
  font-size: 1.5rem;
}

.subtitle {
  margin-left: 10px;
  color: #5C5C5C;
  font-size: 0.9rem;
}

.end {
  position: absolute;
  right: 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;

  .instruction {
    display: flex;
    cursor: pointer;

    .previous {
      width: 48px;
      height: 22px;
      box-sizing: border-box;
      border: solid 1px #E8E8E8;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        width: 6px;
        height: 6px;
        border-top: solid 2px #999;
        border-left: solid 2px #999;
        transform: rotate(-45deg);
      }
    }

    .next {
      width: 48px;
      height: 22px;
      box-sizing: border-box;
      border: solid 1px #e8e8e8;
      border-left: none;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        width: 6px;
        height: 6px;
        border-top: solid 2px #999;
        border-right: solid 2px #999;
        transform: rotate(45deg);
      }
    }
  }

  .all {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    cursor: pointer;

    .all-icon {
      margin-left: 8px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      box-sizing: border-box;
      border: solid 1px #DADADA;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f8f8;

      div {
        width: 4px;
        height: 4px;
        border-top: solid 2px #DADADA;
        border-right: solid 2px #DADADA;
        transform: rotate(45deg);
        margin-right: 2px;
      }
    }
  }
}

.aside-title {
  margin-left: 35px;
  color: #fff;
  font-size: 1.5rem;
}

.aside-subtitle {
  color: #fff;
  font-size: 0.9rem;
  margin: 8px 0 16px 35px;
}

.option-container {
  position: relative;
  cursor: pointer;
  margin-left: 2px;
  height: 40px;
  display: flex;

  .option-selected {
    height: 40px;
    width: calc(100% - 20px);
  }

  .option-selected-radius {
    height: 40px;
    width: 20px;
    background: radial-gradient(circle at top left,
         transparent 20px, #fff 0) top left,
         radial-gradient(circle at bottom left,
         transparent 20px, #fff 0) bottom left;
     background-size: 100% 50%;
    background-repeat: no-repeat;
  }

  span {
    font-size: 16px;
    position: absolute;
    top: 12px;
    left: 33px;
    color: #fff;
  }
}
</style>

<style lang='scss'>
.project-container {
  .el-header {
    padding: 16px 0;
    height: auto !important;
    display: flex;
    align-items: center;
    position: relative;
  }

  .el-main {
    padding: 0;
    box-sizing: border-box;
    border: none !important;
  }

  .el-aside {
    padding: 35px 0;
    width: 233px !important;
    height: 400px;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
    background-size: cover;
    background-position: center;
  }
}
</style>
