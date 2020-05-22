<template>
  <div>
      <div class="top_line"></div>
      <div class="user_center base-width">
        <user-nav :user="getUser"></user-nav>
        <div class="content">
            <router-view></router-view>
        </div>
      </div>
      <under-line/>
  </div>
</template>
<script>
import UserNav from '@/components/userNav/index.vue'
import UnderLine from '@/components/underLine/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'user',
  data: () => ({}),
  components: {
    UserNav,
    UnderLine
  },
  computed: {
    ...mapState({
      getUser: state => state.user.loginUser
    })
  }
}
</script>
<style lang="scss" scoped>
.top_line {
  width: 100%;
  height: 1px;
  background: #e8e8e8;
}
.user_center {
  border-radius: 10px;
  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
  margin: 30px auto 43px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .content {
    width: 1000px;
    box-sizing: border-box;
    padding: 30px 36px;
  }
}
</style>
