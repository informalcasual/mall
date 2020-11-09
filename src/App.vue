<template>
  <div id="app">
    <div style="height: 66px" />
    <navBar />
    <router-view />
    <!-- <search-confirm v-show="getDialogState" /> -->
    <!-- ======================= -->
    <toast/>
    <login />
    <signup />
    <fullPhone />
    <advisory />
    <!-- 免责声明 -->
    <statement />
    <!-- <backTop v-if='scroll > 1000'/> -->
    <bottom/>
  </div>
</template>

<script>
import statement from '@/components/state/state'
import bottom from '@/components/bottom/bottom'
import toast from '@/components/toast/index'
import navBar from '@/components/bar/navigation.vue'
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
   
  },
  methods: {

  },
  components: {
    navBar,
    bottom,
    toast,
    login,
    signup,
    fullPhone,
    advisory,
    statement
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
}
</style>
