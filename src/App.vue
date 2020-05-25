<template>
  <div id="app">
    <div style="height: 66px" />
    <navBar />
    <router-view />
    <!-- <search-confirm v-show="getDialogState" /> -->
    <!-- ======================= -->
    <toast/>
    <contact />
    <login />
    <signup />
    <fullPhone />
    <advisory />
    <!-- <backTop v-if='scroll > 1000'/> -->
      <bottom/>
  </div>
</template>

<script>
import bottom from '@/components/bottom/bottom'
import toast from '@/components/toast/index'
import navBar from '@/components/bar/navigation.vue'
import SearchConfirm from '@/components/search/confirm.vue'
import contact from '@/components/contact/index.vue'
import login from '@/components/login/login.vue'
import signup from '@/components/login/signup'
import fullPhone from '@/components/bindPhone/bindPhone'
import { mapState } from 'vuex'
import queryString from 'query-string'
import advisory from '@/components/advisory/index'
export default {
  name: 'App',
  methods: {
    async login() {
      let res = await this.$apiFactory.getUserApi().currentUser()
      if (res.status == 200) {
        this.$store.dispatch('signin', res)
      }
    },
    getScrollTop() {
      this.$store.state.scrolltop.scroll_top_score =
        document.body.scrollTop || document.documentElement.scrollTop
    }
  },
  created() {
    this.statistics()
  },
  methods: {
    // 获取推广统计（只限未注册）
    async statistics() {
      let qs = queryString.parse(window.location.href.split('?')[1]) 
      if (qs.utm_source) {
        let date = new Date().toISOString()
        let newDate = date.replace('Z', '+0000')
        let popularize = {
          createdAt: newDate,
          source: typeof qs.utm_source === 'object' ? qs.utm_source[0] : qs.utm_source,
          channel: typeof qs.utm_campaign === 'object' ? qs.utm_campaign[0] : qs.utm_campaign,
          url: window.location.href.split('?')[0],
          unit:typeof qs.utm_unit === 'object' ? qs.utm_unit[0] : qs.utm_unit,
        }
        if (window.localStorage.spreads) {
          let spreads = JSON.parse(window.localStorage.spreads)
          spreads.push(popularize)
          window.localStorage.spreads = JSON.stringify(spreads)
        } else {
          window.localStorage.spreads = JSON.stringify([popularize])
        }
        let res = await this.$apiFactory.getUserApi().statisticsIP(popularize)
      }
    },
  },
  components: {
    navBar,
    bottom,
    toast,
    SearchConfirm,
    contact,
    login,
    signup,
    fullPhone,
    advisory
  },
  computed: {
    ...mapState({
      scroll: state => state.scrolltop.scroll_top_score
      // getDialogState: state => state.user.dialogState
    })
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background-color: #F4F6F9;
}
</style>
