<template>
  <div class="image-card-section-list-container base-width">
    <el-row class="image-card-section-list" :gutter="rowGutter">
      <el-col class="image-card-section-list-item" v-for="(card, index) in cards" :key="index" :span="colSpan">
        <div class="image-card-section-item-wrapper">
          <ImageCardSectionListItem :options="card">
            <div class="image-card-body">
              <h3 class="image-card-title">{{ card.title }}</h3>
              <p class="image-card-description" v-html='card.description'></p>
              <span class="image-card-total">{{ card.total }}</span>
            </div>
          </ImageCardSectionListItem>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ImageCardSectionListItem from '../ImageCardSectionListItem/ImageCardSectionListItem'

export default {
  props: {
    cards: {
      type: Array,
      required: true
    },
    colSpan: {
      type: Number,
      required: true
    },
    rowGutter: {
      type: Number,
      required: true
    }
  },
  components: {
    ImageCardSectionListItem
  }
}
</script>

<style lang="scss">
.image-card-section-list-container {
  margin: 0 auto;
  .image-card-section-list-item {
    margin-bottom: 15px;
  }
  .image-card-body {
    height: 155px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background: rgba(255, 255, 255, 1);
  }
  .image-card-title {
    padding-top: 18px;
    font-size: 24px;
    font-weight: 600;
    color: rgba(73, 75, 78, 1);
    line-height: 33px;
    letter-spacing: 1px;
  }
  .image-card-description {
    margin-bottom: 8px;
    font-size: 16px;
    color: rgba(73, 75, 78, 1);
    line-height: 24px;
  }
  .image-card-total {
    font-size: 24px;
    font-weight: 400;
    color: rgba(32, 32, 32, 1);
    line-height: 33px;
  }
}
</style>
