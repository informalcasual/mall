<template>
  <div class="news min-box spread">
    <div class="bus-show" :style="{'background-image': `url(${require('./img/topBanner.png')})`}">
      <div class="title">{{ifEn ? 'Wuxi Cultural Export Base' : '无锡文化出口基地'}}</div>
      <p class="tip">{{ifEn ? 'Wu Culture Jiangnan Culture' : '吴文化江南文化'}}</p>
    </div>
    <div class="nav">
      <div class="title-classify">
      <div class="title-tip pointer" @click.stop="change(1)" :class="{'act': type === 1}">{{ifEn ? 'REGION' : '重要区域'}}</div><!-- 
       --><div class="title-tip pointer" @click.stop="change(2)" :class="{'act': type === 2}">{{ifEn ? 'ENTERPRISE' : '重点企业'}}</div>
      </div>  
       <div class="select-box pointer" v-if="type === 2" @click.stop="show = !show">
          {{select_name === '全部' && ifEn ? 'ALL' : select_name}}
        <div class="pointer-box" v-show="show">
          <p @click.stop="changeAttr(0)">{{ifEn ? 'ALL' : '全部'}}</p>
          <p @click.stop="changeAttr(index+1)"  v-for="(item, index) in select_list" :key="index">
            {{item.name}}
          </p>
        </div>
       </div>
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
          <div class="intr" v-if="type === 1">{{ifEn ? 'Special Charm' : '魅力主城，绽放光荣'}}</div>
        </div>
      </div>
      <div class="cont">
        <div id="plac" v-if="newsList[index]" v-html="newsList[index].desc"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data:()=>({
    index: 0,
    newsList: [],
    type: 1,
    select_name: '全部',
    select_id: 0,
    select_list: [],
    show: false
  }),
  methods: {
    async getWindows() {
      let res = await this.$apiFactory.getpageModel().window(this.type, this.type === 1 ? 0 : this.select_id)
      if(res.status == 200) {
        this.newsList = res.data
      }
      // console.log(res)
    },
    change(type){
      this.type = type
      this.getWindows()
    },
    async getList() {
      let res = await this.$apiFactory.getTrademarkApi().getCategoray(3)
      if(res.status == 200){
        this.select_list = res.data
      }
    },
    changeAttr(index) {
      if(index === 0 && this.select_id === 0) return this.show = false
      if(index === 0) {
        this.select_id = 0 
        this.select_name = this.ifEn ? 'ALL' : '全部'
      }

      if(index !== 0) {
        if(this.select_id === this.select_list[index-1].id) return this.show = false
        this.select_id = this.select_list[index-1].id
        this.select_name = this.select_list[index-1].name
      }
      this.show = false
      this.index = 0
      this.getWindows()
    }
  },
  created() {
    this.getWindows()
    this.getList()
  },
  computed: {
    ...mapState({
      ifEn: state => state.user.ifEn
    }),
  },
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
      width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
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
    min-height: 470px;
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
.nav{
  position: relative;
}
.select-box{
  right: 0;
  top: 20px;
  width:130px;
  height:42px;
  border-radius:4px;
  border:1px solid rgba(0,0,0,1);
  font-size:14px;
  font-weight:500;
  color:rgba(0,0,0,1);
  text-align: center;
  line-height:42px;
  display: inline-block;
  float: right;
  position: relative;
  z-index: 1000;
  .pointer-box{
    position: absolute;
    padding: 12px 10px;
    top: 48px;
    left: -1px;
    background-color: #f4f6f9;
    width: calc(100% - 20px);
    border: 1px solid;
    border-radius: 4px;
    p{
      &:hover{
        background-color: #e9f0fc;
        color: #82adf6;
      }
    }
  }
}
.spread{
  overflow: initial;
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
  h2, h1{
    text-align: center;
    padding-bottom: 20px;
    letter-spacing: 2px;
    font-size: 24px;
  }
}
</style>

