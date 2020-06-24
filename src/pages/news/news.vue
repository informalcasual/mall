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
        @click.stop="changeType(item.id, i)"
        >
          <div class="title">{{item.title}}</div>
        </div>
      </div>
      <div class="cont">
         <div class="info-tip flex pointer" 
         v-for="(item, i) in news" :key="i"
         @click.stop="toLink(item.id)"
         >
           <div class="dot"></div>
           <div class="title">{{item.title}}</div>
           <div class="time">{{item.createdAt}}</div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:()=>({
    index: 0,
    newsList: [{
      title: '新闻资讯',
      id: 1
    }, {
      title: '政策解读',
      id: 2
    }, {
      title: '展会活动',
      id: 3
    }],
    news:[],
  }),
  methods: {
    async changeType(id, i){
      this.index = i
      let res = await this.$apiFactory.getpageModel().getArticleCategory(id)
      if(res.status == 200) {
        res.data.content.forEach(ele => {
          ele.createdAt = this.$utilHelper.YMDTime(this.$utilHelper.safariTime(ele.createdAt))
        })
        this.news = res.data.content
      }
    },
    toLink(id){
      window.open(`artical/${id}`,'_blank')
    }

  },
  created(){
    this.changeType(1, 0)
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
    padding: 0px 52px 32px 25px;
    background-color: #fff;
  }
}
.info-tip{
  margin-bottom: 16px;
  .dot{
    flex-grow: 0;
    margin: 0 11px 0;
    width:4px;
    height:4px;
    border-radius: 50%;
    background:rgba(0,0,0,1);
  }
  .title{
    width: 50%;
    flex-grow: 1;
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
  }
  .time{
    flex-grow: 0;
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height:20px;
  }
}
.info-tip:hover{
  .dot{
    background:#34759f;
  }
  .title{
    color:#409eff;
  }
  .time{
    color:#93c8ff;
  }
}
.info-tip:nth-child(5n){
  margin-bottom: 28px;
  border-bottom: 1px solid #F3F3F3;
}
.info-tip:nth-child(5n+1){
  margin-top: 26px;
}
</style>
