<template>
    <div v-show="show" id="pFooter" class="copyright">
        <aside class="href_wrap">
            <div class="about_right">
                <div class="about">
                    <div class="about_title">探索与想法</div>
                    <div class="subtitle">
                      <a href="https://static.paixin.com/paixin-vision/static/company_intro.pdf" target='_blank'>
                        关于拍信
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://v.paixin.com/" target='_blank'>
                        拍信版权
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://z.paixin.com/" target='_blank'>
                        拍信知产
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://7mx.com/" target='_blank'>
                        7MX摄影社区
                      </a>
                    </div>
                </div>
                <div class="about">
                    <div class="about_title">价格与服务</div>
                    <div class="subtitle">
                      <a href="https://v.paixin.com/packagestore" target='_blank'>
                        正版图片套餐
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://z.paixin.com/item/brand/common/2" target='_blank'>
                        商标专利套餐
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="" target='_blank'>
                        企业付款方式
                      </a>
                    </div>
                </div>
                <div class="about">
                    <div class="about_title">加入拍信团队</div>
                    <div class="subtitle">
                      <a href="https://v.paixin.com/contact" target='_blank'>
                        入职拍信公司
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="https://v.paixin.com/feedback?type=praise" target='_blank'>
                        我要意见反馈
                      </a>
                    </div>
                </div>
                <div class="about">
                    <div class="about_title">与拍信合作</div>
                    <div class="subtitle">
                      <a href="https://7mx.com/contributor" target='_blank'>
                        签约拍信供稿
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="" target='_blank'>
                        知商服务入驻
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="" target='_blank'>
                        拍信知产系统
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="" target='_blank'>
                        流量广告投放
                      </a>
                    </div>
                </div>
                <div class="about">
                    <div class="about_title">社交媒体</div>
                    <div class="subtitle">
                      <a href="" target='_blank'>
                        拍信云公众号
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="" target='_blank'>
                        拍信云微博
                      </a>
                    </div>
                    <div class="subtitle">
                      <a href="" target='_blank'>
                        拍信云知乎
                      </a>
                    </div>
                </div>
            </div>
        </aside>
         <footer class="gongshang">
            &#169; 2019 江苏拍信文化创意有限公司 All Rights Reserved
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
  height: 380px;
  background: #202020;
}
.href_wrap {
  width: 1000px;
  position: relative;
  margin: 0 auto;
  top: 45px;
  min-height: 175px;
}
.about_right {
  display: flex;
}
.about_right .about {
  flex-grow: 1;
  margin: 0 30px;
}
.about_right .about .about_title {
  font-weight: 400;
  letter-spacing: 2px;
  margin-bottom: 14px;
  font-size:16px;
  color:rgba(255,255,255,0.5);
  line-height:22px;
}
.about_right .about .subtitle {
  letter-spacing: 2px;
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,0.7);
  line-height:35px;
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
  bottom: 35px;
  font-size: 16px;
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
