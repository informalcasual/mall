import { axiosBase, axiosGet, axiosPut, axiosDelete } from '../axiosBaseConfig'

export default class AddressApi {
  // 获取地址
  getAddress() {
    let url = `address`
    return axiosGet(url)
  }
  // 增加地址 
  addAddress(data) {
    let url = `address`
    return axiosBase(url, data)
  }
  // 地址详情
  addressDetail(id) {
    let url = `address/${id}`
    return axiosGet(url)
  }
  // 设为默认
  firstAddress(id) {
    let url = `address/${id}`
    return axiosPut(url)
  }
  // 删除地址
  cancleAddress(id) {
    let url = `address/${id}`
    return axiosDelete(url)
  }
}