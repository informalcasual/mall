import { axiosBase, axiosGet, axiosPut, axiosDelete } from '../axiosBaseConfig'

// 类名需要大写
export default class OrderApi {
  addCart(data){
    let url = `cart`
    return axiosBase(url, data)
  }
  // 购物车列表
  cartShop(){
    let url = 'cart'
    return axiosGet(url)
  }
  // 修改购物车商品数量
  changeNum(data){
    let url = 'cart'
    return axiosPut(url, data)
  }
  //删除购物车商品
  cancleCart(data) {
    let url = `cart`
    return axiosDelete(url, data)
  }
  // 购物车下单
  placeorder(data){
    let url = `order/cart`
    return axiosBase(url, data)
  }
  // 下单预览
  previewCart(data){
    let url = `cart/preview`
    return axiosBase(url, data)
  }
}
