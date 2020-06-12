import { axiosBase, axiosGet, axiosPut, axiosDelete } from '../axiosBaseConfig'

export default class payApi {
  // 直接下单
  payOrder(data){
    let url = 'order'
    return axiosBase(url, data)
  }
  // 从购物车中下单
  payCart(data) {
    let url = 'order/cart'
    return axiosBase(url, data)
  }
  // 支付宝支付
  aliBuy(data){
    let url = `order/ali`
    return axiosBase(url, data)
  }

  // 微信支付
  VXBuy(data){
    let url = `order/wx`
    return axiosBase(url, data)
  }
  // 核对支付
  checkBuy(data){
    let url = `order/` + data.id + `/check`
    return axiosGet(url)
  }
}