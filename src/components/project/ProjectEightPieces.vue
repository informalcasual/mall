<template>
  <div class='project-eight-pieces'>
    <div class="project-item"
      v-for="(category, index) in categoryList"
      :key="index"
      :style="{
        borderRight: (index != 3 && index != 7) ? '1px solid rgba(232,232,232,1)' : 'none',
        borderBottom: index < 4 ? '1px solid rgba(232,232,232,1)' : 'none'
      }">
      <div class="title">{{ category.title }}</div>
      <a class="option"
        v-for="(option, index_) in category.options"
        :key="index_"
        @click="clickOption(option)"
        :style="{
          marginTop: index_ == 0 ? '24px' : '16px'
        }"
        :href="getOptionUrl(option)"
        target="_blank">
        {{ option.label }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectEightPieces',
  props: {
    categoryList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    clickOption(option) {
      this.$emit('projectOptionClick', option)
    },
    getOptionUrl(option) {
      if (option.business && option.type && option.id) {
        return `https://z.paixin.com/item/${option.business}/${option.type}/${option.id}`
      }

      if (option.url) {
        return option.url
      }

      return 'https://q.url.cn/CD7a0H?_type=wpa&qidian=true'
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
  padding: 16px;
}

.project-item {
  box-sizing: border-box;
  width: 25%;
  height: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .title {
    color:#202020;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .option {
    font-size: 0.9rem;
    color:rgba(92, 92, 92, 1);
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: #E51429;
    }
  }
}
</style>
