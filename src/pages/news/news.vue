<template>
  <div class="news box spread">
    <div class="bus-show" :style="{'background-image': `url(${require('./img/topBanner.png')})`}">
      <div class="title">无锡文化出口基地</div>
      <p class="tip">吴文化江南文化</p>
    </div>
    <div class="news-cont">
      <div class="news-tip">
        <div class="tip pointer"
        v-for="(item, i) in newsList"
        :key="i"
        :class="{'axt-tip': index === i}"
        @click.stop="toDetail(item.id, i)"
        >
          <div class="title">{{item.title}}</div>
        </div>
      </div>
      <div class="cont">
        <div v-html="news"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:()=>({
    index: 0,
    newsList: [],
    news:"",
  }),
  methods: {
    async getList(){
      let res = await this.$apiFactory.getpageModel().statistic()
      if(res.status == 200) {
        this.newsList = res.data.content
        this.toDetail(this.newsList[0].id , 0)
      }
    },
    async toDetail(id, i){
      this.index = i
      let res = await this.$apiFactory.getpageModel().getStatisric(id)
      if(res.status == 200) {
        this.news = res.data.content
      }
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.news{
  padding: 36px 0 76px;
}
.bus-show{
  background-position: center ;
  background-size: cover;
  width: 100%;
  height: 128px;
  text-align: center;
  .title{
    padding: 28px 0 7px;
    font-size:30px;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:42px;
  }
  .tip{
    font-size:20px;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:28px
  }
}
.news-cont{
  margin-top: 31px;
  display: flex;
  .news-tip{
    margin-right: 16px;
    padding: 11px 8px;
    width: 189px;
    background-color: #fff;
    .tip{
      padding: 13px 21px 9px;
      .title{
        font-size:16px;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:22px;
        padding-bottom: 6px;
      }
      .intr{
        font-size:14px;
        color:rgba(0,0,0,0.5);
        line-height:20px;
      }
    }
    .axt-tip{
      background:rgba(244,246,249,1);
      border-radius:8px;
    }
  }
  .cont{
    flex-grow: 1;
    width: 50%;
    padding: 32px 25px;
    background-color: #fff;
  }
}
</style>
