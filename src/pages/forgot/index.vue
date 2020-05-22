<template>
  <!-- 密码信息 -->
  <div class="password-wrapper relative">
    <h3 class="password-title">重新设置密码</h3>
    <div id="password">
      <!-- 手机号 -->
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
          type="password"
          @change="onChange"
        />
      </div>
      <!-- 确认密码 -->
      <div id="password__confirm" class="password-content" prop="checkPass">
        <el-input
          class="settings__input-width"
          placeholder="确认新密码"
          v-model.trim="setForm.checkPass"
          type="password"
          @change="onChange"
          @keyup.native.enter="complete()"
        />
      </div>
    </div>
    <div class="button" @click="complete()">保存</div>
  </div>
</template>
<script>
const ERR_OK = 0
const REGEXPH = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/

export default {
  name: 'forgot',
  data() {
    return {
      timer: null,
      disabled: true,
      successButton: false,
      isReset: false,
      resetTime: 60,
      setForm: {
        phone: '',
        smCode: '',
        newPassWord: '',
        checkPass: ''
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
    // 修改密码
    async complete() {
      let form = this.setForm
      if (form.newPassWord.length < 6) {
        return this.$notify({
          title: '警告',
          message: '密码至少 6 位',
          type: 'warning'
        })
      } else if (form.newPassWord !== form.checkPass) {
        return this.$notify({
          title: '警告',
          message: '两次密码不一致',
          type: 'warning'
        })
      }
      // 请求参数
      let pwdObj = {}
      pwdObj.phone = '0086' + form.phone
      pwdObj.smcode = form.smCode
      pwdObj.newpwd = 'test:' + this.$utilHelper.rsa_encrypt(form.newPassWord)

      // 发送请求
      let res = await this.$apiFactory.getUserApi().userForgot(pwdObj)
      if (res.data.out > 0) {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.successButton = true
        // 2 秒后提示框消失
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$store.dispatch('signout')
          this.unsetCookie('isLogin')
          this.$router.push('/')
        }, 1500)
      } else {
        this.$notify({
          title: '错误',
          message: res.data.msg,
          type: 'error'
        })
      }
    },
    // 获取验证码
    async getCode() {
      if (!this.setForm.phone) {
        return this.$notify({
          title: '提示',
          message: '您未填写手机号',
          type: 'warning'
        })
      } else if (!REGEXPH.test(this.setForm.phone)) {
        return this.$notify({
          title: '提示',
          message: '请填写正确的手机号',
          type: 'warning'
        })
      }
      // 手机号
      let phone = this.setForm.phone,
        codeData = {
          phone:
            'test:' +
            this.$utilHelper.rsa_encrypt(
              '0086' + phone + '@' + this.$utilHelper.time(this.difference)
            )
        }
      // 请求
      let res = await this.$apiFactory.getCommonApi().sendVerCode(codeData)
      // 响应的数据
      let data = res.data
      // 判断成功或者失败
      if (data.out > 0) {
        this.isReset = true
        // 验证码发送成功后进行 60s 重置
        this.resetCode()
      } else {
        // 显示错误提示
        this.$notify({
          title: '提示',
          message: '请等待60秒后再尝试',
          type: 'warning'
        })
      }
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
    }
  },
  computed: {
    classObject() {
      return {
        'settings__button-success': this.successButton
      }
    }
  },
  mounted() {
    this.$apiFactory
      .getCommonApi()
      .getServerTime()
      .then(res => {
        const { data: { out, data } } = res
        const currentTime = new Date().getTime()

        if (out > ERR_OK) {
          this.serverTime = data.time * 1000
          this.difference = this.serverTime - currentTime
        }
      })
  }
}
</script>
<style lang='scss' scoped>
.password-wrapper {
  width: 500px;
  margin: 0 auto;
  padding: 40px 0 80px;
  input {
    height: 40px;
    line-height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 10px;
    border-radius: 6px;
    outline: none;
  }
  .password-title {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
  }
  .password-content {
    margin: 15px 0;
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
  background-color: #ff4949;
  color: #fff;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  width: 100%;
}
.forgot__getCode {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
}
#password {
  margin: 80px 0;
}
.settings__input-width {
  width: 100%;
  box-sizing: border-box;
  margin: 12px 0;
}
</style>
