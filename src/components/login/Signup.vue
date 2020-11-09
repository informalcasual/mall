<template>
  <transition name="fade_a">
    <div
      v-show="show"
      class="wrap"
      :style="{background: isRegisterPage && 'rgba(240, 240, 240, 1)'}"
      @click="hide"
    >
      <transition name="fade_login">
        <div
          @click.stop
          v-if="show"
          class="register flex flex-wrap justify-center relative mx-auto"
        >
          <div class="register_wrap">
            <div class="title" v-if="ifCode">
              <img :src="require('./img/VX.svg')" alt width="20" />
              {{ifEn ? 'Wechat code scanning registration' : '微信扫码注册'}}
            </div>
            <div class="title" v-else>{{ifEn ? 'sigin up' : '注册拍信'}}</div>
            <div class="register-code" v-if="ifCode">
              <QRcode @ifshow="hide('success')"></QRcode>
              <p class="login-tip">
                {{ifEn ? 'Use WeChat scan code to pay attention to the official account "creative idea"' : '使用微信扫码关注公众号「拍信创意」即可'}}
                <span v-if="!ifCode">{{ifEn ? 'Sigin in' : '登录'}}</span>
                <span v-else>{{ifEn ? 'Sigin up' : '一键注册'}}</span>
              </p>
              <div class="Pregister" @click="changeToPhone()">{{ifEn ? 'Mobile phone registration' : '手机注册'}}</div>
            </div>
            <el-form
              v-else
              class="col-12"
              :model="registerForm"
              :rules="registerRules"
              ref="registerForm"
            >
              <!-- 手机号 -->
              <el-form-item class="register__phone col-12 relative" prop="phone">
                <el-input
                  type="tel"
                  placeholder="输入手机号"
                  v-model.trim="registerForm.phone"
                  :maxlength="11"
                  @keyup.native.enter="getCode"
                ></el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item class="col-12" prop="code">
                <el-input type="text" placeholder="输入手机验证码" v-model.trim="registerForm.code"></el-input>
                <div>
                  <!-- 获取验证码 -->
                  <span
                    class="register__getCode absolute"
                    :class="cursor"
                    v-if="!isReset"
                    @click="getCode"
                  >{{ifEn ? 'get code' : '获取验证码'}}</span>
                  <!-- 60s后重发 -->
                  <span class="register__resetCode absolute not-allowed" v-else>{{ resetTime }}s</span>
                </div>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item class="col-12" prop="password">
                <el-input
                  type="text"
                  placeholder="输入6-16位字母、数字、下划线组合的密码"
                  v-model.trim="registerForm.password"
                  @keyup.native.enter="register('registerForm')"
                ></el-input>
              </el-form-item>
              <!-- 文本 -->
              <div class="agreement">
                <span>{{ifEn ? 'i agreed' : '点击确定代表您已同意'}}</span>
                <a target="_blank" href="/static/agreement2.pdf">《{{ifEn ? 'Website terms of service' : '网站服务条款'}}》</a>、
                <a target="_blank" href="/static/privacy.pdf">《{{ifEn ? 'Website privacy policy' : '网站隐私政策'}}》</a>
              </div>
              <!-- 确定 -->
              <el-form-item class="col-12">
                <el-button
                  class="col-12"
                  @click="register('registerForm')"
                  id="register_button"
                >{{ifEn ? 'sigin up' : '立即注册'}}</el-button>
                <el-button class="col-12" @click="changeToCode()" id="QRcode_button">
                  <img :src="require('./img/icons/WX.svg')" alt width="16" />
                  {{ifEn ? 'Wechat code scanning one click registration' : '微信扫码一键注册'}}
                </el-button>
              </el-form-item>
            </el-form>
            <div class="toLogin" @click="toLogin()">
              {{ifEn ? 'Existing account number' : '已有账号'}}？
              <span>{{ifEn ? 'Sigin in' : '立即登录'}}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
