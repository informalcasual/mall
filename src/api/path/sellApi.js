import { axiosBase } from '../axiosBaseConfig'

export default class SellApi {
  orderDetail(data) {
    let url = '/sale/order_item'
    return axiosBase(url, data)
  }
}
