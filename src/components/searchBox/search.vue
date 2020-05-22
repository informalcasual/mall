<template>
  <!-- 这是首页那个 -->
  <div class="search-column">
    <div class="search-button flex">
      <div
        class="search-select search__dropDown pointer"
        @mouseenter="show = true"
        @mouseleave="show = false"
      >
        <button class="search__dropDown_button input_none inline-block pointer">
          <span>{{currentSearchName}}</span>
          <i class="search__dropDown_icon"></i>
        </button>
        <picMenu v-if="show" @select="selectedType"></picMenu>
      </div>
      <div class="search-cont">
        <input
          type="text"
          @keyup.enter="importkey()"
          v-model="searchItem"
          :placeholder="placeholder"
        />
        <!-- <img src="./img/" alt=""> -->
      </div>
      <!-- <div class="search-btn">
        <button @click="importkey()">搜索</button>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import picMenu from './list/list'
export default {
  data: () => ({
    searchItem: '',
    show: false,
    currentSearchName: '图片',
    currentSearchType: 'photo',
    placeholder: '输入关键词进行素材搜索'
  }),
  methods: {
    // 搜索
    importkey() {
      if (this.searchItem == '') {
        this.placeholder = '你尚未输入任何内容'
        return
      }
      if (this.currentSearchType == 'plus') {
        window.open(`https://v.paixin.com/${this.currentSearchType}/search/${this.searchItem}/1`, '_blank')
      } else {
        window.open(`https://v.paixin.com/media/${this.currentSearchType}/standard/${this.searchItem}/1`, '_blank')
      }
    },
    //  选择tip
    selectedType(name = '图片', type = 'photo') {
      if (type == 'fonts') {
        window.open('https://v.paixin.com/fonts', '_blank')
      } else {
        this.currentSearchType = type
        this.currentSearchName = name
      }
      this.show = false
    }
  },
  components: {
    picMenu
  },
  computed: {
    ...mapState({
    })
  },
  mounted() {
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-column {
  width: 100%;
  // background: url('./img/bg.png') no-repeat;
  background-size: cover;
}

.search-button {
  height: 54px;
  background: #fff;
  border-radius: 6px;
}
.search-select {
  padding: 16px 0;
  position: relative;
  padding-left: 29px;
  vertical-align: middle;
  height: 22px;
  flex-grow: 1;
  button {
    text-align: left;
    border-right: 2px solid #bbbbbb;
    display: block;
    width: 76px;
    background-color: transparent;
  }
  span {
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  .search__dropDown_icon {
    display: inline-block;
    background: url("../../assets/img/dropDown.svg") no-repeat;
    background-size: 100%;
    background-position: center;
    width: 11px;
    height: 11px;
    margin-left: 9px;
  }
}
.search-cont,
.search-btn {
  display: inline-block;
}
.search-cont {
  padding: 16px 0;
  padding-left: 22px;
  vertical-align: middle;
  height: 22px;
  width: calc(100% - 134px);
  flex-grow: 1;
  text-align: left;
  position: relative;
  input {
    background: transparent;
    color: #666;
    height: 22px;
    font-size: 16px;
    line-height: 22px;
    vertical-align: middle;
    width: calc(100% - 60px);
    border: none;
  }
  ::placeholder {
    color: rgb(83, 83, 83);
    opacity: 0.5;
  }
}
.search-btn {
  width: 130px;
  text-align: right;
  float: right;
  flex-grow: 0;
  button {
    width: 100%;
    height: 60px;
    background: linear-gradient(
      315deg,
      rgba(255, 61, 98, 1) 0%,
      rgba(229, 20, 175, 1) 100%
    );
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
    letter-spacing: 1px;
    cursor: pointer;
  }
}
</style>