// import slide from 'components/slide/index'
import QRcode from './types/QRcode'
export default {
  name: 'register',
  data() {
    // 手机号验证规则
    let validatePhone = (rule, value, callback) => {
      // 输入框内容为空
      if (value === '') {
        callback(new Error('此项为必填'))
      } else if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(value))) {
        callback(new Error('手机号码格式不正确，请重新输入'))
      }
      else {
        callback()
      }
    }
    // 密码验证规则
    let validatePass = (rule, value, callback) => {
      if (value != '' && !(/^(\w){6,16}$/.test(value))) {
        callback(new Error('只能输入6-16个字母、数字、下划线'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      ifCode: true,
      // 表单注册信息
      registerForm: {
        phone: '',
        code: '',
        password: '',
      },
      // 表单注册规则
      registerRules: {
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '此项为必填', trigger: 'click' },
          { min: 4, max: 4, message: '长度为 4 个字符', trigger: 'click' }
        ],
        password: [
          { required: false, validator: validatePass, trigger: 'click' }
        ],
      },
      // 重置时间
      resetTime: 60,
      // 是否重置
      isReset: false,
      // 用于清空定时器
      timer: null,
      bannerSlideSetting: {
        index: 0,
        transition: 800,
        speed: 4000, // 间隔时间
        anime: '',
        height: '100%',
        animating: false, // 正在进行切换
        switcher: false
      },
      banners: [
        {
          img: require('./img/4.jpg'),
          url: '',
          url1: '',
          bgOpacity: 1
        }
      ]
    }
  },
  watch: {
  },
  methods: {
    toLogin() {
      this.show = false
      if (this.isRegisterPage) {
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      } else {
        setTimeout(() => {
         this.$bus.emit('showLogin', true)
        }, 500)
      }
    },
    hide(status) {
      // this.$refs.registerForm.resetFields()
      this.show = false
    }, 
    // 发送获取验证码请求
    getCode() {
      // 常量
      const SELF = this
      // 手机校验
      // console.log(this.$refs.registerForm)
      this.$refs.registerForm.validateField('phone', (valid) => {
        if (valid === '') {
          // 手机号
          let data = {
            'phone': '0086' + this.registerForm.phone
          }
           this.$apiFactory.getLoginApi().validateCode(data).then(function (res) {
            // 判断成功或者失败
            if (200 <= res.status && res.status < 400) {
              SELF.isReset = true
              // 验证码发送成功后进行 60s 重置
              SELF.resetCode()
            } else {
              // 发送失败，并给予提示
              SELF.$store.dispatch('toast', {
                type: 'warn',
                time: 1500,
                msg: res.data.message
              })
            }
          })
        }
      })
    },
    // 60s 倒计时
    resetCode() {
      // 设置常量
      const SELF = this
      if (SELF.resetTime === 0) {
        SELF.resetTime = 60
        // 隐藏文本框
        SELF.isReset = false
        // 清除定时器
        clearTimeout(SELF.timer)
      } else {
        // 60s 倒计时中
        SELF.resetTime--
        // 清除定时器
        clearTimeout(SELF.timer)
        // 设置
        setTimeout(function () {
          SELF.resetCode()
        }, 1000)
      }
    },
    // 对注册表单进行验证并发送注册请求
    register(formName) {
      let form = this.registerForm
      this['$refs'][formName].validate(async (valid) => {
        if (!valid) return
        let registerObj = {}
        // 注册验证码
        registerObj.code = form.code
        // 中国大陆标准手机号
        registerObj.phone = '0086' + form.phone
        // 注册密码进行加密
        registerObj.password = form.password
        // 发送注册请求
        let res = await  this.$apiFactory.getLoginApi().register(registerObj)
        // 说明注册成功
        if (res.status == 200) {
          this.$ga.event('button', 'click', 'signup-btn', 2)
          // 更改登录状态
          this.$store.dispatch('signin', res)
          this.$refs.registerForm.resetFields()
          this.show = false
          // 登录成功后跳转至首页
          this.$store.dispatch('toast', {
            type: 'success',
            time: 2000,
            msg: '注册成功！'
          })
          let spreads = window.localStorage.spreads
          let data = []
          if (spreads && spreads != '[]') {
            JSON.parse(spreads).forEach(ele => {
              data.push(ele)
            }) 
          }
          let spreads_res = await this.$apiFactory.getLoginApi().statistics(data)
          if (spreads_res.status == 200 && spreads) {
            window.localStorage.removeItem('spreads')
          }
         
        } else {
          // 失败提示信息
          this.$store.dispatch('toast', {
            type: 'warn',
            time: 2000,
            msg: res.data.message
          })
        }
      })
    },
    // 注册组件
    receiveShow() {
      let _this = this
      this.$bus.on('showRegister', val => {
        _this.show = val
      })
    },
    changeToCode() {
      this.ifCode = true
    },
    changeToPhone() {
      this.ifCode = false
    },
  },
  created() {
    this.receiveShow()
  },
  computed: {
    isRegisterPage() {
      return this.$route.name === 'register'
    },
    ...mapState({
      difference: state => state.login.difference,
      ifEn: state => state.user.ifEn,
      specialReginster: state => state.login.specialReginster
    })
  },
  components: {
    // slide,
    QRcode
  }
}
</script>

