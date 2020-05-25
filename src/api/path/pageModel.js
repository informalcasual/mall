import { axiosBase, axiosGet } from '../axiosBaseConfig'

export default class SellApi {
  window() {
    let url = 'window'
    return axiosGet(url)
  }
}
