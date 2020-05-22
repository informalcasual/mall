import { axiosBase } from '../axiosBaseConfig'

export default class TrademarkApi {
  add(data) {
    // trademark_id
    let url = 'trademark/add'
    return axiosBase(url, data, {})
  }

  createOrder(data) {
    // trademark_id
    let url = 'trademark/create_order'
    return axiosBase(url, data, {})
  }

  mod(data) {
    // trademark_id
    let url = 'trademark/mod'
    return axiosBase(url, data, {})
  }

  del(data) {
    // trademark_id
    let url = 'trademark/del'
    return axiosBase(url, data, {})
  }

  item(data) {
    // trademark_id
    let url = 'trademark/item'
    return axiosBase(url, data, {})
  }

  list(data) {
    // trademark_id
    let url = 'trademark/list'
    return axiosBase(url, data, {})
  }
}
