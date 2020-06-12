import { axiosBase, axiosGet } from '../axiosBaseConfig'

export default class TrademarkApi {
  // 商品列表
  getProduct(data){
    let url = `product?page=${data.page}&size=${data.size}&sort=createdAt,desc`
    return axiosGet(url)
  }
  // 商品详情
  ProductDetail(id){
    let url = `product/${id}`
    return axiosGet(url)
  }
  // 服务列表
  getService(data){
    let url = `service?page=${data.page}&size=${data.size}&sort=createdAt,desc`
    return axiosGet(url)
  }
  // 服务详情
  ServiceDetail(id){
    let url = `service/${id}`
    return axiosGet(url)
  }
  // 列表
  getCategoray(type){
    let url = `category?type=${type}`
    return axiosGet(url)
  }
  // 服务分类列表
  getServiceType(data){
    let url = `/service/cate/${data.categoryId}?page=${data.page}&size=${data.size}&sort=createdAt,desc`
    return axiosGet(url)
  }
  // 商品分类列表
  getProductType(data){
    let url = `/product/cate/${data.categoryId}?page=${data.page}&size=${data.size}&sort=createdAt,desc`
    return axiosGet(url)
  }

}
