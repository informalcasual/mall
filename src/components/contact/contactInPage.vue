<template>
  <div class="center">
    <section>
      <slot/>
      <div class="contact_menu">
        <div class="qq">
          <a href="http://q.url.cn/CD7a0H?_type=wpa&qidian=true" target="_blank">
            <img src="./img/1.svg">
            <div class="contact_type">点此QQ交谈</div>
            <div class="contact_time">快速套餐购买咨询</div>
          </a>
        </div>
        <div class="other_contact">
          <img src="./img/2.svg">
          <div class="contact_type">400-9613-900</div>
          <div class="contact_time">AM8:00 - PM10:00</div>
        </div>
        <div @click='toHelpCenter' class='help_center'>
            <img src="./img/3.svg">
            <div class="contact_type">帮助 & 说明</div>
            <div class="contact_time">哪里不懂点这里~</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    toHelpCenter() {
      // this.$store.dispatch('helpShow', { current: { index: 0, subIndex: -1 } })
      window.open('http://q.url.cn/CD7a0H?_type=wpa&qidian=true', '_blank')
    }
  },
  computed: {

  },
  components: {

  }
}
</script>

<style lang='scss' scoped>
.center {
  padding: 30px 0;
}
.contact_menu {
  position: relative;
  margin: 50px auto;
  width: 700px;
  border-radius: 10px;
  display: flex;
  a {
    text-decoration: none;
  }
  .help_center,
  .qq,
  .other_contact {
    flex-grow: 1;
    img {
      width: 90px;
      margin: 0 auto;
      display: block;
      transition: all 0.2s;
      user-select: none;
    }
    .contact_type {
      width: 100%;
      padding-top: 10px;
      color: #000;
      font-size: 1.1rem;
      font-weight: 800;
      line-height: 1.4;
      opacity: 0.7;
      text-align: center;
    }

    .contact_time {
      width: 100%;
      color: #3c5e6c;
      opacity: 0.4;
      font-size: 0.9rem;
      padding-top: 6px;
      text-align: center;
    }

  }
  .help_center {
    cursor: pointer;
    &:hover {
      img {
        transform: scale(1.05);
        opacity: 0.7;
      }
    }
  }
}
</style>
