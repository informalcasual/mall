<template>
  <div class="type-code">
    <!-- 手机号输入框 -->
    <el-form-item class="relative" prop="phone">
      <!-- <img class="code" :src="require('assets/img/icons/icon-code.svg')" alt="" @click.stop="$emit('changetype')"> -->
      <div class="icon" :style="{'background-image': `url(${require('../img/phone.svg')})`}"></div>
      <el-input type="tel" class="phone" placeholder="手机号" v-model="form.phone" @keyup.enter.native="$emit('get-code')"></el-input>
      <!-- 验证码按钮 -->

    </el-form-item>

    <!-- 验证码输入框 -->
    <el-form-item class="ver-code" prop="code">
      <div class="icon"
      style="width: 16px;"
      :style="{'background-image': `url(${require('../img/code-1.svg')})`}" ></div>
      <el-input type="number" placeholder="输入 4 位短信验证码" v-model="form.code" @keyup.enter.native="$emit('submit-form')"></el-input>
      <div class="button-wrapper">
        <button type="button" v-if="!form.hasReset"
        class="btn btn-getCode absolute pointer"
        :class="{'not-allowed' : !form.getCode}"
        @click="$emit('get-code')">获取验证码</button>
        <button type="button" v-else
        class="btn btn-resetCode absolute not-allowed">{{ form.resetTime }} 秒后重发</button>
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
    }
  }
}
</script>

<style lang="scss">
.absolute{
  position: absolute;
}
.type-code {
  .btn {
    top: 0px;
    right: 0px;
    width: 106px;
    height: 20px;
    line-height: 20px;
    padding: 0;
    color: #333;
    background: transparent;
    &.not-allowed {
      cursor: not-allowed;
    }
    &:hover{
      opacity: 0.8;
    }
  }
}
.phone{
  .el-input__inner{
    padding-right: 132px!important;
  }
}
</style>
