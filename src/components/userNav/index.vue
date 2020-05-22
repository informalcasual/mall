<template>
  <div class="user-nav">
    <div class="user-header">
      <div class="avatar" :style="{backgroundImage:'url(' + user.avatar + ')'}">
        <!-- <img :src="user.avatar" alt=""> -->
      </div>
      <div class="balance">
        <p>{{toprice(user.balance.money)}}</p>
        <div>账户余额</div>
      </div>
      <div @click="QQ" class="btn">客服</div>
    </div>
    <ul class="nav-list">
      <li
        class="item"
        v-for="(item, index) in navList"
        :key="index"
        :class="{'isActive': rightPath.includes(item.route)}"
        @click="to(item.path)"
      >{{item.name}}</li>
    </ul>
    <div class="sign-out" @click="loginOut">退出</div>
  </div>
</template>
<script>
import defaultHeader from '@/assets/img/default.svg'

export default {
  name: 'userNav',
  data: () => ({
    navList: [
      // {
      //   name: '自助服务',
      //   path: '/user/myself'
      // },
      {
        name: '知产订单',
        path: '/user/service',
        route: 'service'
      },
      {
        name: '图库订单',
        path: 'https://v.paixin.com/user/service/orders/0'
      },
      {
        name: '图库发票',
        path: 'https://v.paixin.com/user/service/invoice/applicationForInvoicing',
        route: 'invoces'
      },
      {
        name: '知产发票',
        path: '/user/invoice',
        route: 'invoice'
      },
      {
        name: '个人设置',
        path: '/user/setting/person',
        route: 'setting'
      }
    ]
  }),
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          avatar: defaultHeader,
          balance: '0.00'
        }
      }
    }
  },
  mounted() { },
  watch: {},
  computed: {
    rightPath() {
      return this.$route.path
    }
  },
  methods: {
    to(url) {
      if (url === '/user/invoice') {
        this.$notify({
          title: '',
          message: '申请知产发票请联系客服！',
          duration: 3000
        })
        return
      }
      if (url.includes('v.paixin.com')) return window.open(url, '_blank')
      this.$router.push(url)
    },
    QQ() {
      window.open('https://q.url.cn/CD7a0H?_type=wpa&qidian=true', '_blank')
    },
    async loginOut() {
      /* 底部栏开关 */
      // this.$bus.emit('showBottom', true)
      // this.ifLogin = false;
      this.unsetCookie('isLogin')
      localStorage.setItem('id', null)
      let res = await this.$apiFactory.getUserApi().logout()
      if (res.data.out > 0) {
        this.$store.dispatch('signout')
        this.$notify({
          title: '成功',
          message: '您已退出当前账号',
          type: 'success'
        })
        this.$router.push('/')
      }
    },
    unsetCookie(name, path) {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1)
      let cval = this.cookie(name)
      if (cval !== null) {
        path = path || '/'
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=' + path + ';'
      }
    },
    cookie(name) {
      var arrstr = document.cookie.split('; ')

      for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split('=')
        if (temp[0] == name) {
          return decodeURIComponent(temp[1])
        }
      }
      return ''
    },
    toprice(s) {
      if (s == 0) return '0.00元'
      let p = s / 100 + ''
      if (p.includes('.')) return p + '元'
      return p + '.00' + '元'
    }
  }
}
</script>
<style lang="scss" scoped>
.user-nav {
  width: 176px;
  min-height: 823px;
  background: rgb(246, 250, 250);
  position: relative;
  .user-header {
    padding: 30px 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      width: 73px;
      height: 73px;
      border: 2px solid #f1f1f1;
      border-radius: 50%;
      background: #f1f1f1;
      overflow: hidden;
      margin-bottom: 25px;
      background: 50% 0;
      background-size: cover;
      img {
        width: auto;
        height: 100%;
      }
    }
    .balance {
      text-align: center;
      color: #000;
      margin-bottom: 25px;
      p {
        font-size: 18px;
        line-height: 25px;
      }
      div {
        font-size: 14px;
        line-height: 18px;
      }
    }
    .btn {
      width: 134px;
      height: 43px;
      background: #e51429;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 43px;
      cursor: pointer;
    }
  }
  .nav-list {
    width: 100%;
    margin: 15px 0;
    .item {
      height: 46px;
      text-align: center;
      line-height: 46px;
      color: rgba(0, 0, 0, 0.7);
      background: transparent;
      cursor: pointer;
    }
    .item.isActive {
      background: rgba(0, 0, 0, 0.06);
      color: rgba(0, 0, 0, 0.9);
      cursor: auto;
    }
  }
  .sign-out {
    position: absolute;
    bottom: 25px;
    text-align: center;
    color: #ffffff;
    width: 100%;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
