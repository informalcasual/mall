import { axiosBase, axiosGet } from '../axiosBaseConfig'

export default class SellApi {
  window(type = 1, categoryId) { //type  1 重要区域   2  重要企业     2有categoryId
    let url = `window?type=${type}${categoryId === 0 ? '' : '&categoryId='+categoryId}`
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
