import { axiosBase, axiosGet } from '../axiosBaseConfig'

export default class TrademarkApi {
  // 商品列表 1实体 2文化
  getProduct(type, data){
    let url = `product/type/${type}?page=${data.page}&size=${data.size}&sort=createdAt,desc`
    return axiosGet(url)
  }
  // 商品详情
  ProductDetail(id){
    let url = `product/${id}`
    return axiosGet(url)
  }

}
