<template>
  <div class="artical box spread">
    <div class="art-cont">
      <div class="title">{{title}}</div>
      <div class="author">{{time}}<span>{{auth}}发布</span></div>
      <div id="art" v-html="content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: '',
    time: '',
    auth: '',
    content: '',
  }),
  methods: {
    async toDetail(){
      let res = await this.$apiFactory.getpageModel().getStatisric(this.$route.params.id)
      if(res.status == 200) {
        this.title = res.data.title
        this.auth = res.data.author || res.data.platform
        this.content = res.data.content
        this.time = this.$utilHelper.YMDTime(this.$utilHelper.safariTime(res.data.createdAt))
      }
    }
  },
  created() {
    this.toDetail()
  }
}
</script>
<style lang="scss" scoped>
.art-cont{
  width: 960px;
  padding: 62px 120px 40px;
  margin: 23px auto;
  background-color: #fff;
}
.title{
  font-size:32px;
  font-weight:500;
  color:rgba(0,0,0,1);
  line-height:45px;
  padding-left: 10px;
  padding-bottom: 11px;
}
.author{
  padding-left: 10px;
  font-size:14px;
  color:rgba(153,153,153,1);
  line-height:20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E9E9E9;
  span{
    padding-left: 30px;
  }
}
</style>
<style lang="scss">
#art{
  padding: 32px 10px 0;
  font-size:16px;
  color:rgba(51,51,51,1);
  line-height:30px;
  p{
    padding-bottom: 20px;
  }
}
</style>
