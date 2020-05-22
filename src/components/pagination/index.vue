<template>
  <div class='pignation'>
    <div class="inner_wrap">
       <div  @click='toPage(current-1)' class="next hover">
         <img :src="require('@/assets/img/_left.svg')" width="16" alt="">
       </div>
      <div class="nums_wrap">
        <div 
          :class="[current==num?'current':'', num=='...'||num=='..'||current==num?'noHover':'']" 
          v-for='(num, i) in pages' 
          class="num" 
          @click='toPage(num)'
          :key="i">
          {{num}}
          <router-link
            v-if='$route.name === "mediapack"'
            :to='`/mediapack/${$route.params.id}/${(num)|| current}`'>
            {{num}}
          </router-link>
        </div>
      </div>
      <div  @click='toPage(current+1)' class="next hover">
         <img :src="require('@/assets/img/_right.svg')" width="16" alt="">
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'pignation',
  data: () => ({
    // 当前显示的所有页码
    // pages: [1, 2, 3, 4, 5, 6, '...', 99, 100],
    // 输入的页码
    jumpPage: '1',

    limit: '',
  }),
  props: {
    page: {
      type: [String, Number],
      default: 0
    },
    total: {
      type: [String, Number]
    }
  },
  methods: {
    //新页数
    getNewLine(num) {
      if (!(num * 1)) return 1
      if (num == this.current) return
      if (num > this.max) return this.max
      if (num <= 1) return 1
      return num 
    },
    toPage(num) {
      if (num >= this.max) num = this.max
      let nextLine = this.getNewLine(num)
      if (nextLine == undefined) return this.$store.dispatch('toast', { type: 'warn', msg: '页码错误' })
      this.$emit('paginationToPage', nextLine) 
    }
  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  filters: {

  },
  computed: {
    // 当前页面
    current(){
      let current = this.page + 1
      return current
    },
    //总页数
    max(){
        let max = this.total
        return max
    },
    /**
     * 当前显示的所有页码
     * @returns {Array} pages
     */
    pages() {
      let pages = []
      let current = this.page + 1
      if (!current) return
      // 加当前页码, 再往后加四个
      for (let i = 0; i < 5; i ++) {
        if (current > this.max) continue
        let page = current ++
        pages.push(page)
      }

      // ================================
      // 往前面加
      if (this.current > 2) {
        let pre = this.current-1
        let empty = 5 - pages.length + 2
        for (let i = 0; i < empty; i++) {
          pages.unshift(pre--)
        }
      } else if (this.current > 1) {
        pages.unshift(this.current - 1)
      }
      // 加上首页
      if (pages[0] > 2) {
        pages.unshift('..')
      }
      if (pages[0] != 1) {
        pages.unshift(1)
      }
      // ================================

      // 往后加一百页 不足一百页 替换为尾页
      pages.push(...['...', (current + 100) > this.max ? this.max : (current + 100)])
      
      // 过滤异常
      pages = pages.filter(e => (e > 0 && e <= this.max) || e == '...' || e == '..')
      // 去重
      pages = Array.from(new Set(pages))
      
      // [99,...,100] 这类情况去掉'...'
      let divIndex = pages.findIndex(ele => ele == '...')
      if(divIndex != -1 && pages[divIndex + 1] && pages[divIndex - 1]) {
        if ((pages[divIndex - 1] + 1) == pages[divIndex + 1]) {
          pages.splice(-2, 1)
        }
      }
      // 尾部是'...' 去掉
      if (pages[pages.length - 1] == '...') pages.pop()

      return pages
    }
  },
  components: {

  }
}
</script>

<style lang='scss' scoped>
$height: 29px;
.border {
  border: 1px solid #979797;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: $height;
  height: $height;
  line-height: 27px;
  margin-right: 12px;
  text-align: center;
  transition: all .1s;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.03);
  }
}
.noHover {
  cursor: default !important;
}
.pignation {
  height: $height;
  .inner_wrap {
    min-width: 500px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .nums_wrap {
      display: flex;
      .num {
        color: #000;
        display: block;
        background: #fff;
        @extend .border;
        a {
          height: 0;
          display: block;
          overflow: hidden;
        }
      }
      .current {
        color: #702A2A;
        border: 1px solid #702A2A;
      }
    }
    .next {
      @extend .border;
      background-color: #fff;
      img{
        padding-top: 6px;
      }
    }
  }
}
.stop {
  cursor: default !important;
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.4);
}
</style>