<style>
.register .el-form-item {
  margin-bottom: 14px;
}

.register .el-input__inner:focus {
  outline: 0;
  border-color: #20a0ff;
}

.register .el-input__inner:hover {
  border-color: #8391a5;
}
.login-tip {
  margin-top: 60px;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
}
.register .el-input__inner {
  height: 56px;
  line-height: 56px;
  border: none;
  border-radius: 0;
  padding: 0;
  text-indent: 11px;
  color: #626262;
  border-bottom: 1px solid #d6d6d6;
}

.register .el-input__inner::-webkit-input-placeholder {
  color: #979797;
}
.col-12{
  width: 100%;
}
.register .el-input__inner:hover::-webkit-input-placeholder,
.register .el-input__inner:focus::-webkit-input-placeholder {
  color: #d6d6d6;
}

.register .el-input__inner::-moz-placeholder {
  color: #979797;
}

.register .el-input__inner:hover::-moz-placeholder,
.register .el-input__inner:focus::-moz-placeholder {
  color: #d6d6d6;
}

.register .el-input__inner:-ms-input-placeholder {
  color: #979797;
}

.register .el-input__inner:hover::-ms-input-placeholder,
.register .el-input__inner:focus::-ms-input-placeholder {
  color: #d6d6d6;
}

.el-form-item__error {
  z-index: 1;
}
</style>


<style lang='scss' scoped>
.fade_login-enter-active,
.fade_login-leave-active {
  transition: all 0.5s;
}

.fade_login-enter,
.fade_login-leave-active {
  opacity: 0;
  transform: translate3d(0, -10%, 0) !important;
}

.absolute {
  position: absolute;
}

.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20002;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.register_wrap {
  padding: 37px 83px 0px 83px;
  width: 500px;
  box-sizing: border-box;
  min-height: 600px;
  position: relative;
  .title {
    color: #333;
    font-size: 1.25rem;
    text-align: center;
    line-height: 3.4;
  }
}

.register {
  min-width: 500px;
  display: flex;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.register button {
  height: 48px;
  line-height: 48px;
  border: 1px solid #56cb8f;
  border-radius: 4px;
  font-size: 18px;
  // letter-spacing: 2px;
  padding: 0;
  background-color: #56cb8f;
  color: #fff;
}

.register button:hover,
.register button:focus {
  opacity: 0.8;
}

.register__getCode,
.register__resetCode {
  top: 5px;
  right: 5px;
  width: 92px;
  height: 40px;
  line-height: 40px;
  // border-radius: 8px;
  // background-color: #f2f2f2;
  text-align: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.pointer.register__getCode:hover {
  color: #4ca3f0;
}

.agreement {
  opacity: 0.8;
  font-size: 0.75rem;
  line-height: 2;
  margin-bottom: 36px;
  margin-top: 3px;
  a {
    color: #34bc76;
  }
}

.agreement a {
  opacity: 0.8;
  text-decoration: none;
}

#register_button {
  margin-bottom: 32px;
}

#QRcode_button {
  border-color: #c7c7c7;
  color: #818181;
  background-color: #fff;
  margin-left: 0px;
}

.Pregister {
  cursor: pointer;
  height: 48px;
  line-height: 48px;
  border: 1px solid #56cb8f;
  border-radius: 4px;
  font-size: 18px;
  // letter-spacing: 2px;
  padding: 0;
  background-color: #56cb8f;
  color: #fff;
  text-align: center;
  margin-top: 50px;
}

.toLogin {
  text-align: center;
  font-size: 14px;
  line-height: 56px;
  span {
    color: #34bc76;
    cursor: pointer;
  }
}
</style>
