import { axiosBase, axiosGet } from '../axiosBaseConfig'

// 类名需要大写
export default class CommonApi {
  sendVerCode(phoneNum) {
    let url = '/common/smcode'
    return axiosBase(url, phoneNum)
  }

  getServerTime() {
    let url = '/common/time'
    return axiosBase(url)
  }

  getImageIndex(data) {
    let url = '/common/get_image_index'
    return axiosBase(url, data)
  }

  getTrademarkCategory(data) {
    let url = '/common/trademark_category_list'
    return axiosBase(url, data)
  }

  getLocation(data) {
    let url = '/common/location_list'
    return axiosBase(url, data)
  }

  ifOnce(data) {
    let url = '/user/detail'
    return axiosBase(url, data)
  }

  hotTags() {
    let url = '/common/web-entries?category=16'
    return axiosGet(url)
  }

  hotPhoto(){
    let url = '/albums/recommend?recommendCategoryId=13'
    return axiosGet(url)
  }

  indexNumber() {
    const url = `/common/media-statistic`
    return axiosGet(url)
  }

  getAtals(id) {
    let url = `/albums/${id}/medias?page=0&size=10&sort=createdAt,desc`
    return axiosGet(url)
  }
}
