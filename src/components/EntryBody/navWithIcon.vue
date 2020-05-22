<template>
  <div class='navWithIcon'>
    <el-row :gutter="0" :type="'flex'" :justify="'center'">
      <el-col :span="item.width" v-for='item in navWithIconData' :key="item.title">
        <div class="content">
          <div class='type'>
            <a :href="item.href" target='_blank'>
              {{ item.title }}
            </a>
          </div>
          <div class="hrefContent">
            <div class="hrefItem" v-for='href in item.hrefs' :key='href.title'>
              <a :href="href.href" target='_blank'>
                <img :src="href.img" alt="">
                <div class='title'>
                  {{ href.title }}
                </div>
                <div class='subtitle'>
                  {{ href.subtitle }}
                </div>
              </a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navWithIconData from './data/navWithIconData.js'
export default {
  name: 'navWithIcon',
  data: () => ({
    navWithIconData
  }),
  methods: {

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
.navWithIcon {
  .el-row {
    height: 250px;
    width: 1100px;
    margin: 60px auto;
    .el-col {
      height: 100%;
      &:last-child {
        .content {
          border-right: none;
        }
      }
      .content {
        height: 100%;
        padding-left: 25px;
        border-right: 1px solid rgba(0, 0, 0, 0.06);
        .hrefContent {
          margin-top: 30px;
        }
        .type {
          font-weight: 800;
        }
        .hrefItem {
          width: 82px;
          height: 100px;
          float: left;
          display: flex;
          text-align: center;
          justify-content: center;
          margin-right: 13px;
          margin-bottom: 9px;
          white-space:nowrap;
          img {
            width: 44px;
            height: 44px;
          }
          .title {
            font-size: 15px;
            padding-top: 8px;
            // letter-spacing: -2px;
          }
          .subtitle {
            font-size: 0.8rem;
            color: #a9a9a9;
            letter-spacing: 0px;
            padding-top: 8px;
          }
          &:hover {
            img {
              transform: scale(1.1);
            }
          }
        }
        a {
          color: #000;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
