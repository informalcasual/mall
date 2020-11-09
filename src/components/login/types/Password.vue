<template>
  <div class="type-password">
    <!-- 手机号输入框 -->
    <el-form-item class="rel" prop="user">
      <img class="code" :src="require('../img/icons/icon-code.svg')" @click.stop="$emit('changetype')" alt="">
      <div class="icon" :style="{'background-image': `url(${require('../img/icons/phone.svg')})`}"></div>
      <el-input type="tel" v-model="form.user" :placeholder="ifEn ? 'phone' : '手机号'" @keyup.enter.native="$emit('get-code')"></el-input>
    </el-form-item>

    <!-- 密码输入框 -->
    <el-form-item prop="password">
      <div class="icon" style="width: 16px;" :style="{'background-image': `url(${require('../img/icons/password.svg')})`}"></div>
      <el-input type="password" v-model="form.password" :placeholder="ifEn ? 'password' : '密码'" @keyup.enter.native="$emit('submit-form')"></el-input>
      <div class="forget pointer right">
        <a class="link" @click="$emit('forgot-pwd')">{{ifEn ? 'forgot password' : '忘记密码'}}</a>
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    ifEn: {
      type: Boolean
    }
  }
}
</script>

