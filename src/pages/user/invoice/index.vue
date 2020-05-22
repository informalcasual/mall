<template>
  <div class="invoice">
    <section class="invoice-header">
      <!-- headline -->
      <h2 class="headline">申请发票</h2>
      <div>
        <el-radio v-model="invoiceType" label="0" border>增值税普通发票</el-radio>
        <el-radio v-model="invoiceType" label="1" border>增值税专用发票</el-radio>
      </div>
    </section>
     <div class="content">
            <!-- 普通表单 -->
            <el-form ref="common"
              v-if="invoiceType == '0'"
              :model="common"
              :rules="commonRule"
              @submit.native.prevent>
              <!-- 企业名称 -->
              <div class="pop-item">
                <p class="top-line">增值税普通发票为电子发票</p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="company">
                    <el-input type="text" placeholder="公司名称"
                    v-model="common.company"
                    @blur="setCompany(common.company)"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 统一代码 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="code">
                    <el-input type="text" placeholder="统一社会信用代码" v-model="common.code"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 备注 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <el-form-item prop="tip">
                    <el-input type="text"
                    placeholder="备注: 开票内容为“信息技术服务”, 如您有其他需求可备注, 非必填项"
                    v-model="common.tip"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <p class="tip">工作人员会将电子发票通过短信和邮箱发送给您</p>
              <!-- phone -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="phone">
                    <el-input type="text" placeholder="联系电话" v-model="common.phone"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 邮箱 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="email">
                    <el-input type="text" placeholder="邮箱" v-model="common.email"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 确定 -->

              <div class="pop-item">
                <button class="submit-btn" @click="submitCommon">确定</button>
              </div>
            </el-form>

            <!-- 专用表单 -->
            <el-form ref="special"
              v-if="invoiceType == '1'"
              :model="special"
              :rules="specialRule"
              @submit.native.prevent>
              <!-- 企业名称 -->
              <div class="pop-item">
                <p class="top-line">增值税专用发票为纸质版发票</p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="company">
                    <el-input type="text" placeholder="公司名称"
                    v-model="special.company"
                    @blur="setCompany(special.company)"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 统一代码 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="code">
                    <el-input type="text" placeholder="统一社会信用代码" v-model="special.code"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 银行 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="bank">
                    <el-input type="text" placeholder="开户银行" v-model="special.bank"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 银行账号 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="count">
                    <el-input type="text" placeholder="银行账号" v-model="special.count"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 地址 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="address">
                    <el-input type="text" placeholder="公司注册地址" v-model="special.address"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 电话 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="phone">
                    <el-input type="text" placeholder="电话" v-model="special.phone"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 备注 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <el-form-item prop="tip">
                    <el-input type="text" placeholder="备注: 开票内容为“信息技术服务”, 如您有其他需求可备注, 非必填项" v-model="special.tip"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <p class="tip">开票金额750元以上，拍信将为您提供免费邮寄服务，<br/>开票金额不足750元，默认顺丰到付。</p>
              <!-- 收件地址 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="receiveAddress">
                    <el-input type="text" placeholder="收件地址" v-model="special.receiveAddress"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 收件人 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="receiveContact">
                    <el-input type="text" placeholder="收件人" v-model="special.receiveContact"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 收件电话 -->
              <div class="pop-item">
                <p class="top-line"></p>
                <div class="item-input">
                  <span class="necessary">*</span>
                  <el-form-item prop="receiveConnect">
                    <el-input type="text" placeholder="11位手机号" v-model="special.receiveConnect"></el-input>
                  </el-form-item>
                </div>
                <p class="unter-line"></p>
              </div>
              <!-- 确定 -->

              <div class="pop-item">
                <button class="submit-btn" @click="submitSpecial">确定</button>
              </div>
            </el-form>
          </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// 设置常量
