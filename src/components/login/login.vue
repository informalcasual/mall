<template>
  <transition name="fade_a">
    <div
      class="signin-mask"
      v-show="show"
      @click.stop="hideDialog()"
    >
      <transition name="fade_login">
        <div class="signin" v-if="show" @click.stop>
          <div 
          class="slide" 
          :style="{'backgroundImage': `url(${require('./img/act_login.png')})`}"
          >
            <a href="https://v.paixin.com/newMedia/mediaMeal" target="_blank"></a>
            <!-- <Slide :slideSetting="bannerSlideSetting" :banners="banners"></Slide> -->
          </div>
          <el-form ref="form" :model="form" :rules="rules">
            <div class="types">
              <div
                class="type"
                v-for="(type, index) in form.types"
                :key="index"
                @click="changetype(index)"
              >
                <div
                  class="item"
                  v-for="(item ,i) in type"
                  :key="i"
                  v-if="index == 0 || (index == 1 && item.status == Ptype)"
                  :class="{'selescted-type': selected == index}"
                >
                  <img
                    :src="require('./img/VX.svg')"
                    v-if="selected == 1 && index == 0"
                    alt=""
                    width="20"
                  >
                  <img
                    :src="require('./img/weixin.svg')"
                    v-if="selected == 0 && index == 0"
                    alt=""
                    width="20"
                  >
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
            <template v-if="selected == 1">
              <CodeType
                v-if=" Ptype != 'password'"
                :form="form"
                @get-code="handleClickOnGetCode"
                @submit-form="handleSubmitForm"
                @changetype="changetype(0)"
              ></CodeType>
              <PwdType
                v-else
                :form="form"
                @get-code="handleClickOnGetCode"
                @submit-form="handleSubmitForm"
                @forgot-pwd="headToForgot"
                @changetype="changetype(0)"
              ></PwdType>
              <el-form-item>
                <button
                  type="button"
                  class="button-submit pointer"
                  @click="handleSubmitForm"
                >立即登录</button>
              </el-form-item>
              <!-- 注册 -->
              <div class="footer">
                <span class="changetype" @click="changemethod()" v-if="Ptype == 'password'">手机验证码登录</span>
                <span class="changetype" @click="changemethod()" v-else>账号密码登录</span>
                <span class="register">
                  还没有账号?
                  <a class="pointer" @click="headToSignup">立即注册</a>
                </span>
              </div>
            </template>
            <template v-else>
              <QRcode @ifshow="hideDialog('success')"/>
              <p class="login-tip">
                使用微信扫码关注公众号「拍信创意」即可
                <span v-if="!ifCode">登录</span>
                <span v-else>一键注册</span>
              </p>
              <div class="footer">
                <span class="register" style="text-align: center;float: none;">
                  还没有账号?
                  <a class="pointer" @click="headToSignup">立即注册</a>
                </span>
              </div>
            </template>
          </el-form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
// import Slide from 'components/slide/index'
import CodeType from './types/Code'
import PwdType from './types/Password'
import QRcode from './types/QRcode'
import { mapState } from 'vuex'
import { objectTypeAnnotation } from 'babel-types'

