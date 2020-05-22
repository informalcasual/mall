<template>
  <div class='personIntro'>
    <slot/>
    <div class='op'>
        <i class="el-icon-arrow-left" @click='turn("left")'></i>
        <div class='avatar' :style="{ 'backgroundImage' : 'url(' + persons[select].avatar +')' }"></div>
        <i class="el-icon-arrow-right" @click='turn("right")'></i>
    </div>
    <div class='name'>{{ persons[select].name }}</div>
    <div class='subname'>{{ persons[select].subname }}</div>
    <div class='desc'>{{ persons[select].desc }}</div>
    <div class='others'>
        <div @click="turn(i)" v-for='(item, i) in persons' :key="item.name" :style="{ 'backgroundImage' : 'url(' + item.avatar +')' }" class="other"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personIntro',
  data: () => ({
    select: 0
  }),
  props: [
    'persons'
  ],
  methods: {
    turn(ori) {
      if (ori == 'left') {
        this.select -= 1
        if (this.select < 0) this.select = this.persons.length - 1
      } else if (ori == 'right') {
        this.select += 1
        if (this.select >= this.persons.length) this.select = 0
      } else {
        this.select = ori
      }
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
.personIntro {
  padding: 40px 0;
  // background: rgba(0, 0, 0, 0.05);
  text-align: center;
  line-height: 1.7rem;
  .op {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
    .avatar {
      width: 110px;
      height: 110px;
      border-radius: 100px;
      margin: 0 60px;
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.05);
    }
    i {
      font-size: 1.6rem;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
  }
  .name {
    font-size: 1.2rem;
  }
  .subname {
    color: rgba(0, 0, 0, 0.5);
    line-height: 2.5rem;
  }
  .desc {
    width: 440px;
    margin: 20px auto;
    color: rgba(0, 0, 0, 0.7);
  }
  .others {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    .other {
      width: 40px;
      height: 40px;
      margin: 20px;
      border-radius: 100px;
      cursor: pointer;
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.05);
    }
  }
  .avatar, .other {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
