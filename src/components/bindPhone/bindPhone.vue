<template>
  <transition name="fade_a">
    <div class="signin-mask" v-if="show" @click.stop="hideDialog">
      <transition name="fade_login">
        <div class="signin" v-if="show" @click.stop="stop_pro()">
          <div 
          class="slide" 
          :style="{'backgroundImage': `url(${require('./img/act_regest.png')})`}"
          >
            <!-- <Slide :slideSetting="bannerSlideSetting" :banners="banners"></Slide> -->
          </div>
          <el-form ref="form" :model="form" :rules="rules">
            <div class="info">
              <h3 v-if="!this.$utilHelper.cookie('p-token')">扫码成功，输入手机号验证</h3>
              <p>根据法律法规，需要完成手机验证才能继续使用拍信， 感谢您的理解与支持！</p>
            </div>
            <phone :form="form" @get-code="getVerificationCode"></phone>
            <el-form-item>
              <button
                type="button"
                class="button-submit col-12 p0 border-none pointer"
                @click="iflogin"
              >立即登录</button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import phone from './type/phone'
const REGEX = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/
export default {
  data() {
    var validatePhoneNum = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入手机号'))
      } else if (!REGEX.test(value)) {
        this.form.getCode = false
        return callback(new Error('请输入正确的手机号'))
      } else {
        this.form.getCode = true
        callback()
      }
    }
    return {
      form: {
        phone: '',
        code: '',
        // 重置状态
        hasReset: false,
        // 重置时间
        resetTime: 60,
        timer: null,
        // 获取验证码的 cursor
        getCode: false
      },
      active: '',
      sceneId: -1,
      userId: 0,
      show: false,
      rules: {
        phone: [
          { validator: validatePhoneNum, trigger: 'blur' },
          { validator: validatePhoneNum, trigger: 'change' }
        ],
        code: [
          {
            type: 'string',
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          { min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
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
      banners: [
        {
          img: require('./img/9.jpg'),
          url: '/photocopyright/197150658',
          bgOpacity: 1
        }
      ]
    }
  },
  methods: {
    //获取验证码
    async getVerificationCode() {
      const {
        form: { getCode, phone, hasReset }
      } = this
      let _phone = '0086' + phone
      this.$refs.form.validateField('phone', valid => {
        // console.log(vaild)
        if (!valid && getCode && !hasReset) {
          this.$apiFactory.getLoginApi().validateCode({ phone: _phone }).then(res => {
            const {
              status,
              data: { message, userId }
            } = res
            if (200 <= status && status < 400) {
              this.form.hasReset = true
              this.userId = userId
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
    //60s
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
    // 判断是登录还是注册
    iflogin() {
      if (this.$utilHelper.cookie('p-token')) {
        this.copletePhone()
        return
      }
      if (this.userId == 0) {
        this.register()
      } else {
        this.login()
      }
    },
    async login() {
      const {
        form: { phone, code }
      } = this
      // 登录表单校验
      this.$refs.form.validate(valid => {
        if (valid) {
          let payload = {
            code: code,
            phone: '0086' + phone
          }
          this.$apiFactory.getLoginApi().userLogin(payload).then(async (res) => { 
            const {
              status,
              data: { message }
            } = res
            if (status == 200) {
              this.success(res)
              this.bindVX()
              this.$ga.event('button', 'click', 'signup-click', 2)
            } else {
              this.$store.dispatch('toast', {
                type: 'warn',
                msg: message
              })
            }
          })
        }
      })
    },
    async register() {
      const {
        form: { phone, code }
      } = this
      let registerObj = {
        code: code,
        phone: '0086' + phone
      }
      let res = await this.$apiFactory.getLoginApi().register(registerObj)
      if (res.status == 200) {
        this.$ga.event('button', 'click', 'saoma', 2)
        await this.success(res)
        this.bindVX()
        let spreads = window.localStorage.spreads,
            data = []
        if (spreads && spreads != '[]') {
          JSON.parse(spreads).forEach(ele => {
            data.push(ele)
          }) 
        }
        let spreads_res = await this.$apiFactory.getLoginApi().statistics(data)
        if (spreads_res.status == 200 && spreads) {
          window.localStorage.removeItem('spreads')
        }
        this.$store.dispatch('toast', {
          type: 'success',
          time: 2000,
          msg: '注册成功！'
        })
        this.$ga.event('button', 'click', 'signup-btn', 2)
      }
    },
    async copletePhone() {
      const {
        form: { phone, code }
      } = this
      let res = await this.$apiFactory.getLoginApi().setUserInfo({
        code: code,
        phone: '0086' + phone
      })
      if (res.status == 200) {
        this.show = false
        this.$store.dispatch('storeLoginData', res)
      } else {
        this.$store.dispatch('toast', {
          type: 'warn',
          msg: '绑定失败，请重新绑定'
        })
      }
    },
    // 登录成功
    async success(res) {
      // console.log(this.$refs.form)
      this.$refs.form.resetFields()
      this.$store.dispatch('signin', res)
      this.show = false
    },
    //绑定VX
    async bindVX() {
      let sceneId = this.sceneId
      let res = await this.$apiFactory.getLoginApi().bindVX(sceneId)
      if (res.status == 200) {
        console.log(res)
      }
    },
    //组件
    openBinding() {
      this.$bus.on('showBending', val => {
        this.show = val.show
        if (val.sceneId) {
          this.sceneId = val.sceneId
        }
      })
    },
    //关闭
    hideDialog() {
      if (this.$utilHelper.cookie('p-token')) {
        return
      }
      this.show = false
    },
    stop_pro() {}
  },
  created() {
    this.openBinding()
  },
  components: {
    phone
  },
  computed: {

  }
}
</script>

<!-- custom style -->
<style lang='scss'   scoped>
.slide {
  width: 500px;
  background-position: 50% 0%;
  background-size: cover;
  background-repeat: no-repeat;
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
  background: rgba(0, 0, 0, 0.2);
  .signin {
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
    }
    .el-form {
      width: 500px;
      padding: 64px 90px 0;
      background-color: #fff;
      box-sizing: border-box;
      .info {
        color: rgba(51, 51, 51, 1);
        margin-bottom: 50px;
        text-align: left;
        h3 {
          font-size: 20px;
          line-height: 28px;
          padding-bottom: 9px;
        }
        p {
          font-size: 14px;
          line-height: 20px;
        }
      }
      .el-form-item {
        margin-bottom: 52px;
        &.ver-code {
          margin-bottom: 40px;
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
        height: 50px;
        border-radius: 4px;
        background-color: #56cb8f;
        color: #fff;
        transition: all 0.3s;
        box-shadow: 0 6px 16px rgba(86, 203, 143, 0.2);
        &:hover {
          background-color: #47b77d;
        }
      }
    }
  }
}
</style>



