<template>
  <div class='project-eight-pieces'>
    <div class="project-item"
      v-for="(good, index) in goodsList"
      :key="index"
      :style="{
        borderRight: (index != 1) ? '1px solid rgba(232, 232, 232, 1)' : 'none'
      }">
      <div class="title">{{ good.title }}</div>
      <div class="list">
        <a class="option" v-for="(option, index_) in good.options"
          :key="index_"
          :href="getOptionUrl(option)"
          target="_blank">
          {{ option.label }}
        </a>
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
    getOptionUrl(option) {
      if (option.type == '0') {
        let label = option.label
        if (label.indexOf('/') > -1) {
          label = label.replace(/\//g, '%2F')
        }

        return `https://v.paixin.com/media/photo/standard/${label}/1`
      }

      if (option.type == '1' || option.type == '2') {
        return option.url
      }

      if (option.type == '3') {
        let label = option.label
        if (label.indexOf('/') > -1) {
          label = label.replace(/\//g, '%2F')
        }
        return `https://v.paixin.com/media/video/standard/${label}/1`
      }

      return ''
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
  padding: 40px 16px;
}

.project-item {
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 40px;
  .title {
    color:#202020;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .list {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;

    .option {
      width: 50%;
      font-size: 0.9rem;
      color: rgba(92, 92, 92, 1);
      margin-top: 14px;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        color: #E51429;
      }
    }
  }
}
</style>