// 设置常量
// const ERR_OK = 0
const REGEX = /^1(3|4|5|6|7|8|9)\d{9}$/
const Email_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default {
  data() {
    // 自定义校验手机号码或邮箱的规则
    var validatePhoneNum = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        return callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    var validatePhoneNum2 = (rule, value, callback) => {
      if (REGEX.test(value)) {
        this.form.getCode = true
        callback()
      } else if (Email_REGEX.test(value)) {
        this.form.getCode = true
        callback()
      } else {
        this.form.getCode = false
        callback()
      }
    }

    return {
      form: {
        user: '',
        // 验证码
        code: '',
        // 密码
        password: '',
        // 登录模式
        // types: ['验证码登录', '密码登录'],
        types: [
          [{ name: '微信扫码登录' }],
          [
            {
              name: '账号密码登录',
              status: 'password'
            },
            {
              name: '验证码登录',
              status: 'code'
            }
          ]
        ],
        // 重置状态
        hasReset: false,
        // 重置时间
        resetTime: 60,
        // 是否记住密码
        remembered: true,
        // 定时器
        timer: null,
        // 获取验证码的 cursor
        getCode: false
      },
      selected: 0,
      Ptype: 'code',
      rules: {
        user: [
          { validator: validatePhoneNum, trigger: 'blur' },
          { validator: validatePhoneNum2, trigger: 'change' }
        ],
        code: [
          {
            type: 'string',
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          { min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
        ],
        password: [
          {
            type: 'string',
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      bannerSlideSetting: {
        index: 0,
        transition: 800,
        speed: 4000, // 间隔时间
        anime: '',
        height: '100%',
        animating: false, // 正在进行切换
        switcher: false
      },
      ifOnce: false,
      ifCode: false,
      show: false
    }
  },

  components: {
    // Slide,
    CodeType,
    PwdType,
    QRcode
  },

  methods: {
    // 跳转至注册页面
    headToSignup() {
      this.hideDialog()
      setTimeout(() => {
        this.$bus.emit('showRegister', true)
      }, 500)
    },
    // 跳转至忘记页面
    headToForgot() {
      if (this.$route.path.indexOf('forgot') === -1) {
        this.$router.push('/forgot')
      }
      this.hideDialog()
    },
    // 清空表单信息
    clearFormData() {
      if (this.$refs !== undefined) {
        this.$refs.form.resetFields()
      }
    },
    // 隐藏登陆框
    hideDialog(status) {
      this.show = false
      this.selected = 0
      this.clearFormData()
    },
    // 更改登录状态
    changeLoginStatus(data) {
      // console.log(data)
      this.$store.dispatch('signin', data)
    },
    // 发送获取验证码请求
    handleClickOnGetCode() {
      const {
        form: { getCode, user, hasReset }
      } = this
      let info = ''
      this.$refs.form.validateField('user', valid => {
        // 判断是否可点击获取验证码按钮
        if (!valid && getCode && !hasReset) {
          // 请求参数
          //   phone: `test:${this.$utilHelper.rsa_encrypt(`0086${phoneNum}@${this.$utilHelper.time(this.difference)}`)}`
          if (REGEX.test(user)) {
            info = {
              phone: `0086${user}`
            }
          } else if (Email_REGEX.test(user)) {
            info = {
              email: `${user}`
            }
          }
          // 请求
          this.$apiFactory.getLoginApi().validateCode(info).then(res => {
            const {
              status,
              data: { message }
            } = res
            // 判断成功或者失败
            if (200 <= status && status < 400) {
              this.form.hasReset = true
              if (!res.data.userId || res.data.userId <= 0) {
                this.ifOnce = true
              }
              // 验证码发送成功后进行 60s 重置
              this.reset()
            } else {
              this.$store.dispatch('toast', {
                type: 'warn',
                time: 3000,
                msg: message
              })
            }
          })
        }
      })
    },
    // 绑定登录按钮的事件
    handleSubmitForm() {
      const {
        form: { user, verCode, password, remembered }
      } = this
      // 初始状态都为非企业模式
     
      // 登录表单校验
      this.$refs.form.validate(async valid => {
        // 判断整个表单是否通过规则验证
        if (valid) {
          if (this.selected == 1 && this.Ptype == 'code') {
            const payload = {
              code: verCode
              // phone: `test:${this.$utilHelper.rsa_encrypt(`0086${phoneNum}@${this.$utilHelper.time(this.difference)}`)}`,
            }
            if (REGEX.test(user)) {
              // 中国大陆标准手机号
              payload.phone = `0086${user}`
            } else if (Email_REGEX.test(user)) {
              payload.email = user
            }
            // 请求
            if (!this.ifOnce) {
              this.$apiFactory.getLoginApi().userLogin(payload).then(res => {
                const {
                  status,
                  data: { message }
                } = res
                if (status == 200) {
                  this.success(res)
                } else {
                  this.$store.dispatch('toast', {
                    type: 'warn',
                    msg: message
                  })
                }
              })
              return
            }
            let res = await this.$apiFactory.getLoginApi().register(payload)
            // 说明注册成功
            if (res.status == 200) {
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
              await this.success(res)
            } else {
              // 失败提示信息
              this.$store.dispatch('toast', {
                type: 'warn',
                time: 2000,
                msg: res.data.message
              })
            }
          } else {
            let payload = {
              password: password
            }
            if (REGEX.test(user)) {
              // 中国大陆标准手机号
              payload.phone = `0086${user}`
            } else if (Email_REGEX.test(user)) {
              payload.email = user
            } else {
              payload.name = user
            }

            // 用户是否选择记住我
            if (remembered) {
              payload.reme = '1'
            } else {
              payload.reme = '0'
            }
            // 发送登录请求
            this.$apiFactory.getLoginApi().userLogin(payload).then(res => {
              const {
                status,
                data: { message }
              } = res
              if (status == 200) {
                this.success(res)
              } else {
                // 失败提示信息
                this.$store.dispatch('toast', {
                  type: 'warn',
                  msg: message
                })
              }
            })
          }
        }
      })
    },
    // 重置 60 秒
    reset() {
      const { form } = this
      if (form.resetTime === 0) {
        form.resetTime = 60
        form.hasReset = false
        // 清除定时器
        clearTimeout(form.timer)
      } else {
        form.resetTime--
        form.timer = setTimeout(() => {
          // 清除定时器
          clearTimeout(form.timer)
          // 60s 倒计时中
          this.reset()
        }, 1000)
      }
    },
    // 请求成功后的操作
    async success(data) {
      if (!this.ifOnce) {
        this.$ga.event('button', 'click', 'signup-click', 2)
      } else {
        this.$ga.event('button', 'click', 'signup-btn', 2)
      }
      this.hideDialog()
      this.changeLoginStatus(data)
      if (!data.data.phone && data.data.parent <= 0) {
        this.$bus.emit('showBending', { show: true })
      }
    },
    //切换登录方式
    changemethod() {
      if (this.Ptype == 'password') {
        this.Ptype = 'code'
      } else {
        this.Ptype = 'password'
      }
    },
    changetype(index) {
      if (index == this.selected) return
      if (this.selected == 1) {
        this.selected = 0
      } else {
        this.selected = 1
      }
    },
    service(){
      let _this = this
      this.$bus.on('showLogin', val => {
        _this.show = val
      })
    }
  },
  created() {
    this.service()
  },
  watch: {
    getDialogState(n) {
      if (n) this.bannerSlideSetting.index = 0
    }
  },

  computed: {
 
  }
}
</script>

<!-- custom style -->
<style lang='scss'>
.login-tip {
  margin-top: 60px;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
}
.signin-mask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 20002;
  background: rgba(0, 0, 0, 0.6);
  .signin {
    background-color: #fff;
    width: 1000px;
    height: 600px;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    transform: translate3d(0, 0, 0);
    &.fade_login-enter-active,
    &.fade_login-leave-active {
      transition: all 0.5s;
    }
    &.fade_login-enter,
    &.fade_login-leave-active {
      opacity: 0;
      transform: translate3d(0, -10%, 0);
    }
    @media screen and (max-width: 1800px) {
      font-size: 16px;
    }
    @media screen and (max-width: 1400px) {
      font-size: 14px;
    }
    .slide {
      width: 500px;
      height: 600px;
      display: inline-block;
      background-position: 50% 0%;
      background-size: cover;
      background-repeat: no-repeat;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .el-form {
      width: 500px;
      padding: 36px 90px 0;
      background-color: #fff;
      box-sizing: border-box;
      .title {
        width: 100%;
        height: 54px;
        line-height: 54px;
        font-size: 48px;
        font-weight: 900;
      }
      .types {
        width: 100%;
        height: 55px;
        line-height: 55px;
        margin: 50px auto 53px;
        display: flex;

        .type {
          width: calc(100% / 2);
          flex-grow: 0;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          background-color: transparent;
          color: #000;
          transition: all 0.5s ease;
          cursor: pointer;
        }
        .type:nth-child(1) {
          text-align: left;
          width: 200px;
        }
        .type:nth-child(2) {
          text-align: right;
        }
        .type + .type {
          position: relative;
          &::before {
            display: bolck;
            content: ' ';
            width: 1px;
            height: 18px;
            background-color: #d8d8d8;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -9px;
          }
        }
        .selescted-type {
          color: #34bc76;
        }
      }
      .el-form-item {
        margin-bottom: 52px;
        &.ver-code {
          margin-bottom: 52px;
        }
        .el-form-item__content {
          font-size: inherit;
          line-height: 20px;
        }
        .code {
          width: 24px;
          cursor: pointer;
          position: absolute;
          right: 0;
          z-index: 1;
          top: 0;
        }
        .icon {
          position: absolute;
          left: 2px;
          width: 13px;
          height: 17px;
          background-size: cover;
          z-index: 1;
          margin-top: -18px;
          top: 50%;
        }
        .el-input {
          border: none;
          border-bottom: 1px solid #d6d6d6;
          padding: 0 0 18px 0;
          color: #fff;
          background: transparent;
          &:focus {
            border-color: #34bc76;
          }
          .el-input__inner {
            height: 20px;
            line-height: 20px;
            border: none;
            padding: 0;
            padding-left: 34px;
            padding-right: 60px;
            background-color: rgba(0, 0, 0, 0);
            text-indent: 0;
            color: #000;
            &::placeholder {
              color: #979797;
            }
            &:-ms-input-placeholder {
              color: #979797;
            }
            &::-moz-placeholder {
              color: #979797;
            }
            &:-moz-placeholder {
              color: #979797;
            }
            &::-webkit-input-placeholder {
              color: #979797;
            }
          }
        }
        .forget {
          position: absolute;
          right: 0;
          top: 0;
          line-height: 20px;
          a {
            color: #333333;
            &:hover {
              color: #4ca3f0;
            }
          }
        }
        .el-form-item__error {
          padding-left: 10px;
        }
      }
      .is-error {
        .el-input {
          border-color: #f56c6c;
        }
      }
      .button-submit {
        width: 100%;
        height: 50px;
        cursor: pointer;
        border-radius: 4px;
        background-color: #56cb8f;
        color: #fff;
        transition: all 0.3s;
        box-shadow: 0 6px 16px rgba(86, 203, 143, 0.2);
        &:hover {
          background-color: #47b77d;
        }
      }
      .footer {
        color: #666666;
        padding-top: 40px;
        > span {
          margin-right: 9px;
          font-size: 14px;
          line-height: 20px;
          // opacity: 0.5;
        }
        .changetype {
          text-align: left;
          float: left;
          color: #34bc76;
          cursor: pointer;
        }
        .register {
          text-align: right;
          float: right;
        }
        a {
          color: #34bc76;
        }
      }
    }
  }
}
.pointer{
  cursor: pointer;
}
</style>