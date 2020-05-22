<template>
  <div ref="searchMenuContainer" class="menu1">
    <ul>
      <li
        v-for="(item,index) in labs"
        :key="index"
        @click="selected(item.type, item.name)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    labs: [
      {
        name: '图片',
        type: 'photo'
      },
      {
        name: '设计',
        type: 'design'
      },
      {
        name: '高端',
        type: 'plus'
      },
      {
        name: '视频',
        type: 'video'
      },
      {
        name: '字体',
        type: 'fonts'
      }

    ]
  }),
  props: [
    'show'
  ],
  methods: {
    selected(type, name) {
      this.$emit('select', name, type)
    }
  }
}
</script>
<style lang="scss" scoped>
.menu1 {
  position: absolute;
  top: 35px;
  left: 0px;
  z-index: 2000;
  padding-top: 25px;
  // box-shadow: 4px 6px 14px rgba(0, 0, 0, 0.4);
  ul {  
    width: 79px;
    padding: 10px 12px 10px 14px;
    border-radius: 4px;
    box-shadow: 1px 1px 6px #cacaca;
    background-color: #fff;
    list-style: none;
    cursor: pointer;
    li {
      line-height: 32px;
      color: #333;
      font-size: 16px;
      opacity: 0.7;
      text-align: center;
      padding-right: 14px;
    }
    li:hover {
      opacity: 1;
      color: #ff5112;
    }
  }
}
</style>
