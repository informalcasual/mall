<template>
  <div class="notice base-width">
    <ul class="notice-list">
      <li v-for="(s, i) in list.left" :key="i">
        <span class="phone">{{s.user}}</span>
        <span class="content">{{s.content}}</span>
        <span class="date">{{s.date}}</span>
      </li>
    </ul>
    <div class="notice-line"></div>
    <ul class="notice-list">
      <li v-for="(s, i) in list.right" :key="i">
        <span class="phone">{{s.user}}</span>
        <span class="content">{{s.content}}</span>
        <span class="date">{{s.date}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'notice',
  data: () => ({}),
  props: {
    notice: {
      type: Array,
      required: true
    }
  },
  computed: {
    list() {
      let sich = this
      let left = []
      let right = []
      sich.notice.forEach((item, index) => {
        item.user = String(item.user)
        item.user = item.user.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
        item.date = sich.dateToTime(item.date)
        if (index % 2 == 1) {
          left.push(item)
        } else {
          right.push(item)
        }
      })
      return {
        left: left,
        right: right
      }
    }
  },
  methods: {
    dateToTime(str) {
      let oDate = new Date(parseInt(str) * 1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oTime = oYear + '.' + oMonth + '.' + oDay + ' ' + oHour + ':' + oMin
      return oTime
    }
  }
}
</script>
<style lang="scss" scoped>
.notice{
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .notice-list{
    margin: 0 8%;
    width: 27%;
    height: 120px;
    overflow: hidden;
    li{
      list-style-type: disc;
      color: #e51429;
      padding-left: 15px;
      font-size: 14px;
      padding: 11px 0;
      .content, .date{
        color: #000000;
      }
    }
  }
  .notice-line{
    width: 1px;
    height: 100px;
    background-image: linear-gradient(to bottom, #979797 0%, #979797 50%, transparent 50%);
    background-size: 1px 15px;
    background-repeat: repeat-y;
  }
}
</style>
