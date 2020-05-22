<template>
  <footer>
    <div class="list-container">
      <!-- <div class="language">
        <div
          :style="{
            background: 'url(' + require('./img/earth.svg') + ') no-repeat',
            width: '20px',
            height: '20px'
          }"
          class="earth"
        ></div>

        <span>简体中文</span>

        <div
          :style="{
            background: 'url(' + require('./img/array.svg') + ') no-repeat',
            width: '20px',
            height: '10px'
          }"
        ></div>
      </div> -->

      <div class="footer-community">
        <dl>
          <dt>产品</dt>
          <dd>
            <a
              href="https://static.paixin.com/paixin-vision/static/company_intro.pdf"
              target="_blank"
              >关于拍信</a
            >
          </dd>
          <dd>
            <a href="https://v.paixin.com/" target="_blank">视觉业务</a>
          </dd>
          <dd>
            <a href="https://z.paixin.com/" target="_blank">知产业务</a>
          </dd>
          <dd>
            <a href="https://z.paixin.com/copyright" target="_blank"
              >版权业务</a
            >
          </dd>
          <dd>
            <a href="https://7mx.com/" target="_blank">7MX视觉社区</a>
          </dd>
        </dl>
      </div>

      <div class="footer-business">
        <dl>
          <dt>商业</dt>
          <dd>
            <a href="https://7mx.com/contributor" target="_blank">签约创作者</a>
          </dd>
          <dd>
            <a href="static/doc/payway3.pdf" target="_blank">付款方式</a>
          </dd>
          <dd>
            <a href="https://v.paixin.com/contact" target="_blank">品牌合作</a>
          </dd>
          <dd>
            <a href="static/doc/agreement2.pdf" target="_blank">退换货协议</a>
          </dd>
          <dd>
            <a href="https://v.paixin.com/feedback?type=cwfws" target="_blank"
              >成为服务商</a
            >
          </dd>
        </dl>
      </div>

      <div class="footer-contact">
        <dl>
          <dt>联系我们</dt>
          <dd>
            <a>400-9613-900</a>
          </dd>
          <dd>
            <a>support@paixin.com</a>
          </dd>
          <dd>
            <a>邮件24小时内回复</a>
          </dd>
          <dd>
            <div class="share">
              <a
                href="https://www.zhihu.com/org/pai-xin-tu-ku/activities"
                target="_blank"
              >
                <img src="./img/zhihu.svg" width="32px" alt />
              </a>
              <img src="./img/wechat.svg" width="32px" alt />
              <a href="https://weibo.com/u/5670065168" target="_blank">
                <img src="./img/wb.svg" width="32px" alt />
              </a>
            </div>
          </dd>
        </dl>
      </div>

      <div class="footer-ideas">
        <dl>
          <dt>一些想法</dt>
          <dd>
            <a href="https://v.paixin.com/feedback?type=pxln" target="_blank"
              >拍信理念</a
            >
          </dd>
          <dd>
            <a href="https://v.paixin.com/feedback?type=tzpx" target="_blank"
              >投资拍信</a
            >
          </dd>
          <dd>
            <a href="https://v.paixin.com/feedback?type=zcjj" target="_blank"
              >拍信知产基金</a
            >
          </dd>
        </dl>
      </div>
    </div>


    <div class="friendSiteWrap">
      <div class="friendSite">
        <div class="tt">友情链接：</div>
        <div class="siteList">
          <a href="https://www.chuangkit.com" target="_blank">创客贴图片设计</a>
          <a href="https://www.gaoding.com" target="_blank">稿定设计</a>
          <a href="https://www.uisdc.com" target="_blank">优设网</a>
          <a href="https://www.135editor.com" target="_blank">135编辑器</a>
          <a href="https://xmt.cn" target="_blank">新媒体管家</a>
          <a href="https://www.mockplus.cn/" target="_blank">摹客</a>
          <a href="https://v.paixin.com" target="_blank">正版图片</a>
          <a href="https://z.paixin.com" target="_blank">商标注册</a>
          <a href="https://www.7mx.com" target="_blank">摄影社区</a>
          <a href="https://z.paixin.com/itemdesign/logo/1" target="_blank"
            >LOGO设计</a
          >
          <a href="http://duososo.com/index.php" target="_blank">图片搜索</a>
          <a href="https://www.mcool.com" target="_blank">模库网</a>
          <a href="http://www.96weixin.com/" target="_blank">公众号出售</a>
          <a href="https://www.bpteach.com/" target="_blank">新媒体培训</a>
          <a href="https://modao.cc/?utm_source=paixin" target="_blank">墨刀</a>
          <a href="https://www.365editor.com/?f=yl" target="_blank"
            >365编辑器</a
          >
          <a href="http://www.yymiao.cn/" target="_blank">电商运营</a>
          <a href="http://www.7msj.com/" target="_blank">七米素材</a>
          <a href="https://zaodao.net/" target="_blank">早道素材</a>
          <a href="https://www.91sotu.com/" target="_blank">搜图导航</a>
          <a href="https://www.17font.com" target="_blank">字体视界</a>
          <a href="http://hao.360.cn/" target="_blank">360导航</a>
          <a href="http://se.360.cn/" target="_blank">360安全浏览器</a>

          <a href="/friends" target="_blank">查看更多 ></a>
        </div>
      </div>
    </div>

    <div class="mx-right">
      © 2017 江苏拍信文化创意有限公司 All Rights Reserved
      <a @click="toCopyRight">苏ICP备14057276号-1</a>&nbsp;&nbsp;|&nbsp;
      <a @click="toCopyRight">增值电信业务经营许可证 苏B2-20190018</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'indexFooter',
  data: () => ({}),
  methods: {
    toCopyRight() {
      window.open('http://beian.miit.gov.cn', '_blank')
    }
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  components: {}
}
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  background: #2c3033;
  padding-top: 65px;
}

.list-container {
  width: 1000px;
  margin: 0 auto 60px auto;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.5);
  position: relative;
}

dt {
  font-size: 1.4em;
  font-weight: 200;
  color: #fff;
  margin-bottom: 40px;
}

dd {
  padding-left: 0 !important;
  font-size: 0.9em;
  margin-left: 0 !important;
  margin-top: 16px;
  transition: color 0.2s;
  /* -webkit-margin-start: 0 !important; */
}

dd a,
dd span {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}

dd a:hover,
dd span:hover {
  color: #fff;
  transition: color 0.2s;
  cursor: pointer;
}

.language {
  position: absolute;
  width: 124px;
  right: -130px;
  top: -60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.language:hover {
  opacity: 1;
  transition: opacity 0.2s;
}

.language div {
  background-size: cover !important;
  background-position: center !important;
}

.language span {
  color: #fff;
  font-size: 0.9em;
}

.share {
  text-align: center;
  padding-top: 10px;
}

.share img {
  margin-right: 20px;
  cursor: pointer;
}

.mx-right {
  font-size: 0.6rem;
  text-align: center;
  padding: 20px 0;
  color: rgba(255, 255, 255, 0.3);
  width: 100%;
}

.mx-right a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

.friendSiteWrap {
  .tt {
    width: 175px;
  }
  .friendSite {
    width: 1020px;
    margin: 50px auto;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    a {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      margin: 0 7px 10px;
      font-size: 0.9rem;
      display: inline-block;
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
