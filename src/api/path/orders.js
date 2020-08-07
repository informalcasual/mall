import { axiosBase, axiosGet, axiosPut, axiosDelete } from '../axiosBaseConfig'
export default class ordersApi {
    // 获取订单
    getOrders(data){
      let url = `order/1/${data.status}?page=${data.page}&size=30&sort=createdAt,desc${data.name?'&name='+data.name :'' }`
      return axiosGet(url)
    }
    // 订单详情
    orderDetail(id){
      let url = `order/${id}`
      return axiosGet(url)
    }
    // 取消订单
    cancleOrder(id){
      let url = `order/${id}`
      return axiosDelete(url)
    }
    // 申请退款
    refundOrder(data){
      let url = `order/refund`
      return axiosBase(url, data)
    }
    // 退款详情
    refundInfo(refundId) {
      let url = `/order/refund/${refundId}`
      return axiosGet(url)
    }
    // 确认收货
    sureOrder(id){
      let url = `order/${id}`
      return axiosPut(url)
    }
    // 退款详情
    // 取消退款
    unrefundOrder(id){
      let url = `order/refund/${id}`
      return axiosBase(url)
    }
    // 退款列表
    getRefunds(){
      let url = `order/refunds?page=0&size=1000&sort=createdAt,desc`
      return axiosGet(url)
    }
}