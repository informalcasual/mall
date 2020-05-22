<template>
  <div class="index-wrapper">
    <el-form ref="common" :model="common" :rules="rules" @submit.native.prevent>
      <!-- 企业名称 -->
      <div class="pop-item">
        <p class="top-line">企业名称</p>
        <div class="item-input">
          <span class="necessary"></span>
          <el-form-item prop="name">
            <el-input type="text" placeholder="请填写企业名称" v-model="common.name"></el-input>
          </el-form-item>
        </div>
        <p class="unter-line"></p>
      </div>
      <!-- 联系人 -->
      <div class="pop-item">
        <p class="top-line">联系人</p>
        <div class="item-input">
          <span class="necessary"></span>
          <el-form-item prop="contact">
            <el-input type="text" placeholder="请填写联系人" v-model="common.contact"></el-input>
          </el-form-item>
        </div>
        <p class="unter-line"></p>
      </div>
      <!-- 电话 -->
      <div class="pop-item">
        <p class="top-line">电话</p>
        <div class="item-input">
          <span class="necessary"></span>
          <el-form-item prop="connect">
            <el-input type="text" placeholder="请填写电话号码" v-model="common.connect"></el-input>
          </el-form-item>
        </div>
        <p class="unter-line"></p>
      </div>
      <!-- 邮寄地址 -->
      <div class="pop-item">
        <p class="top-line">邮寄地址</p>
        <div class="item-input">
          <span class="necessary"></span>
          <el-form-item prop="address">
            <el-input type="text" placeholder="请填写邮寄地址" v-model="common.address"></el-input>
          </el-form-item>
        </div>
        <p class="unter-line"></p>
      </div>
      <!-- 确定 -->
      <div class="pop-item">
        <button class="submit-btn" @click="submitCommon">保存</button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// 设置常量
const REGEXPH = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/
const REGEXMB = /^(0[0-9]{3}(\d{7,8}))$/
export default {
  name: 'company',
  data() {
    let validatePH = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!REGEXPH.test(value)) {
        if (!REGEXMB.test(value)) {
          callback(new Error('电话格式不准确'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    let validateNa = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('企业名称为必填'))
      } else {
        callback()
      }
    }
    return {
      common: {
        // 企业名称
        name: '',
        // 联系人
        contact: '',
        // 电话
        connect: '',
        // 联系地址
        address: ''
      },
      prevName: '',
      rules: {
        name: [
          { validator: validateNa, trigger: 'blur' }
        ],
        connect: [
          { validator: validatePH, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitCommon() {
      const { common: { name, contact, connect, address } } = this
      // 表单校验
      this.$refs.common.validate((valid) => {
        if (valid) {
          if (name !== this.prevName) {
            const param = {
              name: name,
              contact: contact,
              phone: connect,
              address: address
            }
            const submit = async () => {
              let { data, status } = await this.$apiFactory.getUserApi().setComInfo(param)
              console.log(status, data)
              if (status == 200) {
                let user = this.getUser
                user.com_id = data.id
                this.$notify({
                  title: '',
                  message: '修改成功！',
                  duration: 3000
                })
              }
            }
            submit()
          } else {
            this.$notify({
              title: '',
              message: '修改失败！',
              duration: 3000
            })
          }
        }
      })
    },
    async getUserCom() {
      let { status, data } = await this.$apiFactory.getUserApi().getComInfo()
      if (status == 200) {
        this.common.name = data.name !== 'happy world' ? data.name : ''
        this.common.contact = data.contact !== '008610000000001' ? data.contact : ''
        this.common.connect = data.phone !== '008610000000001' ? data.phone : ''
        this.common.address = data.address
      }
    },
    getId() {
      if (this.getUser.id) {
        this.getUserCom()
        return
      }
      setTimeout(() => {
        this.getId()
      }, 100)
    }
  },
  computed: {
    ...mapState({
      getUser: state => state.user.loginUser
    })
  },
  mounted() {
    this.getId()
  }
}
</script>
<style lang="scss" scoped>
.content {
  width: 80%;
  margin: 0 auto;
  .index-wrapper {
    width: 60%;
    margin: 90px auto;
  }
  .pop-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 15px 0;
    .top-line,
    .unter-line {
      font-size: 14px;
      opacity: 0.6;
      line-height: 25px;
    }
    .item-input {
      position: relative;
      .necessary {
        position: absolute;
        left: -15px;
        top: 17px;
        width: 25px;
        color: #62cc95;
      }
    }
    .submit-btn {
      height: 50px;
      border-radius: 8px;
      background-color: #62cc95;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
