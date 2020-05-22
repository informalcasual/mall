<template>
    <div v-show="show" id="pFooter" class="copyright">
        <aside class="href_wrap">
            <div class="about_left">
            <div class="logo" style="font-family: Arial !important;">PAIXIN</div>
            <div class="desc">拍信(Paixin.com)是中国领先的知识产权交易平台，提供商标专利注册，正版图片素材下载，企业可以使用拍信推广运营自己的业务，深受企业主，编辑运营等创意人群的喜爱。
                <br><span style="font-size:1.2rem;font-weight:800;line-height:2;">400-9613-900</span>
            </div>
            </div>
            <div class="about_right">
                <div class="about">
                    <div class="about_title">探索与想法</div>
                    <div class="subtitle">
                      <a href="https://v.paixin.com" target='_blank'>
                        版权图库
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://z.paixin.com/promote" target='_blank'>
                        商标查询
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://z.paixin.com" target='_blank'>
                        知产注册
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://z.paixin.com/patent" target='_blank'>
                        专利与版权
                      </a>
                    </div>
                </div>
                <div class="about">
                    <div class="about_title">拍信研究院</div>
                    <div class="subtitle">
                      付款方式
                    </div>
                    <div class="subtitle">成为服务商</div>
                    <div class="subtitle pointer" @click="toBecomeContributor()">成为供稿人</div>
                </div>
                <div class="about">
                    <div class="about_title">拍信社群</div>
                    <div class="subtitle text-decoration-none" @click="toContact()">售前客服</div>
                    <div @click="toContact()" class="subtitle">售后客服</div>
                    <div @click="toContact()" class="subtitle">加入我们</div>
                    <div @click="toFeedback('praise')" class="subtitle">有奖反馈栏</div>
                </div>
            </div>
        </aside>
         <footer class="gongshang">
            © 2017 江苏拍信文化创意有限公司 All Rights Reserved
            <a style='cursor: pointer'
                class="jump"
               @click='toCopyRight'>
               苏ICP备14057276号-1
            </a>
        </footer>
    </div>
</template>
<script>
export default {
  name: 'copyrighthref',
  data() {
    return {
      contactDialog: false,
      show: false
      //  paixinstory:false
    }
  },
  created() {
    setTimeout(() => {
      this.show = true
    }, 4000)
  },
  methods: {
    contactUs() {
      this.contactDialog = true
    },
    paiXinStory() {
      // this.paixinstory = true;
      window.open('/static/company_intro.pdf', '_blank')
    },
    openPrivacyPolicy() {
      window.open('/static/privacy.pdf', '_blank')
    },
    openagreement() {
      window.open('/static/agreement2.pdf', '_blank')
    },
    toEput() {
      window.open('http://7mx.com/', '_blank')
    },
    openAuthDetail() {
      window.open('/static/authorization.pdf', '_blank')
    },
    toFeedback(value) {
      window.open('https://v.paixin.com/feedback?type=' + value, '_blank')
    },
    toBecomeContributor() {
      window.open('http://7mx.com/contributor', '_blank')
    },
    toContact() {
      window.open('https://q.url.cn/CD7a0H?_type=wpa&qidian=true', '_blank')
    },
    toCopyRight() {
      window.open('http://www.miitbeian.gov.cn', '_blank')
    }
  }
}
</script>
 <style lang='scss' scoped>
#pFooter {
  width: 100%;
  position: relative;
  color: #fff;
  background-position: bottom;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  width: 100%;
  height: 300px;
  background: #202020;
}
.href_wrap {
  width: 1000px;
  position: relative;
  margin: 0 auto;
  top: 60px;
  min-height: 175px;
}
.about_left {
  width: 34%;
  height: 100%;
  position: absolute;
  left: 40px;
  top: 0;
}
.about_left .logo {
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;
  transform: scaleY(0.87) translate3d(0, -7px, 0);
}
.about_left .desc {
  font-size: 0.7rem;
  letter-spacing: 1px;
  line-height: 1.7;
  width: 80%;
  text-align: justify;
  opacity: 0.5;
}
.about_right {
  position: absolute;
  right: -15px;
  top: 0;
  width: 56%;
  display: flex;
}
.about_right .about {
  flex-grow: 1;
  margin: 0 30px;
}
.about_right .about .about_title {
  font-weight: 400;
  font-size: 1.05rem;
  letter-spacing: 2px;
  margin-bottom: 14px;
}
.about_right .about .subtitle {
  font-size: 0.8rem;
  line-height: 1.9;
  opacity: 0.7;
  letter-spacing: 2px;
  cursor: pointer;
  a {
    color: #fff;
    text-decoration: none;
  }
}
.about_right .about .subtitle:hover {
  opacity: 1;
}
.gongshang {
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  height: 46px;
  line-height: 46px;
  position: absolute;
  letter-spacing: 1px;
  bottom: 0;
  font-size: 0.6rem;
}
.jump {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
}
.contactContainer {
  font-size: 16px;
  color: #000;
  margin: 20px;
  margin-top: 0;
}
.contactContainer span {
  margin: 20px;
  margin-top: 0;
  letter-spacing: 2px;
  line-height: 1.5;
}
.contactContainer p {
  letter-spacing: 3px;
  line-height: 2;
}
</style>
