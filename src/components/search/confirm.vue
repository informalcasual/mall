<template>
  <transition name="fade_a">
    <div class="suchen-wrapper" @click.stop="switchDialogState()">
      <transition name="fade_suchen">
        <div class="suchen-confirm" @click.stop="stopPop()">
          <!-- 标题 -->
          <div class="suchen-title">
            {{title}}
          </div>
          <!-- 步骤条 -->
          <div class="step-wrap">
            <div class="step-item" v-for="(s, i) in step" :key="i" v-show="i == current">
              <p class="title">
                <i v-if='s.vorTitle' class="el-icon-success"></i>
                {{s.vorTitle}}
                <span>{{s.count}}</span>
                {{s.nachTitle}}
              </p>
              <p class="sub">
                <i v-if='s.sub' class="el-icon-success"></i>
                {{s.sub}}</p>
            </div>
          </div>
          <div class="suchen">
            <div class="suchen-info" v-show="current == 0">
              <!-- 表单 -->
              <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
                <div class="suchen-code">
                  <!-- 商标 -->
                  <el-form-item prop="search">
                    <el-input class="suchen-input" type="text" v-model="form.search">
                      <template slot="prepend">商标</template>
                    </el-input>
                  </el-form-item>
                  <!-- 手机号 -->
                  <el-form-item prop="phoneNum">
                    <el-input class="suchen-input" type="tel" v-model.number="form.phoneNum">
                      <template slot="prepend">手机号</template>
                      <template slot="append" v-if="!getLoginState">
                        <!-- 验证码 -->
                        <div class="suchen-code-wrapper">
                          <!-- 获取验证码 -->
                          <span class="suchen-getcode" v-if="!form.hasReset" @click="handleClickCode">获取验证码</span>
                          <!-- 60s后重发 -->
                          <span class="suchen-resetcode" v-else>{{form.resetTime}}秒后重发</span>
                        </div>
                      </template>
                    </el-input>
                  </el-form-item>
                  <!-- 验证码 -->
                  <el-form-item prop="verCode">
                    <el-input class="suchen-input" v-if="!getLoginState" v-model="form.verCode">
                      <template slot="prepend">验证码</template>
                    </el-input>
                  </el-form-item>
                  <!-- 下一步 -->
                  <el-form-item>
                    <el-button id='getConsult_2' class="suchen-next" @click="getLoginState ? userSearch() : loginSearch()">获取查询结果</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <!-- 接受咨询 -->
            <div class="suchen-submit" v-show="current == 1">
              <div class="suchen-code">
                <a href="https://q.url.cn/CD7a0H?_type=wpa&qidian=true" target="_blank" class="suchen-QQ">咨询顾问</a>
                <a href="https://z.paixin.com/item/brand/common/3" target="_blank" class="suchen-connact">加急下单</a>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { mapState, mapActions } from 'vuex'

// 设置常量
const ERR_OK = 0
// 验证手机号的正则表达式
const REGEX = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/

