<template>
 <div class="container base-width">
   <slot/>
    <div v-if="title">
      <div class="title">{{ title }}</div>
      <p class="subtitle">{{ subtitle }}</p>
    </div>

    <el-row v-for="(cards, index) in cardList"
      :key="index"
      :gutter="8"
      justify="center"
      :class="{
        'first-row': index == 0,
        'center-row': index !=0
      }">
      <el-col v-for="(card, subIndex) in cards"
        :key="subIndex"
        :span="24 / cards.length">
        <service-card :card="card" :styleType="styleType" @onButtonClicked="onButtonClicked"/>
      </el-col>
    </el-row>

    <div v-if="isShowMore" class="more" @click="onMoreClicked">更多</div>
    <ul class="indicators" v-if="indicators">
      <li class="indicator" v-for="(s, index) in list" :key="index" :class="{'isActive': current == index}">
        <div class="button" @click="clickIndicator(index)"></div>
      </li>
    </ul>
 </div>
</template>

<script>
import ServiceCard from '@/components/card/serviceCard/ServiceCard.vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    cardList: {
      // 一个二维数组，例如[[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]]，将被显示为3行3列
      type: Array,
      default: () => {
        return []
      }
    },
    isShowMore: {
      type: Boolean,
      default: false
    },
    styleType: {
      type: Number,
      default: 0 // 0为边框实体按钮，1为灰背景线框按钮
    },
    indicators: {
      type: Boolean,
      default: false // 是否显示切换点
    },
    list: {
      // 切换点列表
      type: Array,
      default: () => {
        return []
      }
    },
    current: {
      // 激活点序数
      type: Number,
      default: 0
    }
  },
  methods: {
    onButtonClicked(item) {
      this.$emit('onItemClicked', item)
    },
    onMoreClicked() {
      this.$emit('onMoreClicked')
    },
    clickIndicator(index) {
      this.$emit('changeTab', index)
    }
  },
  components: {
    ServiceCard
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-bottom: 72px;
  .container {
    min-height: 230px;
  }
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

.more {
  width: 220px;
  height: 50px;
  color: rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 22px auto 0 auto;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.title {
  padding: 30px 0;
  text-align: center;
  font-size: 2.2rem;
}

.subtitle {
  font-size: 18px;
  font-weight: 400;
  color: rgba(116, 126, 128, 1);
  line-height: 28px;
  text-align: center;
}
.indicators{
  display: flex;
  justify-content: center;
  .indicator{
    padding: 12px 8px;
    .button{
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #979797;
      cursor: pointer;
    }
  }
  .indicator.isActive{
    .button{
      background: #000000;
      border-color: #000000;
    }
  }
}
</style>
