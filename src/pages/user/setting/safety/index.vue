<template>
  <!-- 密码信息 -->
  <div class="password-wrapper relative">
    <section class="safety-header">
      <div>
        <el-radio v-model="safetyType" label="0" border>验证码修改</el-radio>
      </div>
    </section>
    <!-- 验证码修改 -->
    <div class="code" v-if="safetyType == 0">
      <div id="password__phone" class="password-content" prop="phone">
        <el-input
          class="settings__input-width"
          placeholder="手机号"
          v-model.trim="setForm.phone"
          type="text"
          @change="onChange"
          @keyup.native.enter="getCode"
        />
        <div>
          <!-- 获取验证码 -->
          <div class="forgot__getCode pointer" v-if="!isReset" @click="getCode">获取验证码</div>
          <!-- 60s后重发 -->
          <div class="forgot__getCode" v-else>{{ resetTime }}秒后重发</div>
        </div>
      </div>
      <!-- 验证码 -->
      <div id="password__smCode" class="password-content" prop="smCode">
        <el-input
          class="settings__input-width"
          placeholder="验证码"
          v-model.trim="setForm.smCode"
          type="text"
          @change="onChange"
        />
      </div>
      <!-- 新密码 -->
      <div id="password__new" class="password-content" prop="newPassWord">
        <el-input
          class="settings__input-width"
          placeholder="新密码"
          v-model.trim="setForm.newPassWord"
          type="text"
          @change="onChange"
        />
      </div>
      <!-- 确认密码 -->
      <div id="password__confirm" class="password-content" prop="checkPass">
        <el-input
          class="settings__input-width"
          placeholder="请再次输入密码"
          v-model.trim="setForm.checkPass"
          type="text"
          @change="onChange"
          @keyup.native.enter="complete()"
        />
      </div>
    </div>
    <div class="button" @click="complete()">保存</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// const ERR_OK = 0
const REGEXPH = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/

export default {
  name: 'setting-password',
  data() {
    return {
      timer: null,
      disabled: true,
      successButton: false,
      isReset: false,
      resetTime: 60,
      safetyType: '0',
      setForm: {
        phone: '',
        smCode: '',
        newPassWord: '',
        checkPass: ''
      },
      resetForm: {
        old: '',
        new: '',
        wider: ''
      }
    }
  },
  methods: {
    onChange() {
      !this.setForm.phone &&
        !this.setForm.newPassWord &&
        !this.setForm.checkPass &&
        !this.setForm.smCode
        ? this.disabled = true
        : this.disabled = false
    },
    // 验证码修改密码
    async complete() {
      let form = this.setForm
      if (form.newPassWord.length < 6) {
        return this.$notify({
          title: '警告',
          message: '密码至少 6 位',
          type: 'warning'
        })
        // return this.$store.dispatch('toast', {
        //   type: 'warn',
        //   time: 1500,
        //   msg: '密码至少 6 位'
        // })
      } else if (form.newPassWord !== form.checkPass) {
        return this.$notify({
          title: '警告',
          message: '两次密码不一致',
          type: 'warning'
        })
        // return this.$store.dispatch('toast', {
        //   type: 'warn',
        //   time: 1500,
        //   msg: '两次密码不一致'
        // })
      }
      // 请求参数
      let pwdObj = {}
      pwdObj.phone = '0086' + form.phone
      pwdObj.code = form.smCode
      pwdObj.password = form.newPassWord

      // 发送请求
      let res = await this.$apiFactory.getUserApi().setUserInfo(pwdObj)
      if (res.status == 200) {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        // this.$store.dispatch('toast', {
        //   time: 1500,
        //   msg: '修改成功'
        // })
        this.successButton = true
        // 2 秒后提示框消失
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$router.push('/')
          this.$store.dispatch('logout')
        }, 1500)
      } else {
        this.$notify({
          title: '错误',
          message: res.data.msg,
          type: 'error'
        })
        // this.$store.dispatch('toast', {
        //   type: 'warn',
        //   time: 1500,
        //   msg: res.data.message
        // })
      }
    },
    // 获取验证码
    async getCode() {
      if (!this.setForm.phone) {
        return this.$notify({
          title: '',
          message: '未填手机号',
          duration: 3000
        })
      } else if (!REGEXPH.test(this.setForm.phone)) {
        return this.$notify({
          title: '',
          message: '请填写正确的手机号',
          duration: 3000
        })
      }
      // 手机号
      let phone = this.setForm.phone,
        codeData = {
          phone: '0086' + phone
        }
      // 请求
      this.$apiFactory.getUserApi().validateCode(codeData).then(res => {
        const { status, data: { message } } = res
        // 判断成功或者失败
        if (status >= 200 && status < 400) {
          this.isReset = true
          // 验证码发送成功后进行 60s 重置
          this.resetCode()
          // 验证码发送成功后进行 60s 重置
        } else {
          return this.$notify({
            title: '',
            message,
            duration: 3000
          })
        }
      })
    },
    // 60s 倒计时
    resetCode() {
      if (this.resetTime === 0) {
        this.resetTime = 60
        // 隐藏文本框
        this.isReset = false
        // 清空定时器
        clearTimeout(this.timer)
      } else {
        // 60s 倒计时中
        this.resetTime--
        // 清空定时器
        clearTimeout(this.timer)
        // 设置定时器
        this.timer = setTimeout(() => {
          this.resetCode()
        }, 1000)
      }
    },
    unset_cookie(name, path) {
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
    }
  },
  computed: {
    classObject() {
      return {
        'settings__button-success': this.successButton
      }
    },
    ...mapState({
      difference: state => state.login.difference
    })
  }
}
</script>
<style lang='scss' scoped>
.password-wrapper {
  width: 60%;
  margin: 0 auto;
  input {
    height: 40px;
    line-height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 10px;
    border-radius: 6px;
    outline: none;
  }
  .password-content {
    margin: 15px 0;
  }
  .safety-header {
    font-size: 24px;
    letter-spacing: 1px;
    text-align: center;
    margin: 40px 0 25px;
    .headline {
      font-size: 32px;
      color: black;
      margin-bottom: 25px;
      font-weight: 400;
    }
  }
}
.pointer {
  cursor: pointer;
}
.button {
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #62cc95;
  color: #fff;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  width: 100%;
}
.forgot__getCode {
  background-color: #62cc95;
  font-size: 0.8rem;
  color: #fff;
  border-radius: 4px;
  width: 80px;
  line-height: 20px;
  padding: 5px 0;
  text-align: center;
  position: absolute;
  bottom: 17px;
  right: 5px;
}
.code {
  margin: 50px 0;
}
.pass {
  margin: 50px 0;
}
.settings__input-width {
  width: 100%;
  box-sizing: border-box;
  margin: 12px 0;
}
#password__phone {
  position: relative;
}
</style>
