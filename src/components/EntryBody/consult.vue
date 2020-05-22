<template>
  <div class='consultShow'>

    <div class='list'>
      <div class='tabs'>
        <tab-line :index="index" :title="pTitle" v-on:clickItem="changeTab" />
      </div>
      <consultList @clickItemOption="consultantPersonClick" :pList='pList' :pTitle='pTitle' :index='index' />
    </div>
    <div class='main'>
      <submission />
    </div>
  </div>
</template>

<script>
import pList from './data/persons.js'
import tabLine from '@/components/tabLine/index.vue'
import consultList from './consultList.vue'
import submission from './submission.vue'

export default {
  name: 'imgShow',
  data: () => ({
    pList,
    index: 0,
    pTitle: [
      {
        message: '版权图库',
        group: 'one'
      },
      {
        message: '知识产权',
        group: 'two'
      },
      {
        message: '营销推广',
        group: 'three'
      },
      {
        message: '交易平台',
        group: 'four'
      }
    ]
  }),

  methods: {
    changeTab(index) {
      this.index = index
    },
    consultantPersonClick(url) {
      if (url) {
        window.open(url)
      }
    }
  },

  created() {
    this.pList.one = this.$utilHelper.shuffle(this.pList.one)
    this.pList.two = this.$utilHelper.shuffle(this.pList.two)
    this.pList.three = this.$utilHelper.shuffle(this.pList.three)
    this.pList.four = this.$utilHelper.shuffle(this.pList.four)
  },

  mounted() {

  },

  watch: {

  },

  computed: {

  },

  components: {
    tabLine,
    consultList,
    submission
  }
}

</script>

<style lang='scss' scoped>
.consultShow {
  height: 430px;
  width: 1050px;
  margin: 0 auto;
  margin-top: 26px;
  .tabs {
    width: 80%;
    margin: 0 auto;
  }
  .list {
    width: 58%;
    height: 100%;
    float: left;
  }
  .main {
    width: 42%;
    height: 100%;
    float: left;
    padding-left: 16px;
    box-sizing: border-box;
  }
}
</style>
