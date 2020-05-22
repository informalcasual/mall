<template>
  <!-- 基础信息 -->
  <div class="index-wrapper">
    <div class="index-content" ref="setForm">
      <!-- 头像 -->
      <h1 id="index__editor-wrapper" class="box">
        <div id="index__avatar" class="circle" :style="styleObject"></div>
        <!-- 编辑头像 -->
        <div id="index__editor" class="absolute" @click="toInputFile()"></div>
        <input
          type="file"
          id="index__editor2"
          class="absolute"
          @change="uploadHeadPic()"
          hidden
          accept="image/jpeg, .jpg, .jpeg, image/gif, .gif, image/png, .png"
        />
      </h1>
      <!-- 昵称 -->
      <div
        id="index__name-wrapper"
        class="index__name-form-item settings__input-height col-12"
        prop="name"
      >
        <div class="settings__label">昵称</div>
        <el-input class="settings__input-width" v-model.trim="setForm.name" placeholder="请填写昵称" />
      </div>
      <!-- 保存按钮 -->
      <div class="button" @click="submitForm()">保存</div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  name: 'person',
  data: () => ({
    timer: null,
    loadingText: '正在上传中',
    setForm: {
      name: ''
    },
    prevName: ''

  }),
  mounted() {
    this.setForm.name = this.getUser.name
    this.prevName = this.getUser.name
  },
  methods: {
    toInputFile() {
      document.getElementById('index__editor2').click()
    },
    async submitForm() {
      let setObj = { name: this.setForm.name }
      let res = await this.$apiFactory.getUserApi().setUserInfo(setObj)
      console.log(res)

      if (res.status == 200) {
        this.$notify({
          title: '',
          message: '修改成功！',
          duration: 3000
        })
        this.login()
      } else {
        this.$notify({
          title: '失败',
          message: '名称被占用',
          duration: 3000
        })
      }
    },
    async login() {
      let res = await this.$apiFactory.getUserApi().currentUser()
      if (res.status == 200) {
        this.$store.dispatch('signin', res.data)
      }
    },
    // 上传头像
    async uploadHeadPic() {
      // 从后端获取 key token
      let inputFile = document.getElementById('index__editor2').files[0]
      if (inputFile.size > 1024 * 1024 * 2) {
        this.$notify({
          title: '失败',
          message: '图片尺寸不能超过2mb',
          duration: 3000
        })
        return
      }

      let suffix = inputFile.name.split('.')[inputFile.name.split('.').length - 1] || 'jpg'
      if (suffix !== 'jpg' && suffix !== 'png' && suffix !== 'gif') {
        suffix = 'jpg'
      }

      let data = {
        suffix: suffix,
        prefix: 'avatar'
      }

      let res1 = await this.$apiFactory.getUserApi().uploadFile(data)

      // 传到七牛
      let formData = new FormData()
      formData.append('name', inputFile.name)
      formData.append('key', res1.data.key)
      formData.append('token', res1.data.token)
      formData.append('file', inputFile)
      let res = await this.$apiFactory.getUserApi().postAvatar(formData)

      // setAvatar
      let res3 = await this.$apiFactory.getUserApi().setUserInfo({ 'avatar': 'http://images.paixin.com/' + res.data.key })
      // console.log(res3)
      if (res3.status != 200) {
        this.$notify({
          title: '',
          message: '修改成功！修改失败',
          duration: 3000
        })
        return
      } else {
        this.$notify({
          title: '',
          message: '修改成功！',
          duration: 3000
        })
      }
      this.$store.dispatch('updateAvatar', res3.data.avatar)
    }
  },
  computed: {
    ...mapState({
      getUser: state => state.user.loginUser
    }),
    styleObject() {
      return {
        'background-image': `url(${(this.getUser && this.getUser.avatar) || '/static/img/avatar/default.svg'})`
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.index-content {
  padding: 70px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box {
  display: inline-block;
  margin: 0 auto;
  position: relative;
}
.circle {
  border-radius: 50%;
}
.hidden {
  display: none;
}
.absolute {
  position: absolute;
}
.button {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #62cc95;
  color: #fff;
  margin: 0 auto;
  width: 50%;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  outline: none;
  text-align: center;
  cursor: pointer;
}
#index__name-wrapper {
  width: 50%;
  margin: 60px 0;
}
.settings__label {
  margin: 10px 0;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
}
.settings__input-width {
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  outline: none;
}
#index__avatar {
  width: 120px;
  height: 120px;
  background-size: cover;
  background-position: center;
}
#index__editor {
  bottom: 0;
  right: -10px;
  width: 53px;
  height: 53px;
  background: url(./edit.png) no-repeat;
  background-size: 100%;
  cursor: pointer;
}
</style>
