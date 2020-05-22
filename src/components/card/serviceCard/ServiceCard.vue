<template>
  <div class="container"
    :class="{
      'container-boder': styleType == 0,
      'container-bg': styleType == 1
    }">
    <div class="title">{{ card.title }}</div>
    <div class="price">{{ card.price }}</div>
    <div class="description" v-html="card.description"></div>
    <button :class="{
        'button-boder': styleType == 1,
        'button-bg': styleType == 0
      }"
      @click="onButtonClicked">
      立即申请
    </button>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {
        return {
          title: '',
          price: '',
          description: ''
        }
      }
    },
    styleType: {
      type: Number,
      default: 0 // 0为边框实体按钮，1为灰背景线框按钮
    }
  },
  methods: {
    onButtonClicked() {
      this.$emit('onButtonClicked', this.card)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 10px;

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(32, 32, 32, 1);
  }

  .price {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgba(32, 32, 32, 1);
    margin: 14px 0;
  }

  .description {
    text-align: center;
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(32, 32, 32, 0.5);
    line-height: 1.2rem;
    min-height: 3.6rem;
  }

  button {
    width: 160px;
    height: 40px;
    border-radius: 25px;
    margin-top: 14px;
    outline: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
}

.container-boder {
  border: 3px solid rgba(247, 247, 247, 1);
}

.container-bg {
  background: rgba(245, 245, 245, 1)
}

.button-boder {
  border: 1px solid rgba(229,20,41, 1) !important;
  color: rgba(229,20,41, 1) !important;
  background: transparent;
}

.button-bg {
  background :rgba(229,20,41, 1);
}
</style>