export default {
  name: 'searchComfirm',
  data() {
    let validatePN = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此项为必填'))
      } else if (!REGEX.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    let validatePN2 = (rule, value, callback) => {
      if (REGEX.test(value)) {
        this.form.getCode = true
        callback()
      } else {
        this.form.getCode = false
        callback()
      }
    }
    return {
      title: '拍信查询',
      current: 0,
      step: [
        {
          vorTitle: '本周已完成',
          count: '218010次',
          nachTitle: '免费查询'
        },
        {
          sub: '已收到商标申请，随后会有专业顾问对接'
        }
      ],
      form: {
        // 搜索字段
        search: '',
        // 手机号
        phoneNum: '',
        // 验证码
        verCode: '',
        // 获取验证码的cursor
        getCode: false,
        // 重置状态
        hasReset: false,
        // 重置时间
        resetTime: 60
      },
      rules: {
        search: [
          { type: 'string', required: true, message: '请输入搜索内容', trigger: 'blur' }
        ],
        phoneNum: [
          { validator: validatePN, trigger: 'blur' },
          { validator: validatePN2, trigger: 'change' }
        ],
        verCode: [
          { type: 'string', required: this.getLoginState, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    switchDialogState() {
      this.$store.commit('setSearchDialog', '')
      this.$store.commit('switchDialogState')
      this.current = 0
    },
    // 阻止冒泡
    stopPop() { },
    // 绑定获取验证码按钮的点击事件
    handleClickCode() {
      const { form: { getCode, phoneNum } } = this
      // 判断是否可点击获取验证码按钮
      if (getCode) {
        // 请求参数
        const payload = {
          phone: `test:${this.$utilHelper.rsa_encrypt(`0086${phoneNum}@${this.$utilHelper.time(this.difference)}`)}`
        }

        // 发送请求
        const sendCode = async () => {
          try {
            const { status, data: { out } } = await this.$apiFactory.getCommonApi().sendVerCode(payload)
            // 判断成功或者失败
            if (out > ERR_OK && status === 200) {
              this.form.hasReset = true
              // 验证码发送成功后进行60s重置
              this.resetCode()
            } else {
              this.$notify({
                title: '警告',
                message: '请等待 60 秒后再尝试',
                type: 'warning'
              })
            }
          } catch (e) {
            this.$notify({
              title: '警告',
              message: e.msg,
              type: 'warning'
            })
          }
        }
        sendCode()
      }
    },
    // 重置60s
    resetCode() {
      if (this.form.resetTime === 0) {
        this.form.resetTime = 60
        this.form.hasReset = false
        // 清除定时器
        clearTimeout(this.form.timer)
      } else {
        // 60s倒计时
        this.form.resetTime--
        // 设置
        this.form.timer = setTimeout(() => {
          // 清除定时器
          clearTimeout(this.form.timer)

          this.resetCode()
        }, 1000)
      }
    },
    // 登录查询事件
    loginSearch() {
      const { form: { phoneNum, verCode } } = this
      // 登录表单校验
      this.$refs.form.validate((valid) => {
        // 判断整个表单是否通过规则验证
        if (valid) {
          const payload = {
            phone: `test:${this.$utilHelper.rsa_encrypt(`0086${phoneNum}@${this.$utilHelper.time(this.difference)}`)}`,
            smcode: `test:${this.$utilHelper.rsa_encrypt(`${verCode}@${this.$utilHelper.time(this.difference)}`)}`
          }
          const userLogin = async () => {
            const { data: { data, out, msg } } = await this.$apiFactory.getUserApi().codeLogin(payload)
            // 判断请求响应成功或者失败
            if (out > ERR_OK && data) {
              // 调用vuex的actions
              this.signin(data)
              this.userSearch()
            } else {
              // 失败提示信息
              this.$notify({
                title: '错误',
                message: msg,
                type: 'error'
              })
            }
          }
          userLogin()
        }
      })
    },
    // 用户查询事件
    userSearch() {
      this.$ga.event('button', 'click', 'versuch-click', 2)
      const { form: { phoneNum, search } } = this

      // 登录表单校验
      this.$refs.form.validate((valid) => {
        // 判断整个表单是否通过验证
        let from = this.$route.name == 'promote' ? 'promote' : '首页'
        if (valid) {
          const request = {
            phone: phoneNum,
            search: search,
            from: '主站' + from
          }

          // 请求
          const searchRequest = async () => {
            try {
              const { status, data: { out, msg } } = await this.$apiFactory.getUserApi().userSearch(request)
              // 判断成功或者失败
              if (out > ERR_OK && status === 200) {
                this.current = 1
                this.title = '完成查询'
              } else {
                this.$notify({
                  title: '警告',
                  message: msg,
                  type: 'warning'
                })
              }
            } catch (e) {
              this.$notify({
                title: '警告',
                message: e.msg,
                type: 'warning'
              })
            }
          }
          searchRequest()
        }
      })
    },
    ...mapActions([
      'signin' // map `this.signin()` to `this.$store.commit('signin')`
    ]),
    timeNumbs() {
      let timer = new Date()
      let d = timer.getDay()
      let h = timer.getHours()
      let m = timer.getMinutes()
      let s = timer.getSeconds()
      let weekNum = Math.floor(d * 3.8) + '' + Math.floor(h + 10) + '' + Math.floor((m + 7) / 7) + '' + Math.floor((s + 7) * 1.45) + '次'
      return weekNum
    }
  },
  computed: {
    ...mapState({
      getSearchDialog: state => state.user.searchDialog,
      getLoginState: state => state.user.loginStatus,
      getUser: state => state.user.loginUser
    })
  },
  mounted() {
    const getTime = async () => {
      const { data: { out, data } } = await this.$apiFactory.getCommonApi().getServerTime()
      const currentTime = new Date().getTime()
      if (out > ERR_OK) {
        this.serverTime = data.time * 1000
        this.difference = this.serverTime - currentTime
      }
    }
    getTime()
    this.step[0].count = this.timeNumbs()
  },
  watch: {
    getSearchDialog(val) {
      this.form.search = val
      if (this.getLoginState) {
        this.form.phoneNum = this.getUser.phone
      }
    }
  }
}
</script>
<style lang="scss">
.suchen-wrapper {
  .el-input-group__append,
  .el-input-group__prepend {
    width: 70px;
    padding: 0;
    background: transparent;
    border: none;
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
  }
  .el-input__inner {
    border: 0;
  }
}
</style>

<style lang="scss" scoped>
.suchen-wrapper {
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  .suchen-confirm {
    width: 420px;
    background: #ffffff;
    height: 440px;
    padding: 30px 44px 25px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    justify-content: center;
    transform: translate3d(0, 0, 0);
    .suchen-title {
      font-size: 29px;
      text-align: center;
      line-height: 41px;
      color: #000000;
    }
    .step-wrap {
      display: flex;
      justify-content: center;
      .step-item {
        text-align: center;
        margin: 30px 0 15px;
        color: rgba(0, 0, 0, 0.2);
        .title {
          font-size: 26px;
          font-weight: 500;
          span {
            color: rgba(0, 0, 0, 0.4);
          }
        }
        .sub {
          font-size: 20px;
          line-height: 30px;
        }
      }
      .step-item.isActive {
        color: rgba(0, 0, 0, 0.9);
      }
    }
    .suchen {
      padding: 20px 0 0;
      .suchen-input {
        border: 1px solid #ededed;
        border-radius: 10px;
        padding: 2px 2px;
      }
      .suchen-getcode {
        display: inline-block;
        border-radius: 10px;
        line-height: 43px;
        width: 94px;
        height: 43px;
        background: #f2f2f2;
        cursor: pointer;
      }
      .suchen-resetcode {
        display: inline-block;
        border-radius: 10px;
        line-height: 43px;
        width: 94px;
        height: 43px;
        background: #f2f2f2;
        cursor: pointer;
      }
      .suchen-next {
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: 0;
        background: #e51429;
        color: #ffffff;
        font-size: 16px;
      }
      .suchen-submit {
        padding: 25px 0;
        a {
          text-decoration: none;
          display: block;
          line-height: 53px;
          margin: 25px 0;
          font-size: 16px;
        }
        .suchen-QQ {
          width: 100%;
          height: 51px;
          border-radius: 10px;
          border: 1px solid #e51429;
          background: #ffffff;
          color: #e51429;
        }
        .suchen-connact {
          width: 100%;
          height: 53px;
          border-radius: 10px;
          border: 0;
          background: #e51429;
          color: #ffffff;
        }
      }
    }
  }
  .el-icon-success {
    color: #56c5a0;
  }
}
</style>
