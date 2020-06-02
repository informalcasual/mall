import UserApi from './path/userApi'
import OrderApi from './path/orderApi'
import TrademarkApi from './path/trademarkApi'
import LoginApi from './path/login'
import pageModelApi from './path/pageModel'
import addressApi from './path/addressApi'
import payApi from './path/payApi'
import ordersApi from './path/orders'
export default class ApiFactory {
  constructor() {
    this.userApi = null
    this.orderApi = null
    this.trademarkApi = null
    this.LoginApi = null
    this.pageModelApi = null
    this.addressApi = null
    this.payApi = null
    this.ordersApi = null
  }

  getOrdersApi() {
    if(this.ordersApi == null) {
      this.ordersApi = new ordersApi()
    }
    return this.ordersApi
  }

  getpayApi(){
    if (this.payApi === null) {
      this.payApi = new payApi()
    }
    return this.payApi
  } 

  getaddressApi(){
    if (this.addressApi === null) {
      this.addressApi = new addressApi()
    }
    return this.addressApi
  } 

  getpageModel(){
    if (this.pageModelApi === null) {
      this.pageModelApi = new pageModelApi()
    }
    return this.pageModelApi
  }

  getUserApi() {
    if (this.userApi === null) {
      this.userApi = new UserApi()
    }
    return this.userApi
  }

  getOrderApi() {
    if (this.orderApi === null) {
      this.orderApi = new OrderApi()
    }
    return this.orderApi
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
