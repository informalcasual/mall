<template>
  <div class="news min-box spread">
    <div class="bus-show" :style="{'background-image': `url(${require('./img/topBanner.png')})`}">
      <div class="title">无锡文化出口基地</div>
      <p class="tip">吴文化江南文化</p>
    </div>
    <div class="title-classify">
      <div class="title-tip pointer" @click.stop="change(1)" :class="{'act': type === 1}">重要区域</div><!-- 

       --><div class="title-tip pointer" @click.stop="change(2)" :class="{'act': type === 2}">重点企业</div>
    </div>
    <div class="news-cont">
      <div class="news-tip" v-if="newsList.length > 0">
        <div class="tip pointer"
        v-for="(item, i) in newsList"
        :key="i"
        :class="{'axt-tip': index === i}"
        @click.stop="index = i"
        >
          <div class="title">{{item.name}}</div>
          <div class="intr" v-if="type === 1">魅力主城，绽放光荣</div>
        </div>
      </div>
      <div class="cont">
        <div id="plac" v-if="newsList[index]" v-html="newsList[index].desc"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:()=>({
    index: 0,
    newsList: [],
    type: 1,
  }),
  methods: {
    async getWindows() {
      
      let res = await this.$apiFactory.getpageModel().window(this.type)
      if(res.status == 200) {
        this.newsList = res.data
      }
      // console.log(res)
    },
    change(type){
      this.type = type
      this.getWindows()
    }
  },
  created() {
    this.getWindows()
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
  align-items: flex-start;
  .news-tip{
    margin-right: 16px;
    padding: 11px 8px;
    width: 189px;
    background-color: #fff;
    max-height: 512px;
    overflow: hidden;
    overflow-y: scroll;
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
  /*滚动条样式*/
  .news-tip::-webkit-scrollbar {/*滚动条整体样式*/
      width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
  }
  .news-tip::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
  }
  .news-tip::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
  }
 
  .cont{
    flex-grow: 1;
    width: 50%;
    padding: 32px 25px;
    background-color: #fff;
  }
}
.title-classify {
  margin: 20px 0 10px;
  border: 1px solid #702a2a;
  display: inline-block;
  .title-tip{
    display: inline-block;
    padding: 10px 30px;
    font-size: 18px;
    line-height: 22px;
    color: #702a2a;
  }
  .act{
    color: #fff;
    background-color: #702a2a;
  }
}
</style>
<style lang="scss">
#plac{
  font-size:16px;
  color:rgba(51,51,51,1);
  line-height:30px;
  p{
    padding-bottom: 20px;
  }
  img{
    width: 100%;
  }
}
</style>

