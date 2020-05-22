import UserApi from './path/userApi'
import CommonApi from './path/commonApi'
import SellApi from './path/sellApi'
import OrderApi from './path/orderApi'
import InvoiceApi from './path/invoiceApi'
import TrademarkApi from './path/trademarkApi'
import Qiniu from './path/qiniu'
import Upload from './path/upload'
import LoginApi from './path/login'

export default class ApiFactory {
  constructor() {
    this.userApi = null
    this.orderApi = null
    this.sellApi = null
    this.commonApi = null
    this.invoiceApi = null
    this.trademarkApi = null
    this.qiniu = null
    this.upload = null
    this.LoginApi = null
  }

  getQiniu() {
    if (this.qiniu === null) {
      this.qiniu = new Qiniu()
    }
    return this.qiniu
  }

  getUpload() {
    if (this.upload === null) {
      this.upload = new Upload()
    }
    return this.upload
  }

  getUserApi() {
    if (this.userApi === null) {
      this.userApi = new UserApi()
    }
    return this.userApi
  }

  getCommonApi() {
    if (this.commonApi === null) {
      this.commonApi = new CommonApi()
    }
    return this.commonApi
  }

  getSellApi() {
    if (this.sellApi === null) {
      this.sellApi = new SellApi()
    }

    return this.sellApi
  }

  getOrderApi() {
    if (this.orderApi === null) {
      this.orderApi = new OrderApi()
    }
    return this.orderApi
  }

  getInvoiceApi() {
    if (this.invoiceApi === null) {
      this.invoiceApi = new InvoiceApi()
    }
    return this.invoiceApi
  }

  getTrademarkApi() {
    if (this.trademarkApi === null) {
      this.trademarkApi = new TrademarkApi()
    }
    return this.trademarkApi
  }

  getLoginApi() {
    if (this.LoginApi === null) {
      this.LoginApi = new LoginApi()
    }
    return this.LoginApi
  }
}
