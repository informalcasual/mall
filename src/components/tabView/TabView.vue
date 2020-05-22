<template>
  <div class="container base-width">
    <div class="title">{{ title }}</div>
    <div class="tab-container">
      <div>
        <div>
          <div class="tab-option"
            :style="{
              padding: `0 ${optionsSpace}px`,
              color: textColor
            }"
            v-for="(option, index) in tabOptions"
            :key="index"
            :id="`taboption${index}`"
            @click="onOptionClicked(index)">
            {{ option.label }}
            </div>

            <div v-if="isShowMore"
              class="tab-option"
              :style="{
                padding: `0 ${optionsSpace}px`,
                color: textColor
              }"
              @click="more">
              更多
            </div>
        </div>

        <div class="tab-indicator"
          :style="{
            background: indicatorColor,
            height: `${indicatorHeight}px`,
            margin: `${indicatorMarginTop}px ${optionsSpace}px 0 ${optionsSpace}px`
          }"
          id="tabIndicator">
        </div>
      </div>
    </div>

    <el-row v-for="(items, index) in tabOptions[tabIndex].itemsList"
      :key="index"
      :gutter="8"
      justify="center"
      :class="{
        'first-row': index == 0,
        'center-row': index !=0
      }">
      <el-col v-for="(item, subIndex) in items"
        :key="subIndex"
        :span="24 / items.length">

        <div @click="moreDetail(item.message.url)" class='thumb'
          :style="{'backgroundImage':'url(' + item.message.img + ')'}">
          <div style='height:100%;background:rgba(0,0,0,0.02)'></div>
        </div>
        <div @click="moreDetail(item.message.url)" class="tab-detail" v-if="item.message">
          <p class="tab-detail-title">{{item.message.title}}</p>
          <span class="tab-detail-desc">{{item.message.desc}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'tabView',
  props: {
    title: {
      type: String,
      default: ''
    },
    tabOptions: {
      type: Array,
      default: () => []
    },
    optionsSpace: {
      type: Number,
      default: 20
    },
    textColor: {
      type: String,
      default: 'rgb(63, 63, 63)'
    },
    indicatorColor: {
      type: String,
      default: '#095CE5'
    },
    indicatorHeight: {
      type: Number,
      default: 3
    },
    indicatorMarginTop: {
      type: Number,
      default: 8
    },
    isShowMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  mounted() {
    if (this.tabOptions.length > 0) {
      let taboption0 = document.getElementById('taboption0')

      let width = taboption0.offsetWidth - this.optionsSpace * 2

      document.getElementById('tabIndicator').style.width = width + 'px'
    }
  },
  methods: {
    onOptionClicked(index) {
      this.tabIndex = index

      let marginLeft = 0

      for (let i = 0; i < index; i++) {
        let taboption0 = document.getElementById(`taboption${i}`)
        marginLeft += taboption0.offsetWidth
      }

      document.getElementById('tabIndicator').style.transform = `translate3d(${marginLeft}px, 0, 0)`

      this.$emit('onOptionClicked', index, this.tabOptions[index])
    },
    more() {
      this.$emit('onMoreClicked')
    },
    moreDetail(url) {
      this.$emit('onMoreDetail', url)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 72px;
}

.title {
  padding: 30px 0;
  text-align: center;
  font-size: 2.2rem;
}

.tab-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tab-option {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  font-size: 1.1rem;
}

.tab-indicator {
  transition: transform 0.4s;
}

.first-row {
  margin-top: 30px;
}

.center-row {
  margin-top: 8px;
}

.last-row {
  margin-top: 8px;
}

.thumb {
  height: 190px;
  // background: #000;
  text-align: center;
  color: #fff;
  line-height: 190px;
  // cursor: pointer;
  background-size: 76%;
  background-position: center;
  background-repeat: no-repeat;
}

.tab-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 140px;
  padding: 10px 5px;
  box-sizing: border-box;
  .tab-detail-title {
    font-size: 18px;
    line-height: 25px;
    color: #303234;
  }
  .tab-detail-desc {
    font-size: 14px;
    line-height: 20px;
    color: #737373;
    margin: 10px 0 20px;
  }
  .tab-detail-btn {
    color: #e51429;
    background-color: #fff;
    font-size: 16px;
    line-height: 20px;
    // cursor: pointer;
  }
}
</style>
