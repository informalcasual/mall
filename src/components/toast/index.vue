<template>
    <div class="toast">
        <transition-group name="state">
            <div :key="toast.index"
                v-if='!toast.out'
                v-for='toast in toastList'
                :class="[
                          toast.type == 'success' ? 'success' : '',
                          toast.type == 'warn' ? 'warn' : ''
                        ]"
                class="toast_one flex items-center border-box">
              <i class="toast_icon"
                 :style="{ 'backgroundImage' :
                    `url(${toast.type == 'success' ? require('./img/success.svg') : toast.type == 'warn' ? require('./img/warn.svg') : ''})`
                  }"></i>
              <p class="toast_text" v-html='toast.msg'></p>
            </div>
        </transition-group>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'toast',
  computed: {
    ...mapState({
      toastList: state => state.toast.list
    })
  }
}
</script>

<style lang='scss' scoped>
.toast {
  position: fixed;
  z-index: 20003;
  top: 80px;
  right: 30px;
  width: 355px;
}
.success {
  background-color: #56cb8f;
}
.warn {
  background-color: #8d91ff;
}
// .info {
//   background-color: #56cb8f;
// }
.toast_icon {
  width: 36px;
  height: 36px;
  margin-right: 21px;
  background-repeat: no-repeat;
  background-size: 100%;
  display: inline-block;
  vertical-align: middle;
}
.toast_one {
  width: 100%;
  border-radius: 8px;
  padding: 20px 0 20px 23px;
  margin-bottom: 20px;
  box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.1);
  transition: all .7s;
}
.toast_text {
  width: 260px;
  line-height: 1.36;
  font-size: 15px;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 90, 20, 0.5);
  display: inline-block;
  color: #fff;
  vertical-align: middle;
}
.state-leave-active {
  position: absolute;
}
.state-enter, .state-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
