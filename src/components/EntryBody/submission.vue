<template>
  <div class='submission'>

      <div class='top-title'>
          <span class='title'>咨询你的疑问</span>
          <span class='subtitle'>说出你的需求，让我们来为你解决</span>
      </div>

      <div class='fast'>
        <!-- <div class="title">热门需求</div> -->
        <div class='list'>
          <div class='item'>
            <el-checkbox-group v-model="checkboxGroup5" size="small">
              <el-checkbox v-for='(item, i) in hrefs' :key="i" :label="item" border></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 9}"
        placeholder="请补充您的需求"
        v-model="textarea3" />
      <el-input
        class='phone'
        placeholder="电话"
        prefix-icon="el-icon-phone"
        v-model="phone" />
      <div id='getConsult_3' @click='toSub' class='button'>
        发布需求
      </div>
  </div>
</template>

<script>
// 设置常量
const ERR_OK = 0
export default {
  name: 'submission',
  data: () => ({
    textarea3: '',
    phone: '',
    hrefs: [
      '我想要买图', '我想注册商标', '我想申请专利', '我想申请版权', '我想购买商标', '我想推广品牌'
    ],
    checkboxGroup5: []
  }),
  methods: {
    async toSub() {
      if (!this.phone || this.phone.length != 11) {
        this.$notify({
          title: '警告',
          message: '请输入正确的手机号码',
          type: 'warning'
        })
        return
      }
      const data = {
        phone: this.phone,
        search: (this.checkboxGroup5.join(',') || '') + ' 补充： ' + this.textarea3
      }
      // 请求
      try {
        const { status, data: { out, msg } } = await this.$apiFactory.getUserApi().userSearch(data)
        // 判断成功或者失败
        if (out > ERR_OK && status === 200) {
          this.current = 1
          this.title = '完成查询'
          this.$notify({
            title: '成功',
            message: '我们已收到您的需求，将尽快与您联系',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '警告',
            message: msg,
            type: 'warning'
          })
        }
      } catch (e) {
        this.$notify({
          title: '警告',
          message: e.msg,
          type: 'warning'
        })
      }
    }
  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  computed: {

  },
  components: {

  }
}
</script>

<style lang='scss' scoped>
.submission {
  .top-title {
    margin-bottom: 32px;
    .title {
      font-size: 18px;
      line-height: 25px;
    }
    .subtitle {
      font-size: 0.9rem;
      line-height: 25px;
      color: rgba(0, 0, 0, 0.4);
      float: right;
    }
  }
  .phone {
    margin-top: 10px;
  }
  .button {
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background: #e51429;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;
  }
  .fast {
    margin-top: -4px;
    .title {
      text-align: center;
      color: rgba(0, 0, 0, 0.4);
      line-height: 3;
    }
    .list {
      height: 97px;
      .el-checkbox {
        margin: 5px !important;
        margin-right: 10px !important;
        margin-left: 0 !important;
      }
    }
  }
}
</style>
