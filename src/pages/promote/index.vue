<template>
  <main class="content">
    <bg-banner :bg="bg">
      <p class="promote_title">商标注册，就选拍信</p>
      <p class="promote_subtitle">
        在中国，互联网申请商标等知识产权，98%再次选择拍信
      </p>
    </bg-banner>

    <search/>

    <notice :notice="noticeList"/>

    <number-top :list="numberTop"/>

    <service
      :cardList="commonList"
      :list="serviceList"
      :current="serviceIndex"
      @onItemClicked="brandItemClicked"
    >
      <div class="service_title">商标注册</div>
      <div class="service_subtitle">专业 效率高 下证快</div>
    </service>

    <programme :programme="pSvg"
    :bg="{'background':'#ffffff'}">
    <div class="programme_title">商标注册流程</div>、
    <div class="programme_subtitle">专业 效率高 下证快</div>
    </programme>

    <questions :detail='qList'>
      <div class="questions_title">专利注册的常见问题</div>
      <div class="questions_subtitle">
        专业 效率高 下证快
      </div>
    </questions>

    <consultant :persons="persons" :title="pTitle">
      <p class="consultant_title">
        销售顾问
      </p>
    </consultant>

    <div class="middle_banner">
      <div class="banner_title">为什么要选择拍信注册</div>
      <div class="banner_subtitle">拍信是中国领先的知识产权服务平台，我们利用互联网技术，比传统机构申请更快、服务更好、效率更高</div>
      <img :src="middleBanner" alt="banner">
    </div>

    <person-intro :persons="interview">
      <p class="person_title">用户访谈</p>
    </person-intro>

    <div class="underLine"></div>

    <tab-view :title="'合作案例'"
    :tabOptions="tabOption"
    @onOptionClicked="optionClicked">
    </tab-view>

    <contact-in-page>
      <p class="contact_us_in_page">告诉我们你的疑问</p>
    </contact-in-page>

    <partner>
      <p class="partner">合作伙伴</p>
    </partner>
  </main>
</template>
<script>
import BgBanner from '@/components/BgBanner/promote.vue'
import Search from '@/components/search/index.vue'
import Notice from '@/components/notice/index.vue'
import NumberTop from '@/components/number/index.vue'
import Service from '@/components/service/index.vue'
import Programme from '@/components/programme/index.vue'
import Questions from '@/components/articleAbstract/index.vue'
import Consultant from '@/components/consultant/index.vue'
import PersonIntro from '@/components/personIntro/index.vue'
import TabView from '@/components/tabView/TabView.vue'
import ContactInPage from '@/components/contact/contactInPage.vue'
import Partner from '@/components/partner/index.vue'
import middleBanner from './img/promote.svg'

import noticeList from './data/noticeList.js'
import { commonList } from './data/cardList.js'
import pSvg from './img/copyrightProcess.svg'
import qList from './data/articleAbstract.js'
import persons from './data/persons.js'
import interview from './data/personSwitchData.js'
import tabOption from './data/tabOptions.js'
export default {
  name: 'promote',
  data: () => ({
    bg: 'http://oyb6rka2w.bkt.clouddn.com/123213134.jpg',
    commonList,
    pSvg,
    qList,
    persons,
    interview,
    tabOption,
    middleBanner,
    noticeList,
    pTitle: [
      {
        message: '知识产权',
        group: 'one'
      },
      {
        message: '企业财税',
        group: 'two'
      },
      {
        message: '营销推广',
        group: 'three'
      },
      {
        message: '交易平台',
        group: 'four'
      }
    ],
    numberTop: [
      {
        num: '',
        desc: '今日查询客户'
      },
      {
        num: '',
        desc: '本周注册成功次数'
      },
      {
        num: '96.5%',
        desc: '注册成功率'
      }
    ],
    serviceList: [
      commonList[0],
      commonList[1]
    ],
    serviceIndex: 0
  }),
  created() {
    this.persons.one = this.$utilHelper.shuffle(this.persons.one)
    this.persons.two = this.$utilHelper.shuffle(this.persons.two)
    this.persons.three = this.$utilHelper.shuffle(this.persons.three)
    this.persons.four = this.$utilHelper.shuffle(this.persons.four)
    this.randomNumbs()
    this.numberTop[0].num = this.timeNumbs().custom
    this.numberTop[1].num = this.timeNumbs().count
  },
  components: {
    BgBanner,
    Search,
    Notice,
    NumberTop,
    Service,
    Programme,
    Questions,
    Consultant,
    PersonIntro,
    TabView,
    ContactInPage,
    Partner
  },
  mounted() {
    this.popContact()
    setTimeout(() => {
      window.qimoChatClick()
    }, 5000)
  },
  methods: {
    randomNumbs() {
      let num1s = [139, 188, 159, 187, 180, 130, 150, 131, 137, 175, 183, 177, 166, 152, 166, 158]
      this.noticeList.map(ele => {
        const delta = Math.floor(Math.random() * 50000)
        ele.user = num1s[Math.floor(Math.random() * num1s.length)] + '' + Math.round(Math.random() * 100000000)
        if (ele.user.length != 11) ele.user = '15906199760'
        ele.date = Math.floor(new Date().getTime() / 1000) - delta
      })
    },
    timeNumbs() {
      let timer = new Date()
      let d = timer.getDay()
      let h = timer.getHours()
      let m = timer.getMinutes()
      let s = timer.getSeconds()
      let dayNum = Math.floor(h * 2.4) + '' + Math.floor(m + 40) + Math.floor((s + 10) / 7.2)
      let weekNum = Math.floor(d * 0.48) + '' + Math.floor(h * 5) + '' + Math.floor(m / 6)
      return {
        custom: dayNum,
        count: weekNum
      }
    },
    optionClicked(index, option) {
      console.log(index, option)
    },
    brandItemClicked(item) {
      window.open(`https://z.paixin.com/item/${item.business}/${item.type}/${item.id}`, '_blank')
    },
    popContact() {
    }
  }
}
</script>
<style lang="scss" scoped>
.promote_title {
  font-size: 62px;
  line-height: 100px;
  color: #fafafa;
  text-align: center;
}
.promote_subtitle {
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #fafafa;
  margin: 0 auto;
  // text-decoration: underline;
}
.programme_title,
.service_title,
.questions_title,
.consultant_title {
  font-size: 28px;
  line-height: 40px;
  text-align: center;
}
.programme_subtitle,
.service_subtitle,
.questions_subtitle {
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  margin: 15px 0 40px;
}
.consultant_title {
  margin-bottom: 40px;
}
.person_title,
.contact_us_in_page,
.partner {
  font-size: 28px;
  line-height: 50px;
  color: #303234;
  text-align: center;
}
.middle_banner {
  box-sizing: border-box;
  background: rgba(235, 1, 40, 1);
  text-align: center;
  color: #ffffff;
  padding-top: 99px;
  .banner_title {
    font-size: 28px;
    line-height: 40px;
  }
  .banner_subtitle {
    font-size: 18px;
    line-height: 60px;
  }
}
.underLine {
  width: 100%;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
}
</style>
