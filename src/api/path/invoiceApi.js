import { axiosBase, axiosGet } from '../axiosBaseConfig'

// 类名需要大写
export default class InvoiceApi {
  // 查找
  getInvoice(data) {
    let url = `invoice/list?line=${data.line}&limit=${data.limit}`
    return axiosBase(url, data)
  }
  // 增添
  addInvoice(data) {
    let url = `user/set_coms`
    return axiosBase(url, data)
  }
  // 首页banner
  addBanner() {
    let url = `common/web-entries?category=19`
    return axiosGet(url)
  }
}