const REGEXPH = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/
const REGEXCA = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
const ERR_OK = 0
export default {
  name: 'invoices',
  data() {
    let validatePH = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此项为必填'))
      } else if (!REGEXPH.test(value) && !REGEXCA.test(value)) {
        callback(new Error('电话格式不正确'))
      } else {
        callback()
      }
    }
    return {
      invoiceType: '0',
      common: {
        // 企业名称
        company: '',
        // 社会识别码
        code: '',
        // 备注
        tip: '',
        // phone
        phone: '',
        // 邮箱
        email: ''
      },
      special: {
        // 企业名称
        company: '',
        // 社会识别码
        code: '',
        // 开户银行
        bank: '',
        // 银行账户
        count: '',
        // 地址
        address: '',
        // 电话
        phone: '',
        // 备注
        tip: '',
        // 收件地址
        receiveAddress: '',
        // 收件人
        receiveContact: '',
        // 收件电话
        receiveConnect: ''
      },
      commonRule: {
        company: [
          {type: 'string', required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        code: [
          {type: 'string', required: true, message: '此项为必填', trigger: 'blur'},
          { min: 18, max: 18, message: '统一社会信用代码为18位', trigger: 'blur' }
        ],
        email: [
          {type: 'email', required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        phone: [
          { validator: validatePH, trigger: 'blur' }
        ]
      },
      specialRule: {
        company: [
          { type: 'string', required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        code: [
          { type: 'string', required: true, message: '此项为必填', trigger: 'blur' },
          { min: 18, max: 18, message: '统一社会信用代码为18位', trigger: 'blur' }
        ],
        bank: [
          { type: 'string', required: true, message: '请输入开户银行', trigger: 'blur' },
          { min: 1, message: '请输入开户银行', trigger: 'change' }
        ],
        count: [
          { type: 'string', required: true, message: '请输入银行账户', trigger: 'blur' }
        ],
        address: [
          { type: 'string', required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { type: 'string', required: true, message: '请输入电话', trigger: 'blur' }
        ],
        receiveAddress: [
          { type: 'string', required: true, message: '请输入收件地址', trigger: 'blur' }
        ],
        receiveContact: [
          { required: true, message: '请输入收件人', trigger: 'blur' }
        ],
        receiveConnect: [
          { validator: validatePH, trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  methods: {
    async getUserCom(param) {
      let { data: { out, data } } = await this.$apiFactory.getUserApi().getComInfo(param)
      if (out > ERR_OK && data.name != '') {
        this.common.company = data.name
        this.special.company = data.name
        this.special.address = data.address
        this.special.phone = data.connect
      }
    },
    submitCommon() {
      const { common: { company, code, tip, phone, email }, invoiceType } = this
      // 表单校验
      this.$refs.common.validate((valid) => {
        if (valid) {
          const param = {
            type: invoiceType,
            name: company,
            uscc: code,
            remark: tip,
            email: email,
            connect: phone
          }
          const invoiceSubmit = async () => {
            const { data: { out, msg } } = await this.$apiFactory.getInvoiceApi().addInvoice(param)
            // 判断请求响应成功或者失败
            if (out > ERR_OK) {
              this.$notify({
                title: '提示',
                message: '申请成功，工作人员会在两个工作日内为您寄出发票',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '错误',
                message: msg,
                type: 'error'
              })
            }
          }
          invoiceSubmit()
        }
      })
    },
    submitSpecial() {
      const { invoiceType, special: { company, code, bank, count, address, phone, tip, receiveAddress, receiveContact, receiveConnect } } = this
      // 表单验证
      this.$refs.special.validate((valid) => {
        if (valid) {
          const param = {
            type: invoiceType,
            name: company,
            uscc: code,
            bank: bank,
            bank_id: count,
            address: address,
            connect: phone,
            remark: tip,
            receive_address: receiveAddress,
            receive_contact: receiveContact,
            receive_connect: receiveConnect
          }
          const invoiceSubmit = async () => {
            const { data: { out, msg } } = await this.$apiFactory.getInvoiceApi().addInvoice(param)
            // 判断请求响应成功或者失败
            if (out > ERR_OK) {
              this.$notify({
                title: '提示',
                message: '申请成功，工作人员会在两个工作日内为您寄出发票',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '错误',
                message: msg,
                type: 'error'
              })
            }
          }
          invoiceSubmit()
        }
      })
    },
    async setCompany(com) {
      // 没有com_id参数，就帮用户设定，有了就不管了
      if (!this.getUser.com_id) {
        let { data: { data, out } } = await this.$apiFactory.getUserApi().setComInfo({ name: com })
        if (out > ERR_OK) {
          let user = this.getUser
          user.com_id = data.com_id
          user.name = data.name
          this.signin(user)
          this.$notify({
            title: '提示',
            message: '已经帮您同步了企业名称',
            type: 'success'
          })
        }
      }
    },
    ...mapActions([
      'signin'
    ])
  },
  created() {
    document.title = '申请发票 - 拍信'

    if (this.getUser.com_id) {
      this.getUserCom({ com_id: this.getUser.com_id })
    }
  },
  computed: {
    ...mapState({
      getUser: state => state.user.loginUser
    })
  },
  watch: {
    invoiceType(current) {
      if (current == '0') {
        this.$refs.special.resetFields()
      } else {
        this.$refs.common.resetFields()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.invoice {
  margin: 0 auto;
  .invoice-header {
    font-size: 24px;
    letter-spacing: 1px;
    text-align: center;
    margin: 15px 0 25px;
    .headline {
      font-size: 32px;
      color: black;
      margin-bottom: 25px;
      font-weight: 400;
    }
  }
  .content {
    width: 80%;
    margin: 0 auto;
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
          color: #ff4949;
        }
      }
      .submit-btn {
        height: 50px;
        border-radius: 8px;
        background-color: #ff4949;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .tip {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}
</style>
