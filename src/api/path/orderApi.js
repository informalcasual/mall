import { axiosBase } from '../axiosBaseConfig'

// 类名需要大写
export default class OrderApi {
  addCart(data){
    let url = `cart`
    return axiosBase(url, data)
  }
}
