<template>
  <div class='project-eight-pieces'>
    <div class="project-item"
      v-for="(good, index) in goodsList"
      :key="index"
      :style="{
        borderRight: (index != 1 && index != 3) ? '1px solid rgba(232, 232, 232, 1)' : 'none',
        borderBottom: index < 2 ? '1px solid rgba(232, 232, 232, 1)' : 'none'
      }"
      @click="itemClicked">
      <div class="title">{{ good.title }}</div>
      <div class="option"
        v-for="(option, index_) in good.options"
        :key="index_"
        :title="getContent(option, index_)"
        :style="{
          marginTop: index_ == 0 ? '16px' : '8px'
        }">
        {{ getContent(option, index_) }}
        <span class="red-text" v-if="index_ == 2">{{ option.label.split('：')[1] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectEightPieces',
  props: {
    goodsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    itemClicked() {
      window.open('https://q.url.cn/CD7a0H?_type=wpa&qidian=true', '_blank')
    },
    getContent(option, index_) {
      if (!option.label) return ''
      return index_ != 2 ? option.label : option.label.split('：')[0] + '：'
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

  }
}
</script>

<style lang='scss' scoped>
.project-eight-pieces {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  position: relative;
  padding: 16px;
}

.project-item {
  box-sizing: border-box;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 40px;
  .title {
    color: #202020;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
  }

  .option {
    font-size: 0.9rem;
    color: #202020;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    .red-text {
      color: #ff0000;
    }
  }
}
</style>
