<template>
 <section class="image-card-section">
   <slot></slot>
   <ImageCardSectionList :cards="cards" :colSpan="colSpan" :rowGutter="rowGutter" />
   <div class="more" v-if="isShowMore">更多</div>
 </section>
</template>

<script>
import ImageCardSectionList from '../ImageCardSectionList/ImageCardSectionList'

export default {
  props: {
    cards: {
      type: Array,
      required: true
    },
    isShowMore: {
      type: Boolean,
      default: false
    },
    colSpan: {
      type: Number,
      default: 6
    },
    rowGutter: {
      type: Number,
      default: 15
    }
  },
  components: {
    ImageCardSectionList
  }
}
</script>

<style lang="scss">
.image-card-section {
  text-align: center;
  h2 {
    font-size: 44px;
    font-weight: 400;
    color: rgba(48, 50, 52, 1);
    line-height: 50px;
  }
  p.description {
    font-size: 18px;
    color: rgba(116, 126, 128, 1);
    line-height: 28px;
  }
  &.block {
    header {
      h2 {
        margin-bottom: 15px;
      }
      .description {
        width: 588px;
        margin: 0 auto 30px;
      }
    }
  }
  &.intellectual-property {
    margin-bottom: 42px;
    header {
      margin-bottom: 30px;
    }
    .image-card-section-list {
      grid-template-rows: 326px;
      .image-card-cover {
        height: 268px;
        > img {
          border-radius: 6px;
        }
      }
      .image-card-body {
        height: auto;
        .image-card-title {
          padding-top: 10px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(32, 32, 32, 1);
          line-height: 28px;
        }
        .image-card-description {
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          color: rgba(107, 107, 107, 1);
          line-height: 20px;
        }
        .image-card-total {
          display: none;
        }
      }
    }
  }
  &.copyright-service {
    padding: 40px 0 28px;
    background: rgba(245, 245, 245, 1);
    header {
      margin-bottom: 55px;
      .description {
        font-weight: 400;
      }
    }
    .more {
      width: 220px;
      height: 50px;
      color: rgba(0, 0, 0, 0.4);
      border-radius: 30px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin: 22px auto 0 auto;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
    }
  }
  &.copyright-registration {
    padding: 40px 0 50px;
    background: rgba(245, 245, 245, 1);
  }
  &.products-registration {
    padding-top: 42px;
    margin-bottom: 138px;
    .image-card-section-list-container {
      .image-card-body {
        border: 1px solid rgba(215, 215, 215, 1);
        box-sizing: border-box;
      }
    }
  }
  &.advantage {
    margin-bottom: 105px;
    header {
      margin-bottom: 28px;
    }
    .image-card-section-list-container {
      .image-card-section-list-item {
        margin-bottom: 8px;
      }
      .image-card-section-item-wrapper {
        padding: 6px;
        background: rgba(255, 255, 255, 1);
        border: 4px solid rgba(247, 247, 247, 1);
        .image-card {
          display: flex;
        }
        .image-card-cover {
          width: 240px;
          height: 240px;
          margin-right: 25px;
          > img {
            border-radius: 0;
          }
        }
        .image-card-body {
          .image-card-title {
            margin-bottom: 5px;
            padding-top: 62px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(32, 32, 32, 1);
            line-height: 37px;
          }
          .image-card-description {
            font-size: 17px;
            font-weight: 400;
            color: rgba(32, 32, 32, 1);
            line-height: 27px;
            text-align: left;
          }
          .image-card-total {
            display: none;
          }
        }
      }
    }
  }
}
</style>
