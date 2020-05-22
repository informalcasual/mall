import { axiosBase } from '../axiosBaseConfig'

// 类名需要大写
export default class OrderApi {
  orderItem(data) {
    // order_id
    let url = 'sale/order_item'
    return axiosBase(url, data)
  }
  orderList(data) {
    // order_id
    let url = `sale/order_list?line=${data.line}`
    return axiosBase(url, data)
  }
  addOrder(data) {
    // order_id
    let url = 'sale/add_order'
    return axiosBase(url, data)
  }
  delOrder(data) {
    // order_id
    let url = 'sale/del_order'
    return axiosBase(url, data)
  }
  // 会员购买
  albumsOrder(data) {
    let url = `orders/package`
    return axiosBase(url, data)
  }
}
