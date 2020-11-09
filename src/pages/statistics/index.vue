
<template>
  <div class="news min-box spread">
    <div class="bus-show" :style="{'background-image': `url(${require('./img/topBanner.png')})`}">
      <div class="title">{{ifEn ? 'Wuxi Cultural Export Base' : '无锡文化出口基地'}}</div>
      <p class="tip">{{ifEn ? 'Wu Culture Jiangnan Culture' : '吴文化江南文化'}}</p>
    </div>
    <div class="news-cont">
      <div class="news-tip">
        <div class="tip pointer"
        v-for="(item, i) in newsList"
        :key="i"
        :class="{'axt-tip': index === i}"
        @click.stop="choseId(i)"
        >
          <div class="title">{{ifEn ? item.e_title : item.title}}</div>
          <div class="intr">{{item.intr}}</div>
        </div>
      </div>
      <div class="cont">
      
        <div class="cont-box1"  v-if="index == 3 || index == 2" >
         <div class="file-tit" v-for="(item, i) in news" :key="i">
          <router-link  :to="item.url"  target="_blank" >
          <div class="flex info"><div class="title">{{item.name}}</div><div class="time">{{item.createdAt}}</div></div>
          </router-link>
         </div>
        </div>
        <div class="cont-box flex"
        v-if="index == 1 || index == 0" v-for="(item, i) in news" :key="i"
        >
          <div class="avatar" :style="{'background-image': `url(${item.url})`}"></div>
          <div class="company-info">
            <div class="title ell">{{item.name}}</div>
            <div class="area">{{ifEn ? 'REGION' : '所在区域：'}}{{item.location}}</div>
            <div class="summary">{{item.desc}}</div>
            <div class="more pointer" @click.stop="watchMore(item)">{{ifEn ? 'MORE' : '查看更多'}}</div>
          </div>
        </div>
  
      </div>
    </div>
    <div class="detail-box flex" v-if="show">
      <div class="box flex">
        <div 
        class="close pointer"
        :style="{'background-image': `url(${require('./img/close.svg')})`}"
        @click.stop="show = false"
        ></div>
        <div class="avatar" :style="{'background-image': `url(${detail.url})`}"></div>
        <div class="company-info">
          <div class="title ell">{{detail.name}}</div>
          <div class="area">{{ifEn ? 'REGION' : '所在区域：'}}{{detail.location}}</div>
          <div class="summary">{{detail.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data:()=>({
    index: 0,
    newsList: [
    // {
    //   title:'历年数据查询下线',
    //   id: 1,
    // },{
    //   title:'文化出口材料',
    //   id: 2,
    // },
    {
      title:'国家重点文化出口企业',
      e_title: 'Cultural Exports Enterprises',
      id: 3,
    },{
      title:'国家重点文化出口项目',
      e_title: 'Cultural Exports Projects',
      id: 4,
    }],
    news:[],
    detail: {},
    show: false
  }),
  methods: {
    async choseId(index){
      this.index = index
      this.act_index = -1
      let res = await this.$apiFactory.getpageModel().news(this.newsList[index].id)
      if(res.status == 200) {
        res.data.forEach((ele)=>{
          ele.createdAt = this.$utilHelper.YMDTime(this.$utilHelper.safariTime(ele.createdAt))
        })
        this.news = res.data
      }
    },
    changeIndex(index) {
      this.act_index = index
    },
    watchMore(item) {
      this.detail = item
      this.show = true
    }
  },
  created(){
    this.choseId(0)
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
  .news-tip{
    margin-right: 16px;
    padding: 11px 8px;
    width: 205px;
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .cont-box{
      width: 338px;
      height: 164px;
      padding: 31px 20px 26px 17px;
      background-color: #fff;
      align-items: self-start;
      position: relative;
      margin-bottom: 20px;
      .avatar{
        flex-grow: 0;
        width:66px;
        height:66px;
        margin-top: 5px;
        border-radius: 50%;
        background-color: #e5e5e5;
        background-position: center;
        background-size: cover;
      }
      .company-info{
        width: calc(100% - 83px);
        display: inline-block;
        padding-left: 17px;
        font-size:14px;
        color:rgba(0,0,0,1);
        line-height:20px;
        .title{
          font-size:18px;
          font-weight:600;
          color:rgba(0,0,0,1);
          line-height:25px;
          padding-bottom: 8px;
        }
        .summary{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .more {
          position: absolute;
          right: 31px;
          bottom: 26px;
          font-size:14px;
          color:rgba(146,146,146,1);
          line-height:20px;
        }
      }
    }
  }
}
.cont-box1{
  background-color: #fff;
  width: calc(100% - 72px);
  padding: 24px 36px;
  .file-tit{
    margin-bottom: 10px;
    padding-bottom: 6px;
    .info{
      .title{
        flex-grow: 1;
        width: 50%;
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
  }
  .file-tit:hover{
    .info{
      .title{
        color: rgb(102, 192, 57);
      }
      .time{
        color:rgba(102, 192, 57, 0.5);
      }
    }
  }

}
.detail-box{
  position: fixed;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  .close{
    position: absolute;
    top: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    background-position: center;
    background-size: cover;
  }
  .box{
    width: 500px;
    background-color: #fff;
    padding: 31px 30px 26px 17px;
    align-items: self-start;
    position: relative;
    border-radius: 6px;
    .avatar{
      flex-grow: 0;
      width:70px;
      height:70px;
      margin: 5px 10px 0 10px;
      border-radius: 50%;
      background-color: #e5e5e5;
      background-position: center;
      background-size: cover;
    }
    .company-info{
      width: calc(100% - 103px);
      display: inline-block;
      padding-left: 17px;
      font-size:14px;
      color:rgba(0,0,0,1);
      height: 500px;
      overflow: hidden;
      overflow-y: scroll;
      line-height:20px;
      .title{
        font-size:20px;
        font-weight:600;
        color:rgba(0,0,0,1);
        line-height:25px;
        padding-bottom: 10px;
      }
      .area{
        font-size:14px;
        color:rgba(0,0,0,0.5);
        line-height:25px;
        padding-bottom: 8px;
      }
      .summary{
        font-size:16px;
        color:rgba(0,0,0,0.8);
        line-height:25px;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
