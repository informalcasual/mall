<template>
  <div class='search'>
      <input v-model="input" :placeholder="place" @keydown.enter="showDialog"/>
      <i class="el-icon-search" @click="showDialog"></i>
      <div class='hrefs'>
        <a :href="href.url" v-for='(href, index) in hrefs' target="_blank" :key="index">{{ href.label }}</a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data: () => ({
    input: ''
  }),
  props: [
    'tab'
  ],
  methods: {
    showDialog() {
      if (!this.tab) {
        if (!this.input) return window.open(`//v.paixin.com`, '_blank')
        return window.open(`//v.paixin.com/media/photo/standard/${this.input}/1`, '_blank')
      }
      this.$store.commit('setSearchDialog', this.input)
      this.$store.commit('switchDialogState', true)
    },
    toSearch(href) {
      this.input = href
      this.showDialog()
    }
  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  computed: {
    place() {
      if (!this.tab) return '搜索您需要的图片内容'
      return '搜索您需要的商标内容'
    },
    hrefs() {
      if (this.tab) {
        return [{
          label: '图片素材礼包',
          url: 'https://v.paixin.com/packagestore'
        }, {
          label: '视频下载',
          url: 'https://v.paixin.com/stockvideo'
        }, {
          label: '急速商标注册',
          url: 'https://z.paixin.com/item/brand/common/3'
        }, {
          label: '专利申请',
          url: 'https://z.paixin.com/patent'
        }, {
          label: 'Logo设计',
          url: 'https://z.paixin.com/item/brand/common/8'
        }, {
          label: '版权登记',
          url: 'https://z.paixin.com/copyright'
        }]
      }

      return [{
        label: '科学技术',
        url: '//v.paixin.com/media/photo/standard/科学技术/1'
      }, {
        label: '计算机通信',
        url: '//v.paixin.com/media/photo/standard/计算机通信/1'
      }, {
        label: '人物',
        url: '//v.paixin.com/media/photo/standard/人物/1'
      }, {
        label: '工艺设计',
        url: '//v.paixin.com/media/photo/standard/工艺设计/1'
      }, {
        label: '宗教',
        url: '//v.paixin.com/media/photo/standard/宗教/1'
      }, {
        label: '美妆时尚',
        url: '//v.paixin.com/media/photo/standard/美妆时尚/1'
      }, {
        label: '运动娱乐',
        url: '//v.paixin.com/media/photo/standard/运动娱乐/1'
      }]
    }
  },
  components: {

  }
}
</script>

<style lang='scss' scoped>
.search {
  width: 1050px;
  margin: 36px auto;
  position: relative;
  input {
    background-color: rgb(245, 248, 251);;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 50px;
    line-height: 50px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    margin-right: 10px;
    &:focus {
      border-color: #409eff;
      outline: 0;
    }
  }
  .el-icon-search {
    position: absolute;
    right: 12px;
    font-size: 1.4rem;
    top: 14px;
    color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-weight: 800;
    &:hover {
      color: #000;
    }
  }
  .hrefs {
    display: flex;
    justify-content: center;
    a {
      margin: 0 10px;
      margin-top: 20px;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>
