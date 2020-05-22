<template>
  <div class='consultList'>
    <div class='item' v-for='(item, i) in pList[pTitle[index].group]' :key="i">
      <div class="consultant-person">
      <div class="avater" :style="{'background-image': 'url(' + item.avatar +')'}"></div>
      <p class="name">{{item.name}}</p>
      <p class="subname">{{item.subname}}</p>
      <div @click="activeClick(item.url)" class="btn">咨询{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'consultList',
  data: () => ({

  }),
  props: [
    'pList',
    'pTitle',
    'index'
  ],
  methods: {
    activeClick(url) {
      this.$emit('clickItemOption', url)
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
.item {
  width: 33.33%;
  height: 180px;
  padding: 4px;
  padding-bottom: 8px;
  padding-top: 0;
  box-sizing: border-box;
  float: left;
  a {
    color: #000;
    text-decoration: none;
  }

  .consultant-person {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    .avater {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: transparent no-repeat;
      background-position: center;
      background-size: contain;
      margin-bottom: 11px;
    }
    .name {
      font-size: 15px;
      line-height: 20px;
      margin-bottom: 4px;
    }
    .subname {
      font-size: 12px;
      line-height: 17px;
      margin-bottom: 9px;
      height: 17px;
      overflow: hidden;
    }
    .btn {
      width: 100px;
      height: 34px;
      color: #e51429;
      border: 1px solid #e51429;
      text-align: center;
      border-radius: 17px;
      font-size: 13px;
      cursor: pointer;
      line-height: 34px;
    }
  }
}
</style>
