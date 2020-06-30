import { axiosBase, axiosGet } from '../axiosBaseConfig'

export default class SellApi {
  window() {
    let url = 'window'
    return axiosGet(url)
  }
  news(id) {
    let url = `stat/${id}`
    return axiosGet(url)
  }
  statistic() {
    let url = `article`
    return axiosGet(url)
  }
  getStatisric(id) {
    let url = `article/${id}`
    return axiosGet(url)
  }
  getArticleCategory(categoryId) {
    let url = `/article/category/${categoryId}?page=0&size=40`
    return axiosGet(url)
  }
  getBanner(){
    let url = `/common/banner`
    return  axiosGet(url)
  }
}
